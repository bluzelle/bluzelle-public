import { Plan } from "./module/types/cosmos/upgrade/v1beta1/upgrade";
import { SoftwareUpgradeProposal } from "./module/types/cosmos/upgrade/v1beta1/upgrade";
import { CancelSoftwareUpgradeProposal } from "./module/types/cosmos/upgrade/v1beta1/upgrade";
import { ModuleVersion } from "./module/types/cosmos/upgrade/v1beta1/upgrade";
export { Plan, SoftwareUpgradeProposal, CancelSoftwareUpgradeProposal, ModuleVersion };
declare const _default: {
    namespaced: boolean;
    state: {
        CurrentPlan: {};
        AppliedPlan: {};
        UpgradedConsensusState: {};
        ModuleVersions: {};
        _Structure: {
            Plan: {
                fields: never[];
            };
            SoftwareUpgradeProposal: {
                fields: never[];
            };
            CancelSoftwareUpgradeProposal: {
                fields: never[];
            };
            ModuleVersion: {
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
        getCurrentPlan: (state: any) => (params?: {
            params: {};
        }) => any;
        getAppliedPlan: (state: any) => (params?: {
            params: {};
        }) => any;
        getUpgradedConsensusState: (state: any) => (params?: {
            params: {};
        }) => any;
        getModuleVersions: (state: any) => (params?: {
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
        QueryCurrentPlan({ commit, rootGetters, getters }: {
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
        QueryAppliedPlan({ commit, rootGetters, getters }: {
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
        QueryModuleVersions({ commit, rootGetters, getters }: {
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