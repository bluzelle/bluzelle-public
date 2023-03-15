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
const authz_1 = require("../src/curium/lib/generated/cosmos/bank/v1beta1/authz");
const index_1 = require("../src/index");
const index_2 = require("../src/index");
const authz_2 = require("../src/authz");
const chai_1 = require("chai");
const authz_3 = require("../src/curium/lib/generated/cosmos/staking/v1beta1/authz");
const authz_4 = require("../src/curium/lib/generated/cosmos/authz/v1beta1/authz");
const authz_5 = require("../src/curium/lib/generated/cosmos/staking/v1beta1/authz");
const tx_1 = require("../src/curium/lib/generated/cosmos/bank/v1beta1/tx");
const msg_1 = require("../src/msg");
const wallet = (0, index_2.newLocalWallet)("today mom room rice defy sleep awful link title layer upon silly aware crop jar cherry deputy excite recipe just quit pool race height", { coinType: 483 });
const granteeWallet = (0, index_2.newLocalWallet)("bus page there wrist almost verb reject color worth analyst drink gas during pizza kick park float remain bid gossip marriage message wrist work", { coinType: 483 });
const testGranter = "bluzelle1vc2serppykh7a94ymxntltcs763frzjlzl0p2s";
const testGrantee = "bluzelle1vzgp70pmhjyly0q2h9w3wmnf7v2jgms8mtnyau";
const expiration = new Date("1/1/2024");
describe("Authorization Module Test", function () {
    this.timeout(1800000);
    it('generic authorization should be successfully created', () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: 8 /* MsgType.SUBMIT_PROPOSAL */,
            expiration
        };
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        yield (0, authz_2.genericAuthorizationTx)(client, params);
        const res = yield (0, authz_2.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 8 /* MsgType.SUBMIT_PROPOSAL */
        });
        if (res) {
            (0, chai_1.expect)((_a = res.grants[0].authorization) === null || _a === void 0 ? void 0 : _a.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization");
            (0, chai_1.expect)(authz_4.GenericAuthorization.decode((_b = res.grants[0].authorization) === null || _b === void 0 ? void 0 : _b.value).msg).to.equal(msg_1.MsgMapping[8 /* MsgType.SUBMIT_PROPOSAL */]);
        }
    }));
    it('send authorization should be successfully created', () => __awaiter(this, void 0, void 0, function* () {
        var _c, _d;
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            spendLimit: [{
                    denom: "ubnt",
                    amount: "1000000"
                }],
            expiration
        };
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        yield (0, authz_2.sendAuthorizationTx)(client, params);
        const res = yield (0, authz_2.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 27 /* MsgType.SEND */
        });
        if (res) {
            (0, chai_1.expect)((_c = res.grants[0].authorization) === null || _c === void 0 ? void 0 : _c.typeUrl).to.equal("/cosmos.bank.v1beta1.SendAuthorization");
            (0, chai_1.expect)(authz_1.SendAuthorization.decode((_d = res.grants[0].authorization) === null || _d === void 0 ? void 0 : _d.value).spendLimit[0].amount).to.equal('1000000');
        }
    }));
    it(' stake authorization should be successfully created', () => __awaiter(this, void 0, void 0, function* () {
        var _e, _f;
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            authorizationType: authz_3.AuthorizationType.AUTHORIZATION_TYPE_DELEGATE,
            expiration
        };
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        yield (0, authz_2.stakeAuthorizationTx)(client, params);
        const res = yield (0, authz_2.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 30 /* MsgType.DELEGATE */
        });
        if (res) {
            (0, chai_1.expect)((_e = res.grants[0].authorization) === null || _e === void 0 ? void 0 : _e.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization");
            (0, chai_1.expect)(authz_5.StakeAuthorization.decode((_f = res.grants[0].authorization) === null || _f === void 0 ? void 0 : _f.value).authorizationType).to.equal(authz_3.AuthorizationType.AUTHORIZATION_TYPE_DELEGATE);
        }
    }));
    it(' create nft authorization should be successfully created', () => __awaiter(this, void 0, void 0, function* () {
        var _g;
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: 14 /* MsgType.CREATE_NFT */,
            expiration
        };
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        yield (0, authz_2.genericAuthorizationTx)(client, params);
        const res = yield (0, authz_2.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 14 /* MsgType.CREATE_NFT */
        });
        if (res)
            (0, chai_1.expect)(authz_4.GenericAuthorization.decode((_g = res.grants[0].authorization) === null || _g === void 0 ? void 0 : _g.value).msg).to.equal(msg_1.MsgMapping[14 /* MsgType.CREATE_NFT */]);
    }));
    it(' print edition authorization should be successfully created', () => __awaiter(this, void 0, void 0, function* () {
        var _h;
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: 15 /* MsgType.PRINT_EDITION */,
            expiration
        };
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        yield (0, authz_2.genericAuthorizationTx)(client, params);
        const res = yield (0, authz_2.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 15 /* MsgType.PRINT_EDITION */
        });
        if (res)
            (0, chai_1.expect)(authz_4.GenericAuthorization.decode((_h = res.grants[0].authorization) === null || _h === void 0 ? void 0 : _h.value).msg).to.equal(msg_1.MsgMapping[15 /* MsgType.PRINT_EDITION */]);
    }));
    it(' transfer nft authorization should be successfully created', () => __awaiter(this, void 0, void 0, function* () {
        var _j;
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: 16 /* MsgType.TRANSFER_NFT */,
            expiration
        };
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        yield (0, authz_2.genericAuthorizationTx)(client, params);
        const res = yield (0, authz_2.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 16 /* MsgType.TRANSFER_NFT */,
        });
        if (res)
            (0, chai_1.expect)(authz_4.GenericAuthorization.decode((_j = res.grants[0].authorization) === null || _j === void 0 ? void 0 : _j.value).msg).to.equal(msg_1.MsgMapping[16 /* MsgType.TRANSFER_NFT */]);
    }));
    it(' create collection authorization should be successfully created', () => __awaiter(this, void 0, void 0, function* () {
        var _k;
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: 21 /* MsgType.CREATE_COLLECTION */,
            expiration
        };
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        yield (0, authz_2.genericAuthorizationTx)(client, params);
        const res = yield (0, authz_2.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 21 /* MsgType.CREATE_COLLECTION */
        });
        if (res)
            (0, chai_1.expect)(authz_4.GenericAuthorization.decode((_k = res.grants[0].authorization) === null || _k === void 0 ? void 0 : _k.value).msg).to.equal(msg_1.MsgMapping[21 /* MsgType.CREATE_COLLECTION */]);
    }));
    it('grant should be successfully revoked', () => __awaiter(this, void 0, void 0, function* () {
        var _l, _m;
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: 8 /* MsgType.SUBMIT_PROPOSAL */,
        };
        const gParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: 8 /* MsgType.SUBMIT_PROPOSAL */,
            expiration
        };
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        yield (0, authz_2.genericAuthorizationTx)(client, gParams);
        const res = yield (0, authz_2.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 8 /* MsgType.SUBMIT_PROPOSAL */
        });
        if (res) {
            (0, chai_1.expect)((_l = res.grants[0].authorization) === null || _l === void 0 ? void 0 : _l.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization");
            (0, chai_1.expect)(authz_4.GenericAuthorization.decode((_m = res.grants[0].authorization) === null || _m === void 0 ? void 0 : _m.value).msg).to.equal(msg_1.MsgMapping[8 /* MsgType.SUBMIT_PROPOSAL */]);
        }
        yield (0, authz_2.revokeAuthorizationTx)(client, params);
        const res1 = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, authz_2.queryGrant)(client, {
                    granter: testGranter,
                    grantee: testGrantee,
                    msg: 8 /* MsgType.SUBMIT_PROPOSAL */
                });
            }
            catch (e) {
                (0, chai_1.expect)(e).to.match(/NotFound/);
            }
        });
        yield res1();
    }));
    it('grant should be successfully executed', () => __awaiter(this, void 0, void 0, function* () {
        const params = {
            grantee: testGrantee,
            msgs: [{
                    typeUrl: msg_1.MsgMapping[27 /* MsgType.SEND */],
                    value: tx_1.MsgSend.encode({
                        fromAddress: testGrantee,
                        toAddress: testGranter,
                        amount: [{
                                denom: "ubnt",
                                amount: "100"
                            }]
                    }).finish()
                }],
        };
        const sParams = {
            granter: testGranter,
            grantee: testGrantee,
            spendLimit: [{
                    denom: "ubnt",
                    amount: "100"
                }],
            expiration
        };
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        yield (0, authz_2.sendAuthorizationTx)(client, sParams);
        const eClient = yield (0, index_1.newBluzelleClient)({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });
        const originalBalance = yield (0, index_1.getAccountBalance)(client, testGrantee);
        const afterBalance = yield (0, index_1.getAccountBalance)(client, testGrantee);
        (0, chai_1.expect)(originalBalance - afterBalance).to.equal(100);
    }));
});
