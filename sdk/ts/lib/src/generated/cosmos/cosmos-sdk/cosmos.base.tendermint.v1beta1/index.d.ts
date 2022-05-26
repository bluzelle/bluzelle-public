import { Validator } from "./module/types/cosmos/base/tendermint/v1beta1/query";
import { VersionInfo } from "./module/types/cosmos/base/tendermint/v1beta1/query";
import { Module } from "./module/types/cosmos/base/tendermint/v1beta1/query";
export { Validator, VersionInfo, Module };
declare const _default: {
    namespaced: boolean;
    state: {
        GetNodeInfo: {};
        GetSyncing: {};
        GetLatestBlock: {};
        GetBlockByHeight: {};
        GetLatestValidatorSet: {};
        GetValidatorSetByHeight: {};
        _Structure: {
            Validator: {
                fields: never[];
            };
            VersionInfo: {
                fields: never[];
            };
            Module: {
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
        getGetNodeInfo: (state: any) => (params?: {
            params: {};
        }) => any;
        getGetSyncing: (state: any) => (params?: {
            params: {};
        }) => any;
        getGetLatestBlock: (state: any) => (params?: {
            params: {};
        }) => any;
        getGetBlockByHeight: (state: any) => (params?: {
            params: {};
        }) => any;
        getGetLatestValidatorSet: (state: any) => (params?: {
            params: {};
        }) => any;
        getGetValidatorSetByHeight: (state: any) => (params?: {
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
        ServiceGetNodeInfo({ commit, rootGetters, getters }: {
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
        ServiceGetSyncing({ commit, rootGetters, getters }: {
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
        ServiceGetLatestBlock({ commit, rootGetters, getters }: {
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
        ServiceGetBlockByHeight({ commit, rootGetters, getters }: {
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
        ServiceGetLatestValidatorSet({ commit, rootGetters, getters }: {
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
        ServiceGetValidatorSetByHeight({ commit, rootGetters, getters }: {
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
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map