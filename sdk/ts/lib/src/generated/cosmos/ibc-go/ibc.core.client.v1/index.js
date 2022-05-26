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
exports.IdentifiedGenesisMetadata = exports.GenesisMetadata = exports.Params = exports.Height = exports.UpgradeProposal = exports.ClientUpdateProposal = exports.ClientConsensusStates = exports.ConsensusStateWithHeight = exports.IdentifiedClientState = void 0;
const module_1 = require("./module");
const client_1 = require("./module/types/ibc/core/client/v1/client");
Object.defineProperty(exports, "IdentifiedClientState", { enumerable: true, get: function () { return client_1.IdentifiedClientState; } });
const client_2 = require("./module/types/ibc/core/client/v1/client");
Object.defineProperty(exports, "ConsensusStateWithHeight", { enumerable: true, get: function () { return client_2.ConsensusStateWithHeight; } });
const client_3 = require("./module/types/ibc/core/client/v1/client");
Object.defineProperty(exports, "ClientConsensusStates", { enumerable: true, get: function () { return client_3.ClientConsensusStates; } });
const client_4 = require("./module/types/ibc/core/client/v1/client");
Object.defineProperty(exports, "ClientUpdateProposal", { enumerable: true, get: function () { return client_4.ClientUpdateProposal; } });
const client_5 = require("./module/types/ibc/core/client/v1/client");
Object.defineProperty(exports, "UpgradeProposal", { enumerable: true, get: function () { return client_5.UpgradeProposal; } });
const client_6 = require("./module/types/ibc/core/client/v1/client");
Object.defineProperty(exports, "Height", { enumerable: true, get: function () { return client_6.Height; } });
const client_7 = require("./module/types/ibc/core/client/v1/client");
Object.defineProperty(exports, "Params", { enumerable: true, get: function () { return client_7.Params; } });
const genesis_1 = require("./module/types/ibc/core/client/v1/genesis");
Object.defineProperty(exports, "GenesisMetadata", { enumerable: true, get: function () { return genesis_1.GenesisMetadata; } });
const genesis_2 = require("./module/types/ibc/core/client/v1/genesis");
Object.defineProperty(exports, "IdentifiedGenesisMetadata", { enumerable: true, get: function () { return genesis_2.IdentifiedGenesisMetadata; } });
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
        ClientState: {},
        ClientStates: {},
        ConsensusState: {},
        ConsensusStates: {},
        ClientStatus: {},
        ClientParams: {},
        UpgradedClientState: {},
        UpgradedConsensusState: {},
        _Structure: {
            IdentifiedClientState: getStructure(client_1.IdentifiedClientState.fromPartial({})),
            ConsensusStateWithHeight: getStructure(client_2.ConsensusStateWithHeight.fromPartial({})),
            ClientConsensusStates: getStructure(client_3.ClientConsensusStates.fromPartial({})),
            ClientUpdateProposal: getStructure(client_4.ClientUpdateProposal.fromPartial({})),
            UpgradeProposal: getStructure(client_5.UpgradeProposal.fromPartial({})),
            Height: getStructure(client_6.Height.fromPartial({})),
            Params: getStructure(client_7.Params.fromPartial({})),
            GenesisMetadata: getStructure(genesis_1.GenesisMetadata.fromPartial({})),
            IdentifiedGenesisMetadata: getStructure(genesis_2.IdentifiedGenesisMetadata.fromPartial({})),
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
        getClientState: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ClientState[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getClientStates: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ClientStates[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getConsensusState: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ConsensusState[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getConsensusStates: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ConsensusStates[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getClientStatus: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ClientStatus[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getClientParams: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ClientParams[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getUpgradedClientState: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.UpgradedClientState[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getUpgradedConsensusState: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.UpgradedConsensusState[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
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
            console.log('Vuex module: ibc.core.client.v1 initialized!');
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
        QueryClientState({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryClientState(key.client_id)).data;
                    commit('QUERY', { query: 'ClientState', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryClientState', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getClientState']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryClientState API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryClientStates({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryClientStates(query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryClientStates(Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'ClientStates', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryClientStates', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getClientStates']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryClientStates API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryConsensusState({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryConsensusState(key.client_id, key.revision_number, key.revision_height, query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryConsensusState(key.client_id, key.revision_number, key.revision_height, Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'ConsensusState', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryConsensusState', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getConsensusState']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryConsensusState API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryConsensusStates({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryConsensusStates(key.client_id, query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryConsensusStates(key.client_id, Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'ConsensusStates', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryConsensusStates', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getConsensusStates']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryConsensusStates API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryClientStatus({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryClientStatus(key.client_id)).data;
                    commit('QUERY', { query: 'ClientStatus', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryClientStatus', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getClientStatus']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryClientStatus API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryClientParams({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryClientParams()).data;
                    commit('QUERY', { query: 'ClientParams', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryClientParams', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getClientParams']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryClientParams API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryUpgradedClientState({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryUpgradedClientState()).data;
                    commit('QUERY', { query: 'UpgradedClientState', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryUpgradedClientState', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getUpgradedClientState']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryUpgradedClientState API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryUpgradedConsensusState({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryUpgradedConsensusState()).data;
                    commit('QUERY', { query: 'UpgradedConsensusState', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryUpgradedConsensusState', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getUpgradedConsensusState']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryUpgradedConsensusState API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
    }
};
//# sourceMappingURL=index.js.map