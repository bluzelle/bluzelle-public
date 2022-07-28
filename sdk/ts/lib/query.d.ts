import { BluzelleClient } from "./sdk";
import { QueryGetTaxInfoResponse } from "./curium/lib/generated/tax/query";
import { QueryValidatorsResponse } from "./curium/lib/generated/cosmos/cosmos-sdk/cosmos.staking.v1beta1/module/types/cosmos/staking/v1beta1/query";
import { PageRequest, PageResponse } from "./curium/lib/generated/cosmos/cosmos-sdk/cosmos.staking.v1beta1/module/types/cosmos/base/query/v1beta1/pagination";
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
    denom: string;
    amount: number;
};
export declare const waitForContent: (client: BluzelleClient, path: string, waitTime?: number) => Promise<boolean>;
export declare const hasContent: (client: BluzelleClient, cid: string) => Promise<boolean>;
export declare const getAccountBalance: (client: BluzelleClient, address: string) => Promise<number>;
export declare const getTaxInfo: (client: BluzelleClient) => Promise<QueryGetTaxInfoResponse>;
export declare const getDelegations: (client: BluzelleClient, delegatorAddress: string, options?: PageRequest) => Promise<BluzelleDelegatorDelegationsResponse>;
export declare const getDelegation: (client: BluzelleClient, delegatorAddress: string, validatorAddress: string) => Promise<BluzelleDelegationResponse>;
export declare const getValidatorsInfo: (client: BluzelleClient, status?: 'BOND_STATUS_UNBONDED' | 'BOND_STATUS_UNBONDING' | 'BOND_STATUS_BONDED', options?: PageRequest) => Promise<QueryValidatorsResponse>;
export declare const getDelegationRewards: (client: BluzelleClient, delegatorAddress: string, validatorAddress: string) => Promise<BluzelleCoin[]>;
//# sourceMappingURL=query.d.ts.map