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
const index_1 = require("../src/index");
const index_2 = require("../src/index");
const authz_1 = require("../src/authz");
const chai_1 = require("chai");
const authz_2 = require("../src/curium/lib/generated/cosmos/authz/v1beta1/authz");
const wallet = (0, index_2.newLocalWallet)("tired inquiry tape jar pizza mango system slogan door always sleep office space want stove scatter ski uphold toward pet material dinosaur prosper round", { coinType: 483 });
const testGranter = "bluzelle13eyh7hyjmlk4ya0nftl4yuuqcmu86agw34h27g";
const testGrantee = "bluzelle1mzrns4r83g6c7pk2400gnycvr0ct9zyugtzu5a";
const expiration = new Date("1/1/2024");
describe("Authorization Module Test", function () {
    this.timeout(1800000);
    let client;
    // it('generic authorization should be successfully created', () => {
    //     const params: GenericAuthorizationParams = {
    //         granter: testGranter,
    //         grantee: testGrantee,
    //         msg: "/cosmos.gov.v1beta1.MsgSubmitProposal",
    //         expiration
    //     }
    //     return newBluzelleClient({
    //         wallet,
    //         url: "http://localhost:26657"
    //     }).then((client) =>
    //         genericAuthorizationTx(client, params)
    //             .then(() => client.queryClient.authz.Grants({
    //                 granter: testGranter,
    //                 grantee: testGrantee,
    //                 msgTypeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal"
    //             })
    //             )
    //             .then((res) => {
    //                 expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization")
    //                 expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal("/cosmos.gov.v1beta1.MsgSubmitProposal")
    //             })
    //     );
    // });
    // it('send authorization should be successfully created', () => {
    //     const params: SendAuthorizationParams = {
    //         granter: testGranter,
    //         grantee: testGrantee,
    //         spendLimit: [{
    //             denom: "ubnt",
    //             amount: "1000000"
    //         }],
    //         expiration
    //     }
    //     return newBluzelleClient({
    //         wallet,
    //         url: "http://localhost:26657"
    //     }).then((client) =>
    //         sendAuthorizationTx(client, params)
    //             .then(() => client.queryClient.authz.Grants({
    //                 granter: testGranter,
    //                 grantee: testGrantee,
    //                 msgTypeUrl: "/cosmos.bank.v1beta1.MsgSend"
    //             })
    //             )
    //             .then((res) => {
    //                 expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.bank.v1beta1.SendAuthorization")
    //                 expect(SendAuthorization.decode(res.grants[0].authorization?.value as any).spendLimit[0].amount).to.equal('1000000')
    //             })
    //     )
    // });
    // it(' stake authorization should be successfully created', () => {
    //     const params: StakeAuthorizationParams = {
    //         granter: testGranter,
    //         grantee: testGrantee,
    //         authorizationType: AuthorizationType.AUTHORIZATION_TYPE_DELEGATE,
    //         expiration
    //     }
    //     return newBluzelleClient({
    //         wallet,
    //         url: "http://localhost:26657"
    //     }).then((client) =>
    //         stakeAuthorizationTx(client, params)
    //             .then(() => client.queryClient.authz.Grants({
    //                 granter: testGranter,
    //                 grantee: testGrantee,
    //                 msgTypeUrl: "/cosmos.staking.v1beta1.MsgDelegate"
    //             })
    //             )
    //             .then((res) => {
    //                 expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization")
    //                 expect(StakeAuthorization.decode(res.grants[0].authorization?.value as any).authorizationType).to.equal(AuthorizationType.AUTHORIZATION_TYPE_DELEGATE)
    //             })
    //     )
    // });
    // it(' creat nft authorization should be successfully created', () => {
    //     const params: GenericAuthorizationParams = {
    //         granter: testGranter,
    //         grantee: testGrantee,
    //         msg: "/bluzelle.curium.nft.MsgCreateNFT",
    //         expiration
    //     }
    //     return newBluzelleClient({
    //         wallet,
    //         url: "http://localhost:26657"
    //     }).then((client) =>
    //         genericAuthorizationTx(client, params)
    //             .then(() => client.queryClient.authz.Grants({
    //                 granter: testGranter,
    //                 grantee: testGrantee,
    //                 msgTypeUrl: "/bluzelle.curium.nft.MsgCreateNFT"
    //             })
    //             )
    //             .then((res) => {
    //                 expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal("/bluzelle.curium.nft.MsgCreateNFT")
    //             })
    //     );
    // });
    // it(' print edition authorization should be successfully created', () => {
    //     const params: GenericAuthorizationParams = {
    //         granter: testGranter,
    //         grantee: testGrantee,
    //         msg: "/bluzelle.curium.nft.MsgPrintEdition",
    //         expiration
    //     }
    //     return newBluzelleClient({
    //         wallet,
    //         url: "http://localhost:26657"
    //     }).then((client) =>
    //         genericAuthorizationTx(client, params)
    //             .then(() => client.queryClient.authz.Grants({
    //                 granter: testGranter,
    //                 grantee: testGrantee,
    //                 msgTypeUrl: "/bluzelle.curium.nft.MsgPrintEdition"
    //             })
    //             )
    //             .then((res) => {
    //                 expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal("/bluzelle.curium.nft.MsgPrintEdition")
    //             })
    //     );
    // });
    // it(' transfer nft authorization should be successfully created', () => {
    //     const params: GenericAuthorizationParams = {
    //         granter: testGranter,
    //         grantee: testGrantee,
    //         msg: "/bluzelle.curium.nft.MsgTransferNFT",
    //         expiration
    //     }
    //     return newBluzelleClient({
    //         wallet,
    //         url: "http://localhost:26657"
    //     }).then((client) =>
    //         genericAuthorizationTx(client, params)
    //             .then(() => client.queryClient.authz.Grants({
    //                 granter: testGranter,
    //                 grantee: testGrantee,
    //                 msgTypeUrl: "/bluzelle.curium.nft.MsgTransferNFT"
    //             })
    //             )
    //             .then((res) => {
    //                 expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal("/bluzelle.curium.nft.MsgTransferNFT")
    //             })
    //     );
    // });
    // it(' create collection authorization should be successfully created', () => {
    //     const params: GenericAuthorizationParams = {
    //         granter: testGranter,
    //         grantee: testGrantee,
    //         msg: "/bluzelle.curium.nft.MsgCreateCollection",
    //         expiration
    //     }
    //     return newBluzelleClient({
    //         wallet,
    //         url: "http://localhost:26657"
    //     }).then((client) =>
    //         genericAuthorizationTx(client, params)
    //             .then(() => client.queryClient.authz.Grants({
    //                 granter: testGranter,
    //                 grantee: testGrantee,
    //                 msgTypeUrl: "/bluzelle.curium.nft.MsgCreateCollection"
    //             })
    //             )
    //             .then((res) => {
    //                 expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal("/bluzelle.curium.nft.MsgCreateCollection")
    //             })
    //     );
    // });
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
        yield (0, authz_1.genericAuthorizationTx)(client, gParams);
        const res = yield client.queryClient.authz.Grants({
            granter: testGranter,
            grantee: testGrantee,
            msgTypeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal"
        });
        (0, chai_1.expect)((_a = res.grants[0].authorization) === null || _a === void 0 ? void 0 : _a.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization");
        (0, chai_1.expect)(authz_2.GenericAuthorization.decode((_b = res.grants[0].authorization) === null || _b === void 0 ? void 0 : _b.value).msg).to.equal("/cosmos.gov.v1beta1.MsgSubmitProposal");
        yield (0, authz_1.revokeAuthorizationTx)(client, params);
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
});
