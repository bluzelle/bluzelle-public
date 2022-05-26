"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketSequence = exports.Acknowledgement = exports.PacketState = exports.Packet = exports.Counterparty = exports.IdentifiedChannel = exports.Channel = void 0;
const module_1 = require("./module");
const channel_1 = require("./module/types/ibc/core/channel/v1/channel");
Object.defineProperty(exports, "Channel", { enumerable: true, get: function () { return channel_1.Channel; } });
const channel_2 = require("./module/types/ibc/core/channel/v1/channel");
Object.defineProperty(exports, "IdentifiedChannel", { enumerable: true, get: function () { return channel_2.IdentifiedChannel; } });
const channel_3 = require("./module/types/ibc/core/channel/v1/channel");
Object.defineProperty(exports, "Counterparty", { enumerable: true, get: function () { return channel_3.Counterparty; } });
const channel_4 = require("./module/types/ibc/core/channel/v1/channel");
Object.defineProperty(exports, "Packet", { enumerable: true, get: function () { return channel_4.Packet; } });
const channel_5 = require("./module/types/ibc/core/channel/v1/channel");
Object.defineProperty(exports, "PacketState", { enumerable: true, get: function () { return channel_5.PacketState; } });
const channel_6 = require("./module/types/ibc/core/channel/v1/channel");
Object.defineProperty(exports, "Acknowledgement", { enumerable: true, get: function () { return channel_6.Acknowledgement; } });
const genesis_1 = require("./module/types/ibc/core/channel/v1/genesis");
Object.defineProperty(exports, "PacketSequence", { enumerable: true, get: function () { return genesis_1.PacketSequence; } });
function initTxClient(vuexGetters) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, module_1.txClient)(vuexGetters['common/wallet/signer'], {
            addr: vuexGetters['common/env/apiTendermint']
        });
    });
}
function initQueryClient(vuexGetters) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, module_1.queryClient)({
            addr: vuexGetters['common/env/apiCosmos']
        });
    });
}
function mergeResults(value, next_values) {
    for (let prop of Object.keys(next_values)) {
        if (Array.isArray(next_values[prop])) {
            value[prop] = [...value[prop], ...next_values[prop]];
        }
        else {
            value[prop] = next_values[prop];
        }
    }
    return value;
}
function getStructure(template) {
    let structure = { fields: [] };
    for (const [key, value] of Object.entries(template)) {
        let field = {};
        field.name = key;
        field.type = typeof value;
        structure.fields.push(field);
    }
    return structure;
}
const getDefaultState = () => {
    return {
        Channel: {},
        Channels: {},
        ConnectionChannels: {},
        ChannelClientState: {},
        ChannelConsensusState: {},
        PacketCommitment: {},
        PacketCommitments: {},
        PacketReceipt: {},
        PacketAcknowledgement: {},
        PacketAcknowledgements: {},
        UnreceivedPackets: {},
        UnreceivedAcks: {},
        NextSequenceReceive: {},
        _Structure: {
            Channel: getStructure(channel_1.Channel.fromPartial({})),
            IdentifiedChannel: getStructure(channel_2.IdentifiedChannel.fromPartial({})),
            Counterparty: getStructure(channel_3.Counterparty.fromPartial({})),
            Packet: getStructure(channel_4.Packet.fromPartial({})),
            PacketState: getStructure(channel_5.PacketState.fromPartial({})),
            Acknowledgement: getStructure(channel_6.Acknowledgement.fromPartial({})),
            PacketSequence: getStructure(genesis_1.PacketSequence.fromPartial({})),
        },
        _Registry: module_1.registry,
        _Subscriptions: new Set(),
    };
};
// initial state
const state = getDefaultState();
exports.default = {
    namespaced: true,
    state,
    mutations: {
        RESET_STATE(state) {
            Object.assign(state, getDefaultState());
        },
        QUERY(state, { query, key, value }) {
            state[query][JSON.stringify(key)] = value;
        },
        SUBSCRIBE(state, subscription) {
            state._Subscriptions.add(JSON.stringify(subscription));
        },
        UNSUBSCRIBE(state, subscription) {
            state._Subscriptions.delete(JSON.stringify(subscription));
        }
    },
    getters: {
        getChannel: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Channel[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getChannels: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Channels[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getConnectionChannels: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ConnectionChannels[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getChannelClientState: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ChannelClientState[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getChannelConsensusState: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ChannelConsensusState[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getPacketCommitment: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.PacketCommitment[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getPacketCommitments: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.PacketCommitments[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getPacketReceipt: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.PacketReceipt[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getPacketAcknowledgement: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.PacketAcknowledgement[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getPacketAcknowledgements: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.PacketAcknowledgements[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getUnreceivedPackets: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.UnreceivedPackets[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getUnreceivedAcks: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.UnreceivedAcks[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getNextSequenceReceive: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.NextSequenceReceive[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getTypeStructure: (state) => (type) => {
            return state._Structure[type].fields;
        },
        getRegistry: (state) => {
            return state._Registry;
        }
    },
    actions: {
        init({ dispatch, rootGetters }) {
            console.log('Vuex module: ibc.core.channel.v1 initialized!');
            if (rootGetters['common/env/client']) {
                rootGetters['common/env/client'].on('newblock', () => {
                    dispatch('StoreUpdate');
                });
            }
        },
        resetState({ commit }) {
            commit('RESET_STATE');
        },
        unsubscribe({ commit }, subscription) {
            commit('UNSUBSCRIBE', subscription);
        },
        StoreUpdate({ state, dispatch }) {
            return __awaiter(this, void 0, void 0, function* () {
                state._Subscriptions.forEach((subscription) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const sub = JSON.parse(subscription);
                        yield dispatch(sub.action, sub.payload);
                    }
                    catch (e) {
                        throw new Error('Subscriptions: ' + e.message);
                    }
                }));
            });
        },
        QueryChannel({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryChannel(key.channel_id, key.port_id)).data;
                    commit('QUERY', { query: 'Channel', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryChannel', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getChannel']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryChannel API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryChannels({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryChannels(query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryChannels(Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'Channels', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryChannels', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getChannels']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryChannels API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryConnectionChannels({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryConnectionChannels(key.connection, query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryConnectionChannels(key.connection, Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'ConnectionChannels', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryConnectionChannels', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getConnectionChannels']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryConnectionChannels API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryChannelClientState({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryChannelClientState(key.channel_id, key.port_id)).data;
                    commit('QUERY', { query: 'ChannelClientState', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryChannelClientState', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getChannelClientState']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryChannelClientState API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryChannelConsensusState({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryChannelConsensusState(key.channel_id, key.port_id, key.revision_number, key.revision_height)).data;
                    commit('QUERY', { query: 'ChannelConsensusState', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryChannelConsensusState', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getChannelConsensusState']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryChannelConsensusState API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryPacketCommitment({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryPacketCommitment(key.channel_id, key.port_id, key.sequence)).data;
                    commit('QUERY', { query: 'PacketCommitment', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryPacketCommitment', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getPacketCommitment']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryPacketCommitment API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryPacketCommitments({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryPacketCommitments(key.channel_id, key.port_id, query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryPacketCommitments(key.channel_id, key.port_id, Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'PacketCommitments', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryPacketCommitments', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getPacketCommitments']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryPacketCommitments API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryPacketReceipt({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryPacketReceipt(key.channel_id, key.port_id, key.sequence)).data;
                    commit('QUERY', { query: 'PacketReceipt', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryPacketReceipt', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getPacketReceipt']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryPacketReceipt API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryPacketAcknowledgement({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryPacketAcknowledgement(key.channel_id, key.port_id, key.sequence)).data;
                    commit('QUERY', { query: 'PacketAcknowledgement', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryPacketAcknowledgement', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getPacketAcknowledgement']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryPacketAcknowledgement API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryPacketAcknowledgements({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryPacketAcknowledgements(key.channel_id, key.port_id, query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryPacketAcknowledgements(key.channel_id, key.port_id, Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'PacketAcknowledgements', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryPacketAcknowledgements', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getPacketAcknowledgements']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryPacketAcknowledgements API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryUnreceivedPackets({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryUnreceivedPackets(key.channel_id, key.port_id, key.packet_commitment_sequences)).data;
                    commit('QUERY', { query: 'UnreceivedPackets', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryUnreceivedPackets', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getUnreceivedPackets']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryUnreceivedPackets API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryUnreceivedAcks({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryUnreceivedAcks(key.channel_id, key.port_id, key.packet_ack_sequences)).data;
                    commit('QUERY', { query: 'UnreceivedAcks', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryUnreceivedAcks', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getUnreceivedAcks']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryUnreceivedAcks API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryNextSequenceReceive({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryNextSequenceReceive(key.channel_id, key.port_id)).data;
                    commit('QUERY', { query: 'NextSequenceReceive', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryNextSequenceReceive', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getNextSequenceReceive']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryNextSequenceReceive API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
    }
};
//# sourceMappingURL=index.js.map