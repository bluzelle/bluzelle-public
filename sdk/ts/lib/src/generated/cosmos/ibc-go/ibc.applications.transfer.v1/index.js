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
exports.Params = exports.DenomTrace = exports.FungibleTokenPacketData = void 0;
const module_1 = require("./module");
const transfer_1 = require("./module/types/ibc/applications/transfer/v1/transfer");
Object.defineProperty(exports, "FungibleTokenPacketData", { enumerable: true, get: function () { return transfer_1.FungibleTokenPacketData; } });
const transfer_2 = require("./module/types/ibc/applications/transfer/v1/transfer");
Object.defineProperty(exports, "DenomTrace", { enumerable: true, get: function () { return transfer_2.DenomTrace; } });
const transfer_3 = require("./module/types/ibc/applications/transfer/v1/transfer");
Object.defineProperty(exports, "Params", { enumerable: true, get: function () { return transfer_3.Params; } });
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
        DenomTrace: {},
        DenomTraces: {},
        Params: {},
        _Structure: {
            FungibleTokenPacketData: getStructure(transfer_1.FungibleTokenPacketData.fromPartial({})),
            DenomTrace: getStructure(transfer_2.DenomTrace.fromPartial({})),
            Params: getStructure(transfer_3.Params.fromPartial({})),
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
        getDenomTrace: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.DenomTrace[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getDenomTraces: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.DenomTraces[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getParams: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Params[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
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
            console.log('Vuex module: ibc.applications.transfer.v1 initialized!');
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
        QueryDenomTrace({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryDenomTrace(key.hash)).data;
                    commit('QUERY', { query: 'DenomTrace', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryDenomTrace', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getDenomTrace']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryDenomTrace API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryDenomTraces({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryDenomTraces(query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryDenomTraces(Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'DenomTraces', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryDenomTraces', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getDenomTraces']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryDenomTraces API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryParams({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryParams()).data;
                    commit('QUERY', { query: 'Params', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryParams', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getParams']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryParams API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        sendMsgTransfer({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgTransfer(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgTransfer:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgTransfer:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        MsgTransfer({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgTransfer(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgTransfer:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgTransfer:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
    }
};
//# sourceMappingURL=index.js.map