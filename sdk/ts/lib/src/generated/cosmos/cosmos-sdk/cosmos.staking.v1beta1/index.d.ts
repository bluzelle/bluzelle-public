import { StakeAuthorization } from "./module/types/cosmos/staking/v1beta1/authz";
import { StakeAuthorization_Validators } from "./module/types/cosmos/staking/v1beta1/authz";
import { LastValidatorPower } from "./module/types/cosmos/staking/v1beta1/genesis";
import { HistoricalInfo } from "./module/types/cosmos/staking/v1beta1/staking";
import { CommissionRates } from "./module/types/cosmos/staking/v1beta1/staking";
import { Commission } from "./module/types/cosmos/staking/v1beta1/staking";
import { Description } from "./module/types/cosmos/staking/v1beta1/staking";
import { Validator } from "./module/types/cosmos/staking/v1beta1/staking";
import { ValAddresses } from "./module/types/cosmos/staking/v1beta1/staking";
import { DVPair } from "./module/types/cosmos/staking/v1beta1/staking";
import { DVPairs } from "./module/types/cosmos/staking/v1beta1/staking";
import { DVVTriplet } from "./module/types/cosmos/staking/v1beta1/staking";
import { DVVTriplets } from "./module/types/cosmos/staking/v1beta1/staking";
import { Delegation } from "./module/types/cosmos/staking/v1beta1/staking";
import { UnbondingDelegation } from "./module/types/cosmos/staking/v1beta1/staking";
import { UnbondingDelegationEntry } from "./module/types/cosmos/staking/v1beta1/staking";
import { RedelegationEntry } from "./module/types/cosmos/staking/v1beta1/staking";
import { Redelegation } from "./module/types/cosmos/staking/v1beta1/staking";
import { Params } from "./module/types/cosmos/staking/v1beta1/staking";
import { DelegationResponse } from "./module/types/cosmos/staking/v1beta1/staking";
import { RedelegationEntryResponse } from "./module/types/cosmos/staking/v1beta1/staking";
import { RedelegationResponse } from "./module/types/cosmos/staking/v1beta1/staking";
import { Pool } from "./module/types/cosmos/staking/v1beta1/staking";
export { StakeAuthorization, StakeAuthorization_Validators, LastValidatorPower, HistoricalInfo, CommissionRates, Commission, Description, Validator, ValAddresses, DVPair, DVPairs, DVVTriplet, DVVTriplets, Delegation, UnbondingDelegation, UnbondingDelegationEntry, RedelegationEntry, Redelegation, Params, DelegationResponse, RedelegationEntryResponse, RedelegationResponse, Pool };
declare const _default: {
    namespaced: boolean;
    state: {
        Validators: {};
        Validator: {};
        ValidatorDelegations: {};
        ValidatorUnbondingDelegations: {};
        Delegation: {};
        UnbondingDelegation: {};
        DelegatorDelegations: {};
        DelegatorUnbondingDelegations: {};
        Redelegations: {};
        DelegatorValidators: {};
        DelegatorValidator: {};
        HistoricalInfo: {};
        Pool: {};
        Params: {};
        _Structure: {
            StakeAuthorization: {
                fields: never[];
            };
            StakeAuthorization_Validators: {
                fields: never[];
            };
            LastValidatorPower: {
                fields: never[];
            };
            HistoricalInfo: {
                fields: never[];
            };
            CommissionRates: {
                fields: never[];
            };
            Commission: {
                fields: never[];
            };
            Description: {
                fields: never[];
            };
            Validator: {
                fields: never[];
            };
            ValAddresses: {
                fields: never[];
            };
            DVPair: {
                fields: never[];
            };
            DVPairs: {
                fields: never[];
            };
            DVVTriplet: {
                fields: never[];
            };
            DVVTriplets: {
                fields: never[];
            };
            Delegation: {
                fields: never[];
            };
            UnbondingDelegation: {
                fields: never[];
            };
            UnbondingDelegationEntry: {
                fields: never[];
            };
            RedelegationEntry: {
                fields: never[];
            };
            Redelegation: {
                fields: never[];
            };
            Params: {
                fields: never[];
            };
            DelegationResponse: {
                fields: never[];
            };
            RedelegationEntryResponse: {
                fields: never[];
            };
            RedelegationResponse: {
                fields: never[];
            };
            Pool: {
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
        getValidators: (state: any) => (params?: {
            params: {};
        }) => any;
        getValidator: (state: any) => (params?: {
            params: {};
        }) => any;
        getValidatorDelegations: (state: any) => (params?: {
            params: {};
        }) => any;
        getValidatorUnbondingDelegations: (state: any) => (params?: {
            params: {};
        }) => any;
        getDelegation: (state: any) => (params?: {
            params: {};
        }) => any;
        getUnbondingDelegation: (state: any) => (params?: {
            params: {};
        }) => any;
        getDelegatorDelegations: (state: any) => (params?: {
            params: {};
        }) => any;
        getDelegatorUnbondingDelegations: (state: any) => (params?: {
            params: {};
        }) => any;
        getRedelegations: (state: any) => (params?: {
            params: {};
        }) => any;
        getDelegatorValidators: (state: any) => (params?: {
            params: {};
        }) => any;
        getDelegatorValidator: (state: any) => (params?: {
            params: {};
        }) => any;
        getHistoricalInfo: (state: any) => (params?: {
            params: {};
        }) => any;
        getPool: (state: any) => (params?: {
            params: {};
        }) => any;
        getParams: (state: any) => (params?: {
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
        QueryValidators({ commit, rootGetters, getters }: {
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
        QueryValidator({ commit, rootGetters, getters }: {
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
        QueryValidatorDelegations({ commit, rootGetters, getters }: {
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
        QueryValidatorUnbondingDelegations({ commit, rootGetters, getters }: {
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
        QueryDelegation({ commit, rootGetters, getters }: {
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
        QueryUnbondingDelegation({ commit, rootGetters, getters }: {
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
        QueryDelegatorDelegations({ commit, rootGetters, getters }: {
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
        QueryDelegatorUnbondingDelegations({ commit, rootGetters, getters }: {
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
        QueryRedelegations({ commit, rootGetters, getters }: {
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
        QueryDelegatorValidator({ commit, rootGetters, getters }: {
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
        QueryHistoricalInfo({ commit, rootGetters, getters }: {
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
        QueryPool({ commit, rootGetters, getters }: {
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
        sendMsgEditValidator({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        sendMsgCreateValidator({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        sendMsgBeginRedelegate({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        sendMsgDelegate({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        sendMsgUndelegate({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        MsgEditValidator({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
        MsgCreateValidator({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
        MsgBeginRedelegate({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
        MsgDelegate({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
        MsgUndelegate({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map