import { Minter } from "./module/types/cosmos/mint/v1beta1/mint";
import { Params } from "./module/types/cosmos/mint/v1beta1/mint";
export { Minter, Params };
declare const _default: {
    namespaced: boolean;
    state: {
        Params: {};
        Inflation: {};
        AnnualProvisions: {};
        _Structure: {
            Minter: {
                fields: never[];
            };
            Params: {
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
        getInflation: (state: any) => (params?: {
            params: {};
        }) => any;
        getAnnualProvisions: (state: any) => (params?: {
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
        QueryInflation({ commit, rootGetters, getters }: {
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
        QueryAnnualProvisions({ commit, rootGetters, getters }: {
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