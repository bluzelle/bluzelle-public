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
const authz_2 = require("../src/curium/lib/generated/cosmos/staking/v1beta1/authz");
const authz_3 = require("../src/curium/lib/generated/cosmos/authz/v1beta1/authz");
const authz_4 = require("../src/curium/lib/generated/cosmos/staking/v1beta1/authz");
const tx_1 = require("../src/curium/lib/generated/cosmos/bank/v1beta1/tx");
const msg_1 = require("../src/msg");
const tx_2 = require("../src/tx");
const tx_3 = require("../src/curium/lib/generated/cosmos/crisis/v1beta1/tx");
const tx_4 = require("../src/curium/lib/generated/cosmos/staking/v1beta1/tx");
const sdk_1 = require("@bluzelle/sdk");
const tx_5 = require("../src/curium/lib/generated/nft/tx");
const Long = require('long');
const wallet = (0, index_2.newLocalWallet)("dune ten recall useful cross acquire twelve grass swamp erase domain interest install maze sword canoe runway there myth holiday virus north advance buyer", { coinType: 483 });
const granteeWallet = (0, index_2.newLocalWallet)("captain glare involve armed recipe stomach blush interest mistake decorate bomb praise cinnamon never opinion garage energy hire frost rather dose cherry trumpet spend", { coinType: 483 });
const testGranter = "bluzelle14xnzl6eav2gxdgtmadrrw8244ht4q9wlduhrex";
const testGrantee = "bluzelle1nuj2f4umg3qre662kn84py7w2vyjtu6kcz0kuw";
const expiration = new Date("1/1/2024");
describe("Authorization Module Test", function () {
    this.timeout(1800000);
    it('verifyInvarient msg authorization should be successfully created', () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: 0 /* MsgType.VERIFY_INVARIANT */,
            expiration
        };
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        yield (0, authz_1.genericAuthorizationTx)(client, params);
        const res = yield (0, authz_1.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 0 /* MsgType.VERIFY_INVARIANT */
        });
        if (res) {
            (0, chai_1.expect)((_a = res.grants[0].authorization) === null || _a === void 0 ? void 0 : _a.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization");
            (0, chai_1.expect)(authz_3.GenericAuthorization.decode((_b = res.grants[0].authorization) === null || _b === void 0 ? void 0 : _b.value).msg).to.equal(msg_1.MsgMapping[0 /* MsgType.VERIFY_INVARIANT */]);
            const eClient = yield (0, index_1.newBluzelleClient)({
                wallet: granteeWallet,
                url: "http://localhost:26657"
            });
            const eParams = {
                grantee: testGrantee,
                msgs: [{
                        typeUrl: msg_1.MsgMapping[0 /* MsgType.VERIFY_INVARIANT */],
                        value: tx_3.MsgVerifyInvariant.encode({
                            sender: testGrantee,
                            invariantModuleName: "bank",
                            invariantRoute: "total-supply"
                        }).finish()
                    }],
            };
            const res1 = yield (0, authz_1.executeAuthorizationTx)(eClient, eParams);
            (0, chai_1.expect)(res1.code).to.equal(0);
        }
    }));
    it('send grant should be successfully executed', () => __awaiter(this, void 0, void 0, function* () {
        const params = {
            grantee: testGrantee,
            msgs: [{
                    typeUrl: msg_1.MsgMapping[23 /* MsgType.SEND */],
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
        yield (0, authz_1.sendAuthorizationTx)(client, sParams);
        const eClient = yield (0, index_1.newBluzelleClient)({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });
        const originalBalance = yield (0, index_1.getAccountBalance)(client, testGrantee);
        yield (0, authz_1.executeAuthorizationTx)(eClient, params);
        const afterBalance = yield (0, index_1.getAccountBalance)(client, testGrantee);
        (0, chai_1.expect)(originalBalance - afterBalance).to.equal(100);
    }));
    it('delegate msg authorization should be successfully created and executed ', () => __awaiter(this, void 0, void 0, function* () {
        var _c, _d;
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            authorizationType: authz_2.AuthorizationType.AUTHORIZATION_TYPE_DELEGATE,
            expiration
        };
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        yield (0, authz_1.stakeAuthorizationTx)(client, params);
        const res = yield (0, authz_1.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 26 /* MsgType.DELEGATE */
        });
        if (res) {
            (0, chai_1.expect)((_c = res.grants[0].authorization) === null || _c === void 0 ? void 0 : _c.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization");
            (0, chai_1.expect)(authz_4.StakeAuthorization.decode((_d = res.grants[0].authorization) === null || _d === void 0 ? void 0 : _d.value).authorizationType).to.equal(authz_2.AuthorizationType.AUTHORIZATION_TYPE_DELEGATE);
            const eClient = yield (0, index_1.newBluzelleClient)({
                wallet: granteeWallet,
                url: "http://localhost:26657"
            });
            const testValAddress = (yield (0, index_1.getValidatorsInfo)(eClient)).validators[0].operatorAddress;
            const eParams = {
                grantee: testGrantee,
                msgs: [{
                        typeUrl: msg_1.MsgMapping[26 /* MsgType.DELEGATE */],
                        value: tx_4.MsgDelegate.encode({
                            delegatorAddress: testGrantee,
                            validatorAddress: testValAddress,
                            amount: {
                                denom: "ubnt",
                                amount: "100"
                            }
                        }).finish()
                    }],
            };
            let initAmount = 0;
            try {
                initAmount = (yield (0, sdk_1.getDelegation)(eClient, testGrantee, testValAddress)).delegation.shares;
            }
            catch (_e) { }
            const res1 = yield (0, authz_1.executeAuthorizationTx)(eClient, eParams);
            (0, chai_1.expect)(res1.code).to.equal(0);
            const afterAmount = (yield (0, sdk_1.getDelegation)(eClient, testGrantee, testValAddress)).delegation.shares;
            (0, chai_1.expect)(afterAmount - initAmount).to.equal(100);
        }
    }));
    it('undelegate msg authorization should be successfully created and executed', () => __awaiter(this, void 0, void 0, function* () {
        var _f, _g;
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            authorizationType: authz_2.AuthorizationType.AUTHORIZATION_TYPE_UNDELEGATE,
            expiration
        };
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        yield (0, authz_1.stakeAuthorizationTx)(client, params);
        const res = yield (0, authz_1.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 28 /* MsgType.UNDELEGATE */
        });
        if (res) {
            (0, chai_1.expect)((_f = res.grants[0].authorization) === null || _f === void 0 ? void 0 : _f.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization");
            (0, chai_1.expect)(authz_4.StakeAuthorization.decode((_g = res.grants[0].authorization) === null || _g === void 0 ? void 0 : _g.value).authorizationType).to.equal(authz_2.AuthorizationType.AUTHORIZATION_TYPE_UNDELEGATE);
            const eClient = yield (0, index_1.newBluzelleClient)({
                wallet: granteeWallet,
                url: "http://localhost:26657"
            });
            const testValAddress = (yield (0, index_1.getValidatorsInfo)(eClient)).validators[0].operatorAddress;
            const eParams = {
                grantee: testGrantee,
                msgs: [{
                        typeUrl: msg_1.MsgMapping[28 /* MsgType.UNDELEGATE */],
                        value: tx_4.MsgUndelegate.encode({
                            delegatorAddress: testGrantee,
                            validatorAddress: testValAddress,
                            amount: {
                                denom: "ubnt",
                                amount: "100"
                            }
                        }).finish()
                    }],
            };
            const initAmount = 0;
            const res1 = yield (0, authz_1.executeAuthorizationTx)(eClient, eParams);
            (0, chai_1.expect)(res1.code).to.equal(0);
            const afterAmount = (yield (0, sdk_1.getDelegation)(eClient, testGrantee, testValAddress)).delegation.shares;
            (0, chai_1.expect)(afterAmount - initAmount).to.equal(-100);
        }
    }));
    it('redelegate msg authorization should be successfully created and executed', () => __awaiter(this, void 0, void 0, function* () {
        var _h, _j;
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            authorizationType: authz_2.AuthorizationType.AUTHORIZATION_TYPE_REDELEGATE,
            expiration
        };
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        yield (0, authz_1.stakeAuthorizationTx)(client, params);
        const res = yield (0, authz_1.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 27 /* MsgType.REDELEGATE */
        });
        if (res) {
            (0, chai_1.expect)((_h = res.grants[0].authorization) === null || _h === void 0 ? void 0 : _h.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization");
            (0, chai_1.expect)(authz_4.StakeAuthorization.decode((_j = res.grants[0].authorization) === null || _j === void 0 ? void 0 : _j.value).authorizationType).to.equal(authz_2.AuthorizationType.AUTHORIZATION_TYPE_REDELEGATE);
            const eClient = yield (0, index_1.newBluzelleClient)({
                wallet: granteeWallet,
                url: "http://localhost:26657"
            });
            const testValidators = (yield (0, index_1.getValidatorsInfo)(eClient)).validators;
            if (testValidators.length >= 2) {
                const testValAddress1 = testValidators[0].operatorAddress;
                const testValAddress2 = testValidators[1].operatorAddress;
                const eParams = {
                    grantee: testGrantee,
                    msgs: [{
                            typeUrl: msg_1.MsgMapping[27 /* MsgType.REDELEGATE */],
                            value: tx_4.MsgBeginRedelegate.encode({
                                delegatorAddress: testGrantee,
                                validatorSrcAddress: testValAddress1,
                                validatorDstAddress: testValAddress2,
                                amount: {
                                    denom: "ubnt",
                                    amount: "100"
                                }
                            }).finish()
                        }],
                };
                let initAmount = 0;
                try {
                    initAmount = (yield (0, sdk_1.getDelegation)(eClient, testGrantee, testValAddress1)).delegation.shares;
                }
                catch (_k) { }
                const res1 = yield (0, authz_1.executeAuthorizationTx)(eClient, eParams);
                (0, chai_1.expect)(res1.code).to.equal(0);
                const afterAmount = (yield (0, sdk_1.getDelegation)(eClient, testGrantee, testValAddress1)).delegation.shares;
                (0, chai_1.expect)(afterAmount - initAmount).to.equal(-100);
            }
        }
    }));
    it(' create nft collection authorization should be successfully created and executed.', () => __awaiter(this, void 0, void 0, function* () {
        var _l;
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        const eClient = yield (0, index_1.newBluzelleClient)({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: 20 /* MsgType.CREATE_COLLECTION */,
            expiration
        };
        yield (0, authz_1.genericAuthorizationTx)(client, params);
        const eParams = {
            grantee: testGrantee,
            msgs: [{
                    typeUrl: msg_1.MsgMapping[20 /* MsgType.CREATE_COLLECTION */],
                    value: tx_5.MsgCreateCollection.encode({
                        sender: testGrantee,
                        symbol: "TMP",
                        name: "Temp",
                        uri: "https://temp.com",
                        isMutable: true,
                        updateAuthority: testGrantee
                    }).finish()
                }],
        };
        const res1 = yield (0, authz_1.executeAuthorizationTx)(eClient, eParams);
        (0, chai_1.expect)(res1.code).to.equal(0);
        const collectionRes = yield (0, sdk_1.getCollectionInfo)(eClient, 1);
        (0, chai_1.expect)((_l = collectionRes.collection) === null || _l === void 0 ? void 0 : _l.symbol).to.equal("TMP");
    }));
    it(' create nft authorization should be successfully created and executed.', () => __awaiter(this, void 0, void 0, function* () {
        var _m;
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        const eClient = yield (0, index_1.newBluzelleClient)({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });
        yield (0, tx_2.createCollection)(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 });
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: 13 /* MsgType.CREATE_NFT */,
            expiration
        };
        yield (0, authz_1.genericAuthorizationTx)(client, params);
        const testMetadata = {
            id: new Long(1),
            name: "TMPMeta",
            uri: 'https://tmp.com',
            sellerFeeBasisPoints: 100,
            primarySaleHappened: false,
            isMutable: true,
            creators: [{
                    address: testGrantee,
                    verified: true,
                    share: 10,
                }],
            metadataAuthority: testGrantee,
            mintAuthority: testGrantee,
            masterEdition: {
                supply: new Long(100000),
                maxSupply: new Long(1000000)
            }
        };
        const eParams = {
            grantee: testGrantee,
            msgs: [{
                    typeUrl: msg_1.MsgMapping[13 /* MsgType.CREATE_NFT */],
                    value: tx_5.MsgCreateNFT.encode({ sender: testGrantee, collId: new Long(1), metadata: testMetadata }).finish()
                }],
        };
        const res1 = yield (0, authz_1.executeAuthorizationTx)(eClient, eParams);
        (0, chai_1.expect)(res1.code).to.equal(0);
        const nft = (yield (0, sdk_1.getNftByOwner)(eClient, testGrantee)).nfts.pop();
        const id = nft.collId.toString() + ":" + nft.metadataId.toString() + ":" + nft.seq.toString();
        const nftInfo = yield (0, sdk_1.getNftInfo)(eClient, id);
        (0, chai_1.expect)((_m = nftInfo.metadata) === null || _m === void 0 ? void 0 : _m.name).to.equal("TMPMeta");
    }));
    it(' transfer nft authorization should be successfully created and executed.', () => __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        const eClient = yield (0, index_1.newBluzelleClient)({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });
        yield (0, tx_2.createCollection)(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 });
        const testMetadata = {
            id: new Long(1),
            name: "TMPMeta",
            uri: 'https://tmp1.com',
            sellerFeeBasisPoints: 100,
            primarySaleHappened: false,
            isMutable: true,
            creators: [{
                    address: testGrantee,
                    verified: true,
                    share: 10,
                }],
            metadataAuthority: testGrantee,
            mintAuthority: testGrantee,
            masterEdition: {
                supply: new Long(100000),
                maxSupply: new Long(1000000)
            }
        };
        yield (0, sdk_1.createNft)(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 });
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: 15 /* MsgType.TRANSFER_NFT */,
            expiration
        };
        yield (0, authz_1.genericAuthorizationTx)(client, params);
        const nft = (yield (0, sdk_1.getNftByOwner)(eClient, testGrantee)).nfts.pop();
        const id = nft.collId.toString() + ":" + nft.metadataId.toString() + ":" + nft.seq.toString();
        const eParams = {
            grantee: testGrantee,
            msgs: [{
                    typeUrl: msg_1.MsgMapping[15 /* MsgType.TRANSFER_NFT */],
                    value: tx_5.MsgTransferNFT.encode({ sender: testGrantee, id, newOwner: testGranter }).finish()
                }],
        };
        const res1 = yield (0, authz_1.executeAuthorizationTx)(eClient, eParams);
        (0, chai_1.expect)(res1.code).to.equal(0);
        const nftInfo = yield (0, sdk_1.getNftInfo)(eClient, id);
        if (nftInfo.nft) {
            (0, chai_1.expect)(nftInfo.nft.owner).to.equal(testGranter);
        }
    }));
    it(' updateMetadataAuthority authorization should be successfully created and executed.', () => __awaiter(this, void 0, void 0, function* () {
        var _o;
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        const eClient = yield (0, index_1.newBluzelleClient)({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });
        yield (0, tx_2.createCollection)(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 });
        const testMetadata = {
            id: new Long(1),
            name: "TMPMeta",
            uri: 'https://tmp1.com',
            sellerFeeBasisPoints: 100,
            primarySaleHappened: false,
            isMutable: true,
            creators: [{
                    address: testGrantee,
                    verified: true,
                    share: 10,
                }],
            metadataAuthority: testGrantee,
            mintAuthority: testGrantee,
            masterEdition: {
                supply: new Long(100000),
                maxSupply: new Long(1000000)
            }
        };
        yield (0, sdk_1.createNft)(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 });
        const nft = (yield (0, sdk_1.getNftByOwner)(client, testGrantee)).nfts.pop();
        const id = nft.collId.toString() + ":" + nft.metadataId.toString() + ":" + nft.seq.toString();
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: 18 /* MsgType.UPDATE_METADATA_AUTHORITY */,
            expiration
        };
        yield (0, authz_1.genericAuthorizationTx)(client, params);
        const eParams = {
            grantee: testGrantee,
            msgs: [{
                    typeUrl: msg_1.MsgMapping[18 /* MsgType.UPDATE_METADATA_AUTHORITY */],
                    value: tx_5.MsgUpdateMetadataAuthority.encode({
                        sender: testGrantee,
                        metadataId: new Long(nft.metadataId),
                        newAuthority: testGranter
                    }).finish()
                }],
        };
        const res1 = yield (0, authz_1.executeAuthorizationTx)(eClient, eParams);
        (0, chai_1.expect)(res1.code).to.equal(0);
        const updatedNftInfo = yield (0, sdk_1.getNftInfo)(eClient, id);
        if (updatedNftInfo.nft) {
            (0, chai_1.expect)((_o = updatedNftInfo.metadata) === null || _o === void 0 ? void 0 : _o.metadataAuthority).to.equal(testGranter);
        }
    }));
    it(' updateMetadata authorization should be successfully created and executed.', () => __awaiter(this, void 0, void 0, function* () {
        var _p;
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        const eClient = yield (0, index_1.newBluzelleClient)({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });
        yield (0, tx_2.createCollection)(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 });
        const testMetadata = {
            id: new Long(1),
            name: "TMPMeta",
            uri: 'https://tmp1.com',
            sellerFeeBasisPoints: 100,
            primarySaleHappened: false,
            isMutable: true,
            creators: [{
                    address: testGrantee,
                    verified: true,
                    share: 10,
                }],
            metadataAuthority: testGrantee,
            mintAuthority: testGrantee,
            masterEdition: {
                supply: new Long(100000),
                maxSupply: new Long(1000000)
            }
        };
        yield (0, sdk_1.createNft)(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 });
        const nft = (yield (0, sdk_1.getNftByOwner)(client, testGrantee)).nfts.pop();
        const id = nft.collId.toString() + ":" + nft.metadataId.toString() + ":" + nft.seq.toString();
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: 17 /* MsgType.UPDATE_METADATA */,
            expiration
        };
        yield (0, authz_1.genericAuthorizationTx)(client, params);
        const eParams = {
            grantee: testGrantee,
            msgs: [{
                    typeUrl: msg_1.MsgMapping[17 /* MsgType.UPDATE_METADATA */],
                    value: tx_5.MsgUpdateMetadata.encode({
                        sender: testGrantee,
                        metadataId: new Long(nft.metadataId),
                        name: "UpdatedTmpMeta",
                        uri: "https://tmp.com",
                        sellerFeeBasisPoints: 100,
                        creators: [{
                                address: testGranter,
                                verified: true,
                                share: 10,
                            }],
                    }).finish()
                }],
        };
        const res1 = yield (0, authz_1.executeAuthorizationTx)(eClient, eParams);
        (0, chai_1.expect)(res1.code).to.equal(0);
        const nftInfo = yield (0, sdk_1.getNftInfo)(eClient, id);
        if (nftInfo.nft) {
            (0, chai_1.expect)((_p = nftInfo.metadata) === null || _p === void 0 ? void 0 : _p.name).to.equal("UpdatedTmpMeta");
        }
    }));
    it(' updateMintAuthority authorization should be successfully created and executed.', () => __awaiter(this, void 0, void 0, function* () {
        var _q;
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        const eClient = yield (0, index_1.newBluzelleClient)({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });
        yield (0, tx_2.createCollection)(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 });
        const testMetadata = {
            id: new Long(1),
            name: "TMPMeta",
            uri: 'https://tmp1.com',
            sellerFeeBasisPoints: 100,
            primarySaleHappened: false,
            isMutable: true,
            creators: [{
                    address: testGrantee,
                    verified: true,
                    share: 10,
                }],
            metadataAuthority: testGrantee,
            mintAuthority: testGrantee,
            masterEdition: {
                supply: new Long(100000),
                maxSupply: new Long(1000000)
            }
        };
        yield (0, sdk_1.createNft)(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 });
        const nft = (yield (0, sdk_1.getNftByOwner)(client, testGrantee)).nfts.pop();
        const id = nft.collId.toString() + ":" + nft.metadataId.toString() + ":" + nft.seq.toString();
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: 19 /* MsgType.UPDATE_MINT_AUTHORITIY */,
            expiration
        };
        yield (0, authz_1.genericAuthorizationTx)(client, params);
        const eParams = {
            grantee: testGrantee,
            msgs: [{
                    typeUrl: msg_1.MsgMapping[19 /* MsgType.UPDATE_MINT_AUTHORITIY */],
                    value: tx_5.MsgUpdateMintAuthority.encode({
                        sender: testGrantee,
                        metadataId: new Long(nft.metadataId),
                        newAuthority: testGranter
                    }).finish()
                }],
        };
        const res1 = yield (0, authz_1.executeAuthorizationTx)(eClient, eParams);
        (0, chai_1.expect)(res1.code).to.equal(0);
        const nftInfo = yield (0, sdk_1.getNftInfo)(eClient, id);
        if (nftInfo.nft) {
            (0, chai_1.expect)((_q = nftInfo.metadata) === null || _q === void 0 ? void 0 : _q.mintAuthority).to.equal(testGranter);
        }
    }));
    it(' printEdition authorization should be successfully created and executed.', () => __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        const eClient = yield (0, index_1.newBluzelleClient)({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });
        yield (0, tx_2.createCollection)(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 });
        const testMetadata = {
            id: new Long(1),
            name: "TMPMeta",
            uri: 'https://tmp1.com',
            sellerFeeBasisPoints: 100,
            primarySaleHappened: false,
            isMutable: true,
            creators: [{
                    address: testGrantee,
                    verified: true,
                    share: 10,
                }],
            metadataAuthority: testGrantee,
            mintAuthority: testGrantee,
            masterEdition: {
                supply: new Long(100000),
                maxSupply: new Long(1000000)
            }
        };
        yield (0, sdk_1.createNft)(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 });
        const nft = (yield (0, sdk_1.getNftByOwner)(client, testGrantee)).nfts.pop();
        const id = nft.collId.toString() + ":" + nft.metadataId.toString() + ":" + nft.seq.toString();
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: 14 /* MsgType.PRINT_EDITION */,
            expiration
        };
        yield (0, authz_1.genericAuthorizationTx)(client, params);
        const eParams = {
            grantee: testGrantee,
            msgs: [{
                    typeUrl: msg_1.MsgMapping[14 /* MsgType.PRINT_EDITION */],
                    value: tx_5.MsgPrintEdition.encode({
                        sender: testGrantee,
                        metadataId: new Long(nft.metadataId),
                        collId: new Long(1),
                        owner: testGrantee
                    }).finish()
                }],
        };
        const oldInfo = yield (0, sdk_1.getNftInfo)(eClient, id);
        const res1 = yield (0, authz_1.executeAuthorizationTx)(eClient, eParams);
        (0, chai_1.expect)(res1.code).to.equal(0);
        const nftInfo = yield (0, sdk_1.getNftInfo)(eClient, id);
        if (nftInfo.nft) {
            (0, chai_1.expect)(nftInfo.metadata.masterEdition.supply - oldInfo.metadata.masterEdition.supply).to.equal(1);
        }
    }));
    it(' signMetadata authorization should be successfully created and executed.', () => __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, index_1.newBluzelleClient)({
            wallet,
            url: "http://localhost:26657"
        });
        const eClient = yield (0, index_1.newBluzelleClient)({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });
        yield (0, tx_2.createCollection)(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 });
        const testMetadata = {
            id: new Long(1),
            name: "TMPMeta",
            uri: 'https://tmp1.com',
            sellerFeeBasisPoints: 100,
            primarySaleHappened: false,
            isMutable: true,
            creators: [{
                    address: testGrantee,
                    verified: true,
                    share: 10,
                }],
            metadataAuthority: testGrantee,
            mintAuthority: testGrantee,
            masterEdition: {
                supply: new Long(100000),
                maxSupply: new Long(1000000)
            }
        };
        yield (0, sdk_1.createNft)(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 });
        const nft = (yield (0, sdk_1.getNftByOwner)(client, testGrantee)).nfts.pop();
        const id = nft.collId.toString() + ":" + nft.metadataId.toString() + ":" + nft.seq.toString();
        const params = {
            granter: testGranter,
            grantee: testGrantee,
            msg: 16 /* MsgType.SIGN_METADATA */,
            expiration
        };
        yield (0, authz_1.genericAuthorizationTx)(client, params);
        const eParams = {
            grantee: testGrantee,
            msgs: [{
                    typeUrl: msg_1.MsgMapping[16 /* MsgType.SIGN_METADATA */],
                    value: tx_5.MsgSignMetadata.encode({
                        sender: testGrantee,
                        metadataId: new Long(nft.metadataId),
                    }).finish()
                }],
        };
        const res1 = yield (0, authz_1.executeAuthorizationTx)(eClient, eParams);
        (0, chai_1.expect)(res1.code).to.equal(0);
    }));
    it('grant should be successfully revoked', () => __awaiter(this, void 0, void 0, function* () {
        var _r, _s;
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
        yield (0, authz_1.genericAuthorizationTx)(client, gParams);
        const res = yield (0, authz_1.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 8 /* MsgType.SUBMIT_PROPOSAL */
        });
        if (res) {
            (0, chai_1.expect)((_r = res.grants[0].authorization) === null || _r === void 0 ? void 0 : _r.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization");
            (0, chai_1.expect)(authz_3.GenericAuthorization.decode((_s = res.grants[0].authorization) === null || _s === void 0 ? void 0 : _s.value).msg).to.equal(msg_1.MsgMapping[8 /* MsgType.SUBMIT_PROPOSAL */]);
        }
        yield (0, authz_1.revokeAuthorizationTx)(client, params);
        const res1 = yield (0, authz_1.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 8 /* MsgType.SUBMIT_PROPOSAL */
        });
        (0, chai_1.expect)(res1).to.match(/NotFound/);
    }));
});
