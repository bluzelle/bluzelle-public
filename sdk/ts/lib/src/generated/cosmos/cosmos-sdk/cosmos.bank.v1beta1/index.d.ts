import { SendAuthorization } from "./module/types/cosmos/bank/v1beta1/authz";
import { Params } from "./module/types/cosmos/bank/v1beta1/bank";
import { SendEnabled } from "./module/types/cosmos/bank/v1beta1/bank";
import { Input } from "./module/types/cosmos/bank/v1beta1/bank";
import { Output } from "./module/types/cosmos/bank/v1beta1/bank";
import { Supply } from "./module/types/cosmos/bank/v1beta1/bank";
import { DenomUnit } from "./module/types/cosmos/bank/v1beta1/bank";
import { Metadata } from "./module/types/cosmos/bank/v1beta1/bank";
import { Balance } from "./module/types/cosmos/bank/v1beta1/genesis";
export { SendAuthorization, Params, SendEnabled, Input, Output, Supply, DenomUnit, Metadata, Balance };
declare const _default: {
    namespaced: boolean;
    state: {
        Balance: {};
        AllBalances: {};
        TotalSupply: {};
        SupplyOf: {};
        Params: {};
        DenomMetadata: {};
        DenomsMetadata: {};
        _Structure: {
            SendAuthorization: {
                fields: never[];
            };
            Params: {
                fields: never[];
            };
            SendEnabled: {
                fields: never[];
            };
            Input: {
                fields: never[];
            };
            Output: {
                fields: never[];
            };
            Supply: {
                fields: never[];
            };
            DenomUnit: {
                fields: never[];
            };
            Metadata: {
                fields: never[];
            };
            Balance: {
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
        getBalance: (state: any) => (params?: {
            params: {};
        }) => any;
        getAllBalances: (state: any) => (params?: {
            params: {};
        }) => any;
        getTotalSupply: (state: any) => (params?: {
            params: {};
        }) => any;
        getSupplyOf: (state: any) => (params?: {
            params: {};
        }) => any;
        getParams: (state: any) => (params?: {
            params: {};
        }) => any;
        getDenomMetadata: (state: any) => (params?: {
            params: {};
        }) => any;
        getDenomsMetadata: (state: any) => (params?: {
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
        QueryBalance({ commit, rootGetters, getters }: {
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
        QueryAllBalances({ commit, rootGetters, getters }: {
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
        QueryTotalSupply({ commit, rootGetters, getters }: {
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
        QuerySupplyOf({ commit, rootGetters, getters }: {
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
        QueryDenomMetadata({ commit, rootGetters, getters }: {
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
        QueryDenomsMetadata({ commit, rootGetters, getters }: {
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
        sendMsgMultiSend({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        sendMsgSend({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        MsgMultiSend({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
        MsgSend({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map