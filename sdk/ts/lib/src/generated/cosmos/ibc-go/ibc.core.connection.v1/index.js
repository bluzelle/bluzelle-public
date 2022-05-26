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
exports.Params = exports.Version = exports.ConnectionPaths = exports.ClientPaths = exports.Counterparty = exports.IdentifiedConnection = exports.ConnectionEnd = void 0;
const module_1 = require("./module");
const connection_1 = require("./module/types/ibc/core/connection/v1/connection");
Object.defineProperty(exports, "ConnectionEnd", { enumerable: true, get: function () { return connection_1.ConnectionEnd; } });
const connection_2 = require("./module/types/ibc/core/connection/v1/connection");
Object.defineProperty(exports, "IdentifiedConnection", { enumerable: true, get: function () { return connection_2.IdentifiedConnection; } });
const connection_3 = require("./module/types/ibc/core/connection/v1/connection");
Object.defineProperty(exports, "Counterparty", { enumerable: true, get: function () { return connection_3.Counterparty; } });
const connection_4 = require("./module/types/ibc/core/connection/v1/connection");
Object.defineProperty(exports, "ClientPaths", { enumerable: true, get: function () { return connection_4.ClientPaths; } });
const connection_5 = require("./module/types/ibc/core/connection/v1/connection");
Object.defineProperty(exports, "ConnectionPaths", { enumerable: true, get: function () { return connection_5.ConnectionPaths; } });
const connection_6 = require("./module/types/ibc/core/connection/v1/connection");
Object.defineProperty(exports, "Version", { enumerable: true, get: function () { return connection_6.Version; } });
const connection_7 = require("./module/types/ibc/core/connection/v1/connection");
Object.defineProperty(exports, "Params", { enumerable: true, get: function () { return connection_7.Params; } });
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
        Connection: {},
        Connections: {},
        ClientConnections: {},
        ConnectionClientState: {},
        ConnectionConsensusState: {},
        _Structure: {
            ConnectionEnd: getStructure(connection_1.ConnectionEnd.fromPartial({})),
            IdentifiedConnection: getStructure(connection_2.IdentifiedConnection.fromPartial({})),
            Counterparty: getStructure(connection_3.Counterparty.fromPartial({})),
            ClientPaths: getStructure(connection_4.ClientPaths.fromPartial({})),
            ConnectionPaths: getStructure(connection_5.ConnectionPaths.fromPartial({})),
            Version: getStructure(connection_6.Version.fromPartial({})),
            Params: getStructure(connection_7.Params.fromPartial({})),
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
        getConnection: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Connection[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getConnections: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Connections[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getClientConnections: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ClientConnections[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getConnectionClientState: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ConnectionClientState[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getConnectionConsensusState: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ConnectionConsensusState[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
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
            console.log('Vuex module: ibc.core.connection.v1 initialized!');
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
        QueryConnection({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryConnection(key.connection_id)).data;
                    commit('QUERY', { query: 'Connection', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryConnection', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getConnection']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryConnection API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryConnections({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryConnections(query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryConnections(Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'Connections', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryConnections', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getConnections']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryConnections API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryClientConnections({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryClientConnections(key.client_id)).data;
                    commit('QUERY', { query: 'ClientConnections', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryClientConnections', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getClientConnections']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryClientConnections API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryConnectionClientState({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryConnectionClientState(key.connection_id)).data;
                    commit('QUERY', { query: 'ConnectionClientState', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryConnectionClientState', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getConnectionClientState']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryConnectionClientState API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryConnectionConsensusState({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryConnectionConsensusState(key.connection_id, key.revision_number, key.revision_height)).data;
                    commit('QUERY', { query: 'ConnectionConsensusState', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryConnectionConsensusState', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getConnectionConsensusState']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryConnectionConsensusState API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
    }
};
//# sourceMappingURL=index.js.map