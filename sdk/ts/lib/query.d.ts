import { BluzelleClient } from "./sdk";
import { QueryGetTaxInfoResponse } from "./curium/lib/generated/tax/query";
import { PageResponse } from "./curium/lib/generated/cosmos/base/query/v1beta1/pagination";
export type BluzelleDelegatorDelegationsResponse = {
    pagination: PageResponse;
    delegations: BluzelleDelegationResponse[];
};
export type BluzelleDelegationResponse = {
    delegation: BluzelleDelegation;
    balance: BluzelleCoin;
};
export type BluzelleDelegation = {
    validatorAddress: string;
    delegatorAddress: string;
    shares: number;
};
export type BluzelleCoin = {
    denom: 'ubnt';
    amount: number;
};
export type BluzelleValidatorsResponse = {
    pagination: PageResponse;
    validators: BluzelleValidator[];
};
export type BluzelleValidator = {
    operatorAddress: string;
    description: {
        moniker: string;
        details: string;
        website: string;
        securityContact: string;
    };
    commission: {
        commissionRates: {
            rate: number;
            maxRate: number;
            maxChangeRate: number;
        };
        updateTime: Date;
    };
    minSelfDelegation: number;
    delegatorShares: number;
    jailed: boolean;
};
export type BluzellePageRequest = {
    key: Uint8Array;
    offset: number;
    limit: number;
    countTotal: boolean;
    reverse: boolean;
};
export type BluzelleDelegationTotalRewardsResponse = {
    rewards: BluzelleDelegationDelegatorReward[];
    total: BluzelleCoin[];
};
export type BluzelleDelegationDelegatorReward = {
    reward: BluzelleCoin[];
    validatorAddress: string;
    totalReward: BluzelleCoin;
};
export type BluzelleDelegatorUnbondingDelegationsResponse = {
    unbondingDelegations: BluzelleUnbondingDelegation[];
    pagination: PageResponse;
};
export type BluzelleUnbondingDelegation = {
    delegatorAddress: string;
    validatorAddress: string;
    entries: BluzelleUnbondingDelegationEntry[];
    totalBalance: number;
};
export type BluzelleUnbondingDelegationEntry = {
    creationHeight: number;
    completionTime: Date;
    initialBalance: number;
    balance: number;
};
export declare const getTx: (client: BluzelleClient, hash: string) => any;
export declare const waitForContent: (client: BluzelleClient, path: string, waitTime?: number) => Promise<any>;
export declare const hasContent: (client: BluzelleClient, cid: string) => any;
export declare const getAccountBalance: (client: BluzelleClient, address: string, denom?: string) => Promise<number>;
export declare const getTaxInfo: (client: BluzelleClient) => Promise<QueryGetTaxInfoResponse>;
export declare const getDelegatorDelegations: (client: BluzelleClient, delegatorAddress: string, options?: BluzellePageRequest) => Promise<BluzelleDelegatorDelegationsResponse>;
export declare const getDelegation: (client: BluzelleClient, delegatorAddress: string, validatorAddress: string) => Promise<BluzelleDelegationResponse>;
export declare const getDelegatorUnbondingDelegations: (client: BluzelleClient, delegatorAddress: string, options?: BluzellePageRequest) => Promise<BluzelleDelegatorUnbondingDelegationsResponse>;
export declare const getValidatorsInfo: (client: BluzelleClient, status?: 'BOND_STATUS_UNBONDED' | 'BOND_STATUS_UNBONDING' | 'BOND_STATUS_BONDED', options?: BluzellePageRequest) => Promise<BluzelleValidatorsResponse>;
export declare const getDelegationRewards: (client: BluzelleClient, delegatorAddress: string, validatorAddress: string) => Promise<BluzelleCoin[]>;
export declare const getDelegationTotalRewards: (client: BluzelleClient, delegatorAddress: string) => Promise<BluzelleDelegationTotalRewardsResponse>;
export declare const parseDecTypeToNumber: (dec: string) => number;
export declare const getNftInfo: (client: BluzelleClient, id: string) => any;
export declare const getCollectionInfo: (client: BluzelleClient, id: number) => any;
export declare const getNftMetadata: (client: BluzelleClient, id: number) => any;
export declare const getNftByOwner: (client: BluzelleClient, owner: string) => any;
//# sourceMappingURL=query.d.ts.map