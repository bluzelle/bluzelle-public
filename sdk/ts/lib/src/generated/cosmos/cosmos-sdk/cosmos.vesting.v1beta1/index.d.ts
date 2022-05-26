import { BaseVestingAccount } from "./module/types/cosmos/vesting/v1beta1/vesting";
import { ContinuousVestingAccount } from "./module/types/cosmos/vesting/v1beta1/vesting";
import { DelayedVestingAccount } from "./module/types/cosmos/vesting/v1beta1/vesting";
import { Period } from "./module/types/cosmos/vesting/v1beta1/vesting";
import { PeriodicVestingAccount } from "./module/types/cosmos/vesting/v1beta1/vesting";
import { PermanentLockedAccount } from "./module/types/cosmos/vesting/v1beta1/vesting";
export { BaseVestingAccount, ContinuousVestingAccount, DelayedVestingAccount, Period, PeriodicVestingAccount, PermanentLockedAccount };
declare const _default: {
    namespaced: boolean;
    state: {
        _Structure: {
            BaseVestingAccount: {
                fields: never[];
            };
            ContinuousVestingAccount: {
                fields: never[];
            };
            DelayedVestingAccount: {
                fields: never[];
            };
            Period: {
                fields: never[];
            };
            PeriodicVestingAccount: {
                fields: never[];
            };
            PermanentLockedAccount: {
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
        sendMsgCreateVestingAccount({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        MsgCreateVestingAccount({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map