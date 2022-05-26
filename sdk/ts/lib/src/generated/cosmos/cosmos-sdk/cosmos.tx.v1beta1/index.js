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
exports.Fee = exports.ModeInfo_Multi = exports.ModeInfo_Single = exports.ModeInfo = exports.SignerInfo = exports.AuthInfo = exports.TxBody = exports.SignDoc = exports.TxRaw = exports.Tx = void 0;
const module_1 = require("./module");
const tx_1 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "Tx", { enumerable: true, get: function () { return tx_1.Tx; } });
const tx_2 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "TxRaw", { enumerable: true, get: function () { return tx_2.TxRaw; } });
const tx_3 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "SignDoc", { enumerable: true, get: function () { return tx_3.SignDoc; } });
const tx_4 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "TxBody", { enumerable: true, get: function () { return tx_4.TxBody; } });
const tx_5 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "AuthInfo", { enumerable: true, get: function () { return tx_5.AuthInfo; } });
const tx_6 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "SignerInfo", { enumerable: true, get: function () { return tx_6.SignerInfo; } });
const tx_7 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "ModeInfo", { enumerable: true, get: function () { return tx_7.ModeInfo; } });
const tx_8 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "ModeInfo_Single", { enumerable: true, get: function () { return tx_8.ModeInfo_Single; } });
const tx_9 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "ModeInfo_Multi", { enumerable: true, get: function () { return tx_9.ModeInfo_Multi; } });
const tx_10 = require("./module/types/cosmos/tx/v1beta1/tx");
Object.defineProperty(exports, "Fee", { enumerable: true, get: function () { return tx_10.Fee; } });
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
        Simulate: {},
        GetTx: {},
        BroadcastTx: {},
        GetTxsEvent: {},
        _Structure: {
            Tx: getStructure(tx_1.Tx.fromPartial({})),
            TxRaw: getStructure(tx_2.TxRaw.fromPartial({})),
            SignDoc: getStructure(tx_3.SignDoc.fromPartial({})),
            TxBody: getStructure(tx_4.TxBody.fromPartial({})),
            AuthInfo: getStructure(tx_5.AuthInfo.fromPartial({})),
            SignerInfo: getStructure(tx_6.SignerInfo.fromPartial({})),
            ModeInfo: getStructure(tx_7.ModeInfo.fromPartial({})),
            ModeInfo_Single: getStructure(tx_8.ModeInfo_Single.fromPartial({})),
            ModeInfo_Multi: getStructure(tx_9.ModeInfo_Multi.fromPartial({})),
            Fee: getStructure(tx_10.Fee.fromPartial({})),
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
        getSimulate: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Simulate[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getGetTx: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.GetTx[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getBroadcastTx: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.BroadcastTx[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getGetTxsEvent: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.GetTxsEvent[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
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
            console.log('Vuex module: cosmos.tx.v1beta1 initialized!');
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
        ServiceSimulate({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.serviceSimulate(Object.assign({}, key))).data;
                    commit('QUERY', { query: 'Simulate', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'ServiceSimulate', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getSimulate']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:ServiceSimulate API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        ServiceGetTx({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.serviceGetTx(key.hash)).data;
                    commit('QUERY', { query: 'GetTx', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'ServiceGetTx', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getGetTx']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:ServiceGetTx API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        ServiceBroadcastTx({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.serviceBroadcastTx(Object.assign({}, key))).data;
                    commit('QUERY', { query: 'BroadcastTx', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'ServiceBroadcastTx', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getBroadcastTx']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:ServiceBroadcastTx API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        ServiceGetTxsEvent({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.serviceGetTxsEvent(query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.serviceGetTxsEvent(Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'GetTxsEvent', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'ServiceGetTxsEvent', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getGetTxsEvent']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:ServiceGetTxsEvent API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
    }
};
//# sourceMappingURL=index.js.map