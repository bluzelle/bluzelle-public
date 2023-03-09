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
exports.stakeAuthorizationTx = exports.sendAuthorizationTx = exports.genericAuthorizationTx = void 0;
const tx_1 = require("./tx");
const authz_1 = require("./curium/lib/generated/cosmos/authz/v1beta1/authz");
const authz_2 = require("./curium/lib/generated/cosmos/bank/v1beta1/authz");
const authz_3 = require("./curium/lib/generated/cosmos/staking/v1beta1/authz");
const genericAuthorizationTx = (client, params) => __awaiter(void 0, void 0, void 0, function* () {
    let txResult;
    try {
        txResult = yield (0, tx_1.grant)(client, params.granter, params.grantee, {
            "authorization": {
                "typeUrl": "/cosmos.authz.v1beta1.GenericAuthorization",
                "value": authz_1.GenericAuthorization.encode({
                    msg: params.msg
                }).finish()
            },
            expiration: params.expiration
        }, {
            gasPrice: 0.002,
            maxGas: 200000,
            mode: 'sync'
        });
        return txResult;
    }
    catch (e) {
        console.log(e.message);
    }
});
exports.genericAuthorizationTx = genericAuthorizationTx;
const sendAuthorizationTx = (client, params) => __awaiter(void 0, void 0, void 0, function* () {
    let txResult;
    try {
        txResult = yield (0, tx_1.grant)(client, params.granter, params.grantee, {
            "authorization": {
                "typeUrl": "/cosmos.bank.v1beta1.SendAuthorization",
                "value": authz_2.SendAuthorization.encode({
                    spendLimit: params.spendLimit
                }).finish()
            },
            expiration: params.expiration
        }, {
            gasPrice: 0.002,
            maxGas: 200000,
            mode: 'sync'
        });
        return txResult;
    }
    catch (e) {
        console.log(e.message);
    }
});
exports.sendAuthorizationTx = sendAuthorizationTx;
const stakeAuthorizationTx = (client, params) => __awaiter(void 0, void 0, void 0, function* () {
    let txResult;
    try {
        txResult = yield (0, tx_1.grant)(client, params.granter, params.grantee, {
            "authorization": {
                "typeUrl": "/cosmos.staking.v1beta1.StakeAuthorization",
                "value": authz_3.StakeAuthorization.encode({
                    maxTokens: params.maxTokens,
                    allowList: params.allowList,
                    denyList: params.denyList,
                    authorizationType: params.authorizationType
                }).finish()
            },
            expiration: params.expiration
        }, {
            gasPrice: 0.002,
            maxGas: 200000,
            mode: 'sync'
        });
        return txResult;
    }
    catch (e) {
        console.log(e.message);
    }
});
exports.stakeAuthorizationTx = stakeAuthorizationTx;
