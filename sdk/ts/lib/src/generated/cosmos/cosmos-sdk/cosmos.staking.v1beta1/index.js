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
exports.Pool = exports.RedelegationResponse = exports.RedelegationEntryResponse = exports.DelegationResponse = exports.Params = exports.Redelegation = exports.RedelegationEntry = exports.UnbondingDelegationEntry = exports.UnbondingDelegation = exports.Delegation = exports.DVVTriplets = exports.DVVTriplet = exports.DVPairs = exports.DVPair = exports.ValAddresses = exports.Validator = exports.Description = exports.Commission = exports.CommissionRates = exports.HistoricalInfo = exports.LastValidatorPower = exports.StakeAuthorization_Validators = exports.StakeAuthorization = void 0;
const module_1 = require("./module");
const authz_1 = require("./module/types/cosmos/staking/v1beta1/authz");
Object.defineProperty(exports, "StakeAuthorization", { enumerable: true, get: function () { return authz_1.StakeAuthorization; } });
const authz_2 = require("./module/types/cosmos/staking/v1beta1/authz");
Object.defineProperty(exports, "StakeAuthorization_Validators", { enumerable: true, get: function () { return authz_2.StakeAuthorization_Validators; } });
const genesis_1 = require("./module/types/cosmos/staking/v1beta1/genesis");
Object.defineProperty(exports, "LastValidatorPower", { enumerable: true, get: function () { return genesis_1.LastValidatorPower; } });
const staking_1 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "HistoricalInfo", { enumerable: true, get: function () { return staking_1.HistoricalInfo; } });
const staking_2 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "CommissionRates", { enumerable: true, get: function () { return staking_2.CommissionRates; } });
const staking_3 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "Commission", { enumerable: true, get: function () { return staking_3.Commission; } });
const staking_4 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "Description", { enumerable: true, get: function () { return staking_4.Description; } });
const staking_5 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "Validator", { enumerable: true, get: function () { return staking_5.Validator; } });
const staking_6 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "ValAddresses", { enumerable: true, get: function () { return staking_6.ValAddresses; } });
const staking_7 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "DVPair", { enumerable: true, get: function () { return staking_7.DVPair; } });
const staking_8 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "DVPairs", { enumerable: true, get: function () { return staking_8.DVPairs; } });
const staking_9 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "DVVTriplet", { enumerable: true, get: function () { return staking_9.DVVTriplet; } });
const staking_10 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "DVVTriplets", { enumerable: true, get: function () { return staking_10.DVVTriplets; } });
const staking_11 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "Delegation", { enumerable: true, get: function () { return staking_11.Delegation; } });
const staking_12 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "UnbondingDelegation", { enumerable: true, get: function () { return staking_12.UnbondingDelegation; } });
const staking_13 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "UnbondingDelegationEntry", { enumerable: true, get: function () { return staking_13.UnbondingDelegationEntry; } });
const staking_14 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "RedelegationEntry", { enumerable: true, get: function () { return staking_14.RedelegationEntry; } });
const staking_15 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "Redelegation", { enumerable: true, get: function () { return staking_15.Redelegation; } });
const staking_16 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "Params", { enumerable: true, get: function () { return staking_16.Params; } });
const staking_17 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "DelegationResponse", { enumerable: true, get: function () { return staking_17.DelegationResponse; } });
const staking_18 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "RedelegationEntryResponse", { enumerable: true, get: function () { return staking_18.RedelegationEntryResponse; } });
const staking_19 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "RedelegationResponse", { enumerable: true, get: function () { return staking_19.RedelegationResponse; } });
const staking_20 = require("./module/types/cosmos/staking/v1beta1/staking");
Object.defineProperty(exports, "Pool", { enumerable: true, get: function () { return staking_20.Pool; } });
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
        Validators: {},
        Validator: {},
        ValidatorDelegations: {},
        ValidatorUnbondingDelegations: {},
        Delegation: {},
        UnbondingDelegation: {},
        DelegatorDelegations: {},
        DelegatorUnbondingDelegations: {},
        Redelegations: {},
        DelegatorValidators: {},
        DelegatorValidator: {},
        HistoricalInfo: {},
        Pool: {},
        Params: {},
        _Structure: {
            StakeAuthorization: getStructure(authz_1.StakeAuthorization.fromPartial({})),
            StakeAuthorization_Validators: getStructure(authz_2.StakeAuthorization_Validators.fromPartial({})),
            LastValidatorPower: getStructure(genesis_1.LastValidatorPower.fromPartial({})),
            HistoricalInfo: getStructure(staking_1.HistoricalInfo.fromPartial({})),
            CommissionRates: getStructure(staking_2.CommissionRates.fromPartial({})),
            Commission: getStructure(staking_3.Commission.fromPartial({})),
            Description: getStructure(staking_4.Description.fromPartial({})),
            Validator: getStructure(staking_5.Validator.fromPartial({})),
            ValAddresses: getStructure(staking_6.ValAddresses.fromPartial({})),
            DVPair: getStructure(staking_7.DVPair.fromPartial({})),
            DVPairs: getStructure(staking_8.DVPairs.fromPartial({})),
            DVVTriplet: getStructure(staking_9.DVVTriplet.fromPartial({})),
            DVVTriplets: getStructure(staking_10.DVVTriplets.fromPartial({})),
            Delegation: getStructure(staking_11.Delegation.fromPartial({})),
            UnbondingDelegation: getStructure(staking_12.UnbondingDelegation.fromPartial({})),
            UnbondingDelegationEntry: getStructure(staking_13.UnbondingDelegationEntry.fromPartial({})),
            RedelegationEntry: getStructure(staking_14.RedelegationEntry.fromPartial({})),
            Redelegation: getStructure(staking_15.Redelegation.fromPartial({})),
            Params: getStructure(staking_16.Params.fromPartial({})),
            DelegationResponse: getStructure(staking_17.DelegationResponse.fromPartial({})),
            RedelegationEntryResponse: getStructure(staking_18.RedelegationEntryResponse.fromPartial({})),
            RedelegationResponse: getStructure(staking_19.RedelegationResponse.fromPartial({})),
            Pool: getStructure(staking_20.Pool.fromPartial({})),
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
        getValidators: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Validators[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getValidator: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Validator[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getValidatorDelegations: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ValidatorDelegations[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getValidatorUnbondingDelegations: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.ValidatorUnbondingDelegations[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getDelegation: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Delegation[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getUnbondingDelegation: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.UnbondingDelegation[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getDelegatorDelegations: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.DelegatorDelegations[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getDelegatorUnbondingDelegations: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.DelegatorUnbondingDelegations[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getRedelegations: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Redelegations[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getDelegatorValidators: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.DelegatorValidators[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getDelegatorValidator: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.DelegatorValidator[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getHistoricalInfo: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.HistoricalInfo[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
        },
        getPool: (state) => (params = { params: {} }) => {
            var _a;
            if (!params.query) {
                params.query = null;
            }
            return (_a = state.Pool[JSON.stringify(params)]) !== null && _a !== void 0 ? _a : {};
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
            console.log('Vuex module: cosmos.staking.v1beta1 initialized!');
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
        QueryValidators({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryValidators(query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryValidators(Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'Validators', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryValidators', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getValidators']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryValidators API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryValidator({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryValidator(key.validator_addr)).data;
                    commit('QUERY', { query: 'Validator', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryValidator', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getValidator']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryValidator API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryValidatorDelegations({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryValidatorDelegations(key.validator_addr, query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryValidatorDelegations(key.validator_addr, Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'ValidatorDelegations', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryValidatorDelegations', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getValidatorDelegations']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryValidatorDelegations API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryValidatorUnbondingDelegations({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryValidatorUnbondingDelegations(key.validator_addr, query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryValidatorUnbondingDelegations(key.validator_addr, Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'ValidatorUnbondingDelegations', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryValidatorUnbondingDelegations', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getValidatorUnbondingDelegations']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryValidatorUnbondingDelegations API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryDelegation({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryDelegation(key.validator_addr, key.delegator_addr)).data;
                    commit('QUERY', { query: 'Delegation', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryDelegation', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getDelegation']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryDelegation API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryUnbondingDelegation({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryUnbondingDelegation(key.validator_addr, key.delegator_addr)).data;
                    commit('QUERY', { query: 'UnbondingDelegation', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryUnbondingDelegation', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getUnbondingDelegation']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryUnbondingDelegation API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryDelegatorDelegations({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryDelegatorDelegations(key.delegator_addr, query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryDelegatorDelegations(key.delegator_addr, Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'DelegatorDelegations', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryDelegatorDelegations', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getDelegatorDelegations']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryDelegatorDelegations API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryDelegatorUnbondingDelegations({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryDelegatorUnbondingDelegations(key.delegator_addr, query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryDelegatorUnbondingDelegations(key.delegator_addr, Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'DelegatorUnbondingDelegations', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryDelegatorUnbondingDelegations', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getDelegatorUnbondingDelegations']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryDelegatorUnbondingDelegations API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryRedelegations({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryRedelegations(key.delegator_addr, query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryRedelegations(key.delegator_addr, Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
                    commit('QUERY', { query: 'Redelegations', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryRedelegations', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getRedelegations']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryRedelegations API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryDelegatorValidators({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryDelegatorValidators(key.delegator_addr, query)).data;
                    while (all && value.pagination && value.pagination.next_key != null) {
                        let next_values = (yield queryClient.queryDelegatorValidators(key.delegator_addr, Object.assign(Object.assign({}, query), { 'pagination.key': value.pagination.next_key }))).data;
                        value = mergeResults(value, next_values);
                    }
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
        QueryDelegatorValidator({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryDelegatorValidator(key.delegator_addr, key.validator_addr)).data;
                    commit('QUERY', { query: 'DelegatorValidator', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryDelegatorValidator', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getDelegatorValidator']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryDelegatorValidator API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryHistoricalInfo({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryHistoricalInfo(key.height)).data;
                    commit('QUERY', { query: 'HistoricalInfo', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryHistoricalInfo', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getHistoricalInfo']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryHistoricalInfo API Node Unavailable. Could not perform query: ' + e.message);
                }
            });
        },
        QueryPool({ commit, rootGetters, getters }, { options: { subscribe, all } = { subscribe: false, all: false }, params, query = null }) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const key = params !== null && params !== void 0 ? params : {};
                    const queryClient = yield initQueryClient(rootGetters);
                    let value = (yield queryClient.queryPool()).data;
                    commit('QUERY', { query: 'Pool', key: { params: Object.assign({}, key), query }, value });
                    if (subscribe)
                        commit('SUBSCRIBE', { action: 'QueryPool', payload: { options: { all }, params: Object.assign({}, key), query } });
                    return (_a = getters['getPool']({ params: Object.assign({}, key), query })) !== null && _a !== void 0 ? _a : {};
                }
                catch (e) {
                    throw new Error('QueryClient:QueryPool API Node Unavailable. Could not perform query: ' + e.message);
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
        sendMsgEditValidator({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgEditValidator(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgEditValidator:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgEditValidator:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        sendMsgCreateValidator({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgCreateValidator(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgCreateValidator:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgCreateValidator:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        sendMsgBeginRedelegate({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgBeginRedelegate(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgBeginRedelegate:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgBeginRedelegate:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        sendMsgDelegate({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgDelegate(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgDelegate:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgDelegate:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        sendMsgUndelegate({ rootGetters }, { value, fee = [], memo = '' }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgUndelegate(value);
                    const result = yield txClient.signAndBroadcast([msg], { fee: { amount: fee,
                            gas: "200000" }, memo });
                    return result;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgUndelegate:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgUndelegate:Send Could not broadcast Tx: ' + e.message);
                    }
                }
            });
        },
        MsgEditValidator({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgEditValidator(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgEditValidator:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgEditValidator:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
        MsgCreateValidator({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgCreateValidator(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgCreateValidator:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgCreateValidator:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
        MsgBeginRedelegate({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgBeginRedelegate(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgBeginRedelegate:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgBeginRedelegate:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
        MsgDelegate({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgDelegate(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgDelegate:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgDelegate:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
        MsgUndelegate({ rootGetters }, { value }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const txClient = yield initTxClient(rootGetters);
                    const msg = yield txClient.msgUndelegate(value);
                    return msg;
                }
                catch (e) {
                    if (e == module_1.MissingWalletError) {
                        throw new Error('TxClient:MsgUndelegate:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgUndelegate:Create Could not create message: ' + e.message);
                    }
                }
            });
        },
    }
};
//# sourceMappingURL=index.js.map