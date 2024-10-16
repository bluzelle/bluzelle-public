import {
    BluzelleDelegationResponse,
    BluzelleValidatorsResponse,
    createCollection,
    createNft,
    delegate,
    executeAuthorization,
    getAccountBalance,
    getCollectionInfo,
    getDelegation,
    getNftByOwner,
    getNftInfo,
    getValidatorsInfo,
    grantAuthorization,
    mint,
    newBluzelleClient,
    newLocalWallet,
    queryAuthorizations,
    revokeAuthorization
} from '../../index';
import { expect } from 'chai';
import { BluzelleClient } from '../../core';
import {
    AuthorizationType,
    StakeAuthorization
} from '../../curium/lib/generated/cosmos/staking/v1beta1/authz';
import { GenericAuthorization } from '../../curium/lib/generated/cosmos/authz/v1beta1/authz';
import { createCtx, withCtxAwait } from '@scottburch/with-context';
import { passThroughAwait } from 'promise-passthrough';
import { Metadata } from '../../curium/lib/generated/nft/nft';
import { GrantType, msgMapping, MsgType } from './authzTypes';
import { QueryCollectionResponse } from '../../curium/lib/generated/nft/query';
import { stopSwarm } from '@bluzelle/testing/src/swarmUtils';
import { defaultSwarmConfig, startSwarmWithClient } from '@bluzelle/testing';
import * as bip39 from 'bip39';
import { parseNumToLong } from '../../shared/parse';
import { BluzelleQueryGrantsResponse } from './query';

