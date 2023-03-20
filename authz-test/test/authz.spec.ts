import { BluzelleDelegationResponse, BluzelleValidatorsResponse, getAccountBalance, getValidators, getValidatorsInfo, newBluzelleClient } from '../src/index';
import { newLocalWallet } from '../src/index';
import {
    queryGrant
} from "../src/authz";
import { QueryGrantsResponse } from "../src/curium/lib/generated/cosmos/authz/v1beta1/query";
import { expect } from "chai";
import { BluzelleClient } from "../src/sdk";
import { AuthorizationType } from "../src/curium/lib/generated/cosmos/staking/v1beta1/authz";
import { GenericAuthorization, Grant } from "../src/curium/lib/generated/cosmos/authz/v1beta1/authz";
import { StakeAuthorization } from "../src/curium/lib/generated/cosmos/staking/v1beta1/authz";
import { createCollection, delegate, executeGrant, grant, revoke } from "../src/tx";
import { createNft, getCollectionInfo, getDelegation, getNftByOwner, getNftInfo } from "@bluzelle/sdk";
import { createCtx, withCtxAwait } from "@scottburch/with-context";
import { passThroughAwait } from "promise-passthrough";
import { Metadata } from "../src/curium/lib/generated/nft/nft";
import { GrantType, msgMapping, MsgType } from "../src/authzMappings";
import { QueryCollectionResponse } from "../src/curium/lib/generated/nft/query";
const Long = require('long');

