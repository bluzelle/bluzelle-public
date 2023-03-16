import { SendAuthorization } from "../src/curium/lib/generated/cosmos/bank/v1beta1/authz";
import chai from "chai";
import { getAccountBalance, getValidators, getValidatorsInfo, newBluzelleClient } from '../src/index';
import { newLocalWallet } from '../src/index';
import {
    GenericAuthorizationParams,
    genericAuthorizationTx,
    SendAuthorizationParams,
    sendAuthorizationTx,
    StakeAuthorizationParams,
    stakeAuthorizationTx,
    revokeAuthorizationTx,
    RevokeAuthorizationParams,
    ExecuteAuthorizationParams,
    executeAuthorizationTx,
    queryGrant
} from "../src/authz";
import { expect } from "chai";
import { BluzelleClient } from "../src/sdk";
import { AuthorizationType } from "../src/curium/lib/generated/cosmos/staking/v1beta1/authz";
import { GenericAuthorization } from "../src/curium/lib/generated/cosmos/authz/v1beta1/authz";
import { StakeAuthorization } from "../src/curium/lib/generated/cosmos/staking/v1beta1/authz";
import { MsgSend } from "../src/curium/lib/generated/cosmos/bank/v1beta1/tx";
import { MsgMapping, MsgType } from "../src/msg";
import { createCollection, executeGrant } from "../src/tx";
import { MsgVerifyInvariant } from "../src/curium/lib/generated/cosmos/crisis/v1beta1/tx";
import { MsgSetWithdrawAddress } from "../src/curium/lib/generated/cosmos/distribution/v1beta1/tx";
import { MsgPin } from "../src/curium/lib/generated/storage/tx";
import { MsgDelegate, MsgUndelegate, MsgBeginRedelegate } from "../src/curium/lib/generated/cosmos/staking/v1beta1/tx";
import { createNft, getCollectionInfo, getDelegation, getNftByOwner, getNftInfo } from "@bluzelle/sdk";
import {
    MsgCreateCollection, MsgCreateNFT, MsgTransferNFT,
    MsgUpdateMetadataAuthority, MsgUpdateMetadata, MsgUpdateMintAuthority,
    MsgPrintEdition, MsgSignMetadata
} from "../src/curium/lib/generated/nft/tx";
import { Metadata } from "../src/curium/lib/generated/nft/nft";
const Long = require('long');

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
describe("Authorization Module Test", function () {
    this.timeout(1_800_000)

    it('verifyInvarient msg authorization should be successfully created', async () => {
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.VERIFY_INVARIANT,
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
        await genericAuthorizationTx(client, params)
        const res = await queryGrant(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.VERIFY_INVARIANT
        })
        if (res) {
            expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization")
            expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal(MsgMapping[MsgType.VERIFY_INVARIANT])
            const eClient = await newBluzelleClient({
                wallet: granteeWallet,
                url: "http://localhost:26657"
            });
            const eParams: ExecuteAuthorizationParams = {
                grantee: testGrantee,
                msgs: [{
                    typeUrl: MsgMapping[MsgType.VERIFY_INVARIANT],
                    value: MsgVerifyInvariant.encode({
                        sender: testGrantee,
                        invariantModuleName: "bank",
                        invariantRoute: "total-supply"
                    }).finish()
                }],
            }
            const res1: any = await executeAuthorizationTx(eClient, eParams);
            expect(res1.code).to.equal(0);
        }
    });

    it('send grant should be successfully executed', async () => {
        const params: ExecuteAuthorizationParams = {
            grantee: testGrantee,
            msgs: [{
                typeUrl: MsgMapping[MsgType.SEND],
                value: MsgSend.encode({
                    fromAddress: testGrantee,
                    toAddress: testGranter,
                    amount: [{
                        denom: "ubnt",
                        amount: "100"
                    }]
                }).finish()
            }],
        }
        const sParams: SendAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            spendLimit: [{
                denom: "ubnt",
                amount: "100"
            }],
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
        await sendAuthorizationTx(client, sParams);
        const eClient = await newBluzelleClient({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        })
        const originalBalance = await getAccountBalance(client, testGrantee);
        await executeAuthorizationTx(eClient, params);
        const afterBalance = await getAccountBalance(client, testGrantee);
        expect(originalBalance - afterBalance).to.equal(100)
    });

    it('delegate msg authorization should be successfully created and executed ', async () => {
        const params: StakeAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            authorizationType: AuthorizationType.AUTHORIZATION_TYPE_DELEGATE,
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
        await stakeAuthorizationTx(client, params)
        const res = await queryGrant(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.DELEGATE
        })
        if (res) {
            expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization")
            expect(StakeAuthorization.decode(res.grants[0].authorization?.value as any).authorizationType).to.equal(AuthorizationType.AUTHORIZATION_TYPE_DELEGATE)
            const eClient = await newBluzelleClient({
                wallet: granteeWallet,
                url: "http://localhost:26657"
            });
            const testValAddress = (await getValidatorsInfo(eClient)).validators[0].operatorAddress
            const eParams: ExecuteAuthorizationParams = {
                grantee: testGrantee,
                msgs: [{
                    typeUrl: MsgMapping[MsgType.DELEGATE],
                    value: MsgDelegate.encode({
                        delegatorAddress: testGrantee,
                        validatorAddress: testValAddress,
                        amount: {
                            denom: "ubnt",
                            amount: "100"
                        }
                    }).finish()
                }],
            }
            let initAmount = 0;
            try {
                initAmount = (await getDelegation(eClient, testGrantee, testValAddress)).delegation.shares;
            } catch { }
            const res1: any = await executeAuthorizationTx(eClient, eParams);
            expect(res1.code).to.equal(0);
            const afterAmount = (await getDelegation(eClient, testGrantee, testValAddress)).delegation.shares;
            expect(afterAmount - initAmount).to.equal(100);

        }
    });

    it('undelegate msg authorization should be successfully created and executed', async () => {
        const params: StakeAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            authorizationType: AuthorizationType.AUTHORIZATION_TYPE_UNDELEGATE,
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
        await stakeAuthorizationTx(client, params)
        const res = await queryGrant(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.UNDELEGATE
        })
        if (res) {
            expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization")
            expect(StakeAuthorization.decode(res.grants[0].authorization?.value as any).authorizationType).to.equal(AuthorizationType.AUTHORIZATION_TYPE_UNDELEGATE)
            const eClient = await newBluzelleClient({
                wallet: granteeWallet,
                url: "http://localhost:26657"
            });
            const testValAddress = (await getValidatorsInfo(eClient)).validators[0].operatorAddress
            const eParams: ExecuteAuthorizationParams = {
                grantee: testGrantee,
                msgs: [{
                    typeUrl: MsgMapping[MsgType.UNDELEGATE],
                    value: MsgUndelegate.encode({
                        delegatorAddress: testGrantee,
                        validatorAddress: testValAddress,
                        amount: {
                            denom: "ubnt",
                            amount: "100"
                        }
                    }).finish()
                }],
            }
            let initAmount = 0;
            try {
                initAmount = (await getDelegation(eClient, testGrantee, testValAddress)).delegation.shares;
            } catch { }
            const res1: any = await executeAuthorizationTx(eClient, eParams);
            expect(res1.code).to.equal(0);
            const afterAmount = (await getDelegation(eClient, testGrantee, testValAddress)).delegation.shares;
            expect(afterAmount - initAmount).to.equal(-100);
        }
    });

    it('redelegate msg authorization should be successfully created and executed', async () => {
        const params: StakeAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            authorizationType: AuthorizationType.AUTHORIZATION_TYPE_REDELEGATE,
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
        await stakeAuthorizationTx(client, params)
        const res = await queryGrant(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.REDELEGATE
        })
        if (res) {
            expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization")
            expect(StakeAuthorization.decode(res.grants[0].authorization?.value as any).authorizationType).to.equal(AuthorizationType.AUTHORIZATION_TYPE_REDELEGATE)
            const eClient = await newBluzelleClient({
                wallet: granteeWallet,
                url: "http://localhost:26657"
            });
            const testValidators = (await getValidatorsInfo(eClient)).validators;
            if (testValidators.length >= 2) {
                const testValAddress1 = testValidators[0].operatorAddress
                const testValAddress2 = testValidators[1].operatorAddress
                const eParams: ExecuteAuthorizationParams = {
                    grantee: testGrantee,
                    msgs: [{
                        typeUrl: MsgMapping[MsgType.REDELEGATE],
                        value: MsgBeginRedelegate.encode({
                            delegatorAddress: testGrantee,
                            validatorSrcAddress: testValAddress1,
                            validatorDstAddress: testValAddress2,
                            amount: {
                                denom: "ubnt",
                                amount: "100"
                            }
                        }).finish()
                    }],
                }
                let initAmount = 0;
                try {
                    initAmount = (await getDelegation(eClient, testGrantee, testValAddress1)).delegation.shares;
                } catch { }
                const res1: any = await executeAuthorizationTx(eClient, eParams);
                expect(res1.code).to.equal(0);
                const afterAmount = (await getDelegation(eClient, testGrantee, testValAddress1)).delegation.shares;
                expect(afterAmount - initAmount).to.equal(-100);
            }

        }
    });


    it(' create nft collection authorization should be successfully created and executed.', async () => {
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        });
        const eClient = await newBluzelleClient({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.CREATE_COLLECTION,
            expiration
        }
        await genericAuthorizationTx(client, params)
        const eParams: ExecuteAuthorizationParams = {
            grantee: testGrantee,
            msgs: [{
                typeUrl: MsgMapping[MsgType.CREATE_COLLECTION],
                value: MsgCreateCollection.encode({
                    sender: testGrantee,
                    symbol: "TMP",
                    name: "Temp",
                    uri: "https://temp.com",
                    isMutable: true,
                    updateAuthority: testGrantee
                }).finish()
            }],
        }
        const res1: any = await executeAuthorizationTx(eClient, eParams);
        expect(res1.code).to.equal(0);
        const collectionRes = await getCollectionInfo(eClient, 1);
        expect(collectionRes.collection?.symbol).to.equal("TMP");
    });

    it(' create nft authorization should be successfully created and executed.', async () => {

        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        });

        const eClient = await newBluzelleClient({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });
        await createCollection(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })

        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.CREATE_NFT,
            expiration
        }
        await genericAuthorizationTx(client, params)
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
        const eParams: ExecuteAuthorizationParams = {
            grantee: testGrantee,
            msgs: [{
                typeUrl: MsgMapping[MsgType.CREATE_NFT],
                value: MsgCreateNFT.encode({ sender: testGrantee, collId: new Long(1), metadata: testMetadata }).finish()
            }],
        }
        const res1: any = await executeAuthorizationTx(eClient, eParams);
        expect(res1.code).to.equal(0);
        const nft: any = (await getNftByOwner(eClient, testGrantee)).nfts.pop();
        const id = nft.collId.toString() + ":" + nft.metadataId.toString() + ":" + nft.seq.toString()
        const nftInfo = await getNftInfo(eClient, id)
        expect(nftInfo.metadata?.name).to.equal("TMPMeta");
    });

    it(' transfer nft authorization should be successfully created and executed.', async () => {

        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        });

        const eClient = await newBluzelleClient({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });

        await createCollection(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
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
        await createNft(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 })
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.TRANSFER_NFT,
            expiration
        }
        await genericAuthorizationTx(client, params)

        const nft: any = (await getNftByOwner(eClient, testGrantee)).nfts.pop();
        const id = nft.collId.toString() + ":" + nft.metadataId.toString() + ":" + nft.seq.toString()
        const eParams: ExecuteAuthorizationParams = {
            grantee: testGrantee,
            msgs: [{
                typeUrl: MsgMapping[MsgType.TRANSFER_NFT],
                value: MsgTransferNFT.encode({ sender: testGrantee, id, newOwner: testGranter }).finish()
            }],
        }
        const res1: any = await executeAuthorizationTx(eClient, eParams);
        expect(res1.code).to.equal(0);
        const nftInfo = await getNftInfo(eClient, id)
        if (nftInfo.nft) {
            expect(nftInfo.nft.owner).to.equal(testGranter);
        }
    });


    it(' updateMetadataAuthority authorization should be successfully created and executed.', async () => {

        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        });

        const eClient = await newBluzelleClient({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });

        await createCollection(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
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
        await createNft(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 })
        const nft: any = (await getNftByOwner(client, testGrantee)).nfts.pop()
        const id = nft.collId.toString() + ":" + nft.metadataId.toString() + ":" + nft.seq.toString()
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.UPDATE_METADATA_AUTHORITY,
            expiration
        }
        await genericAuthorizationTx(client, params)
        const eParams: ExecuteAuthorizationParams = {
            grantee: testGrantee,
            msgs: [{
                typeUrl: MsgMapping[MsgType.UPDATE_METADATA_AUTHORITY],
                value: MsgUpdateMetadataAuthority.encode({
                    sender: testGrantee,
                    metadataId: new Long(nft.metadataId),
                    newAuthority: testGranter
                }).finish()
            }],
        }
        const res1: any = await executeAuthorizationTx(eClient, eParams);
        expect(res1.code).to.equal(0);
        const updatedNftInfo = await getNftInfo(eClient, id)
        if (updatedNftInfo.nft) {
            expect(updatedNftInfo.metadata?.metadataAuthority).to.equal(testGranter);
        }
    });


    it(' updateMetadata authorization should be successfully created and executed.', async () => {

        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        });

        const eClient = await newBluzelleClient({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });

        await createCollection(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
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
        await createNft(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 })
        const nft: any = (await getNftByOwner(client, testGrantee)).nfts.pop()
        const id = nft.collId.toString() + ":" + nft.metadataId.toString() + ":" + nft.seq.toString()
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.UPDATE_METADATA,
            expiration
        }
        await genericAuthorizationTx(client, params)

        const eParams: ExecuteAuthorizationParams = {
            grantee: testGrantee,
            msgs: [{
                typeUrl: MsgMapping[MsgType.UPDATE_METADATA],
                value: MsgUpdateMetadata.encode({
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
        }
        const res1: any = await executeAuthorizationTx(eClient, eParams);
        expect(res1.code).to.equal(0);
        const nftInfo = await getNftInfo(eClient, id)
        if (nftInfo.nft) {
            expect(nftInfo.metadata?.name).to.equal("UpdatedTmpMeta");
        }
    });

    it(' updateMintAuthority authorization should be successfully created and executed.', async () => {

        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        });

        const eClient = await newBluzelleClient({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });

        await createCollection(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
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
        await createNft(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 })
        const nft: any = (await getNftByOwner(client, testGrantee)).nfts.pop()
        const id = nft.collId.toString() + ":" + nft.metadataId.toString() + ":" + nft.seq.toString()
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.UPDATE_MINT_AUTHORITIY,
            expiration
        }
        await genericAuthorizationTx(client, params)

        const eParams: ExecuteAuthorizationParams = {
            grantee: testGrantee,
            msgs: [{
                typeUrl: MsgMapping[MsgType.UPDATE_MINT_AUTHORITIY],
                value: MsgUpdateMintAuthority.encode({
                    sender: testGrantee,
                    metadataId: new Long(nft.metadataId),
                    newAuthority: testGranter
                }).finish()
            }],
        }
        const res1: any = await executeAuthorizationTx(eClient, eParams);
        expect(res1.code).to.equal(0);
        const nftInfo = await getNftInfo(eClient, id)
        if (nftInfo.nft) {
            expect(nftInfo.metadata?.mintAuthority).to.equal(testGranter);
        }
    });

    it(' printEdition authorization should be successfully created and executed.', async () => {

        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        });

        const eClient = await newBluzelleClient({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });

        await createCollection(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
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
        await createNft(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 })
        const nft: any = (await getNftByOwner(client, testGrantee)).nfts.pop()
        const id = nft.collId.toString() + ":" + nft.metadataId.toString() + ":" + nft.seq.toString()
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.PRINT_EDITION,
            expiration
        }
        await genericAuthorizationTx(client, params)

        const eParams: ExecuteAuthorizationParams = {
            grantee: testGrantee,
            msgs: [{
                typeUrl: MsgMapping[MsgType.PRINT_EDITION],
                value: MsgPrintEdition.encode({
                    sender: testGrantee,
                    metadataId: new Long(nft.metadataId),
                    collId: new Long(1),
                    owner: testGrantee
                }).finish()
            }],
        }
        const oldInfo: any = await getNftInfo(eClient, id)
        const res1: any = await executeAuthorizationTx(eClient, eParams);
        expect(res1.code).to.equal(0);
        const nftInfo: any = await getNftInfo(eClient, id)
        if (nftInfo.nft) {
            expect(nftInfo.metadata.masterEdition.supply - oldInfo.metadata.masterEdition.supply).to.equal(1);
        }
    });


    it(' signMetadata authorization should be successfully created and executed.', async () => {

        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        });

        const eClient = await newBluzelleClient({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        });

        await createCollection(eClient, eClient.address, 'TMP', 'Temp', 'http://temp.com', true, eClient.address, { maxGas: 100000000, gasPrice: 0.002 })
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
        await createNft(eClient, { collId: new Long(1), metadata: testMetadata }, { maxGas: 100000000, gasPrice: 0.002 })
        const nft: any = (await getNftByOwner(client, testGrantee)).nfts.pop()
        const id = nft.collId.toString() + ":" + nft.metadataId.toString() + ":" + nft.seq.toString()
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.SIGN_METADATA,
            expiration
        }
        await genericAuthorizationTx(client, params)

        const eParams: ExecuteAuthorizationParams = {
            grantee: testGrantee,
            msgs: [{
                typeUrl: MsgMapping[MsgType.SIGN_METADATA],
                value: MsgSignMetadata.encode({
                    sender: testGrantee,
                    metadataId: new Long(nft.metadataId),
                }).finish()
            }],
        }
        const res1: any = await executeAuthorizationTx(eClient, eParams);
        expect(res1.code).to.equal(0);
    });
    it('grant should be successfully revoked', async () => {
        const params: RevokeAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.SUBMIT_PROPOSAL,
        }
        const gParams: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.SUBMIT_PROPOSAL,
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
        await genericAuthorizationTx(client, gParams);
        const res = await queryGrant(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.SUBMIT_PROPOSAL
        })
        if (res) {
            expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization")
            expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal(MsgMapping[MsgType.SUBMIT_PROPOSAL])
        }
        await revokeAuthorizationTx(client, params);
        const res1 = await queryGrant(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.SUBMIT_PROPOSAL
        })
        expect(res1).to.match(/NotFound/)
    });


}
)

