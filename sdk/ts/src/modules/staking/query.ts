import {BluzelleClient} from "../../core";
import Long from "long";
import {PageRequest, PageResponse} from "../../curium/lib/generated/cosmos/base/query/v1beta1/pagination";
import {
    Delegation,
    DelegationResponse,
    UnbondingDelegation,
    UnbondingDelegationEntry,
    Validator
} from "../../curium/lib/generated/cosmos/staking/v1beta1/staking";
import {Coin} from "@cosmjs/proto-signing";
import {
    QueryDelegatorDelegationsResponse,
    QueryDelegatorUnbondingDelegationsResponse,
    QueryValidatorsResponse
} from "../../curium/lib/generated/cosmos/staking/v1beta1/query";
import {BluzellePageRequest, defaultPaginationOptions, defaultPaginationResponse} from "../../shared/pagination";
import {BluzelleCoin} from "../../shared/types";
import {parseDecTypeToNumber} from "../../shared/parse";


export type BluzelleDelegatorUnbondingDelegationsResponse = {
    unbondingDelegations: BluzelleUnbondingDelegation[],
    pagination: PageResponse,
}

export type BluzelleUnbondingDelegation = {
    delegatorAddress: string,
    validatorAddress: string,
    entries: BluzelleUnbondingDelegationEntry[],
    totalBalance: number
}

export type BluzelleUnbondingDelegationEntry = {
    creationHeight: number,
    completionTime: Date,
    initialBalance: number,
    balance: number
}


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


export const getDelegatorDelegations = (
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
        } as BluzelleDelegationResponse)
        .catch(() => ({
            delegation: {
                validatorAddress,
                delegatorAddress,
                shares: 0
            },
            balance: {
                denom: 'ubnt',
                amount: 0
            }
        }) as BluzelleDelegationResponse);


export const getDelegatorUnbondingDelegations = (
    client: BluzelleClient,
    delegatorAddress: string,
    options: BluzellePageRequest = defaultPaginationOptions()
): Promise<BluzelleDelegatorUnbondingDelegationsResponse> =>
    client.queryClient.staking.DelegatorUnbondingDelegations({
        delegatorAddr: delegatorAddress,
        pagination: {
            key: options.key,
            offset: new Long(options.offset),
            limit: new Long(options.limit),
            countTotal: options.countTotal,
            reverse: options.reverse
        } as PageRequest
    })
        .then(parseQueryDelegatorUnbondingDelegationsResponse);


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


const parseQueryDelegatorUnbondingDelegationsResponse = (
    res: QueryDelegatorUnbondingDelegationsResponse
): BluzelleDelegatorUnbondingDelegationsResponse => ({
    unbondingDelegations: res.unbondingResponses.map(parseUnbondingDelegation),
    pagination: res.pagination ? res.pagination : defaultPaginationResponse(),
});


const parseUnbondingDelegation = (res: UnbondingDelegation): BluzelleUnbondingDelegation => ({
    delegatorAddress: res.delegatorAddress,
    validatorAddress: res.validatorAddress,
    entries: res.entries.map(parseUnbondingDelegationEntry),
    totalBalance: getTotalUnbondingDelegationBalance(res.entries)
});


const getTotalUnbondingDelegationBalance = (entries: UnbondingDelegationEntry[]): number =>
    entries.map(parseUnbondingDelegationEntry).reduce((total, entry) => total + entry.balance, 0);


const parseUnbondingDelegationEntry = (res: UnbondingDelegationEntry): BluzelleUnbondingDelegationEntry => ({
    creationHeight: Number(res.creationHeight),
    completionTime: res.completionTime || new Date(0),
    initialBalance: Number(res.initialBalance),
    balance: Number(res.balance)
});

