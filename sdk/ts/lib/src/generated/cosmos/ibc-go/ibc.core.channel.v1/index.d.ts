import { Channel } from "./module/types/ibc/core/channel/v1/channel";
import { IdentifiedChannel } from "./module/types/ibc/core/channel/v1/channel";
import { Counterparty } from "./module/types/ibc/core/channel/v1/channel";
import { Packet } from "./module/types/ibc/core/channel/v1/channel";
import { PacketState } from "./module/types/ibc/core/channel/v1/channel";
import { Acknowledgement } from "./module/types/ibc/core/channel/v1/channel";
import { PacketSequence } from "./module/types/ibc/core/channel/v1/genesis";
export { Channel, IdentifiedChannel, Counterparty, Packet, PacketState, Acknowledgement, PacketSequence };
declare const _default: {
    namespaced: boolean;
    state: {
        Channel: {};
        Channels: {};
        ConnectionChannels: {};
        ChannelClientState: {};
        ChannelConsensusState: {};
        PacketCommitment: {};
        PacketCommitments: {};
        PacketReceipt: {};
        PacketAcknowledgement: {};
        PacketAcknowledgements: {};
        UnreceivedPackets: {};
        UnreceivedAcks: {};
        NextSequenceReceive: {};
        _Structure: {
            Channel: {
                fields: never[];
            };
            IdentifiedChannel: {
                fields: never[];
            };
            Counterparty: {
                fields: never[];
            };
            Packet: {
                fields: never[];
            };
            PacketState: {
                fields: never[];
            };
            Acknowledgement: {
                fields: never[];
            };
            PacketSequence: {
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
        getChannel: (state: any) => (params?: {
            params: {};
        }) => any;
        getChannels: (state: any) => (params?: {
            params: {};
        }) => any;
        getConnectionChannels: (state: any) => (params?: {
            params: {};
        }) => any;
        getChannelClientState: (state: any) => (params?: {
            params: {};
        }) => any;
        getChannelConsensusState: (state: any) => (params?: {
            params: {};
        }) => any;
        getPacketCommitment: (state: any) => (params?: {
            params: {};
        }) => any;
        getPacketCommitments: (state: any) => (params?: {
            params: {};
        }) => any;
        getPacketReceipt: (state: any) => (params?: {
            params: {};
        }) => any;
        getPacketAcknowledgement: (state: any) => (params?: {
            params: {};
        }) => any;
        getPacketAcknowledgements: (state: any) => (params?: {
            params: {};
        }) => any;
        getUnreceivedPackets: (state: any) => (params?: {
            params: {};
        }) => any;
        getUnreceivedAcks: (state: any) => (params?: {
            params: {};
        }) => any;
        getNextSequenceReceive: (state: any) => (params?: {
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
        QueryChannel({ commit, rootGetters, getters }: {
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
        QueryChannels({ commit, rootGetters, getters }: {
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
        QueryConnectionChannels({ commit, rootGetters, getters }: {
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
        QueryChannelClientState({ commit, rootGetters, getters }: {
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
        QueryChannelConsensusState({ commit, rootGetters, getters }: {
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
        QueryPacketCommitment({ commit, rootGetters, getters }: {
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
        QueryPacketCommitments({ commit, rootGetters, getters }: {
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
        QueryPacketReceipt({ commit, rootGetters, getters }: {
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
        QueryPacketAcknowledgement({ commit, rootGetters, getters }: {
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
        QueryPacketAcknowledgements({ commit, rootGetters, getters }: {
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
        QueryUnreceivedPackets({ commit, rootGetters, getters }: {
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
        QueryUnreceivedAcks({ commit, rootGetters, getters }: {
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
        QueryNextSequenceReceive({ commit, rootGetters, getters }: {
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