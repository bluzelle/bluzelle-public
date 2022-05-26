import { IdentifiedClientState } from "./module/types/ibc/core/client/v1/client";
import { ConsensusStateWithHeight } from "./module/types/ibc/core/client/v1/client";
import { ClientConsensusStates } from "./module/types/ibc/core/client/v1/client";
import { ClientUpdateProposal } from "./module/types/ibc/core/client/v1/client";
import { UpgradeProposal } from "./module/types/ibc/core/client/v1/client";
import { Height } from "./module/types/ibc/core/client/v1/client";
import { Params } from "./module/types/ibc/core/client/v1/client";
import { GenesisMetadata } from "./module/types/ibc/core/client/v1/genesis";
import { IdentifiedGenesisMetadata } from "./module/types/ibc/core/client/v1/genesis";
export { IdentifiedClientState, ConsensusStateWithHeight, ClientConsensusStates, ClientUpdateProposal, UpgradeProposal, Height, Params, GenesisMetadata, IdentifiedGenesisMetadata };
declare const _default: {
    namespaced: boolean;
    state: {
        ClientState: {};
        ClientStates: {};
        ConsensusState: {};
        ConsensusStates: {};
        ClientStatus: {};
        ClientParams: {};
        UpgradedClientState: {};
        UpgradedConsensusState: {};
        _Structure: {
            IdentifiedClientState: {
                fields: never[];
            };
            ConsensusStateWithHeight: {
                fields: never[];
            };
            ClientConsensusStates: {
                fields: never[];
            };
            ClientUpdateProposal: {
                fields: never[];
            };
            UpgradeProposal: {
                fields: never[];
            };
            Height: {
                fields: never[];
            };
            Params: {
                fields: never[];
            };
            GenesisMetadata: {
                fields: never[];
            };
            IdentifiedGenesisMetadata: {
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
        getClientState: (state: any) => (params?: {
            params: {};
        }) => any;
        getClientStates: (state: any) => (params?: {
            params: {};
        }) => any;
        getConsensusState: (state: any) => (params?: {
            params: {};
        }) => any;
        getConsensusStates: (state: any) => (params?: {
            params: {};
        }) => any;
        getClientStatus: (state: any) => (params?: {
            params: {};
        }) => any;
        getClientParams: (state: any) => (params?: {
            params: {};
        }) => any;
        getUpgradedClientState: (state: any) => (params?: {
            params: {};
        }) => any;
        getUpgradedConsensusState: (state: any) => (params?: {
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
        QueryClientState({ commit, rootGetters, getters }: {
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
        QueryClientStates({ commit, rootGetters, getters }: {
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
        QueryConsensusState({ commit, rootGetters, getters }: {
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
        QueryConsensusStates({ commit, rootGetters, getters }: {
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
        QueryClientStatus({ commit, rootGetters, getters }: {
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
        QueryClientParams({ commit, rootGetters, getters }: {
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
        QueryUpgradedClientState({ commit, rootGetters, getters }: {
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
        QueryUpgradedConsensusState({ commit, rootGetters, getters }: {
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