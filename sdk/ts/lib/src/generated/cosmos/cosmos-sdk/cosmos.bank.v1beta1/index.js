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
exports.Balance = exports.Metadata = exports.DenomUnit = exports.Supply = exports.Output = exports.Input = exports.SendEnabled = exports.Params = exports.SendAuthorization = void 0;
const module_1 = require("./module");
const authz_1 = require("./module/types/cosmos/bank/v1beta1/authz");
Object.defineProperty(exports, "SendAuthorization", { enumerable: true, get: function () { return authz_1.SendAuthorization; } });
const bank_1 = require("./module/types/cosmos/bank/v1beta1/bank");
Object.defineProperty(exports, "Params", { enumerable: true, get: function () { return bank_1.Params; } });
const bank_2 = require("./module/types/cosmos/bank/v1beta1/bank");
Object.defineProperty(exports, "SendEnabled", { enumerable: true, get: function () { return bank_2.SendEnabled; } });
const bank_3 = require("./module/types/cosmos/bank/v1beta1/bank");
Object.defineProperty(exports, "Input", { enumerable: true, get: function () { return bank_3.Input; } });
const bank_4 = require("./module/types/cosmos/bank/v1beta1/bank");
Object.defineProperty(exports, "Output", { enumerable: true, get: function () { return bank_4.Output; } });
const bank_5 = require("./module/types/cosmos/bank/v1beta1/bank");
Object.defineProperty(exports, "Supply", { enumerable: true, get: function () { return bank_5.Supply; } });
const bank_6 = require("./module/types/cosmos/bank/v1beta1/bank");
Object.defineProperty(exports, "DenomUnit", { enumerable: true, get: function () { return bank_6.DenomUnit; } });
const bank_7 = require("./module/types/cosmos/bank/v1beta1/bank");
Object.defineProperty(exports, "Metadata", { enumerable: true, get: function () { return bank_7.Metadata; } });
const genesis_1 = require("./module/types/cosmos/bank/v1beta1/genesis");
Object.defineProperty(exports, "Balance", { enumerable: true, get: function () { return genesis_1.Balance; } });
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
        Balance: {},
        AllBalances: {},
        TotalSupply: {},
        SupplyOf: {},
        Params: {},
        DenomMetadata: {},
        DenomsMetadata: {},
        _Structure: {
            SendAuthorization: getStructure(authz_1.SendAuthorization.fromPartial({})),
            Params: getStructure(bank_1.Params.fromPartial({})),
            SendEnabled: getStructure(bank_2.SendEnabled.fromPartial({})),
            Input: getStructure(bank_3.Input.fromPartial({})),
            Output: getStructure(bank_4.Output.fromPartial({})),
            Supply: getStructure(bank_5.Supply.fromPartial({})),
            DenomUnit: getStructure(bank_6.DenomUnit.fromPartial({})),
            Metadata: getStructure(bank_7.Metadata.fromPartial({})),
            Balance: getStructure(genesis_1.Balance.fromPartial({})),
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
        getBalance: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Balance[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getAllBalances: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.AllBalances[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getTotalSupply: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.TotalSupply[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getSupplyOf: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.SupplyOf[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getParams: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Params[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getDenomMetadata: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.DenomMetadata[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getDenomsMetadata: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.DenomsMetadata[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
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
            console.log('Vuex module: cosmos.bank.v1beta1 initialized!');
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
        QueryBalance({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryBalance(key.address, key.denom)).data;
                    commit('QUERY', { query: 'Balance', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryBalance', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getBalance']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryBalance API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryAllBalances({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryAllBalances(key.address, query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryAllBalances(key.address, Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'AllBalances', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryAllBalances', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getAllBalances']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryAllBalances API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryTotalSupply({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryTotalSupply(query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryTotalSupply(Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'TotalSupply', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryTotalSupply', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getTotalSupply']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryTotalSupply API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QuerySupplyOf({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.querySupplyOf(key.denom)).data;
                    commit('QUERY', { query: 'SupplyOf', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QuerySupplyOf', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getSupplyOf']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QuerySupplyOf API Node Unavailable. Could not perform query: ' + e.message);
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
        QueryDenomMetadata({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryDenomMetadata(key.denom)).data;
                    commit('QUERY', { query: 'DenomMetadata', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryDenomMetadata', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getDenomMetadata']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryDenomMetadata API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryDenomsMetadata({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryDenomsMetadata(query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryDenomsMetadata(Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'DenomsMetadata', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryDenomsMetadata', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getDenomsMetadata']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryDenomsMetadata API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        sendMsgMultiSend({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgMultiSend(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgMultiSend:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgMultiSend:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        sendMsgSend({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgSend(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgSend:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgSend:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        MsgMultiSend({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgMultiSend(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgMultiSend:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgMultiSend:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
        MsgSend({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgSend(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgSend:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgSend:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
    }
};
//# sourceMappingURL=index.js.map