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
const tx_1 = require("../src/tx");
const sdk_1 = require("@bluzelle/sdk");
const with_context_1 = require("@scottburch/with-context");
const promise_passthrough_1 = require("promise-passthrough");
const authzMappings_1 = require("../src/authzMappings");
const Long = require('long');
describe("Authorization Module Test", function () {
    this.timeout(1800000);
    const wallet = (0, index_2.newLocalWallet)("dune ten recall useful cross acquire twelve grass swamp erase domain interest install maze sword canoe runway there myth holiday virus north advance buyer", { coinType: 483 });
    const granteeWallet = (0, index_2.newLocalWallet)("captain glare involve armed recipe stomach blush interest mistake decorate bomb praise cinnamon never opinion garage energy hire frost rather dose cherry trumpet spend", { coinType: 483 });
    const testGranter = "bluzelle14xnzl6eav2gxdgtmadrrw8244ht4q9wlduhrex";
    const testGrantee = "bluzelle1nuj2f4umg3qre662kn84py7w2vyjtu6kcz0kuw";
    const expiration = new Date("1/1/2024");
    let client;
    let eClient;
    let testValAddress;
    beforeEach(() => (0, index_1.newBluzelleClient)({
        wallet,
        url: "http://localhost:26657"
    })
        .then((cli => {
        client = cli;
        return (0, index_1.newBluzelleClient)({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });
    }))
        .then((cli) => {
        eClient = cli;
        return (0, index_1.getValidatorsInfo)(cli);
    })
        .then((info) => {
        testValAddress = info.validators[0].operatorAddress;
    }));
    it('verifyInvarient msg authorization should be successfully created', () => {
        return (0, tx_1.grant)(client, testGranter, testGrantee, {
            grantType: 0 /* GrantType.GENERIC */,
            params: {
                msg: authzMappings_1.msgMapping[0 /* MsgType.VERIFY_INVARIANT */],
            },
            expiration
        }, {
            maxGas: 1000000, gasPrice: 0.002
        })
            .then(() => (0, authz_1.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 0 /* MsgType.VERIFY_INVARIANT */
        }))
            .then((res) => {
            var _a, _b;
            (0, chai_1.expect)((_a = res.grants[0].authorization) === null || _a === void 0 ? void 0 : _a.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization");
            (0, chai_1.expect)(authz_3.GenericAuthorization.decode((_b = res.grants[0].authorization) === null || _b === void 0 ? void 0 : _b.value).msg).to.equal(authzMappings_1.msgMapping[0 /* MsgType.VERIFY_INVARIANT */]);
        });
    });
    it('send grant should be successfully executed', () => __awaiter(this, void 0, void 0, function* () {
        return (0, tx_1.grant)(client, testGranter, testGrantee, {
            grantType: 1 /* GrantType.SEND */,
            params: {
                spendLimit: [{
                        denom: "ubnt",
                        amount: "100"
                    }]
            },
            expiration
        }, {
            maxGas: 1000000, gasPrice: 0.002
        })
            .then(() => (0, index_1.getAccountBalance)(client, testGrantee))
            .then((balance) => (0, with_context_1.createCtx)("beforeBalance", () => balance))
            .then((0, with_context_1.withCtxAwait)("result", () => (0, tx_1.executeGrant)(eClient, testGrantee, [{
                msgType: 23 /* MsgType.SEND */,
                params: {
                    fromAddress: testGrantee,
                    toAddress: testGranter,
                    amount: [{
                            denom: "ubnt",
                            amount: "100"
                        }]
                }
            }], {
            maxGas: 1000000, gasPrice: 0.002
        })))
            .then((0, with_context_1.withCtxAwait)("afterBalance", () => (0, index_1.getAccountBalance)(client, testGrantee)))
            .then((ctx) => {
            (0, chai_1.expect)(ctx.beforeBalance - ctx.afterBalance).to.equal(100);
        });
    }));
    it('delegate msg authorization should be successfully created and executed ', () => {
        return (0, tx_1.grant)(client, testGranter, testGrantee, {
            grantType: 2 /* GrantType.STAKE */,
            params: {
                authorizationType: authz_2.AuthorizationType.AUTHORIZATION_TYPE_DELEGATE,
            },
            expiration
        }, {
            maxGas: 1000000, gasPrice: 0.002
        })
            .then((res) => {
            return (0, authz_1.queryGrant)(client, {
                granter: testGranter,
                grantee: testGrantee,
                msg: 26 /* MsgType.DELEGATE */
            });
        })
            .then((res) => {
            var _a, _b;
            (0, chai_1.expect)((_a = res.grants[0].authorization) === null || _a === void 0 ? void 0 : _a.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization");
            (0, chai_1.expect)(authz_4.StakeAuthorization.decode((_b = res.grants[0].authorization) === null || _b === void 0 ? void 0 : _b.value).authorizationType).to.equal(authz_2.AuthorizationType.AUTHORIZATION_TYPE_DELEGATE);
        })
            .then(() => (0, sdk_1.getDelegation)(eClient, testGrantee, testValAddress)
            .then((delegation) => (0, with_context_1.createCtx)("initialAmount", () => delegation.delegation.shares))
            .catch((e) => {
            return (0, with_context_1.createCtx)("initialAmount", () => 0);
        }))
            .then((0, with_context_1.withCtxAwait)("result", () => (0, tx_1.executeGrant)(eClient, testGrantee, [{
                msgType: 26 /* MsgType.DELEGATE */,
                params: {
                    delegatorAddress: testGrantee,
                    validatorAddress: testValAddress,
                    amount: {
                        denom: "ubnt",
                        amount: "100"
                    }
                }
            }], { maxGas: 1000000, gasPrice: 0.002 })))
            .then((0, with_context_1.withCtxAwait)("delegationInfo", () => (0, sdk_1.getDelegation)(client, testGrantee, testValAddress)))
            .then((ctx) => {
            (0, chai_1.expect)(ctx.delegationInfo.delegation.shares - ctx.initialAmount).to.equal(100);
        });
    });
    it('undelegate msg authorization should be successfully created and executed', () => __awaiter(this, void 0, void 0, function* () {
        return (0, tx_1.grant)(client, testGranter, testGrantee, {
            grantType: 2 /* GrantType.STAKE */,
            params: {
                authorizationType: authz_2.AuthorizationType.AUTHORIZATION_TYPE_UNDELEGATE
            },
            expiration
        }, { maxGas: 1000000, gasPrice: 0.002 })
            .then(() => (0, authz_1.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 28 /* MsgType.UNDELEGATE */
        }))
            .then((res) => {
            var _a, _b;
            (0, chai_1.expect)((_a = res.grants[0].authorization) === null || _a === void 0 ? void 0 : _a.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization");
            (0, chai_1.expect)(authz_4.StakeAuthorization.decode((_b = res.grants[0].authorization) === null || _b === void 0 ? void 0 : _b.value).authorizationType).to.equal(authz_2.AuthorizationType.AUTHORIZATION_TYPE_UNDELEGATE);
        })
            .then(() => (0, sdk_1.getDelegation)(eClient, testGrantee, testValAddress)
            .then((delegation) => (0, with_context_1.createCtx)("initialAmount", () => delegation.delegation.shares))
            .catch((e) => {
            return (0, with_context_1.createCtx)("initialAmount", () => 0);
        }))
            .then((0, with_context_1.withCtxAwait)("result", () => (0, tx_1.executeGrant)(eClient, testGrantee, [{
                msgType: 28 /* MsgType.UNDELEGATE */,
                params: {
                    delegatorAddress: testGrantee,
                    validatorAddress: testValAddress,
                    amount: {
                        denom: "ubnt",
                        amount: "100"
                    }
                }
            }], { maxGas: 1000000, gasPrice: 0.002 })))
            .then((0, with_context_1.withCtxAwait)("delegationInfo", () => (0, sdk_1.getDelegation)(client, testGrantee, testValAddress)))
            .then((ctx) => {
            (0, chai_1.expect)(ctx.delegationInfo.delegation.shares - ctx.initialAmount).to.equal(-100);
        });
    }));
    it('redelegate msg authorization should be successfully created and executed', () => {
        return (0, tx_1.grant)(client, testGranter, testGrantee, {
            grantType: 2 /* GrantType.STAKE */,
            params: {
                authorizationType: authz_2.AuthorizationType.AUTHORIZATION_TYPE_REDELEGATE
            },
            expiration
        }, { maxGas: 1000000, gasPrice: 0.002 })
            .then(() => (0, authz_1.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 27 /* MsgType.REDELEGATE */
        }))
            .then((res) => {
            var _a, _b;
            (0, chai_1.expect)((_a = res.grants[0].authorization) === null || _a === void 0 ? void 0 : _a.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization");
            (0, chai_1.expect)(authz_4.StakeAuthorization.decode((_b = res.grants[0].authorization) === null || _b === void 0 ? void 0 : _b.value).authorizationType).to.equal(authz_2.AuthorizationType.AUTHORIZATION_TYPE_REDELEGATE);
        })
            .then(() => (0, index_1.getValidatorsInfo)(eClient))
            .then((info) => (0, with_context_1.createCtx)("validators", () => info.validators))
            .then((ctx) => {
            if (ctx.validators.length >= 2) {
                const testValAddress1 = ctx.validators[0].operatorAddress;
                const testValAddress2 = ctx.validators[1].operatorAddress;
                return (0, tx_1.delegate)(eClient, testGrantee, testValAddress1, 100, { maxGas: 1000000, gasPrice: 0.002 })
                    .then(() => (0, sdk_1.getDelegation)(eClient, testGrantee, testValAddress1))
                    .then((delegationInfo) => (0, with_context_1.createCtx)("initialAmount", () => delegationInfo.delegation.shares))
                    .then((0, with_context_1.withCtxAwait)("result", () => (0, tx_1.executeGrant)(eClient, testGrantee, [
                    {
                        msgType: 27 /* MsgType.REDELEGATE */,
                        params: {
                            validatorDstAddress: testValAddress2,
                            validatorSrcAddress: testValAddress1,
                            delegatorAddress: testGrantee
                        }
                    }
                ], { maxGas: 1000000, gasPrice: 0.002 })))
                    .then((0, with_context_1.withCtxAwait)("delegationInfo", () => (0, sdk_1.getDelegation)(eClient, testGrantee, testValAddress1)))
                    .then((ctx) => {
                    (0, chai_1.expect)(ctx.delegationInfo.delegation.shares - ctx.initialAmount).to.equal(-100);
                });
            }
        });
    });
    it(' create nft collection authorization should be successfully created and executed.', () => {
        return (0, tx_1.grant)(client, testGranter, testGrantee, {
            grantType: 0 /* GrantType.GENERIC */,
            params: {
                msg: authzMappings_1.msgMapping[20 /* MsgType.CREATE_COLLECTION */]
            },
            expiration
        }, { maxGas: 1000000, gasPrice: 0.002 })
            .then((0, tx_1.executeGrant)(eClient, testGrantee, [{
                msgType: 20 /* MsgType.CREATE_COLLECTION */,
                params: {
                    sender: testGrantee,
                    symbol: "TMP",
                    name: "Temp",
                    uri: "https://temp.com",
                    isMutable: true,
                    updateAuthority: testGrantee
                }
            }], { maxGas: 1000000, gasPrice: 0.002 }))
            .then(() => (0, sdk_1.getCollectionInfo)(eClient, 1))
            .then((collectionRes) => {
            var _a;
            (0, chai_1.expect)((_a = collectionRes.collection) === null || _a === void 0 ? void 0 : _a.symbol).to.equal("TMP");
        });
    });
    it(' create nft authorization should be successfully created and executed.', () => {
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
        return (0, tx_1.createCollection)(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => (0, tx_1.grant)(client, testGranter, testGrantee, {
            grantType: 0 /* GrantType.GENERIC */,
            params: {
                msg: authzMappings_1.msgMapping[13 /* MsgType.CREATE_NFT */]
            },
            expiration
        }, { maxGas: 1000000, gasPrice: 0.002 }))
            .then(() => (0, tx_1.executeGrant)(eClient, testGrantee, [
            {
                msgType: 13 /* MsgType.CREATE_NFT */,
                params: {
                    sender: testGrantee, collId: new Long(1), metadata: testMetadata
                }
            }
        ], { maxGas: 1000000, gasPrice: 0.002 }))
            .then(() => (0, sdk_1.getNftByOwner)(eClient, testGrantee))
            .then((nftInfo) => {
            const nft = nftInfo.nfts.pop();
            const id = (nft === null || nft === void 0 ? void 0 : nft.collId.toString()) + ":" + (nft === null || nft === void 0 ? void 0 : nft.metadataId.toString()) + ":" + (nft === null || nft === void 0 ? void 0 : nft.seq.toString());
            return (0, sdk_1.getNftInfo)(eClient, id);
        })
            .then((info) => {
            var _a;
            (0, chai_1.expect)((_a = info.metadata) === null || _a === void 0 ? void 0 : _a.name).to.equal("TMPMeta");
        });
    });
    it(' transfer nft authorization should be successfully created and executed.', () => {
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
        return (0, tx_1.createCollection)(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => (0, sdk_1.createNft)(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => (0, tx_1.grant)(client, testGranter, testGrantee, {
            grantType: 0 /* GrantType.GENERIC */,
            params: {
                msg: authzMappings_1.msgMapping[15 /* MsgType.TRANSFER_NFT */]
            },
            expiration
        }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => (0, sdk_1.getNftByOwner)(eClient, testGrantee))
            .then((nftInfo) => (0, with_context_1.createCtx)("nftId", () => {
            const nft = nftInfo.nfts.pop();
            return (nft === null || nft === void 0 ? void 0 : nft.collId.toString()) + ":" + (nft === null || nft === void 0 ? void 0 : nft.metadataId.toString()) + ":" + (nft === null || nft === void 0 ? void 0 : nft.seq.toString());
        }))
            .then((0, promise_passthrough_1.passThroughAwait)((ctx) => (0, tx_1.executeGrant)(eClient, testGrantee, [{
                msgType: 15 /* MsgType.TRANSFER_NFT */,
                params: {
                    sender: testGrantee, id: ctx.nftId, newOwner: testGranter
                }
            }], { maxGas: 100000000, gasPrice: 0.002 })))
            .then((ctx) => (0, sdk_1.getNftInfo)(eClient, ctx.nftId))
            .then((nftInfo) => {
            var _a;
            (0, chai_1.expect)((_a = nftInfo.nft) === null || _a === void 0 ? void 0 : _a.owner).to.equal(testGranter);
        });
    });
    it(' updateMetadataAuthority authorization should be successfully created and executed.', () => {
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
        return (0, tx_1.createCollection)(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => (0, sdk_1.createNft)(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => (0, tx_1.grant)(client, testGranter, testGrantee, {
            grantType: 0 /* GrantType.GENERIC */,
            params: {
                msg: authzMappings_1.msgMapping[18 /* MsgType.UPDATE_METADATA_AUTHORITY */]
            },
            expiration
        }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => (0, sdk_1.getNftByOwner)(eClient, testGrantee))
            .then((nftInfo) => (0, with_context_1.createCtx)("nftInfo", () => {
            const nft = nftInfo.nfts.pop();
            return {
                id: (nft === null || nft === void 0 ? void 0 : nft.collId.toString()) + ":" + (nft === null || nft === void 0 ? void 0 : nft.metadataId.toString()) + ":" + (nft === null || nft === void 0 ? void 0 : nft.seq.toString()),
                nft: nft
            };
        }))
            .then((0, promise_passthrough_1.passThroughAwait)((ctx) => (0, tx_1.executeGrant)(eClient, testGrantee, [{
                msgType: 18 /* MsgType.UPDATE_METADATA_AUTHORITY */,
                params: {
                    sender: testGrantee,
                    metadataId: new Long(ctx.nftInfo.nft.metadataId),
                    newAuthority: testGranter
                }
            }], { maxGas: 100000000, gasPrice: 0.002 })))
            .then((ctx) => (0, sdk_1.getNftInfo)(eClient, ctx.nftInfo.id))
            .then((updatedNftInfo) => {
            var _a;
            (0, chai_1.expect)((_a = updatedNftInfo.metadata) === null || _a === void 0 ? void 0 : _a.metadataAuthority).to.equal(testGranter);
        });
    });
    it(' updateMetadata authorization should be successfully created and executed.', () => __awaiter(this, void 0, void 0, function* () {
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
        return (0, tx_1.createCollection)(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => (0, sdk_1.createNft)(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => (0, tx_1.grant)(client, testGranter, testGrantee, {
            grantType: 0 /* GrantType.GENERIC */,
            params: {
                msg: authzMappings_1.msgMapping[17 /* MsgType.UPDATE_METADATA */]
            },
            expiration
        }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => (0, sdk_1.getNftByOwner)(eClient, testGrantee))
            .then((nftInfo) => (0, with_context_1.createCtx)("nftInfo", () => {
            const nft = nftInfo.nfts.pop();
            return {
                id: (nft === null || nft === void 0 ? void 0 : nft.collId.toString()) + ":" + (nft === null || nft === void 0 ? void 0 : nft.metadataId.toString()) + ":" + (nft === null || nft === void 0 ? void 0 : nft.seq.toString()),
                nft: nft
            };
        }))
            .then((0, promise_passthrough_1.passThroughAwait)((ctx) => (0, tx_1.executeGrant)(eClient, testGrantee, [{
                msgType: 17 /* MsgType.UPDATE_METADATA */,
                params: {
                    sender: testGrantee,
                    metadataId: new Long(ctx.nftInfo.nft.metadataId),
                    name: "UpdatedTmpMeta",
                    uri: "https://tmp.com",
                    sellerFeeBasisPoints: 100,
                    creators: [{
                            address: testGranter,
                            verified: true,
                            share: 10,
                        }],
                }
            }], { maxGas: 100000000, gasPrice: 0.002 })))
            .then((ctx) => (0, sdk_1.getNftInfo)(eClient, ctx.nftInfo.id))
            .then((updatedNftInfo) => {
            var _a;
            (0, chai_1.expect)((_a = updatedNftInfo.metadata) === null || _a === void 0 ? void 0 : _a.name).to.equal("UpdatedTmpMeta");
        });
    }));
    it(' updateMintAuthority authorization should be successfully created and executed.', () => __awaiter(this, void 0, void 0, function* () {
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
        return (0, tx_1.createCollection)(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => (0, sdk_1.createNft)(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => (0, tx_1.grant)(client, testGranter, testGrantee, {
            grantType: 0 /* GrantType.GENERIC */,
            params: {
                msg: authzMappings_1.msgMapping[19 /* MsgType.UPDATE_MINT_AUTHORITIY */]
            },
            expiration
        }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => (0, sdk_1.getNftByOwner)(eClient, testGrantee))
            .then((nftInfo) => (0, with_context_1.createCtx)("nftInfo", () => {
            const nft = nftInfo.nfts.pop();
            return {
                id: (nft === null || nft === void 0 ? void 0 : nft.collId.toString()) + ":" + (nft === null || nft === void 0 ? void 0 : nft.metadataId.toString()) + ":" + (nft === null || nft === void 0 ? void 0 : nft.seq.toString()),
                nft: nft
            };
        }))
            .then((0, promise_passthrough_1.passThroughAwait)((ctx) => (0, tx_1.executeGrant)(eClient, testGrantee, [{
                msgType: 19 /* MsgType.UPDATE_MINT_AUTHORITIY */,
                params: {
                    sender: testGrantee,
                    metadataId: new Long(ctx.nftInfo.nft.metadataId),
                    newAuthority: testGranter
                }
            }], { maxGas: 100000000, gasPrice: 0.002 })))
            .then((ctx) => (0, sdk_1.getNftInfo)(eClient, ctx.nftInfo.id))
            .then((updatedNftInfo) => {
            var _a;
            (0, chai_1.expect)((_a = updatedNftInfo.metadata) === null || _a === void 0 ? void 0 : _a.mintAuthority).to.equal(testGranter);
        });
    }));
    it(' printEdition authorization should be successfully created and executed.', () => __awaiter(this, void 0, void 0, function* () {
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
        return (0, tx_1.createCollection)(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => (0, sdk_1.createNft)(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => (0, tx_1.grant)(client, testGranter, testGrantee, {
            grantType: 0 /* GrantType.GENERIC */,
            params: {
                msg: authzMappings_1.msgMapping[14 /* MsgType.PRINT_EDITION */]
            },
            expiration
        }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => (0, sdk_1.getNftByOwner)(eClient, testGrantee))
            .then((nftInfo) => (0, with_context_1.createCtx)("nftInfo", () => {
            const nft = nftInfo.nfts.pop();
            return {
                id: (nft === null || nft === void 0 ? void 0 : nft.collId.toString()) + ":" + (nft === null || nft === void 0 ? void 0 : nft.metadataId.toString()) + ":" + (nft === null || nft === void 0 ? void 0 : nft.seq.toString()),
                nft: nft
            };
        }))
            .then((0, with_context_1.withCtxAwait)("oldInfo", (ctx) => (0, sdk_1.getNftInfo)(eClient, ctx.nftInfo.id)))
            .then((0, promise_passthrough_1.passThroughAwait)((ctx) => (0, tx_1.executeGrant)(eClient, testGrantee, [{
                msgType: 14 /* MsgType.PRINT_EDITION */,
                params: {
                    sender: testGrantee,
                    metadataId: new Long(ctx.nftInfo.nft.metadataId),
                    collId: new Long(1),
                    owner: testGrantee
                }
            }], { maxGas: 100000000, gasPrice: 0.002 })))
            .then((ctx) => (0, sdk_1.getNftInfo)(eClient, ctx.nftInfo.id)
            .then((updatedNftInfo) => {
            (0, chai_1.expect)(ctx.oldInfo.metadata.masterEdition.supply - updatedNftInfo.metadata.masterEdition.supply).to.equal(-1);
        }));
    }));
    it(' signMetadata authorization should be successfully created and executed.', () => __awaiter(this, void 0, void 0, function* () {
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
        return (0, tx_1.createCollection)(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => (0, sdk_1.createNft)(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => (0, tx_1.grant)(client, testGranter, testGrantee, {
            grantType: 0 /* GrantType.GENERIC */,
            params: {
                msg: authzMappings_1.msgMapping[16 /* MsgType.SIGN_METADATA */]
            },
            expiration
        }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => (0, sdk_1.getNftByOwner)(eClient, testGrantee))
            .then((nftInfo) => (0, with_context_1.createCtx)("nftInfo", () => {
            const nft = nftInfo.nfts.pop();
            return {
                id: (nft === null || nft === void 0 ? void 0 : nft.collId.toString()) + ":" + (nft === null || nft === void 0 ? void 0 : nft.metadataId.toString()) + ":" + (nft === null || nft === void 0 ? void 0 : nft.seq.toString()),
                nft: nft
            };
        }))
            .then((0, promise_passthrough_1.passThroughAwait)((ctx) => (0, tx_1.executeGrant)(eClient, testGrantee, [{
                msgType: 16 /* MsgType.SIGN_METADATA */,
                params: {
                    sender: testGrantee,
                    metadataId: new Long(ctx.nftInfo.nft.metadataId),
                }
            }], { maxGas: 100000000, gasPrice: 0.002 })
            .then((res) => {
            (0, chai_1.expect)(res.code).to.equal(0);
        })));
    }));
    it('grant should be successfully revoked', () => {
        return (0, tx_1.grant)(client, testGranter, testGrantee, {
            grantType: 0 /* GrantType.GENERIC */,
            params: {
                msg: authzMappings_1.msgMapping[8 /* MsgType.SUBMIT_PROPOSAL */]
            },
            expiration
        }, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => (0, authz_1.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 8 /* MsgType.SUBMIT_PROPOSAL */
        }))
            .then((res) => {
            var _a, _b;
            (0, chai_1.expect)((_a = res.grants[0].authorization) === null || _a === void 0 ? void 0 : _a.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization");
            (0, chai_1.expect)(authz_3.GenericAuthorization.decode((_b = res.grants[0].authorization) === null || _b === void 0 ? void 0 : _b.value).msg).to.equal(authzMappings_1.msgMapping[8 /* MsgType.SUBMIT_PROPOSAL */]);
        })
            .then(() => (0, tx_1.revoke)(client, testGranter, testGrantee, authzMappings_1.msgMapping[8 /* MsgType.SUBMIT_PROPOSAL */], { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => (0, authz_1.queryGrant)(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: 8 /* MsgType.SUBMIT_PROPOSAL */
        }))
            .then((res) => (0, chai_1.expect)(res).to.match(/NotFound/));
    });
});