describe("authz module", function () {
    this.timeout(1_800_000)

    let testGranter: string;
    let testGrantee: string;
    const expiration = new Date("1/1/2099");

    let client: BluzelleClient;
    let eClient: BluzelleClient;
    let testValAddress: string;


    beforeEach(() =>
        stopSwarm()
            .then(() => startSwarmWithClient(({...defaultSwarmConfig})))
            .then(ctx => ({
                client: ctx.bzSdk,
                testGranter: ctx.bzSdk.address
            }))
            .then(passThroughAwait(ctx => {
                client = ctx.client;
                testGranter = ctx.testGranter;
            }))
            .then(withCtxAwait('mnemonic', () => Promise.resolve(bip39.generateMnemonic(256))))
            .then(ctx =>
                newBluzelleClient({
                    url: 'localhost:26667',
                    wallet: newLocalWallet(ctx.mnemonic)
                })
                    .then(cli => {
                        testGrantee = cli.address;
                        eClient = cli;
                        return cli;
                    })
                    .then(getValidatorsInfo)
                    .then((info: BluzelleValidatorsResponse) => {
                        testValAddress = info.validators[0].operatorAddress;
                        return ctx;
                    })
            )
            .then(ctx => mint(ctx.client, testGrantee))
    );


    it('verifyInvarient msg authorization should be successfully created', () =>
        grantAuthorization(client, testGranter, testGrantee, {
            grantType: GrantType.GENERIC,
            msgType: MsgType.VERIFY_INVARIANT,
            expiration
        }, {
            maxGas: 1000000, gasPrice: 0.002
        })
            .then(() => queryAuthorizations(client, {
                granter: testGranter,
                grantee: testGrantee,
                msg: MsgType.VERIFY_INVARIANT
            }))
            .then((res: BluzelleQueryGrantsResponse) => {
                expect(res.grants[0]?.authorization.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization");
                expect(GenericAuthorization.decode(res.grants[0]?.authorization.value).msg).to.equal(msgMapping[MsgType.VERIFY_INVARIANT]);
            })
    );

    it('send grant should be successfully executed', () =>
        grantAuthorization(client, testGranter, testGrantee, {
            grantType: GrantType.SEND,
            spendLimit: [{
                denom: "ubnt",
                amount: "100"
            }],
            expiration
        }, {
            maxGas: 1000000, gasPrice: 0.002
        })
            .then(() => getAccountBalance(client, testGranter))
            .then((balance: number) => createCtx("beforeBalance", () => balance))
            .then(withCtxAwait("result", () => executeAuthorization(eClient, testGrantee, [{
                msgType: MsgType.SEND,
                params: {
                    fromAddress: testGranter,
                    toAddress: testGrantee,
                    amount: [{
                        denom: "ubnt",
                        amount: "100"
                    }]
                }
            }], {
                maxGas: 1000000, gasPrice: 0.002
            })))
            .then(withCtxAwait("afterBalance", () => getAccountBalance(client, testGranter)))
            .then((ctx: any) => {
                expect(ctx.beforeBalance - ctx.afterBalance).to.equal(100)
            })
    );

    it('delegate msg authorization should be successfully created and executed ', () =>
        grantAuthorization(client, testGranter, testGrantee, {
            grantType: GrantType.STAKE,
            stakeAuthorization: {
                authorizationType: AuthorizationType.AUTHORIZATION_TYPE_DELEGATE,
                allowList: {
                    address: [testValAddress]
                }
            },
            expiration
        }, {
            maxGas: 1000000, gasPrice: 0.002
        })
            .then(() => queryAuthorizations(client, { granter: testGranter, grantee: testGrantee, msg: MsgType.DELEGATE }))
            .then((res: BluzelleQueryGrantsResponse) => {
                expect(res.grants[0]?.authorization.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization")
                expect(StakeAuthorization.decode(res.grants[0]?.authorization.value).authorizationType).to.equal(AuthorizationType.AUTHORIZATION_TYPE_DELEGATE)
            })
            .then(() => getDelegation(eClient, testGranter, testValAddress)
                .then((delegation: BluzelleDelegationResponse) => createCtx("initialAmount", () => delegation.delegation.shares))
                .catch(() => createCtx("initialAmount", () => 0))
            )
            .then(withCtxAwait("result", () => executeAuthorization(eClient, testGrantee, [{
                msgType: MsgType.DELEGATE,
                params: {
                    delegatorAddress: testGranter,
                    validatorAddress: testValAddress,
                    amount: {
                        denom: "ubnt",
                        amount: "100"
                    }
                }
            }], { maxGas: 1000000, gasPrice: 0.002 })))
            .then(withCtxAwait("delegationInfo", () => getDelegation(client, testGranter, testValAddress)))
            .then((ctx: any) => {
                expect(ctx.delegationInfo.delegation.shares - ctx.initialAmount).to.equal(100);
            })
    );

    it('undelegate msg authorization should be successfully created and executed', () =>
        grantAuthorization(client, testGranter, testGrantee, {
            grantType: GrantType.STAKE,
            stakeAuthorization: {
                authorizationType: AuthorizationType.AUTHORIZATION_TYPE_DELEGATE,
                allowList:{
                    address: [testValAddress]
                }
            },
            expiration
        }, {
            maxGas: 1000000, gasPrice: 0.002
        })
            .then(() => executeAuthorization(eClient, testGrantee, [{
                msgType: MsgType.DELEGATE,
                params: {
                    delegatorAddress: testGranter,
                    validatorAddress: testValAddress,
                    amount: {
                        denom: "ubnt",
                        amount: "100"
                    }
                }
            }], { maxGas: 1000000, gasPrice: 0.002 }))
            .then(() => grantAuthorization(client, testGranter, testGrantee, {
                grantType: GrantType.STAKE,
                stakeAuthorization: {
                    authorizationType: AuthorizationType.AUTHORIZATION_TYPE_UNDELEGATE,
                    allowList: {
                        address: [testValAddress]
                    }
                },
                expiration
            }, { maxGas: 1000000, gasPrice: 0.002 }))
            .then(() => queryAuthorizations(client, {
                granter: testGranter,
                grantee: testGrantee,
                msg: MsgType.UNDELEGATE
            }))
            .then((res: BluzelleQueryGrantsResponse) => {
                expect(res.grants[0]?.authorization.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization")
                expect(StakeAuthorization.decode(res.grants[0]?.authorization.value).authorizationType).to.equal(AuthorizationType.AUTHORIZATION_TYPE_UNDELEGATE)
            })
            .then(() => getDelegation(eClient, testGranter, testValAddress)
                .then((delegation: BluzelleDelegationResponse) => createCtx("initialAmount", () => delegation.delegation.shares))
                .catch(() => createCtx("initialAmount", () => 0))
            )
            .then(withCtxAwait("result", () => executeAuthorization(eClient, testGrantee, [{
                msgType: MsgType.UNDELEGATE,
                params: {
                    delegatorAddress: testGranter,
                    validatorAddress: testValAddress,
                    amount: {
                        denom: "ubnt",
                        amount: "100"
                    }
                }
            }], { maxGas: 1000000, gasPrice: 0.002 })))
            .then(withCtxAwait("delegationInfo", () => getDelegation(client, testGranter, testValAddress)))
            .then((ctx: any) => expect(ctx.delegationInfo.delegation.shares - ctx.initialAmount).to.equal(-100))
    );

    it('redelegate msg authorization should be successfully created and executed', () =>
        grantAuthorization(client, testGranter, testGrantee, {
            grantType: GrantType.STAKE,
            stakeAuthorization: {
                authorizationType: AuthorizationType.AUTHORIZATION_TYPE_REDELEGATE
            },
            expiration
        }, { maxGas: 1000000, gasPrice: 0.002 })
            .then(() => queryAuthorizations(client, {
                granter: testGranter,
                grantee: testGrantee,
                msg: MsgType.REDELEGATE
            }))
            .then((res: BluzelleQueryGrantsResponse) => {
                expect(res.grants[0]?.authorization.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization")
                expect(StakeAuthorization.decode(res.grants[0]?.authorization.value).authorizationType).to.equal(AuthorizationType.AUTHORIZATION_TYPE_REDELEGATE)
            })
            .then(() => getValidatorsInfo(eClient))
            .then((info: BluzelleValidatorsResponse) => createCtx("validators", () => info.validators))
            .then((ctx: any) => {
                if (ctx.validators.length >= 2) {
                    const testValAddress1 = ctx.validators[0].operatorAddress
                    const testValAddress2 = ctx.validators[1].operatorAddress
                    return delegate(client, testGranter, testValAddress1, 100, { maxGas: 1000000, gasPrice: 0.002 })
                        .then(() => getDelegation(client, testGranter, testValAddress1))
                        .then((delegationInfo: BluzelleDelegationResponse) => createCtx("initialAmount", () => delegationInfo.delegation.shares))
                        .then(withCtxAwait("result", () => executeAuthorization(eClient, testGrantee, [
                            {
                                msgType: MsgType.REDELEGATE,
                                params: {
                                    validatorDstAddress: testValAddress2,
                                    validatorSrcAddress: testValAddress1,
                                    delegatorAddress: testGranter
                                }
                            }
                        ], { maxGas: 1000000, gasPrice: 0.002 })))
                        .then(withCtxAwait("delegationInfo", () => getDelegation(eClient, testGranter, testValAddress1)))
                        .then((ctx: any) => expect(ctx.delegationInfo.delegation.shares - ctx.initialAmount).to.equal(-100))
                }
            })
    );


    it(' create nft collection authorization should be successfully created and executed.', () =>
        grantAuthorization(client, testGranter, testGrantee, {
            grantType: GrantType.GENERIC,
            msgType: MsgType.CREATE_COLLECTION,
            expiration
        }, { maxGas: 1000000, gasPrice: 0.002 })
            .then(()=>executeAuthorization(eClient, testGrantee, [{
                msgType: MsgType.CREATE_COLLECTION,
                params: {
                    sender: testGranter,
                    symbol: "TMP",
                    name: "Temp",
                    uri: "https://temp.com",
                    mutableUri: '',
                    isMutable: true,
                    updateAuthority: testGranter
                }
            }], { maxGas: 1000000, gasPrice: 0.002 }))
            .then(() => getCollectionInfo(eClient, 1))
            .then((collectionRes: QueryCollectionResponse) => {
                expect(collectionRes.collection?.symbol).to.equal("TMP");
            })
    );

    it(' create nft authorization should be successfully created and executed.', () => {
        const testMetadata: Metadata = {
            id: parseNumToLong(1),
            name: "TMPMeta",
            uri: 'https://tmp.com',
            mutableUri: '',
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
                supply: parseNumToLong(100_000),
                maxSupply: parseNumToLong(1_000_000)
            }
        }
        return createCollection(client, {
            sender: client.address,
            name: 'Temp',
            symbol: 'TMP',
            uri: 'http://temp.com',
            isMutable: true,
            updateAuthority: client.address
            },
            { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => grantAuthorization(client, testGranter, testGrantee, {
                grantType: GrantType.GENERIC,
                msgType: MsgType.CREATE_NFT,
                expiration
            }, { maxGas: 1000000, gasPrice: 0.002 }))
            .then(() => executeAuthorization(eClient, testGrantee, [
                {
                    msgType: MsgType.CREATE_NFT,
                    params: {
                        sender: testGranter, collId: parseNumToLong(1), metadata: testMetadata
                    }
                }
            ], { maxGas: 1000000, gasPrice: 0.002 }))
            .then(() => getNftByOwner(eClient, testGranter))
            .then((nftInfo: any) => {
                const nft = nftInfo.nfts.pop();
                const id = nft?.collId.toString() + ":" + nft?.metadataId.toString() + ":" + nft?.seq.toString();
                return getNftInfo(eClient, id);
            })
            .then((info) => {
                expect(info.metadata?.name).to.equal("TMPMeta");
            })
    });

    it(' transfer nft authorization should be successfully created and executed.', () => {
        const testMetadata: any = {
            id: parseNumToLong(1),
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
                supply: parseNumToLong(100_000),
                maxSupply: parseNumToLong(1_000_000)
            }
        }
        return createCollection(client, {
            sender: client.address,
            name: 'Temp',
            symbol: 'TMP',
            uri: 'http://temp.com',
            isMutable: true,
            updateAuthority: client.address
        },{ maxGas: 100000000, gasPrice: 0.002 })
            .then(() => createNft(client, { collId: 1, metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => grantAuthorization(client, testGranter, testGrantee, {
                grantType: GrantType.GENERIC,
                msgType: MsgType.TRANSFER_NFT,
                expiration
            }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => getNftByOwner(eClient, testGranter))
            .then((nftInfo: any) => createCtx("nftId", () => {
                const nft = nftInfo.nfts.pop();
                return nft?.collId.toString() + ":" + nft?.metadataId.toString() + ":" + nft?.seq.toString();
            }))
            .then(passThroughAwait((ctx) => executeAuthorization(eClient, testGrantee, [{
                msgType: MsgType.TRANSFER_NFT,
                params: {
                    sender: testGranter, id: ctx.nftId, newOwner: testGrantee
                }
            }], { maxGas: 100000000, gasPrice: 0.002 })))
            .then((ctx) => getNftInfo(eClient, ctx.nftId))
            .then((nftInfo: any) => {
                expect(nftInfo.nft?.owner).to.equal(testGrantee);
            })
    });


    it(' updateMetadataAuthority authorization should be successfully created and executed.', () => {
        const testMetadata: any = {
            id: parseNumToLong(1),
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
                supply: parseNumToLong(100_000),
                maxSupply: parseNumToLong(1_000_000)
            }
        }
        return createCollection(client, {
            sender: client.address,
            name: 'Temp',
            symbol: 'TMP',
            uri: 'http://temp.com',
            isMutable: true,
            updateAuthority: client.address
        }, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => createNft(client, { collId: 1, metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => grantAuthorization(client, testGranter, testGrantee, {
                grantType: GrantType.GENERIC,
                msgType: MsgType.UPDATE_METADATA_AUTHORITY,
                expiration
            }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => getNftByOwner(eClient, testGranter))
            .then((nftInfo: any) => createCtx("nftInfo", () => {
                const nft = nftInfo.nfts.pop();
                return {
                    id: nft?.collId.toString() + ":" + nft?.metadataId.toString() + ":" + nft?.seq.toString(),
                    nft: nft
                };
            }))
            .then(passThroughAwait((ctx) => executeAuthorization(eClient, testGrantee, [{
                msgType: MsgType.UPDATE_METADATA_AUTHORITY,
                params: {
                    sender: testGranter,
                    metadataId: parseNumToLong(ctx.nftInfo.nft.metadataId),
                    newAuthority: testGrantee
                }
            }], { maxGas: 100000000, gasPrice: 0.002 })))
            .then((ctx) => getNftInfo(eClient, ctx.nftInfo.id))
            .then((updatedNftInfo) => {
                expect(updatedNftInfo.metadata?.metadataAuthority).to.equal(testGrantee);
            })
    });


    it(' updateMetadata authorization should be successfully created and executed.', () => {
        const testMetadata: any = {
            id: parseNumToLong(1),
            name: "TMPMeta",
            uri: 'https://tmp1.com',
            sellerFeeBasisPoints: 100,
            primarySaleHappened: false,
            isMutable: true,
            creators: [{
                address: testGranter,
                verified: true,
                share: 10,
            }],
            metadataAuthority: testGranter,
            mintAuthority: testGranter,
            masterEdition: {
                supply: parseNumToLong(100_000),
                maxSupply: parseNumToLong(1_000_000)
            }
        }
        return createCollection(client, {
            sender: client.address,
            name: 'Temp',
            symbol: 'TMP',
            uri: 'http://temp.com',
            isMutable: true,
            updateAuthority: client.address
        }, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => createNft(client, { collId: 1, metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => grantAuthorization(client, testGranter, testGrantee, {
                grantType: GrantType.GENERIC,
                msgType: MsgType.UPDATE_METADATA,
                expiration
            }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => getNftByOwner(eClient, testGranter))
            .then((nftInfo: any) => createCtx("nftInfo", () => {
                const nft = nftInfo.nfts.pop();
                return {
                    id: nft?.collId.toString() + ":" + nft?.metadataId.toString() + ":" + nft?.seq.toString(),
                    nft: nft
                };
            }))
            .then(passThroughAwait((ctx) => executeAuthorization(eClient, testGrantee, [{
                msgType: MsgType.UPDATE_METADATA,
                params: {
                    sender: testGranter,
                    metadataId: parseNumToLong(ctx.nftInfo.nft.metadataId),
                    name: "UpdatedTmpMeta",
                    uri: "https://tmp.com",
                    mutableUri: '',
                    sellerFeeBasisPoints: 100,
                    creators: [{
                        address: testGranter,
                        verified: true,
                        share: 10,
                    }],
                }
            }], { maxGas: 100000000, gasPrice: 0.002 })))
            .then((ctx) => getNftInfo(eClient, ctx.nftInfo.id))
            .then((updatedNftInfo) => {
                expect(updatedNftInfo.metadata?.name).to.equal("UpdatedTmpMeta");
            })
    });

    it(' updateMintAuthority authorization should be successfully created and executed.', () => {
        const testMetadata: any = {
            id: parseNumToLong(1),
            name: "TMPMeta",
            uri: 'https://tmp1.com',
            sellerFeeBasisPoints: 100,
            primarySaleHappened: false,
            isMutable: true,
            creators: [{
                address: testGranter,
                verified: true,
                share: 10,
            }],
            metadataAuthority: testGranter,
            mintAuthority: testGranter,
            masterEdition: {
                supply: parseNumToLong(100_000),
                maxSupply: parseNumToLong(1_000_000)
            }
        }
        return createCollection(client, {
            sender: client.address,
            name: 'Temp',
            symbol: 'TMP',
            uri: 'http://temp.com',
            isMutable: true,
            updateAuthority: client.address
        },{ maxGas: 100000000, gasPrice: 0.002 })
            .then(() => createNft(client, { collId: 1, metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => grantAuthorization(client, testGranter, testGrantee, {
                grantType: GrantType.GENERIC,
                msgType: MsgType.UPDATE_MINT_AUTHORITIY,
                expiration
            }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => getNftByOwner(eClient, testGranter))
            .then((nftInfo: any) => createCtx("nftInfo", () => {
                const nft = nftInfo.nfts.pop();
                return {
                    id: nft?.collId.toString() + ":" + nft?.metadataId.toString() + ":" + nft?.seq.toString(),
                    nft: nft
                };
            }))
            .then(passThroughAwait((ctx) => executeAuthorization(eClient, testGrantee, [{
                msgType: MsgType.UPDATE_MINT_AUTHORITIY,
                params: {
                    sender: testGranter,
                    metadataId: parseNumToLong(ctx.nftInfo.nft.metadataId),
                    newAuthority: testGrantee
                }
            }], { maxGas: 100000000, gasPrice: 0.002 })))
            .then((ctx) => getNftInfo(eClient, ctx.nftInfo.id))
            .then((updatedNftInfo) => {
                expect(updatedNftInfo.metadata?.mintAuthority).to.equal(testGrantee);
            })
    });

    it(' printEdition authorization should be successfully created and executed.', () => {
        const testMetadata: any = {
            id: parseNumToLong(1),
            name: "TMPMeta",
            uri: 'https://tmp1.com',
            sellerFeeBasisPoints: 100,
            primarySaleHappened: false,
            isMutable: true,
            creators: [{
                address: testGranter,
                verified: true,
                share: 10,
            }],
            metadataAuthority: testGranter,
            mintAuthority: testGranter,
            masterEdition: {
                supply: parseNumToLong(100_000),
                maxSupply: parseNumToLong(1_000_000)
            }
        }
        return createCollection(client,{
            sender: client.address,
            name: 'Temp',
            symbol: 'TMP',
            uri: 'http://temp.com',
            isMutable: true,
            updateAuthority: client.address
        }, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => createNft(client, { collId: 1, metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => grantAuthorization(client, testGranter, testGrantee, {
                grantType: GrantType.GENERIC,
                msgType: MsgType.PRINT_EDITION,
                expiration
            }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => getNftByOwner(eClient, testGranter))
            .then((nftInfo: any) => createCtx("nftInfo", () => {
                const nft = nftInfo.nfts.pop();
                return {
                    id: nft?.collId.toString() + ":" + nft?.metadataId.toString() + ":" + nft?.seq.toString(),
                    nft: nft
                };
            }))
            .then(withCtxAwait("oldInfo", (ctx) => getNftInfo(eClient, ctx.nftInfo.id)))
            .then(passThroughAwait((ctx) => executeAuthorization(eClient, testGrantee, [{
                msgType: MsgType.PRINT_EDITION,
                params: {
                    sender: testGranter,
                    metadataId: parseNumToLong(ctx.nftInfo.nft.metadataId),
                    collId: parseNumToLong(1),
                    owner: testGranter
                }
            }], { maxGas: 100000000, gasPrice: 0.002 })))
            .then((ctx: any) => getNftInfo(eClient, ctx.nftInfo.id)
                .then((updatedNftInfo: any) => {
                    expect(ctx.oldInfo.metadata.masterEdition.supply - updatedNftInfo.metadata.masterEdition.supply).to.equal(-1);
                })
            )
    });


    it(' signMetadata authorization should be successfully created and executed.', () => {
        const testMetadata: any = {
            id: parseNumToLong(1),
            name: "TMPMeta",
            uri: 'https://tmp1.com',
            sellerFeeBasisPoints: 100,
            primarySaleHappened: false,
            isMutable: true,
            creators: [{
                address: testGranter,
                verified: true,
                share: 10,
            }],
            metadataAuthority: testGranter,
            mintAuthority: testGranter,
            masterEdition: {
                supply: parseNumToLong(100_000),
                maxSupply: parseNumToLong(1_000_000)
            }
        }
        return createCollection(client, {
            sender: client.address,
            name: 'Temp',
            symbol: 'TMP',
            uri: 'http://temp.com',
            isMutable: true,
            updateAuthority: client.address
        }, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => createNft(client, { collId: 1, metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => grantAuthorization(client, testGranter, testGrantee, {
                grantType: GrantType.GENERIC,
                msgType: MsgType.SIGN_METADATA,
                expiration
            }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => getNftByOwner(eClient, testGranter))
            .then((nftInfo: any) => createCtx("nftInfo", () => {
                const nft = nftInfo.nfts.pop();
                return {
                    id: nft?.collId.toString() + ":" + nft?.metadataId.toString() + ":" + nft?.seq.toString(),
                    nft: nft
                };
            }))
            .then(passThroughAwait((ctx) => executeAuthorization(eClient, testGrantee, [{
                        msgType: MsgType.SIGN_METADATA,
                        params: {
                            sender: testGranter,
                            metadataId: parseNumToLong(ctx.nftInfo.nft.metadataId),
                        }
                    }], { maxGas: 100000000, gasPrice: 0.002 })
                        .then((res: any) => {
                            expect(res.code).to.equal(0);
                        })
                )
            )
    });

    it('grant should be successfully revoked', () =>
        grantAuthorization(client, testGranter, testGrantee, {
            grantType: GrantType.GENERIC,
            msgType: MsgType.SUBMIT_PROPOSAL,
            expiration
        }, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => queryAuthorizations(client, {
                granter: testGranter,
                grantee: testGrantee,
                msg: MsgType.SUBMIT_PROPOSAL
            }))
            .then((res: BluzelleQueryGrantsResponse) => {
                expect(res.grants[0]?.authorization.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization")
                expect(GenericAuthorization.decode(res.grants[0]?.authorization.value).msg).to.equal(msgMapping[MsgType.SUBMIT_PROPOSAL])
            })
            .then(() => revokeAuthorization(client, testGranter, testGrantee, MsgType.SUBMIT_PROPOSAL, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => queryAuthorizations(client, {
                granter: testGranter,
                grantee: testGrantee,
                msg: MsgType.SUBMIT_PROPOSAL
            }))
            .then((res: any) => expect(res.grants.length).to.equal(0))
    );

});

