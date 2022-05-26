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
exports.Module = exports.VersionInfo = exports.Validator = void 0;
const module_1 = require("./module");
const query_1 = require("./module/types/cosmos/base/tendermint/v1beta1/query");
Object.defineProperty(exports, "Validator", { enumerable: true, get: function () { return query_1.Validator; } });
const query_2 = require("./module/types/cosmos/base/tendermint/v1beta1/query");
Object.defineProperty(exports, "VersionInfo", { enumerable: true, get: function () { return query_2.VersionInfo; } });
const query_3 = require("./module/types/cosmos/base/tendermint/v1beta1/query");
Object.defineProperty(exports, "Module", { enumerable: true, get: function () { return query_3.Module; } });
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
        GetNodeInfo: {},
        GetSyncing: {},
        GetLatestBlock: {},
        GetBlockByHeight: {},
        GetLatestValidatorSet: {},
        GetValidatorSetByHeight: {},
        _Structure: {
            Validator: getStructure(query_1.Validator.fromPartial({})),
            VersionInfo: getStructure(query_2.VersionInfo.fromPartial({})),
            Module: getStructure(query_3.Module.fromPartial({})),
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
        getGetNodeInfo: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.GetNodeInfo[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getGetSyncing: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.GetSyncing[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getGetLatestBlock: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.GetLatestBlock[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getGetBlockByHeight: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.GetBlockByHeight[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getGetLatestValidatorSet: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.GetLatestValidatorSet[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getGetValidatorSetByHeight: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.GetValidatorSetByHeight[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
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
            console.log('Vuex module: cosmos.base.tendermint.v1beta1 initialized!');
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
        ServiceGetNodeInfo({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.serviceGetNodeInfo()).data;
                    commit('QUERY', { query: 'GetNodeInfo', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'ServiceGetNodeInfo', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getGetNodeInfo']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:ServiceGetNodeInfo API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        ServiceGetSyncing({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.serviceGetSyncing()).data;
                    commit('QUERY', { query: 'GetSyncing', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'ServiceGetSyncing', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getGetSyncing']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:ServiceGetSyncing API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        ServiceGetLatestBlock({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.serviceGetLatestBlock()).data;
                    commit('QUERY', { query: 'GetLatestBlock', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'ServiceGetLatestBlock', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getGetLatestBlock']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:ServiceGetLatestBlock API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        ServiceGetBlockByHeight({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.serviceGetBlockByHeight(key.height)).data;
                    commit('QUERY', { query: 'GetBlockByHeight', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'ServiceGetBlockByHeight', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getGetBlockByHeight']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:ServiceGetBlockByHeight API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        ServiceGetLatestValidatorSet({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.serviceGetLatestValidatorSet(query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.serviceGetLatestValidatorSet(Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'GetLatestValidatorSet', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'ServiceGetLatestValidatorSet', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getGetLatestValidatorSet']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:ServiceGetLatestValidatorSet API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        ServiceGetValidatorSetByHeight({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.serviceGetValidatorSetByHeight(key.height, query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.serviceGetValidatorSetByHeight(key.height, Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'GetValidatorSetByHeight', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'ServiceGetValidatorSetByHeight', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getGetValidatorSetByHeight']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:ServiceGetValidatorSetByHeight API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
    }
};
//# sourceMappingURL=index.js.map