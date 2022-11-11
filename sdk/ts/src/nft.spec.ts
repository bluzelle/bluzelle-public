import {defaultSwarmConfig, startSwarmWithClient} from "@bluzelle/testing";
import {stopSwarm} from "@bluzelle/testing/src/swarmUtils";
import {BluzelleClient, newBluzelleClient} from "./sdk";
import {getCollectionInfo, getNftByOwner, getNftInfo, getNftMetadata} from "./query";
import {expect} from 'chai';
import {
    createCollection,
    createNft,
    printNftEdition, transferNft,
    updateMetadata,
    updateMetadataAuthority,
    updateMintAuthority
} from "./tx";
import * as Long from "long";
import {MsgCreateCollectionResponse} from "./curium/lib/generated/nft/tx";
import {Creator, MasterEdition, Metadata} from "./curium/lib/generated/nft/nft";
import {createAddress} from "./faucet";
import {newLocalWallet} from "./wallets/localWallet";
import {generateMnemonic} from "./generateMnemonic";
import {passThroughAwait} from "promise-passthrough";



describe('nft module', function () {
    this.timeout(10_800_000)
    let client: BluzelleClient;
    beforeEach(() =>
        stopSwarm()
            .then(() => startSwarmWithClient(({...defaultSwarmConfig, targetBranch: 'experimental'})))
            .then(({bzSdk}) => client = bzSdk)
    );

    it('should throw an error when querying an invalid nft', () =>
        getNftInfo(client, '1')
            .then(() => expect(true).to.be.false)
            .catch(err => expect(err.message).to.contain('invalid nft id'))
    );

    it('should create an empty collection', () =>
        createCollection(client, client.address, 'TMP', 'Temp', 'http://temp.com', true, client.address, {maxGas: 100000000, gasPrice: 0.002})
            .then(()  => getCollectionInfo(client, 1))
            .then(({nfts}) => expect(nfts).to.be.empty)
    );

    it('should get the info of a collection', () =>
        createCollection(client, client.address, 'TMP', 'Temp', 'http://temp.com', true, client.address, {maxGas: 100000000, gasPrice: 0.002})
            .then(() => getCollectionInfo(client, 1))
            .then(resp => {
                expect(resp.collection?.id).to.equal(1);
                expect(resp.collection?.uri).to.deep.equal('http://temp.com');
                expect(resp.collection?.name).to.deep.equal('Temp');
                expect(resp.collection?.symbol).to.deep.equal("TMP");
            })
    );

    it('should get the info of an nft', () =>
        createCollection(client, client.address, 'TMP', 'Temp', 'http://temp.com', true, client.address, {maxGas: 100000000, gasPrice: 0.002})
            .then(() => createNft(client, {collId: 1, metadata: defaultMetadataProps(0, 'TMPMeta', true, client.address)}, {maxGas: 1000000, gasPrice: 0.002}))
            .then(x => getNftInfo(client, '1:1:0'))
            .then(info => {
                expect(info.nft?.owner).to.deep.equal(client.address);
                expect(info.nft?.collId).to.equal(1);
                expect(info.nft?.metadataId).to.equal(1);
                expect(info.metadata?.name).to.deep.equal('TMPMeta');
                expect(info.metadata?.uri).to.deep.equal('https://tmp.com');
                expect(info.metadata?.creators[0].address).to.deep.equal(client.address);
            })
    );

    it('should create an nft without metadata', () =>
        createCollection(client, client.address, 'TMP', 'Temp', 'http://temp.com', true, client.address, {maxGas: 100000000, gasPrice: 0.002})
            .then(() => createNft(client, {collId: 1}, {maxGas: 1000000, gasPrice: 0.002}))
            .then(x => getNftInfo(client, '1:1:0'))
            .then(info => {
                expect(info.nft?.owner).to.deep.equal(client.address);
                expect(info.nft?.collId).to.equal(1);
                expect(info.nft?.metadataId).to.equal(1);
            })
    )

    it('should update the metadata of an nft', () =>
        createCollection(client, client.address, 'TMP', 'Temp', 'http://temp.com', true, client.address, {maxGas: 100000000, gasPrice: 0.002})
            .then(() => createNft(client, {collId: 1, metadata: defaultMetadataProps(0, 'TMPMeta', true, client.address)}, {maxGas: 1000000, gasPrice: 0.002}))
            .then(() => updateMetadata(client, {
                name: 'TMP2',
                uri: 'http://temp2.com',
                creators: [defaultCreators(client.address)],
                sellerFeeBasisPoints: 80,
                sender: client.address,
                metadataId: 1
            }, {maxGas: 1000000, gasPrice: 0.002}))
            .then(() => getNftInfo(client, '1:1:0'))
            .then(nftInfo => {
                expect(nftInfo.metadata?.uri).to.equal('http://temp2.com');
                expect(nftInfo.metadata?.name).to.equal('TMP2');
            })
    );

    it('should update the metadata authority of an nft', () => {
        let newAuthority = createAddress().address;
        return createCollection(client, client.address, 'TMP', 'Temp', 'http://temp.com', true, client.address, {maxGas: 100000000, gasPrice: 0.002})
            .then(() => createNft(client, {collId: 1, metadata: defaultMetadataProps(0, 'TMPMeta', true, client.address)}, {maxGas: 1000000, gasPrice: 0.002}))
            .then(() => updateMetadataAuthority(client, 1, newAuthority, {maxGas: 1000000, gasPrice: 0.002}))
            .then(() => getNftMetadata(client, 1))
            .then(resp => {
                expect(resp.metadata?.metadataAuthority).to.deep.equal(newAuthority)
            })}
    );

    it('should update the mint authority of an nft', () => {
        let newAuthority = createAddress().address;
        return createCollection(client, client.address, 'TMP', 'Temp', 'http://temp.com', true, client.address, {maxGas: 100000000, gasPrice: 0.002})
            .then(() => createNft(client, {collId: 1, metadata: defaultMetadataProps(0, 'TMPMeta', true, client.address)}, {maxGas: 1000000, gasPrice: 0.002}))
            .then(() => updateMintAuthority(client, 1, newAuthority, {maxGas: 1000000, gasPrice: 0.002}))
            .then(() => getNftMetadata(client, 1))
            .then(resp => {
                expect(resp.metadata?.mintAuthority).to.deep.equal(newAuthority)
            })}
    );

    it('should print an edition of an nft', () =>
        createCollection(client, client.address, 'TMP', 'Temp', 'http://temp.com', true, client.address, {maxGas: 100000000, gasPrice: 0.002})
            .then(() => createNft(client, {collId: 1, metadata: defaultMetadataProps(0, 'TMPMeta', true, client.address)}, {maxGas: 1000000, gasPrice: 0.002}))
            .then(() => printNftEdition(client, 1, 1, client.address, {maxGas: 1000000, gasPrice: 0.002}))
            .then(x => getCollectionInfo(client, 1))
            .then(info => {
                expect(info.nfts).to.have.length(2);
                expect(info.nfts[1].seq).to.equal(1)
            })
    );

    it('should transfer an nft from one user to another', () => {
        return createCollection(client, client.address, 'TMP', 'Temp', 'http://temp.com', true, client.address, {maxGas: 100000000, gasPrice: 0.002})
            .then(() => createNft(client, {collId: 1, metadata: defaultMetadataProps(0, 'TMPMeta', true, client.address)}, {maxGas: 1000000, gasPrice: 0.002}))
            .then(() => newBluzelleClient({
                url: 'http://localhost:26667',
                wallet: newLocalWallet(generateMnemonic())
            }))
            .then(passThroughAwait(otherSdk => transferNft(client, '1:1:0', otherSdk.address, {maxGas: 1000000, gasPrice: 0.002})))
            .then(otherSdk =>
                getNftInfo(client, '1:1:0')
                    .then(info => ({info, address: otherSdk.address}))
            )
            .then(({info, address}) => {
                expect(info.nft?.owner).to.deep.equal(address);
                expect(info.metadata?.creators[0].address).to.deep.equal(client.address);
            })

    });

    it('should query the nfts owned by given address', () => {
        return createCollection(client, client.address, 'TMP', 'Temp', 'http://temp.com', true, client.address, {maxGas: 100000000, gasPrice: 0.002})
            .then(() => createNft(client, {collId: 1, metadata: defaultMetadataProps(0, 'NFT1', true, client.address)}, {maxGas: 1000000, gasPrice: 0.002}))
            .then(() => createNft(client, {collId: 1, metadata: defaultMetadataProps(1, 'NFT2', true, client.address)}, {maxGas: 1000000, gasPrice: 0.002}))
            .then(() => getNftByOwner(client, client.address))
            .then(resp => {
                expect(resp.nfts).to.have.length(2);
                expect(resp.nfts[0].owner).to.deep.equal(client.address);
                expect(resp.nfts[1].owner).to.deep.equal(client.address);
                expect(resp.metadata[0].name).to.deep.equal('NFT1');
                expect(resp.metadata[1].name).to.deep.equal('NFT2');
                }
            )


    });


});

export const defaultCreators = (address: string): Creator => ({
    address,
    verified: true,
    share: 10,
});

export const defaultMasterEditionProps = ({
    supply: 100_000,
    maxSupply: 1_000_000
});

export const defaultMetadataProps = (id: number, name: string, isMutable: boolean, address: string)=> ({
    id,
    name,
    uri: 'https://tmp.com',
    sellerFeeBasisPoints: 100,
    primarySaleHappened: false,
    isMutable,
    creators: [defaultCreators(address)],
    metadataAuthority: address,
    mintAuthority: address,
    masterEdition: defaultMasterEditionProps
})