import { SigningInfo } from "./module/types/cosmos/slashing/v1beta1/genesis";
import { ValidatorMissedBlocks } from "./module/types/cosmos/slashing/v1beta1/genesis";
import { MissedBlock } from "./module/types/cosmos/slashing/v1beta1/genesis";
import { ValidatorSigningInfo } from "./module/types/cosmos/slashing/v1beta1/slashing";
import { Params } from "./module/types/cosmos/slashing/v1beta1/slashing";
export { SigningInfo, ValidatorMissedBlocks, MissedBlock, ValidatorSigningInfo, Params };
declare const _default: {
    namespaced: boolean;
    state: {
        Params: {};
        SigningInfo: {};
        SigningInfos: {};
        _Structure: {
            SigningInfo: {
                fields: never[];
            };
            ValidatorMissedBlocks: {
                fields: never[];
            };
            MissedBlock: {
                fields: never[];
            };
            ValidatorSigningInfo: {
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
        getSigningInfo: (state: any) => (params?: {
            params: {};
        }) => any;
        getSigningInfos: (state: any) => (params?: {
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
        QuerySigningInfo({ commit, rootGetters, getters }: {
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
        QuerySigningInfos({ commit, rootGetters, getters }: {
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
        sendMsgUnjail({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        MsgUnjail({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map