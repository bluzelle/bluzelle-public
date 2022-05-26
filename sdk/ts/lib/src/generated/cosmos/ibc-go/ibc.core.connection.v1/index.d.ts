import { ConnectionEnd } from "./module/types/ibc/core/connection/v1/connection";
import { IdentifiedConnection } from "./module/types/ibc/core/connection/v1/connection";
import { Counterparty } from "./module/types/ibc/core/connection/v1/connection";
import { ClientPaths } from "./module/types/ibc/core/connection/v1/connection";
import { ConnectionPaths } from "./module/types/ibc/core/connection/v1/connection";
import { Version } from "./module/types/ibc/core/connection/v1/connection";
import { Params } from "./module/types/ibc/core/connection/v1/connection";
export { ConnectionEnd, IdentifiedConnection, Counterparty, ClientPaths, ConnectionPaths, Version, Params };
declare const _default: {
    namespaced: boolean;
    state: {
        Connection: {};
        Connections: {};
        ClientConnections: {};
        ConnectionClientState: {};
        ConnectionConsensusState: {};
        _Structure: {
            ConnectionEnd: {
                fields: never[];
            };
            IdentifiedConnection: {
                fields: never[];
            };
            Counterparty: {
                fields: never[];
            };
            ClientPaths: {
                fields: never[];
            };
            ConnectionPaths: {
                fields: never[];
            };
            Version: {
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
        getConnection: (state: any) => (params?: {
            params: {};
        }) => any;
        getConnections: (state: any) => (params?: {
            params: {};
        }) => any;
        getClientConnections: (state: any) => (params?: {
            params: {};
        }) => any;
        getConnectionClientState: (state: any) => (params?: {
            params: {};
        }) => any;
        getConnectionConsensusState: (state: any) => (params?: {
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
        QueryConnection({ commit, rootGetters, getters }: {
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
        QueryConnections({ commit, rootGetters, getters }: {
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
        QueryClientConnections({ commit, rootGetters, getters }: {
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
        QueryConnectionClientState({ commit, rootGetters, getters }: {
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
        QueryConnectionConsensusState({ commit, rootGetters, getters }: {
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