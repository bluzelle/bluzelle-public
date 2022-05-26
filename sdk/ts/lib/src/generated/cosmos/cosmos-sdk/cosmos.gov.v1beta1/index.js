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
exports.TallyParams = exports.VotingParams = exports.DepositParams = exports.Vote = exports.TallyResult = exports.Proposal = exports.Deposit = exports.TextProposal = exports.WeightedVoteOption = void 0;
const module_1 = require("./module");
const gov_1 = require("./module/types/cosmos/gov/v1beta1/gov");
Object.defineProperty(exports, "WeightedVoteOption", { enumerable: true, get: function () { return gov_1.WeightedVoteOption; } });
const gov_2 = require("./module/types/cosmos/gov/v1beta1/gov");
Object.defineProperty(exports, "TextProposal", { enumerable: true, get: function () { return gov_2.TextProposal; } });
const gov_3 = require("./module/types/cosmos/gov/v1beta1/gov");
Object.defineProperty(exports, "Deposit", { enumerable: true, get: function () { return gov_3.Deposit; } });
const gov_4 = require("./module/types/cosmos/gov/v1beta1/gov");
Object.defineProperty(exports, "Proposal", { enumerable: true, get: function () { return gov_4.Proposal; } });
const gov_5 = require("./module/types/cosmos/gov/v1beta1/gov");
Object.defineProperty(exports, "TallyResult", { enumerable: true, get: function () { return gov_5.TallyResult; } });
const gov_6 = require("./module/types/cosmos/gov/v1beta1/gov");
Object.defineProperty(exports, "Vote", { enumerable: true, get: function () { return gov_6.Vote; } });
const gov_7 = require("./module/types/cosmos/gov/v1beta1/gov");
Object.defineProperty(exports, "DepositParams", { enumerable: true, get: function () { return gov_7.DepositParams; } });
const gov_8 = require("./module/types/cosmos/gov/v1beta1/gov");
Object.defineProperty(exports, "VotingParams", { enumerable: true, get: function () { return gov_8.VotingParams; } });
const gov_9 = require("./module/types/cosmos/gov/v1beta1/gov");
Object.defineProperty(exports, "TallyParams", { enumerable: true, get: function () { return gov_9.TallyParams; } });
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
        Proposal: {},
        Proposals: {},
        Vote: {},
        Votes: {},
        Params: {},
        Deposit: {},
        Deposits: {},
        TallyResult: {},
        _Structure: {
            WeightedVoteOption: getStructure(gov_1.WeightedVoteOption.fromPartial({})),
            TextProposal: getStructure(gov_2.TextProposal.fromPartial({})),
            Deposit: getStructure(gov_3.Deposit.fromPartial({})),
            Proposal: getStructure(gov_4.Proposal.fromPartial({})),
            TallyResult: getStructure(gov_5.TallyResult.fromPartial({})),
            Vote: getStructure(gov_6.Vote.fromPartial({})),
            DepositParams: getStructure(gov_7.DepositParams.fromPartial({})),
            VotingParams: getStructure(gov_8.VotingParams.fromPartial({})),
            TallyParams: getStructure(gov_9.TallyParams.fromPartial({})),
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
        getProposal: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Proposal[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getProposals: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Proposals[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getVote: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Vote[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getVotes: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Votes[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getParams: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Params[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getDeposit: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Deposit[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getDeposits: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Deposits[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getTallyResult: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.TallyResult[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
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
            console.log('Vuex module: cosmos.gov.v1beta1 initialized!');
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
        QueryProposal({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryProposal(key.proposal_id)).data;
                    commit('QUERY', { query: 'Proposal', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryProposal', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getProposal']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryProposal API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryProposals({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryProposals(query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryProposals(Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'Proposals', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryProposals', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getProposals']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryProposals API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryVote({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryVote(key.proposal_id, key.voter)).data;
                    commit('QUERY', { query: 'Vote', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryVote', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getVote']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryVote API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryVotes({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryVotes(key.proposal_id, query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryVotes(key.proposal_id, Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'Votes', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryVotes', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getVotes']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryVotes API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryParams({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryParams(key.params_type)).data;
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
        QueryDeposit({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryDeposit(key.proposal_id, key.depositor)).data;
                    commit('QUERY', { query: 'Deposit', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryDeposit', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getDeposit']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryDeposit API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryDeposits({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryDeposits(key.proposal_id, query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryDeposits(key.proposal_id, Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'Deposits', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryDeposits', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getDeposits']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryDeposits API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryTallyResult({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryTallyResult(key.proposal_id)).data;
                    commit('QUERY', { query: 'TallyResult', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryTallyResult', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getTallyResult']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryTallyResult API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        sendMsgVoteWeighted({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgVoteWeighted(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgVoteWeighted:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgVoteWeighted:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        sendMsgVote({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgVote(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgVote:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgVote:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        sendMsgSubmitProposal({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgSubmitProposal(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgSubmitProposal:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgSubmitProposal:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        sendMsgDeposit({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgDeposit(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgDeposit:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgDeposit:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        MsgVoteWeighted({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgVoteWeighted(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgVoteWeighted:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgVoteWeighted:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
        MsgVote({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgVote(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgVote:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgVote:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
        MsgSubmitProposal({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgSubmitProposal(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgSubmitProposal:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgSubmitProposal:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
        MsgDeposit({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgDeposit(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgDeposit:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgDeposit:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
    }
};
//# sourceMappingURL=index.js.map