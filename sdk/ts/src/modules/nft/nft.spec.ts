import {startSwarmWithClient} from "@bluzelle/testing";
import {stopSwarm} from "@bluzelle/testing/src/swarmUtils";
import {BluzelleClient, newBluzelleClient} from "../../core";
import {expect} from 'chai';
import {Creator} from "../../curium/lib/generated/nft/nft";
import {createAddress} from "../faucet";
import {newLocalWallet} from "../../wallets/localWallet";
import {generateMnemonic} from "../../utils/generateMnemonic";
import {passThroughAwait} from "promise-passthrough";
import {
    createCollection,
    createNft,
    printNftEdition,
    transferNft,
    updateCollectionMutableUri,
    updateCollectionUri,
    updateMetadata,
    updateMetadataAuthority,
    updateMintAuthority
} from "./tx";
import {getCollectionInfo, getLastCollectionId, getNftByOwner, getNftInfo, getNftMetadata} from "./query";
import { cli } from "webpack";


describe('nft module', function () {
    this.timeout(10_800_000)
    let client: BluzelleClient;
    beforeEach(() =>
        stopSwarm()
            .then(() => startSwarmWithClient())
            .then(({bzSdk}) => client = bzSdk)
            // .then(() => newBluzelleClient({
            //     url: 'http://localhost:26657',
            //     wallet: newLocalWallet("hurry involve cruel hope crush pear nothing trend strong spin twin garment special fine still scrub satisfy vote also height goose catalog illness media")
            // }))
            .then(sdk => client = sdk)
    );

    it('should throw an error when querying an invalid nft', () =>
        getNftInfo(client, '1')
            .then(() => expect(true).to.be.false)
            .catch(err => expect(err.message).to.contain('invalid nft id'))
    );

    it('should create an empty collection and last collection id should be 1', () =>
        createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
            maxGas: 100000000,
            gasPrice: 0.002
        })
            .then(() => getCollectionInfo(client, 1))
            .then(({nfts}) => expect(nfts).to.be.empty)
            .then(()=> getLastCollectionId(client))
            .then((id) =>expect(id).to.equal(1) )
    );

    it('should get the info of a collection', () =>
        createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
            maxGas: 100000000,
            gasPrice: 0.002
        })
            .then(() => getCollectionInfo(client, 1))
            .then(resp => {
                expect(resp.collection?.id).to.equal(1);
                expect(resp.collection?.uri).to.deep.equal('http://temp.com');
                expect(resp.collection?.name).to.deep.equal('Temp');
                expect(resp.collection?.symbol).to.deep.equal("TMP");
            })
    );

    it('should get the info of an nft', () =>
        createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
            maxGas: 100000000,
            gasPrice: 0.002
        })
            .then(() => createNft(client, {
                collId: 1,
                metadata: defaultMetadataProps('TMPMeta', true, client.address)
            }, {maxGas: 1000000, gasPrice: 0.002}))
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
        createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
            maxGas: 100000000,
            gasPrice: 0.002
        })
            .then(() => createNft(client, {collId: 1}, {maxGas: 1000000, gasPrice: 0.002}))
            .then(x => getNftInfo(client, '1:1:0'))
            .then(info => {
                expect(info.nft?.owner).to.deep.equal(client.address);
                expect(info.nft?.collId).to.equal(1);
                expect(info.nft?.metadataId).to.equal(1);
            })
    )

    it('should update the metadata of an nft', () =>
        createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
            maxGas: 100000000,
            gasPrice: 0.002
        })
            .then(() => createNft(client, {
                collId: 1,
                metadata: defaultMetadataProps('TMPMeta', true, client.address)
            }, {maxGas: 1000000, gasPrice: 0.002}))
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
            return createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
                maxGas: 100000000,
                gasPrice: 0.002
            })
                .then(() => createNft(client, {
                    collId: 1,
                    metadata: defaultMetadataProps('TMPMeta', true, client.address)
                }, {maxGas: 1000000, gasPrice: 0.002}))
                .then(() => updateMetadataAuthority(client, 1, newAuthority, {maxGas: 1000000, gasPrice: 0.002}))
                .then(() => getNftMetadata(client, 1))
                .then(resp => {
                    expect(resp.metadata?.metadataAuthority).to.deep.equal(newAuthority)
                })
        }
    );

    it('should update the mint authority of an nft', () => {
            let newAuthority = createAddress().address;
            return createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
                maxGas: 100000000,
                gasPrice: 0.002
            })
                .then(() => createNft(client, {
                    collId: 1,
                    metadata: defaultMetadataProps('TMPMeta', true, client.address)
                }, {maxGas: 1000000, gasPrice: 0.002}))
                .then(() => updateMintAuthority(client, 1, newAuthority, {maxGas: 1000000, gasPrice: 0.002}))
                .then(() => getNftMetadata(client, 1))
                .then(resp => {
                    expect(resp.metadata?.mintAuthority).to.deep.equal(newAuthority)
                })
        }
    );

    it('should print an edition of an nft', () =>
        createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address}, {
            maxGas: 100000000,
            gasPrice: 0.002
        })
            .then(() => createNft(client, {
                collId: 1,
                metadata: defaultMetadataProps('TMPMeta', true, client.address)
            }, {maxGas: 1000000, gasPrice: 0.002}))
            .then(() => printNftEdition(client, 1, 1, client.address, {maxGas: 1000000, gasPrice: 0.002}))
            .then(x => getCollectionInfo(client, 1))
            .then(info => {
                expect(info.nfts).to.have.length(2);
                expect(info.nfts[1].seq).to.equal(1)
            })
    );

    it('should transfer an nft from one user to another', () => {
        return createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address}, {
            maxGas: 100000000,
            gasPrice: 0.002
        })
            .then(() => createNft(client, {
                collId: 1,
                metadata: defaultMetadataProps('TMPMeta', true, client.address)
            }, {maxGas: 1000000, gasPrice: 0.002}))
            .then(() => newBluzelleClient({
                url: 'http://localhost:26667',
                wallet: newLocalWallet(generateMnemonic())
            }))
            .then(passThroughAwait(otherSdk => transferNft(client, '1:1:0', otherSdk.address, {
                maxGas: 1000000,
                gasPrice: 0.002
            })))
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
        return createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
            maxGas: 100000000,
            gasPrice: 0.002
        })
            .then(() => createNft(client, {
                collId: 1,
                metadata: defaultMetadataProps('NFT1', true, client.address)
            }, {maxGas: 1000000, gasPrice: 0.002}))
            .then(() => createNft(client, {
                collId: 1,
                metadata: defaultMetadataProps('NFT2', true, client.address)
            }, {maxGas: 1000000, gasPrice: 0.002}))
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

    it('should be able to add a mutableUri to an nft', () =>
        createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
            maxGas: 100000000,
            gasPrice: 0.002
        })
            .then(() => createNft(client, {collId: 1, metadata: defaultMetadataProps('NFT1', true, client.address)}, {maxGas: 1000000, gasPrice: 0.002}))
            .then(x => getNftMetadata(client, 1))
            .then(info => {
                expect(info.metadata?.mutableUri).to.deep.equal(defaultMetadataProps('NFT1', true, client.address).mutableUri)
            })
    )

    it('should be able to update a mutableUri of an nft', () =>
        createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
            maxGas: 100000000,
            gasPrice: 0.002
        })
            .then(() => createNft(client, {collId: 1, metadata: defaultMetadataProps('NFT1', true, client.address)}, {maxGas: 1000000, gasPrice: 0.002}))
            .then(() => updateMetadata(client, {
                name: 'NFT2',
                uri: 'http://temp2.com',
                mutableUri: 'http://updatedStarloopDatabase.com',
                creators: [defaultCreators(client.address)],
                sellerFeeBasisPoints: 80,
                sender: client.address,
                metadataId: 1
            }, {maxGas: 1000000, gasPrice: 0.002}))
            .then(() => getNftInfo(client, '1:1:0'))
            .then(nftInfo => {
                expect(nftInfo.metadata?.mutableUri).to.deep.equal('http://updatedStarloopDatabase.com');
            })
    )


    it('should update the collection uri', () =>
        createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
            maxGas: 100000000,
            gasPrice: 0.002
        })
            .then(() => updateCollectionUri(client, 1, 'http://updatedTemp.com', {
                maxGas: 100000000,
                gasPrice: 0.002
            }))
            .then(() => getCollectionInfo(client, 1))
            .then(resp => {
                expect(resp.collection?.uri).to.deep.equal('http://updatedTemp.com')
            })
    )

    it('should update the collection mutable uri', () =>
        createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
            maxGas: 100000000,
            gasPrice: 0.002
        })
            .then(() => updateCollectionMutableUri(client, 1, 'http://updatedTemp.com', {
                maxGas: 100000000,
                gasPrice: 0.002
            }))
            .then(() => getCollectionInfo(client, 1))
            .then(resp => {
                expect(resp.collection?.mutableUri).to.deep.equal('http://updatedTemp.com')
            })
    )

    it('should fail an update if the collection is immutable', () =>
        createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: false, updateAuthority: client.address},  {
            maxGas: 100000000,
            gasPrice: 0.002
        })
            .then(() => updateCollectionMutableUri(client, 1, 'http://updatedTemp.com', {
                maxGas: 100000000,
                gasPrice: 0.002
            }))
            .then(() => expect(true).to.be.false)
            .catch(err => {})

    )


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

export const defaultMetadataProps = (name: string, isMutable: boolean, address: string) => ({
    name,
    uri: 'https://tmp.com',
    mutableUri: 'http://starloopDatabase.com',
    sellerFeeBasisPoints: 100,
    primarySaleHappened: false,
    isMutable,
    creators: [defaultCreators(address)],
    metadataAuthority: address,
    mintAuthority: address,
    masterEdition: defaultMasterEditionProps
});