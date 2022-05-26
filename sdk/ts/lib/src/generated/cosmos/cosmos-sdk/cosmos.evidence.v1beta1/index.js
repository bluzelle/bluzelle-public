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
exports.Equivocation = void 0;
const module_1 = require("./module");
const evidence_1 = require("./module/types/cosmos/evidence/v1beta1/evidence");
Object.defineProperty(exports, "Equivocation", { enumerable: true, get: function () { return evidence_1.Equivocation; } });
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
        Evidence: {},
        AllEvidence: {},
        _Structure: {
            Equivocation: getStructure(evidence_1.Equivocation.fromPartial({})),
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
        getEvidence: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Evidence[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getAllEvidence: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.AllEvidence[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
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
            console.log('Vuex module: cosmos.evidence.v1beta1 initialized!');
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
        QueryEvidence({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryEvidence(key.evidence_hash)).data;
                    commit('QUERY', { query: 'Evidence', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryEvidence', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getEvidence']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryEvidence API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryAllEvidence({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryAllEvidence(query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryAllEvidence(Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'AllEvidence', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryAllEvidence', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getAllEvidence']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryAllEvidence API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        sendMsgSubmitEvidence({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgSubmitEvidence(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgSubmitEvidence:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgSubmitEvidence:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        MsgSubmitEvidence({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgSubmitEvidence(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgSubmitEvidence:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgSubmitEvidence:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
    }
};
//# sourceMappingURL=index.js.map