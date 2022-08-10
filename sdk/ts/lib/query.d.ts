import { BluzelleClient } from "./sdk";
import { QueryGetTaxInfoResponse } from "./curium/lib/generated/tax/query";
import { PageResponse } from "./curium/lib/generated/cosmos/base/query/v1beta1/pagination";
export declare type BluzelleDelegatorDelegationsResponse = {
    pagination: PageResponse;
    delegations: BluzelleDelegationResponse[];
};
export declare type BluzelleDelegationResponse = {
    delegation: BluzelleDelegation;
    balance: BluzelleCoin;
};
export declare type BluzelleDelegation = {
    validatorAddress: string;
    delegatorAddress: string;
    shares: number;
};
export declare type BluzelleCoin = {
    denom: 'ubnt';
    amount: number;
};
export declare type BluzelleValidatorsResponse = {
    pagination: PageResponse;
    validators: BluzelleValidator[];
};
export declare type BluzelleValidator = {
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
export declare type BluzellePageRequest = {
    key: Uint8Array;
    offset: number;
    limit: number;
    countTotal: boolean;
    reverse: boolean;
};
export declare const waitForContent: (client: BluzelleClient, path: string, waitTime?: number) => Promise<boolean>;
export declare const hasContent: (client: BluzelleClient, cid: string) => Promise<boolean>;
export declare const getAccountBalance: (client: BluzelleClient, address: string) => Promise<number>;
export declare const getTaxInfo: (client: BluzelleClient) => Promise<QueryGetTaxInfoResponse>;
export declare const getDelegations: (client: BluzelleClient, delegatorAddress: string, options?: BluzellePageRequest) => Promise<BluzelleDelegatorDelegationsResponse>;
export declare const getDelegation: (client: BluzelleClient, delegatorAddress: string, validatorAddress: string) => Promise<BluzelleDelegationResponse>;
export declare const getValidatorsInfo: (client: BluzelleClient, status?: 'BOND_STATUS_UNBONDED' | 'BOND_STATUS_UNBONDING' | 'BOND_STATUS_BONDED', options?: BluzellePageRequest) => Promise<BluzelleValidatorsResponse>;
export declare const getDelegationRewards: (client: BluzelleClient, delegatorAddress: string, validatorAddress: string) => Promise<BluzelleCoin[]>;
export declare const parseDecTypeToNumber: (dec: string) => number;
//# sourceMappingURL=query.d.ts.map