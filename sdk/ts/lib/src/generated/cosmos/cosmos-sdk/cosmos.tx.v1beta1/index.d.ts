import { Tx } from "./module/types/cosmos/tx/v1beta1/tx";
import { TxRaw } from "./module/types/cosmos/tx/v1beta1/tx";
import { SignDoc } from "./module/types/cosmos/tx/v1beta1/tx";
import { TxBody } from "./module/types/cosmos/tx/v1beta1/tx";
import { AuthInfo } from "./module/types/cosmos/tx/v1beta1/tx";
import { SignerInfo } from "./module/types/cosmos/tx/v1beta1/tx";
import { ModeInfo } from "./module/types/cosmos/tx/v1beta1/tx";
import { ModeInfo_Single } from "./module/types/cosmos/tx/v1beta1/tx";
import { ModeInfo_Multi } from "./module/types/cosmos/tx/v1beta1/tx";
import { Fee } from "./module/types/cosmos/tx/v1beta1/tx";
export { Tx, TxRaw, SignDoc, TxBody, AuthInfo, SignerInfo, ModeInfo, ModeInfo_Single, ModeInfo_Multi, Fee };
declare const _default: {
    namespaced: boolean;
    state: {
        Simulate: {};
        GetTx: {};
        BroadcastTx: {};
        GetTxsEvent: {};
        _Structure: {
            Tx: {
                fields: never[];
            };
            TxRaw: {
                fields: never[];
            };
            SignDoc: {
                fields: never[];
            };
            TxBody: {
                fields: never[];
            };
            AuthInfo: {
                fields: never[];
            };
            SignerInfo: {
                fields: never[];
            };
            ModeInfo: {
                fields: never[];
            };
            ModeInfo_Single: {
                fields: never[];
            };
            ModeInfo_Multi: {
                fields: never[];
            };
            Fee: {
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
        getSimulate: (state: any) => (params?: {
            params: {};
        }) => any;
        getGetTx: (state: any) => (params?: {
            params: {};
        }) => any;
        getBroadcastTx: (state: any) => (params?: {
            params: {};
        }) => any;
        getGetTxsEvent: (state: any) => (params?: {
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
        ServiceSimulate({ commit, rootGetters, getters }: {
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
        ServiceGetTx({ commit, rootGetters, getters }: {
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
        ServiceBroadcastTx({ commit, rootGetters, getters }: {
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
        ServiceGetTxsEvent({ commit, rootGetters, getters }: {
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