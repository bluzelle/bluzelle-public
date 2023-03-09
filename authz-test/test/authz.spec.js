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
const wallet = (0, index_2.newLocalWallet)("tired inquiry tape jar pizza mango system slogan door always sleep office space want stove scatter ski uphold toward pet material dinosaur prosper round", { coinType: 483 });
const testGranter = "bluzelle13eyh7hyjmlk4ya0nftl4yuuqcmu86agw34h27g";
const testGrantee = "bluzelle1mzrns4r83g6c7pk2400gnycvr0ct9zyugtzu5a";
const expiration = new Date("1/1/2024");
describe("Authorization Module Test", function () {
    this.timeout(1800000);
    let client;
    it('generic authorization should be successfully created', () => {
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: "/cosmos.gov.v1beta1.MsgSubmitProposal",
            expiration
        };
        return (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        }).then((client) => (0, authz_2.genericAuthorizationTx)(client, params)
            .then(() => client.queryClient.authz.Grants({
            granter: testGranter,
            grantee: testGrantee,
            msgTypeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal"
        }))
            .then((res) => {
            var _a, _b;
            (0, chai_1.expect)((_a = res.grants[0].authorization) === null || _a === void 0 ? void 0 : _a.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization");
            (0, chai_1.expect)(authz_4.GenericAuthorization.decode((_b = res.grants[0].authorization) === null || _b === void 0 ? void 0 : _b.value).msg).to.equal("/cosmos.gov.v1beta1.MsgSubmitProposal");
        }));
    });
    it('send authorization should be successfully created', () => {
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            spendLimit: [{
                    denom: "ubnt",
                    amount: "1000000"
                }],
            expiration
        };
        return (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        }).then((client) => (0, authz_2.sendAuthorizationTx)(client, params)
            .then(() => client.queryClient.authz.Grants({
            granter: testGranter,
            grantee: testGrantee,
            msgTypeUrl: "/cosmos.bank.v1beta1.MsgSend"
        }))
            .then((res) => {
            var _a, _b;
            (0, chai_1.expect)((_a = res.grants[0].authorization) === null || _a === void 0 ? void 0 : _a.typeUrl).to.equal("/cosmos.bank.v1beta1.SendAuthorization");
            (0, chai_1.expect)(authz_1.SendAuthorization.decode((_b = res.grants[0].authorization) === null || _b === void 0 ? void 0 : _b.value).spendLimit[0].amount).to.equal('1000000');
        }));
    });
    it(' stake authorization should be successfully created', () => {
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            authorizationType: authz_3.AuthorizationType.AUTHORIZATION_TYPE_DELEGATE,
            expiration
        };
        return (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        }).then((client) => (0, authz_2.stakeAuthorizationTx)(client, params)
            .then(() => client.queryClient.authz.Grants({
            granter: testGranter,
            grantee: testGrantee,
            msgTypeUrl: "/cosmos.staking.v1beta1.MsgDelegate"
        }))
            .then((res) => {
            var _a, _b;
            (0, chai_1.expect)((_a = res.grants[0].authorization) === null || _a === void 0 ? void 0 : _a.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization");
            (0, chai_1.expect)(authz_5.StakeAuthorization.decode((_b = res.grants[0].authorization) === null || _b === void 0 ? void 0 : _b.value).authorizationType).to.equal(authz_3.AuthorizationType.AUTHORIZATION_TYPE_DELEGATE);
        }));
    });
    it(' creat nft authorization should be successfully created', () => {
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: "/bluzelle.curium.nft.MsgCreateNFT",
            expiration
        };
        return (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        }).then((client) => (0, authz_2.genericAuthorizationTx)(client, params)
            .then(() => client.queryClient.authz.Grants({
            granter: testGranter,
            grantee: testGrantee,
            msgTypeUrl: "/bluzelle.curium.nft.MsgCreateNFT"
        }))
            .then((res) => {
            var _a;
            (0, chai_1.expect)(authz_4.GenericAuthorization.decode((_a = res.grants[0].authorization) === null || _a === void 0 ? void 0 : _a.value).msg).to.equal("/bluzelle.curium.nft.MsgCreateNFT");
        }));
    });
    it(' print edition authorization should be successfully created', () => {
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: "/bluzelle.curium.nft.MsgPrintEdition",
            expiration
        };
        return (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        }).then((client) => (0, authz_2.genericAuthorizationTx)(client, params)
            .then(() => client.queryClient.authz.Grants({
            granter: testGranter,
            grantee: testGrantee,
            msgTypeUrl: "/bluzelle.curium.nft.MsgPrintEdition"
        }))
            .then((res) => {
            var _a;
            (0, chai_1.expect)(authz_4.GenericAuthorization.decode((_a = res.grants[0].authorization) === null || _a === void 0 ? void 0 : _a.value).msg).to.equal("/bluzelle.curium.nft.MsgPrintEdition");
        }));
    });
    it(' transfer nft authorization should be successfully created', () => {
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: "/bluzelle.curium.nft.MsgTransferNFT",
            expiration
        };
        return (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        }).then((client) => (0, authz_2.genericAuthorizationTx)(client, params)
            .then(() => client.queryClient.authz.Grants({
            granter: testGranter,
            grantee: testGrantee,
            msgTypeUrl: "/bluzelle.curium.nft.MsgTransferNFT"
        }))
            .then((res) => {
            var _a;
            (0, chai_1.expect)(authz_4.GenericAuthorization.decode((_a = res.grants[0].authorization) === null || _a === void 0 ? void 0 : _a.value).msg).to.equal("/bluzelle.curium.nft.MsgTransferNFT");
        }));
    });
    it(' create collection authorization should be successfully created', () => {
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: "/bluzelle.curium.nft.MsgCreateCollection",
            expiration
        };
        return (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        }).then((client) => (0, authz_2.genericAuthorizationTx)(client, params)
            .then(() => client.queryClient.authz.Grants({
            granter: testGranter,
            grantee: testGrantee,
            msgTypeUrl: "/bluzelle.curium.nft.MsgCreateCollection"
        }))
            .then((res) => {
            var _a;
            (0, chai_1.expect)(authz_4.GenericAuthorization.decode((_a = res.grants[0].authorization) === null || _a === void 0 ? void 0 : _a.value).msg).to.equal("/bluzelle.curium.nft.MsgCreateCollection");
        }));
    });
    it('grant should be successfully revoked', () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msgTypeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
        };
        const gParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: "/cosmos.gov.v1beta1.MsgSubmitProposal",
            expiration
        };
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        yield (0, authz_2.genericAuthorizationTx)(client, gParams);
        const res = yield client.queryClient.authz.Grants({
            granter: testGranter,
            grantee: testGrantee,
            msgTypeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal"
        });
        (0, chai_1.expect)((_a = res.grants[0].authorization) === null || _a === void 0 ? void 0 : _a.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization");
        (0, chai_1.expect)(authz_4.GenericAuthorization.decode((_b = res.grants[0].authorization) === null || _b === void 0 ? void 0 : _b.value).msg).to.equal("/cosmos.gov.v1beta1.MsgSubmitProposal");
        yield (0, authz_2.revokeAuthorizationTx)(client, params);
        const res1 = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.queryClient.authz.Grants({
                    granter: testGranter,
                    grantee: testGrantee,
                    msgTypeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal"
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
                    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                    value: tx_1.MsgSend.encode({
                        fromAddress: testGrantee,
                        toAddress: testGranter,
                        amount: [{
                                denom: "ubnt",
                                amount: "10000000"
                            }]
                    }).finish()
                }],
        };
        const sParams = {
            granter: testGranter,
            grantee: testGrantee,
            spendLimit: [{
                    denom: "ubnt",
                    amount: "100000000"
                }],
            expiration
        };
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        yield (0, authz_2.sendAuthorizationTx)(client, sParams);
        const eWallet = (0, index_2.newLocalWallet)("legal obvious account topic village rigid motor spray wink shy arch midnight idle elite bag improve orphan sample brass scan amazing ostrich science poverty", { coinType: 483 });
        const eClient = yield (0, index_1.newBluzelleClient)({
            wallet: eWallet,
            url: "http://localhost:26657"
        });
        const originalBalance = yield (0, index_1.getAccountBalance)(client, testGrantee);
        const resMsgExec = yield (0, authz_2.executeAuthorizationTx)(eClient, params);
        const afterBalance = yield (0, index_1.getAccountBalance)(client, testGrantee);
        (0, chai_1.expect)(originalBalance - afterBalance).to.equal(10000000);
    }));
});
