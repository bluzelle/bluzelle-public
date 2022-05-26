import { Params } from "./module/types/cosmos/distribution/v1beta1/distribution";
import { ValidatorHistoricalRewards } from "./module/types/cosmos/distribution/v1beta1/distribution";
import { ValidatorCurrentRewards } from "./module/types/cosmos/distribution/v1beta1/distribution";
import { ValidatorAccumulatedCommission } from "./module/types/cosmos/distribution/v1beta1/distribution";
import { ValidatorOutstandingRewards } from "./module/types/cosmos/distribution/v1beta1/distribution";
import { ValidatorSlashEvent } from "./module/types/cosmos/distribution/v1beta1/distribution";
import { ValidatorSlashEvents } from "./module/types/cosmos/distribution/v1beta1/distribution";
import { FeePool } from "./module/types/cosmos/distribution/v1beta1/distribution";
import { CommunityPoolSpendProposal } from "./module/types/cosmos/distribution/v1beta1/distribution";
import { DelegatorStartingInfo } from "./module/types/cosmos/distribution/v1beta1/distribution";
import { DelegationDelegatorReward } from "./module/types/cosmos/distribution/v1beta1/distribution";
import { CommunityPoolSpendProposalWithDeposit } from "./module/types/cosmos/distribution/v1beta1/distribution";
import { DelegatorWithdrawInfo } from "./module/types/cosmos/distribution/v1beta1/genesis";
import { ValidatorOutstandingRewardsRecord } from "./module/types/cosmos/distribution/v1beta1/genesis";
import { ValidatorAccumulatedCommissionRecord } from "./module/types/cosmos/distribution/v1beta1/genesis";
import { ValidatorHistoricalRewardsRecord } from "./module/types/cosmos/distribution/v1beta1/genesis";
import { ValidatorCurrentRewardsRecord } from "./module/types/cosmos/distribution/v1beta1/genesis";
import { DelegatorStartingInfoRecord } from "./module/types/cosmos/distribution/v1beta1/genesis";
import { ValidatorSlashEventRecord } from "./module/types/cosmos/distribution/v1beta1/genesis";
export { Params, ValidatorHistoricalRewards, ValidatorCurrentRewards, ValidatorAccumulatedCommission, ValidatorOutstandingRewards, ValidatorSlashEvent, ValidatorSlashEvents, FeePool, CommunityPoolSpendProposal, DelegatorStartingInfo, DelegationDelegatorReward, CommunityPoolSpendProposalWithDeposit, DelegatorWithdrawInfo, ValidatorOutstandingRewardsRecord, ValidatorAccumulatedCommissionRecord, ValidatorHistoricalRewardsRecord, ValidatorCurrentRewardsRecord, DelegatorStartingInfoRecord, ValidatorSlashEventRecord };
declare const _default: {
    namespaced: boolean;
    state: {
        Params: {};
        ValidatorOutstandingRewards: {};
        ValidatorCommission: {};
        ValidatorSlashes: {};
        DelegationRewards: {};
        DelegationTotalRewards: {};
        DelegatorValidators: {};
        DelegatorWithdrawAddress: {};
        CommunityPool: {};
        _Structure: {
            Params: {
                fields: never[];
            };
            ValidatorHistoricalRewards: {
                fields: never[];
            };
            ValidatorCurrentRewards: {
                fields: never[];
            };
            ValidatorAccumulatedCommission: {
                fields: never[];
            };
            ValidatorOutstandingRewards: {
                fields: never[];
            };
            ValidatorSlashEvent: {
                fields: never[];
            };
            ValidatorSlashEvents: {
                fields: never[];
            };
            FeePool: {
                fields: never[];
            };
            CommunityPoolSpendProposal: {
                fields: never[];
            };
            DelegatorStartingInfo: {
                fields: never[];
            };
            DelegationDelegatorReward: {
                fields: never[];
            };
            CommunityPoolSpendProposalWithDeposit: {
                fields: never[];
            };
            DelegatorWithdrawInfo: {
                fields: never[];
            };
            ValidatorOutstandingRewardsRecord: {
                fields: never[];
            };
            ValidatorAccumulatedCommissionRecord: {
                fields: never[];
            };
            ValidatorHistoricalRewardsRecord: {
                fields: never[];
            };
            ValidatorCurrentRewardsRecord: {
                fields: never[];
            };
            DelegatorStartingInfoRecord: {
                fields: never[];
            };
            ValidatorSlashEventRecord: {
                fields: never[];
            };
        };
        _Registry: import("@cosmjs/proto-signing").Registry;
        _Subscriptions: Set<unknown>;
    };
    mutations: {
        RESET_STATE(state: any): void;
        QUERY(state: any, { query, key, value }: {
            query: any;
            key: any;
            value: any;
        }): void;
        SUBSCRIBE(state: any, subscription: any): void;
        UNSUBSCRIBE(state: any, subscription: any): void;
    };
    getters: {
        getParams: (state: any) => (params?: {
            params: {};
        }) => any;
        getValidatorOutstandingRewards: (state: any) => (params?: {
            params: {};
        }) => any;
        getValidatorCommission: (state: any) => (params?: {
            params: {};
        }) => any;
        getValidatorSlashes: (state: any) => (params?: {
            params: {};
        }) => any;
        getDelegationRewards: (state: any) => (params?: {
            params: {};
        }) => any;
        getDelegationTotalRewards: (state: any) => (params?: {
            params: {};
        }) => any;
        getDelegatorValidators: (state: any) => (params?: {
            params: {};
        }) => any;
        getDelegatorWithdrawAddress: (state: any) => (params?: {
            params: {};
        }) => any;
        getCommunityPool: (state: any) => (params?: {
            params: {};
        }) => any;
        getTypeStructure: (state: any) => (type: any) => any;
        getRegistry: (state: any) => any;
    };
    actions: {
        init({ dispatch, rootGetters }: {
            dispatch: any;
            rootGetters: any;
        }): void;
        resetState({ commit }: {
            commit: any;
        }): void;
        unsubscribe({ commit }: {
            commit: any;
        }, subscription: any): void;
        StoreUpdate({ state, dispatch }: {
            state: any;
            dispatch: any;
        }): Promise<void>;
        QueryParams({ commit, rootGetters, getters }: {
            commit: any;
            rootGetters: any;
            getters: any;
        }, { options: { subscribe, all }, params, query }: {
            options?: {
                subscribe: boolean;
                all: boolean;
            } | undefined;
            params: any;
            query?: null | undefined;
        }): Promise<any>;
        QueryValidatorOutstandingRewards({ commit, rootGetters, getters }: {
            commit: any;
            rootGetters: any;
            getters: any;
        }, { options: { subscribe, all }, params, query }: {
            options?: {
                subscribe: boolean;
                all: boolean;
            } | undefined;
            params: any;
            query?: null | undefined;
        }): Promise<any>;
        QueryValidatorCommission({ commit, rootGetters, getters }: {
            commit: any;
            rootGetters: any;
            getters: any;
        }, { options: { subscribe, all }, params, query }: {
            options?: {
                subscribe: boolean;
                all: boolean;
            } | undefined;
            params: any;
            query?: null | undefined;
        }): Promise<any>;
        QueryValidatorSlashes({ commit, rootGetters, getters }: {
            commit: any;
            rootGetters: any;
            getters: any;
        }, { options: { subscribe, all }, params, query }: {
            options?: {
                subscribe: boolean;
                all: boolean;
            } | undefined;
            params: any;
            query?: null | undefined;
        }): Promise<any>;
        QueryDelegationRewards({ commit, rootGetters, getters }: {
            commit: any;
            rootGetters: any;
            getters: any;
        }, { options: { subscribe, all }, params, query }: {
            options?: {
                subscribe: boolean;
                all: boolean;
            } | undefined;
            params: any;
            query?: null | undefined;
        }): Promise<any>;
        QueryDelegationTotalRewards({ commit, rootGetters, getters }: {
            commit: any;
            rootGetters: any;
            getters: any;
        }, { options: { subscribe, all }, params, query }: {
            options?: {
                subscribe: boolean;
                all: boolean;
            } | undefined;
            params: any;
            query?: null | undefined;
        }): Promise<any>;
        QueryDelegatorValidators({ commit, rootGetters, getters }: {
            commit: any;
            rootGetters: any;
            getters: any;
        }, { options: { subscribe, all }, params, query }: {
            options?: {
                subscribe: boolean;
                all: boolean;
            } | undefined;
            params: any;
            query?: null | undefined;
        }): Promise<any>;
        QueryDelegatorWithdrawAddress({ commit, rootGetters, getters }: {
            commit: any;
            rootGetters: any;
            getters: any;
        }, { options: { subscribe, all }, params, query }: {
            options?: {
                subscribe: boolean;
                all: boolean;
            } | undefined;
            params: any;
            query?: null | undefined;
        }): Promise<any>;
        QueryCommunityPool({ commit, rootGetters, getters }: {
            commit: any;
            rootGetters: any;
            getters: any;
        }, { options: { subscribe, all }, params, query }: {
            options?: {
                subscribe: boolean;
                all: boolean;
            } | undefined;
            params: any;
            query?: null | undefined;
        }): Promise<any>;
        sendMsgSetWithdrawAddress({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        sendMsgFundCommunityPool({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        sendMsgWithdrawValidatorCommission({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        sendMsgWithdrawDelegatorReward({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        MsgSetWithdrawAddress({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
        MsgFundCommunityPool({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
        MsgWithdrawValidatorCommission({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
        MsgWithdrawDelegatorReward({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map