import waitUntil from "async-wait-until";
import {BluzelleClient} from "./sdk";
import {QueryGetTaxInfoResponse} from "./curium/lib/generated/tax/query";
import {
    QueryDelegatorDelegationsResponse,
    QueryValidatorsResponse
} from "./curium/lib/generated/cosmos/staking/v1beta1/query";
import {
    QueryDelegationTotalRewardsResponse,
} from "./curium/lib/generated/cosmos/distribution/v1beta1/query";
import {
    DelegationResponse,
    Validator
} from "./curium/lib/generated/cosmos/staking/v1beta1/staking";
import {
    DelegationDelegatorReward
} from "./curium/lib/generated/cosmos/distribution/v1beta1/distribution";
import {Coin} from "@cosmjs/proto-signing";
import {Delegation} from "./curium/lib/generated/cosmos/staking/v1beta1/staking";
import {PageRequest, PageResponse} from "./curium/lib/generated/cosmos/base/query/v1beta1/pagination";
const Long = require("long");
import {padStart} from "lodash";
import {Some} from "monet";

export type BluzelleDelegatorDelegationsResponse = {
    pagination: PageResponse,
    delegations: BluzelleDelegationResponse[]
}

export type BluzelleDelegationResponse = {
    delegation: BluzelleDelegation,
    balance: BluzelleCoin
}

export type BluzelleDelegation = {
    validatorAddress: string,
    delegatorAddress: string,
    shares: number
}

export type BluzelleCoin = {
    denom: 'ubnt',
    amount: number
}

export type BluzelleValidatorsResponse = {
    pagination: PageResponse,
    validators: BluzelleValidator[]
}

export type BluzelleValidator = {
    operatorAddress: string,
    description: {
        moniker: string,
        details: string,
        website: string,
        securityContact: string,
    },
    commission: {
        commissionRates: {
            rate: number,
            maxRate: number,
            maxChangeRate: number,
        },
        updateTime: Date
    },
    minSelfDelegation: number,
    delegatorShares: number,
    jailed: boolean
}

export type BluzellePageRequest = {
    key: Uint8Array,
    offset: number,
    limit: number,
    countTotal: boolean,
    reverse: boolean,
}

export type BluzelleDelegationTotalRewardsResponse = {
    rewards: BluzelleDelegationDelegatorReward[],
    total: BluzelleCoin[]
}

export type BluzelleDelegationDelegatorReward = {
    reward: BluzelleCoin[],
    validatorAddress: string,
    totalReward: BluzelleCoin
}

const defaultPaginationOptions = (): BluzellePageRequest => ({
    key: new Uint8Array(),
    offset: 0,
    limit: 10,
    countTotal: true,
    reverse: false,
});

const defaultPaginationResponse = (): PageResponse => ({nextKey: new Uint8Array(), total: Long.fromValue(0)});

export const waitForContent = (client: BluzelleClient, path: string, waitTime: number = 5000) =>
    waitUntil(
        () => hasContent(client, path),
        {timeout: waitTime},
    );

export const hasContent = (client: BluzelleClient, cid: string) =>
    client.queryClient.storage.HasContent({cid})
        .then(x => x.hasContent);

export const getAccountBalance = (client: BluzelleClient, address: string, denom: string = "ubnt"): Promise<number> =>
    client.queryClient.bank.Balance({address: address, denom})
        .then(res => Number(res.balance?.amount));

export const getTaxInfo = (client: BluzelleClient): Promise<QueryGetTaxInfoResponse> =>
    client.queryClient.tax.GetTaxInfo({});

export const getDelegations = (
    client: BluzelleClient,
    delegatorAddress: string,
    options: BluzellePageRequest = defaultPaginationOptions()
): Promise<BluzelleDelegatorDelegationsResponse> =>
    client.queryClient.staking.DelegatorDelegations({
        delegatorAddr: delegatorAddress,
        pagination: {
            key: options.key,
            offset: new Long(options.offset),
            limit: new Long(options.limit),
            countTotal: options.countTotal,
            reverse: options.reverse
        } as PageRequest
    })
        .then(parseQueryDelegatorDelegationsResponse);

export const getDelegation = (
    client: BluzelleClient,
    delegatorAddress: string,
    validatorAddress: string
): Promise<BluzelleDelegationResponse> =>
    client.queryClient.staking.Delegation({
        delegatorAddr: delegatorAddress,
        validatorAddr: validatorAddress
    })
        .then(res => res.delegationResponse ? parseDelegationResponse(res.delegationResponse) : {
            delegation: {
                validatorAddress,
                delegatorAddress,
                shares: 0
            },
            balance: {
                denom: 'ubnt',
                amount: 0
            }
        });

