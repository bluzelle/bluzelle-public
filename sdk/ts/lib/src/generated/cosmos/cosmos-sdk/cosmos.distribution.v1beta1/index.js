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
exports.ValidatorSlashEventRecord = exports.DelegatorStartingInfoRecord = exports.ValidatorCurrentRewardsRecord = exports.ValidatorHistoricalRewardsRecord = exports.ValidatorAccumulatedCommissionRecord = exports.ValidatorOutstandingRewardsRecord = exports.DelegatorWithdrawInfo = exports.CommunityPoolSpendProposalWithDeposit = exports.DelegationDelegatorReward = exports.DelegatorStartingInfo = exports.CommunityPoolSpendProposal = exports.FeePool = exports.ValidatorSlashEvents = exports.ValidatorSlashEvent = exports.ValidatorOutstandingRewards = exports.ValidatorAccumulatedCommission = exports.ValidatorCurrentRewards = exports.ValidatorHistoricalRewards = exports.Params = void 0;
const module_1 = require("./module");
const distribution_1 = require("./module/types/cosmos/distribution/v1beta1/distribution");
Object.defineProperty(exports, "Params", { enumerable: true, get: function () { return distribution_1.Params; } });
const distribution_2 = require("./module/types/cosmos/distribution/v1beta1/distribution");
Object.defineProperty(exports, "ValidatorHistoricalRewards", { enumerable: true, get: function () { return distribution_2.ValidatorHistoricalRewards; } });
const distribution_3 = require("./module/types/cosmos/distribution/v1beta1/distribution");
Object.defineProperty(exports, "ValidatorCurrentRewards", { enumerable: true, get: function () { return distribution_3.ValidatorCurrentRewards; } });
const distribution_4 = require("./module/types/cosmos/distribution/v1beta1/distribution");
Object.defineProperty(exports, "ValidatorAccumulatedCommission", { enumerable: true, get: function () { return distribution_4.ValidatorAccumulatedCommission; } });
const distribution_5 = require("./module/types/cosmos/distribution/v1beta1/distribution");
Object.defineProperty(exports, "ValidatorOutstandingRewards", { enumerable: true, get: function () { return distribution_5.ValidatorOutstandingRewards; } });
const distribution_6 = require("./module/types/cosmos/distribution/v1beta1/distribution");
Object.defineProperty(exports, "ValidatorSlashEvent", { enumerable: true, get: function () { return distribution_6.ValidatorSlashEvent; } });
const distribution_7 = require("./module/types/cosmos/distribution/v1beta1/distribution");
Object.defineProperty(exports, "ValidatorSlashEvents", { enumerable: true, get: function () { return distribution_7.ValidatorSlashEvents; } });
const distribution_8 = require("./module/types/cosmos/distribution/v1beta1/distribution");
Object.defineProperty(exports, "FeePool", { enumerable: true, get: function () { return distribution_8.FeePool; } });
const distribution_9 = require("./module/types/cosmos/distribution/v1beta1/distribution");
Object.defineProperty(exports, "CommunityPoolSpendProposal", { enumerable: true, get: function () { return distribution_9.CommunityPoolSpendProposal; } });
const distribution_10 = require("./module/types/cosmos/distribution/v1beta1/distribution");
Object.defineProperty(exports, "DelegatorStartingInfo", { enumerable: true, get: function () { return distribution_10.DelegatorStartingInfo; } });
const distribution_11 = require("./module/types/cosmos/distribution/v1beta1/distribution");
Object.defineProperty(exports, "DelegationDelegatorReward", { enumerable: true, get: function () { return distribution_11.DelegationDelegatorReward; } });
const distribution_12 = require("./module/types/cosmos/distribution/v1beta1/distribution");
Object.defineProperty(exports, "CommunityPoolSpendProposalWithDeposit", { enumerable: true, get: function () { return distribution_12.CommunityPoolSpendProposalWithDeposit; } });
const genesis_1 = require("./module/types/cosmos/distribution/v1beta1/genesis");
Object.defineProperty(exports, "DelegatorWithdrawInfo", { enumerable: true, get: function () { return genesis_1.DelegatorWithdrawInfo; } });
const genesis_2 = require("./module/types/cosmos/distribution/v1beta1/genesis");
Object.defineProperty(exports, "ValidatorOutstandingRewardsRecord", { enumerable: true, get: function () { return genesis_2.ValidatorOutstandingRewardsRecord; } });
const genesis_3 = require("./module/types/cosmos/distribution/v1beta1/genesis");
Object.defineProperty(exports, "ValidatorAccumulatedCommissionRecord", { enumerable: true, get: function () { return genesis_3.ValidatorAccumulatedCommissionRecord; } });
const genesis_4 = require("./module/types/cosmos/distribution/v1beta1/genesis");
Object.defineProperty(exports, "ValidatorHistoricalRewardsRecord", { enumerable: true, get: function () { return genesis_4.ValidatorHistoricalRewardsRecord; } });
const genesis_5 = require("./module/types/cosmos/distribution/v1beta1/genesis");
Object.defineProperty(exports, "ValidatorCurrentRewardsRecord", { enumerable: true, get: function () { return genesis_5.ValidatorCurrentRewardsRecord; } });
const genesis_6 = require("./module/types/cosmos/distribution/v1beta1/genesis");
Object.defineProperty(exports, "DelegatorStartingInfoRecord", { enumerable: true, get: function () { return genesis_6.DelegatorStartingInfoRecord; } });
const genesis_7 = require("./module/types/cosmos/distribution/v1beta1/genesis");
Object.defineProperty(exports, "ValidatorSlashEventRecord", { enumerable: true, get: function () { return genesis_7.ValidatorSlashEventRecord; } });
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
        Params: {},
        ValidatorOutstandingRewards: {},
        ValidatorCommission: {},
        ValidatorSlashes: {},
        DelegationRewards: {},
        DelegationTotalRewards: {},
        DelegatorValidators: {},
        DelegatorWithdrawAddress: {},
        CommunityPool: {},
        _Structure: {
            Params: getStructure(distribution_1.Params.fromPartial({})),
            ValidatorHistoricalRewards: getStructure(distribution_2.ValidatorHistoricalRewards.fromPartial({})),
            ValidatorCurrentRewards: getStructure(distribution_3.ValidatorCurrentRewards.fromPartial({})),
            ValidatorAccumulatedCommission: getStructure(distribution_4.ValidatorAccumulatedCommission.fromPartial({})),
            ValidatorOutstandingRewards: getStructure(distribution_5.ValidatorOutstandingRewards.fromPartial({})),
            ValidatorSlashEvent: getStructure(distribution_6.ValidatorSlashEvent.fromPartial({})),
            ValidatorSlashEvents: getStructure(distribution_7.ValidatorSlashEvents.fromPartial({})),
            FeePool: getStructure(distribution_8.FeePool.fromPartial({})),
            CommunityPoolSpendProposal: getStructure(distribution_9.CommunityPoolSpendProposal.fromPartial({})),
            DelegatorStartingInfo: getStructure(distribution_10.DelegatorStartingInfo.fromPartial({})),
            DelegationDelegatorReward: getStructure(distribution_11.DelegationDelegatorReward.fromPartial({})),
            CommunityPoolSpendProposalWithDeposit: getStructure(distribution_12.CommunityPoolSpendProposalWithDeposit.fromPartial({})),
            DelegatorWithdrawInfo: getStructure(genesis_1.DelegatorWithdrawInfo.fromPartial({})),
            ValidatorOutstandingRewardsRecord: getStructure(genesis_2.ValidatorOutstandingRewardsRecord.fromPartial({})),
            ValidatorAccumulatedCommissionRecord: getStructure(genesis_3.ValidatorAccumulatedCommissionRecord.fromPartial({})),
            ValidatorHistoricalRewardsRecord: getStructure(genesis_4.ValidatorHistoricalRewardsRecord.fromPartial({})),
            ValidatorCurrentRewardsRecord: getStructure(genesis_5.ValidatorCurrentRewardsRecord.fromPartial({})),
            DelegatorStartingInfoRecord: getStructure(genesis_6.DelegatorStartingInfoRecord.fromPartial({})),
            ValidatorSlashEventRecord: getStructure(genesis_7.ValidatorSlashEventRecord.fromPartial({})),
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
        getParams: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Params[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getValidatorOutstandingRewards: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ValidatorOutstandingRewards[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getValidatorCommission: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ValidatorCommission[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getValidatorSlashes: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ValidatorSlashes[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getDelegationRewards: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.DelegationRewards[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getDelegationTotalRewards: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.DelegationTotalRewards[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getDelegatorValidators: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.DelegatorValidators[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getDelegatorWithdrawAddress: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.DelegatorWithdrawAddress[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getCommunityPool: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.CommunityPool[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
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
            console.log('Vuex module: cosmos.distribution.v1beta1 initialized!');
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
        QueryValidatorOutstandingRewards({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryValidatorOutstandingRewards(key.validator_address)).data;
                    commit('QUERY', { query: 'ValidatorOutstandingRewards', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryValidatorOutstandingRewards', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getValidatorOutstandingRewards']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryValidatorOutstandingRewards API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryValidatorCommission({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryValidatorCommission(key.validator_address)).data;
                    commit('QUERY', { query: 'ValidatorCommission', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryValidatorCommission', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getValidatorCommission']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryValidatorCommission API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryValidatorSlashes({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryValidatorSlashes(key.validator_address, query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryValidatorSlashes(key.validator_address, Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'ValidatorSlashes', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryValidatorSlashes', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getValidatorSlashes']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryValidatorSlashes API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryDelegationRewards({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryDelegationRewards(key.delegator_address, key.validator_address)).data;
                    commit('QUERY', { query: 'DelegationRewards', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryDelegationRewards', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getDelegationRewards']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryDelegationRewards API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryDelegationTotalRewards({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryDelegationTotalRewards(key.delegator_address)).data;
                    commit('QUERY', { query: 'DelegationTotalRewards', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryDelegationTotalRewards', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getDelegationTotalRewards']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryDelegationTotalRewards API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryDelegatorValidators({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryDelegatorValidators(key.delegator_address)).data;
                    commit('QUERY', { query: 'DelegatorValidators', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryDelegatorValidators', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getDelegatorValidators']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryDelegatorValidators API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryDelegatorWithdrawAddress({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryDelegatorWithdrawAddress(key.delegator_address)).data;
                    commit('QUERY', { query: 'DelegatorWithdrawAddress', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryDelegatorWithdrawAddress', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getDelegatorWithdrawAddress']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryDelegatorWithdrawAddress API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryCommunityPool({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryCommunityPool()).data;
                    commit('QUERY', { query: 'CommunityPool', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryCommunityPool', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getCommunityPool']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryCommunityPool API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        sendMsgSetWithdrawAddress({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgSetWithdrawAddress(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgSetWithdrawAddress:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgSetWithdrawAddress:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        sendMsgFundCommunityPool({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgFundCommunityPool(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgFundCommunityPool:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgFundCommunityPool:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        sendMsgWithdrawValidatorCommission({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgWithdrawValidatorCommission(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgWithdrawValidatorCommission:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgWithdrawValidatorCommission:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        sendMsgWithdrawDelegatorReward({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgWithdrawDelegatorReward(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgWithdrawDelegatorReward:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgWithdrawDelegatorReward:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        MsgSetWithdrawAddress({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgSetWithdrawAddress(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgSetWithdrawAddress:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgSetWithdrawAddress:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
        MsgFundCommunityPool({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgFundCommunityPool(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgFundCommunityPool:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgFundCommunityPool:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
        MsgWithdrawValidatorCommission({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgWithdrawValidatorCommission(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgWithdrawValidatorCommission:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgWithdrawValidatorCommission:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
        MsgWithdrawDelegatorReward({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgWithdrawDelegatorReward(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgWithdrawDelegatorReward:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgWithdrawDelegatorReward:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
    }
};
//# sourceMappingURL=index.js.map