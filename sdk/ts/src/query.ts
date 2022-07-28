import waitUntil from "async-wait-until";
import {BluzelleClient} from "./sdk";
import {QueryGetTaxInfoResponse} from "./curium/lib/generated/tax/query";
import {
    QueryDelegatorDelegationsResponse,
    QueryValidatorsResponse
} from "./curium/lib/generated/cosmos/cosmos-sdk/cosmos.staking.v1beta1/module/types/cosmos/staking/v1beta1/query";
import {
    DelegationResponse
} from "./curium/lib/generated/cosmos/cosmos-sdk/cosmos.staking.v1beta1/module/types/cosmos/staking/v1beta1/staking";
import {Coin} from "@cosmjs/proto-signing";
import {Delegation} from "./curium/lib/generated/cosmos/cosmos-sdk/cosmos.staking.v1beta1/module/types/cosmos/staking/v1beta1/staking";
import {PageRequest, PageResponse} from "./curium/lib/generated/cosmos/cosmos-sdk/cosmos.staking.v1beta1/module/types/cosmos/base/query/v1beta1/pagination";

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

const defaultPaginationOptions = (): PageRequest => ({
    key: new Uint8Array(),
    offset: 0,
    limit: 10,
    count_total: true,
    reverse: false,
});

export const waitForContent = (client: BluzelleClient, path: string, waitTime: number = 5000) =>
    waitUntil(
        () => hasContent(client, path),
        {timeout: waitTime},
    );

export const hasContent = (client: BluzelleClient, cid: string) =>
    client.queryClient.storage.HasContent({cid})
        .then(x => x.hasContent);

export const getAccountBalance = (client: BluzelleClient, address: string): Promise<number> =>
    client.queryClient.bank.Balance({address: address, denom: "ubnt"})
        .then(res => Number(res.balance?.amount));

export const getTaxInfo = (client: BluzelleClient): Promise<QueryGetTaxInfoResponse> =>
    client.queryClient.tax.GetTaxInfo({});

export const getDelegations = (
    client: BluzelleClient,
    delegatorAddress: string,
    options: PageRequest = defaultPaginationOptions()
): Promise<BluzelleDelegatorDelegationsResponse> =>
    client.queryClient.staking.DelegatorDelegations({
        delegator_addr: delegatorAddress,
        pagination: {
            key: options.key,
            offset: options.offset,
            limit: options.limit,
            count_total: options.count_total,
            reverse: options.reverse
        }
    })
        .then(parseQueryDelegatorDelegationsResponse);

export const getDelegation = (
    client: BluzelleClient,
    delegatorAddress: string,
    validatorAddress: string
): Promise<BluzelleDelegationResponse> =>
    client.queryClient.staking.Delegation({
        delegator_addr: delegatorAddress,
        validator_addr: validatorAddress
    })
        .then(res => res.delegation_response ? parseDelegationResponse(res.delegation_response) : {
            delegation: {
                validatorAddress: validatorAddress,
                delegatorAddress: delegatorAddress,
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
    options: PageRequest = defaultPaginationOptions()
): Promise<QueryValidatorsResponse> =>
    client.queryClient.staking.Validators({
        status,
        pagination: {
            key: options.key,
            offset: options.offset,
            limit: options.limit,
            count_total: options.count_total,
            reverse: options.reverse
        }
    });

export const getDelegationRewards = (
    client: BluzelleClient,
    delegatorAddress: string,
    validatorAddress: string
): Promise<BluzelleCoin[]> =>
    client.queryClient.distribution.DelegationRewards({
        delegator_address: delegatorAddress,
        validator_address: validatorAddress
    })
        .then(res => res.rewards ? res.rewards.map(parseCoin) : []);


const parseQueryDelegatorDelegationsResponse = (res: QueryDelegatorDelegationsResponse): Promise<BluzelleDelegatorDelegationsResponse> =>
    Promise.resolve(res.delegation_responses.map(parseDelegationResponse))
        .then(delegations => ({
            pagination: res.pagination ? res.pagination : {next_key: new Uint8Array(), total: 0},
            delegations,
        }));

const parseDelegationResponse = (res: DelegationResponse): BluzelleDelegationResponse => ({
    delegation: res.delegation ? parseDelegation(res.delegation) : {validatorAddress: '', delegatorAddress: '', shares: 0},
    balance: res.balance ? parseCoin(res.balance) : {denom: 'ubnt', amount: 0}
});

const parseDelegation = (delegation: Delegation): BluzelleDelegation => ({
    validatorAddress: delegation.validator_address,
    delegatorAddress: delegation.delegator_address,
    shares: Number(delegation.shares)
});

const parseCoin = (coin: Coin): BluzelleCoin => ({denom: 'ubnt', amount: Number(coin.amount)});