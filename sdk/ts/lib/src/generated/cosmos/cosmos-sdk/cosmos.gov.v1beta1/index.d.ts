import { WeightedVoteOption } from "./module/types/cosmos/gov/v1beta1/gov";
import { TextProposal } from "./module/types/cosmos/gov/v1beta1/gov";
import { Deposit } from "./module/types/cosmos/gov/v1beta1/gov";
import { Proposal } from "./module/types/cosmos/gov/v1beta1/gov";
import { TallyResult } from "./module/types/cosmos/gov/v1beta1/gov";
import { Vote } from "./module/types/cosmos/gov/v1beta1/gov";
import { DepositParams } from "./module/types/cosmos/gov/v1beta1/gov";
import { VotingParams } from "./module/types/cosmos/gov/v1beta1/gov";
import { TallyParams } from "./module/types/cosmos/gov/v1beta1/gov";
export { WeightedVoteOption, TextProposal, Deposit, Proposal, TallyResult, Vote, DepositParams, VotingParams, TallyParams };
declare const _default: {
    namespaced: boolean;
    state: {
        Proposal: {};
        Proposals: {};
        Vote: {};
        Votes: {};
        Params: {};
        Deposit: {};
        Deposits: {};
        TallyResult: {};
        _Structure: {
            WeightedVoteOption: {
                fields: never[];
            };
            TextProposal: {
                fields: never[];
            };
            Deposit: {
                fields: never[];
            };
            Proposal: {
                fields: never[];
            };
            TallyResult: {
                fields: never[];
            };
            Vote: {
                fields: never[];
            };
            DepositParams: {
                fields: never[];
            };
            VotingParams: {
                fields: never[];
            };
            TallyParams: {
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
        getProposal: (state: any) => (params?: {
            params: {};
        }) => any;
        getProposals: (state: any) => (params?: {
            params: {};
        }) => any;
        getVote: (state: any) => (params?: {
            params: {};
        }) => any;
        getVotes: (state: any) => (params?: {
            params: {};
        }) => any;
        getParams: (state: any) => (params?: {
            params: {};
        }) => any;
        getDeposit: (state: any) => (params?: {
            params: {};
        }) => any;
        getDeposits: (state: any) => (params?: {
            params: {};
        }) => any;
        getTallyResult: (state: any) => (params?: {
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
        QueryProposal({ commit, rootGetters, getters }: {
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
        QueryProposals({ commit, rootGetters, getters }: {
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
        QueryVote({ commit, rootGetters, getters }: {
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
        QueryVotes({ commit, rootGetters, getters }: {
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
        QueryDeposit({ commit, rootGetters, getters }: {
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
        QueryDeposits({ commit, rootGetters, getters }: {
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
        QueryTallyResult({ commit, rootGetters, getters }: {
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
        sendMsgVoteWeighted({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        sendMsgVote({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        sendMsgSubmitProposal({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        sendMsgDeposit({ rootGetters }: {
            rootGetters: any;
        }, { value, fee, memo }: {
            value: any;
            fee?: never[] | undefined;
            memo?: string | undefined;
        }): Promise<any>;
        MsgVoteWeighted({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
        MsgVote({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
        MsgSubmitProposal({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
        MsgDeposit({ rootGetters }: {
            rootGetters: any;
        }, { value }: {
            value: any;
        }): Promise<import("@cosmjs/proto-signing").EncodeObject>;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map