export const getValidatorsInfo = (
    client: BluzelleClient,
    status: 'BOND_STATUS_UNBONDED' | 'BOND_STATUS_UNBONDING' | 'BOND_STATUS_BONDED' = 'BOND_STATUS_BONDED',
    options: BluzellePageRequest = defaultPaginationOptions()
): Promise<BluzelleValidatorsResponse> =>
    client.queryClient.staking.Validators({
        status,
        pagination: {
            key: options.key,
            offset: new Long(options.offset),
            limit: new Long(options.limit),
            countTotal: options.countTotal,
            reverse: options.reverse
        } as PageRequest
    })
        .then(parseQueryValidatorsResponse);

export const getDelegationRewards = (
    client: BluzelleClient,
    delegatorAddress: string,
    validatorAddress: string
): Promise<BluzelleCoin[]> =>
    client.queryClient.distribution.DelegationRewards({
        delegatorAddress,
        validatorAddress
    })
        .then(res => res.rewards ? res.rewards.map(parseLongCoin) : []);


export const getDelegationTotalRewards = (
    client: BluzelleClient,
    delegatorAddress: string
): Promise<BluzelleDelegationTotalRewardsResponse> =>
    client.queryClient.distribution.DelegationTotalRewards({
        delegatorAddress
    })
        .then(parseQueryDelegationTotalRewardsResponse);

const parseQueryDelegationTotalRewardsResponse = (res: QueryDelegationTotalRewardsResponse): Promise<BluzelleDelegationTotalRewardsResponse> =>
    Promise.all(res.rewards.map(parseDelegationDelegatorReward))
        .then(rewards => ({
            rewards,
            total: res.total.map(parseLongCoin)
        }));

const parseDelegationDelegatorReward = (delegatorReward: DelegationDelegatorReward): Promise<BluzelleDelegationDelegatorReward> =>
    Promise.resolve(delegatorReward.reward.map(parseLongCoin))
        .then(reward => ({
            reward: reward,
            validatorAddress: delegatorReward.validatorAddress,
            totalReward: sumBluzelleCoins(reward)
        }));

const sumBluzelleCoins = (coins: BluzelleCoin[]): BluzelleCoin =>
    coins.reduce((total, coin) => ({
        denom: "ubnt",
        amount: total.amount + coin.amount
    }), {denom: 'ubnt', amount: 0});

const parseQueryDelegatorDelegationsResponse = (res: QueryDelegatorDelegationsResponse): Promise<BluzelleDelegatorDelegationsResponse> =>
    Promise.resolve(res.delegationResponses.map(parseDelegationResponse))
        .then(delegations => ({
            pagination: res.pagination ? res.pagination : defaultPaginationResponse(),
            delegations,
        }));

const parseDelegationResponse = (res: DelegationResponse): BluzelleDelegationResponse => ({
    delegation: res.delegation ? parseDelegation(res.delegation) : {
        validatorAddress: '',
        delegatorAddress: '',
        shares: 0
    },
    balance: res.balance ? parseCoin(res.balance) : {denom: 'ubnt', amount: 0}
});

const parseDelegation = (delegation: Delegation): BluzelleDelegation => ({
    validatorAddress: delegation.validatorAddress,
    delegatorAddress: delegation.delegatorAddress,
    shares: parseDecTypeToNumber(delegation.shares)
});

const parseCoin = (coin: Coin): BluzelleCoin => ({denom: 'ubnt', amount: Number(coin.amount)});

const parseLongCoin = (coin: Coin): BluzelleCoin => ({denom: 'ubnt', amount: parseDecTypeToNumber(coin.amount)});

const parseQueryValidatorsResponse = (res: QueryValidatorsResponse): BluzelleValidatorsResponse => ({
    pagination: res.pagination ? res.pagination : defaultPaginationResponse(),
    validators: res.validators ? res.validators.map(parseValidator) : []
});

const parseValidator = (validator: Validator) => ({
    operatorAddress: validator.operatorAddress,
    description: {
        moniker: validator.description?.moniker || '',
        details: validator.description?.details || '',
        website: validator.description?.website || '',
        securityContact: validator.description?.securityContact || '',
    },
    commission: {
        commissionRates: {
            rate: parseDecTypeToNumber(validator.commission?.commissionRates?.rate || '0'),
            maxRate: parseDecTypeToNumber(validator.commission?.commissionRates?.maxRate || '0'),
            maxChangeRate: parseDecTypeToNumber(validator.commission?.commissionRates?.maxChangeRate || '0'),
        },
        updateTime: validator.commission?.updateTime || new Date(0)
    },
    minSelfDelegation: Number(validator.minSelfDelegation),
    delegatorShares: parseDecTypeToNumber(validator.delegatorShares),
    jailed: validator.jailed
});

export const parseDecTypeToNumber = (dec: string): number =>
    Some(padStart(dec, 18, '0'))
        .map(dec => `${dec.slice(0, dec.length - 18)}.${dec.slice(-18)}`)
        .map(Number)
        .join();