describe("Authorization Module Test", function () {
    this.timeout(1_800_000)
    const wallet = newLocalWallet(
        "dune ten recall useful cross acquire twelve grass swamp erase domain interest install maze sword canoe runway there myth holiday virus north advance buyer",
        { coinType: 483 }
    );

    const granteeWallet = newLocalWallet(
        "captain glare involve armed recipe stomach blush interest mistake decorate bomb praise cinnamon never opinion garage energy hire frost rather dose cherry trumpet spend",
        { coinType: 483 }
    )

    const testGranter = "bluzelle14xnzl6eav2gxdgtmadrrw8244ht4q9wlduhrex";
    const testGrantee = "bluzelle1nuj2f4umg3qre662kn84py7w2vyjtu6kcz0kuw";
    const expiration = new Date("1/1/2024");

    let client: BluzelleClient;
    let eClient: BluzelleClient;
    let testValAddress: string;
    beforeEach(() =>
        newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
            .then((cli => {
                client = cli;
                return newBluzelleClient({
                    wallet: granteeWallet,
                    url: "http://localhost:26657"
                })
            }))
            .then((cli) => {
                eClient = cli;
                return getValidatorsInfo(cli);
            })
            .then((info) => {
                testValAddress = info.validators[0].operatorAddress;
            })
    );

    it('verifyInvarient msg authorization should be successfully created', () => {
        return grant(client, testGranter, testGrantee, {
            grantType: GrantType.GENERIC,
            msgType: MsgType.VERIFY_INVARIANT,
            expiration
        }, {
            maxGas: 1000000, gasPrice: 0.002
        })
            .then(() => queryGrant(client, {
                granter: testGranter,
                grantee: testGrantee,
                msg: MsgType.VERIFY_INVARIANT
            }))
            .then((res: QueryGrantsResponse) => {
                expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization")
                expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal(msgMapping[MsgType.VERIFY_INVARIANT])
            })
    });

    it('send grant should be successfully executed', () =>
        grant(client, testGranter, testGrantee, {
            grantType: GrantType.SEND,
            spendLimit: [{
                denom: "ubnt",
                amount: "100"
            }],
            expiration
        }, {
            maxGas: 1000000, gasPrice: 0.002
        })
            .then(() => getAccountBalance(client, testGrantee))
            .then((balance: any) => createCtx("beforeBalance", () => balance))
            .then(withCtxAwait("result", () => executeGrant(eClient, testGrantee, [{
                msgType: MsgType.SEND,
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
            .then(withCtxAwait("afterBalance", () => getAccountBalance(client, testGrantee)))
            .then((ctx: any) => {
                expect(ctx.beforeBalance - ctx.afterBalance).to.equal(100)
            })
    );

    it('delegate msg authorization should be successfully created and executed ', () => {
        return grant(client, testGranter, testGrantee, {
            grantType: GrantType.STAKE,
            stakeAuthorization: {
                authorizationType: AuthorizationType.AUTHORIZATION_TYPE_DELEGATE,
            },
            expiration
        }, {
            maxGas: 1000000, gasPrice: 0.002
        })
            .then((res: any) => {
                return queryGrant(client, {
                    granter: testGranter,
                    grantee: testGrantee,
                    msg: MsgType.DELEGATE
                })
            })
            .then((res: QueryGrantsResponse) => {
                expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization")
                expect(StakeAuthorization.decode(res.grants[0].authorization?.value as any).authorizationType).to.equal(AuthorizationType.AUTHORIZATION_TYPE_DELEGATE)
            })
            .then(() => getDelegation(eClient, testGrantee, testValAddress)
                .then((delegation: BluzelleDelegationResponse) => createCtx("initialAmount", () => delegation.delegation.shares))
                .catch((e: any) => {
                    return createCtx("initialAmount", () => 0)
                })
            )
            .then(withCtxAwait("result", () => executeGrant(eClient, testGrantee, [{
                msgType: MsgType.DELEGATE,
                params: {
                    delegatorAddress: testGrantee,
                    validatorAddress: testValAddress,
                    amount: {
                        denom: "ubnt",
                        amount: "100"
                    }
                }
            }], { maxGas: 1000000, gasPrice: 0.002 })))
            .then(withCtxAwait("delegationInfo", () => getDelegation(client, testGrantee, testValAddress)))
            .then((ctx: any) => {
                expect(ctx.delegationInfo.delegation.shares - ctx.initialAmount).to.equal(100);
            })
    });

    it('undelegate msg authorization should be successfully created and executed', async () => {
        return grant(client, testGranter, testGrantee, {
            grantType: GrantType.STAKE,
            stakeAuthorization: {
                authorizationType: AuthorizationType.AUTHORIZATION_TYPE_UNDELEGATE
            },
            expiration
        }, { maxGas: 1000000, gasPrice: 0.002 })
            .then(() => queryGrant(client, {
                granter: testGranter,
                grantee: testGrantee,
                msg: MsgType.UNDELEGATE
            }))
            .then((res: QueryGrantsResponse) => {
                expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization")
                expect(StakeAuthorization.decode(res.grants[0].authorization?.value as any).authorizationType).to.equal(AuthorizationType.AUTHORIZATION_TYPE_UNDELEGATE)
            })
            .then(() => getDelegation(eClient, testGrantee, testValAddress)
                .then((delegation: BluzelleDelegationResponse) => createCtx("initialAmount", () => delegation.delegation.shares))
                .catch((e: any) => {
                    return createCtx("initialAmount", () => 0)
                })
            )
            .then(withCtxAwait("result", () => executeGrant(eClient, testGrantee, [{
                msgType: MsgType.UNDELEGATE,
                params: {
                    delegatorAddress: testGrantee,
                    validatorAddress: testValAddress,
                    amount: {
                        denom: "ubnt",
                        amount: "100"
                    }
                }
            }], { maxGas: 1000000, gasPrice: 0.002 })))
            .then(withCtxAwait("delegationInfo", () => getDelegation(client, testGrantee, testValAddress)))
            .then((ctx: any) => {
                expect(ctx.delegationInfo.delegation.shares - ctx.initialAmount).to.equal(-100);
            })
    });

    it('redelegate msg authorization should be successfully created and executed', () => {
        return grant(client, testGranter, testGrantee, {
            grantType: GrantType.STAKE,
            stakeAuthorization: {
                authorizationType: AuthorizationType.AUTHORIZATION_TYPE_REDELEGATE
            },
            expiration
        }, { maxGas: 1000000, gasPrice: 0.002 })
            .then(() => queryGrant(client, {
                granter: testGranter,
                grantee: testGrantee,
                msg: MsgType.REDELEGATE
            }))
            .then((res: QueryGrantsResponse) => {
                expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization")
                expect(StakeAuthorization.decode(res.grants[0].authorization?.value as any).authorizationType).to.equal(AuthorizationType.AUTHORIZATION_TYPE_REDELEGATE)
            })
            .then(() => getValidatorsInfo(eClient))
            .then((info: BluzelleValidatorsResponse) => createCtx("validators", () => info.validators))
            .then((ctx: any) => {
                if (ctx.validators.length >= 2) {
                    const testValAddress1 = ctx.validators[0].operatorAddress
                    const testValAddress2 = ctx.validators[1].operatorAddress
                    return delegate(eClient, testGrantee, testValAddress1, 100, { maxGas: 1000000, gasPrice: 0.002 })
                        .then(() => getDelegation(eClient, testGrantee, testValAddress1))
                        .then((delegationInfo: BluzelleDelegationResponse) => createCtx("initialAmount", () => delegationInfo.delegation.shares))
                        .then(withCtxAwait("result", () => executeGrant(eClient, testGrantee, [
                            {
                                msgType: MsgType.REDELEGATE,
                                params: {
                                    validatorDstAddress: testValAddress2,
                                    validatorSrcAddress: testValAddress1,
                                    delegatorAddress: testGrantee
                                }
                            }
                        ], { maxGas: 1000000, gasPrice: 0.002 })))
                        .then(withCtxAwait("delegationInfo", () => getDelegation(eClient, testGrantee, testValAddress1)))
                        .then((ctx: any) => {
                            expect(ctx.delegationInfo.delegation.shares - ctx.initialAmount).to.equal(-100);
                        })
                }
            })
    });


    it(' create nft collection authorization should be successfully created and executed.', () => {
        return grant(client, testGranter, testGrantee, {
            grantType: GrantType.GENERIC,
            msgType: MsgType.CREATE_COLLECTION,
            expiration
        }, { maxGas: 1000000, gasPrice: 0.002 })
            .then(executeGrant(eClient, testGrantee, [{
                msgType: MsgType.CREATE_COLLECTION,
                params: {
                    sender: testGrantee,
                    symbol: "TMP",
                    name: "Temp",
                    uri: "https://temp.com",
                    isMutable: true,
                    updateAuthority: testGrantee
                }
            }], { maxGas: 1000000, gasPrice: 0.002 }))
            .then(() => getCollectionInfo(eClient, 1))
            .then((collectionRes: QueryCollectionResponse) => {
                expect(collectionRes.collection?.symbol).to.equal("TMP");
            })
    });

    it(' create nft authorization should be successfully created and executed.', () => {
        const testMetadata: Metadata = {
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
                supply: new Long(100_000),
                maxSupply: new Long(1_000_000)
            }
        }
        return createCollection(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address,
            { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => grant(client, testGranter, testGrantee, {
                grantType: GrantType.GENERIC,
                msgType: MsgType.CREATE_NFT,
                expiration
            }, { maxGas: 1000000, gasPrice: 0.002 }))
            .then(() => executeGrant(eClient, testGrantee, [
                {
                    msgType: MsgType.CREATE_NFT,
                    params: {
                        sender: testGrantee, collId: new Long(1), metadata: testMetadata
                    }
                }
            ], { maxGas: 1000000, gasPrice: 0.002 }))
            .then(() => getNftByOwner(eClient, testGrantee))
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
                supply: new Long(100_000),
                maxSupply: new Long(1_000_000)
            }
        }
        return createCollection(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => createNft(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => grant(client, testGranter, testGrantee, {
                grantType: GrantType.GENERIC,
                msgType: MsgType.TRANSFER_NFT,
                expiration
            }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => getNftByOwner(eClient, testGrantee))
            .then((nftInfo: any) => createCtx("nftId", () => {
                const nft = nftInfo.nfts.pop();
                return nft?.collId.toString() + ":" + nft?.metadataId.toString() + ":" + nft?.seq.toString();
            }))
            .then(passThroughAwait((ctx) => executeGrant(eClient, testGrantee, [{
                msgType: MsgType.TRANSFER_NFT,
                params: {
                    sender: testGrantee, id: ctx.nftId, newOwner: testGranter
                }
            }], { maxGas: 100000000, gasPrice: 0.002 })))
            .then((ctx) => getNftInfo(eClient, ctx.nftId))
            .then((nftInfo: any) => {
                expect(nftInfo.nft?.owner).to.equal(testGranter);
            })
    });


    it(' updateMetadataAuthority authorization should be successfully created and executed.', () => {
        const testMetadata: any = {
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
                supply: new Long(100_000),
                maxSupply: new Long(1_000_000)
            }
        }
        return createCollection(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => createNft(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => grant(client, testGranter, testGrantee, {
                grantType: GrantType.GENERIC,
                msgType: MsgType.UPDATE_METADATA_AUTHORITY,
                expiration
            }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => getNftByOwner(eClient, testGrantee))
            .then((nftInfo: any) => createCtx("nftInfo", () => {
                const nft = nftInfo.nfts.pop();
                return {
                    id: nft?.collId.toString() + ":" + nft?.metadataId.toString() + ":" + nft?.seq.toString(),
                    nft: nft
                };
            }))
            .then(passThroughAwait((ctx) => executeGrant(eClient, testGrantee, [{
                msgType: MsgType.UPDATE_METADATA_AUTHORITY,
                params: {
                    sender: testGrantee,
                    metadataId: new Long(ctx.nftInfo.nft.metadataId),
                    newAuthority: testGranter
                }
            }], { maxGas: 100000000, gasPrice: 0.002 })))
            .then((ctx) => getNftInfo(eClient, ctx.nftInfo.id))
            .then((updatedNftInfo) => {
                expect(updatedNftInfo.metadata?.metadataAuthority).to.equal(testGranter);
            })
    });


    it(' updateMetadata authorization should be successfully created and executed.', async () => {
        const testMetadata: any = {
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
                supply: new Long(100_000),
                maxSupply: new Long(1_000_000)
            }
        }
        return createCollection(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => createNft(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => grant(client, testGranter, testGrantee, {
                grantType: GrantType.GENERIC,
                msgType: MsgType.UPDATE_METADATA,
                expiration
            }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => getNftByOwner(eClient, testGrantee))
            .then((nftInfo: any) => createCtx("nftInfo", () => {
                const nft = nftInfo.nfts.pop();
                return {
                    id: nft?.collId.toString() + ":" + nft?.metadataId.toString() + ":" + nft?.seq.toString(),
                    nft: nft
                };
            }))
            .then(passThroughAwait((ctx) => executeGrant(eClient, testGrantee, [{
                msgType: MsgType.UPDATE_METADATA,
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
            .then((ctx) => getNftInfo(eClient, ctx.nftInfo.id))
            .then((updatedNftInfo) => {
                expect(updatedNftInfo.metadata?.name).to.equal("UpdatedTmpMeta");
            })
    });

    it(' updateMintAuthority authorization should be successfully created and executed.', async () => {
        const testMetadata: any = {
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
                supply: new Long(100_000),
                maxSupply: new Long(1_000_000)
            }
        }
        return createCollection(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => createNft(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => grant(client, testGranter, testGrantee, {
                grantType: GrantType.GENERIC,
                msgType: MsgType.UPDATE_MINT_AUTHORITIY,
                expiration
            }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => getNftByOwner(eClient, testGrantee))
            .then((nftInfo: any) => createCtx("nftInfo", () => {
                const nft = nftInfo.nfts.pop();
                return {
                    id: nft?.collId.toString() + ":" + nft?.metadataId.toString() + ":" + nft?.seq.toString(),
                    nft: nft
                };
            }))
            .then(passThroughAwait((ctx) => executeGrant(eClient, testGrantee, [{
                msgType: MsgType.UPDATE_MINT_AUTHORITIY,
                params: {
                    sender: testGrantee,
                    metadataId: new Long(ctx.nftInfo.nft.metadataId),
                    newAuthority: testGranter
                }
            }], { maxGas: 100000000, gasPrice: 0.002 })))
            .then((ctx) => getNftInfo(eClient, ctx.nftInfo.id))
            .then((updatedNftInfo) => {
                expect(updatedNftInfo.metadata?.mintAuthority).to.equal(testGranter);
            })
    });

    it(' printEdition authorization should be successfully created and executed.', async () => {
        const testMetadata: any = {
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
                supply: new Long(100_000),
                maxSupply: new Long(1_000_000)
            }
        }
        return createCollection(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => createNft(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => grant(client, testGranter, testGrantee, {
                grantType: GrantType.GENERIC,
                msgType: MsgType.PRINT_EDITION,
                expiration
            }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => getNftByOwner(eClient, testGrantee))
            .then((nftInfo: any) => createCtx("nftInfo", () => {
                const nft = nftInfo.nfts.pop();
                return {
                    id: nft?.collId.toString() + ":" + nft?.metadataId.toString() + ":" + nft?.seq.toString(),
                    nft: nft
                };
            }))
            .then(withCtxAwait("oldInfo", (ctx) => getNftInfo(eClient, ctx.nftInfo.id)))
            .then(passThroughAwait((ctx) => executeGrant(eClient, testGrantee, [{
                msgType: MsgType.PRINT_EDITION,
                params: {
                    sender: testGrantee,
                    metadataId: new Long(ctx.nftInfo.nft.metadataId),
                    collId: new Long(1),
                    owner: testGrantee
                }
            }], { maxGas: 100000000, gasPrice: 0.002 })))
            .then((ctx: any) => getNftInfo(eClient, ctx.nftInfo.id)
                .then((updatedNftInfo: any) => {
                    expect(ctx.oldInfo.metadata.masterEdition.supply - updatedNftInfo.metadata.masterEdition.supply).to.equal(-1);
                })
            )
    });


    it(' signMetadata authorization should be successfully created and executed.', async () => {
        const testMetadata: any = {
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
                supply: new Long(100_000),
                maxSupply: new Long(1_000_000)
            }
        }
        return createCollection(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => createNft(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => grant(client, testGranter, testGrantee, {
                grantType: GrantType.GENERIC,
                msgType: MsgType.SIGN_METADATA,
                expiration
            }, { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => getNftByOwner(eClient, testGrantee))
            .then((nftInfo: any) => createCtx("nftInfo", () => {
                const nft = nftInfo.nfts.pop();
                return {
                    id: nft?.collId.toString() + ":" + nft?.metadataId.toString() + ":" + nft?.seq.toString(),
                    nft: nft
                };
            }))
            .then(passThroughAwait((ctx) => executeGrant(eClient, testGrantee, [{
                msgType: MsgType.SIGN_METADATA,
                params: {
                    sender: testGrantee,
                    metadataId: new Long(ctx.nftInfo.nft.metadataId),
                }
            }], { maxGas: 100000000, gasPrice: 0.002 })
                .then((res: any) => {
                    expect(res.code).to.equal(0);
                })
            )
            )
    });

    it('grant should be successfully revoked', () => {

        return grant(client, testGranter, testGrantee, {
            grantType: GrantType.GENERIC,
            msgType: MsgType.SUBMIT_PROPOSAL,
            expiration
        }, { maxGas: 100000000, gasPrice: 0.002 })
            .then(() => queryGrant(client, {
                granter: testGranter,
                grantee: testGrantee,
                msg: MsgType.SUBMIT_PROPOSAL
            }))
            .then((res: QueryGrantsResponse) => {
                expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization")
                expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal(msgMapping[MsgType.SUBMIT_PROPOSAL])
            })
            .then(() => revoke(client, testGranter, testGrantee, msgMapping[MsgType.SUBMIT_PROPOSAL], { maxGas: 100000000, gasPrice: 0.002 }))
            .then(() => queryGrant(client, {
                granter: testGranter,
                grantee: testGrantee,
                msg: MsgType.SUBMIT_PROPOSAL
            }))
            .then((res: any) => expect(res).to.match(/NotFound/)
            );
    });
});

