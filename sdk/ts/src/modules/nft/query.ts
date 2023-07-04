import {Collection, MasterEdition, Metadata, NFT} from "../../curium/lib/generated/nft/nft";
import {BluzelleClient} from "../../core";

const Long = require('long');

export const getNftInfo = (client: BluzelleClient, id: string) =>
    client.queryClient.nft.NFTInfo({id})
        .then(resp => ({
            nft: resp.nft && longToNumberNFT(resp.nft),
            metadata: resp.metadata && longToNumberMetadata(resp.metadata)
        }));

export const getCollectionInfo = (client: BluzelleClient, id: number) =>
    client.queryClient.nft.Collection({id: new Long(id)})
        .then(resp => ({
            ...resp,
            collection: resp.collection && longToNumberCollection(resp.collection),
            nfts: resp.nfts.map(longToNumberNFT)
        }));

export const getNftMetadata = (client: BluzelleClient, id: number) =>
    client.queryClient.nft.Metadata({id: new Long(id)})
        .then(resp => ({
            metadata: resp.metadata && longToNumberMetadata(resp.metadata)
        }));

export const getNftByOwner = (client: BluzelleClient, owner: string) =>
    client.queryClient.nft.NFTsByOwner({owner})
        .then(resp => ({
            nfts: resp.nfts.map(longToNumberNFT),
            metadata: resp.metadata.map(longToNumberMetadata)
        }));


export const getLastCollectionId = (client: BluzelleClient) =>
    client.queryClient.nft.LastCollectionId({})
        .then(resp => ({
                id: resp.id.toNumber()
        }))

const longToNumberNFT = (nft: NFT) => ({
    ...nft,
    collId: nft.collId.toNumber(),
    seq: nft.seq.toNumber(),
    metadataId: nft.metadataId.toNumber()
});

const longToNumberCollection = (collection: Collection) => ({
    ...collection,
    id: collection.id?.toNumber()
});

const longToNumberMasterEdition = (masterEdition: MasterEdition) => ({
    supply: masterEdition.supply.toNumber(),
    maxSupply: masterEdition.maxSupply.toNumber()
});

const longToNumberMetadata = (metadata: Metadata) => ({
    ...metadata,
    id: metadata.id.toNumber(),
    masterEdition: metadata.masterEdition && longToNumberMasterEdition(metadata.masterEdition)
});