import {BluzelleClient, BroadcastOptions, sendTx} from "../../core";
import {
    MsgCreateCollection,
    MsgCreateNFT,
    MsgPrintEdition,
    MsgSignMetadata,
    MsgTransferNFT,
    MsgUpdateCollectionMutableUri,
    MsgUpdateCollectionUri,
    MsgUpdateMetadata,
    MsgUpdateMetadataAuthority,
    MsgUpdateMintAuthority
} from "../../curium/lib/generated/nft/tx";
import {Creator, Metadata} from "../../curium/lib/generated/nft/nft";

const Long = require('long');

type MetadataHumanReadable = {
    id: number,
    name: string;
    uri: string;
    mutableUri?: string;
    sellerFeeBasisPoints: number;
    primarySaleHappened: boolean;
    isMutable: boolean;
    creators: Creator[];
    metadataAuthority: string;
    mintAuthority: string;
    masterEdition?: { supply: number, maxSupply: number };
}

export function createNft(client: BluzelleClient, props: { collId: number, metadata?: MetadataHumanReadable }, options: BroadcastOptions) {
    return Promise.resolve(sendTx<MsgCreateNFT>(client, '/bluzelle.curium.nft.MsgCreateNFT', {
        sender: client.address,
        collId: new Long(props.collId),
        metadata: props.metadata && adaptMetadataProps(props.metadata),
    }, options));

    function adaptMetadataProps(props: MetadataHumanReadable): Metadata {
        return ({
            ...props,
            mutableUri: props.mutableUri || '',
            id: new Long(props.id),
            masterEdition: props.masterEdition && {
                supply: new Long(props.masterEdition.supply),
                maxSupply: new Long(props.masterEdition.maxSupply)
            }
        })
    }
}

export const createCollection = (
    client: BluzelleClient,
    {sender, symbol, name, uri, isMutable, updateAuthority, mutableUri}: {
        sender: string,
        symbol: string,
        name: string,
        uri: string,
        mutableUri?: string,
        isMutable: boolean,
        updateAuthority: string
    },
    options: BroadcastOptions) =>
    Promise.resolve(sendTx<MsgCreateCollection>(client, '/bluzelle.curium.nft.MsgCreateCollection', {
        sender,
        symbol,
        name,
        uri,
        mutableUri: mutableUri || '',
        isMutable,
        updateAuthority,
    }, options));

export const transferNft = (client: BluzelleClient, id: string, toAddress: string, broadcastOptions: BroadcastOptions) =>
    Promise.resolve(sendTx<MsgTransferNFT>(client, '/bluzelle.curium.nft.MsgTransferNFT', {
        sender: client.address,
        id,
        newOwner: toAddress
    }, broadcastOptions));

export const printNftEdition = (client: BluzelleClient, metadataId: number, collId: number, owner: string, broadcastOptions: BroadcastOptions) =>
    Promise.resolve(sendTx<MsgPrintEdition>(client, '/bluzelle.curium.nft.MsgPrintEdition', {
        sender: client.address,
        metadataId: new Long(metadataId),
        collId: new Long(collId),
        owner,
    }, broadcastOptions));

export function updateMetadata(client: BluzelleClient, props: {
    sender: string;
    metadataId: number;
    name: string;
    uri: string;
    mutableUri?: string;
    sellerFeeBasisPoints: number;
    creators: Creator[]
}, broadcastOptions: BroadcastOptions) {
    return Promise.resolve(sendTx<MsgUpdateMetadata>(client, '/bluzelle.curium.nft.MsgUpdateMetadata', adaptUpdateMetadataProps(props.metadataId, props.mutableUri || "", props), broadcastOptions))

    function adaptUpdateMetadataProps(id: number, mutableUri: string, props: Omit<MsgUpdateMetadata, 'metadataId' | 'mutableUri'>): MsgUpdateMetadata {
        return ({
            ...props,
            mutableUri,
            metadataId: new Long(id)
        })
    }
}

export const updateMetadataAuthority = (client: BluzelleClient, metadataId: number, newAuthority: string, broadcastOptions: BroadcastOptions) =>
    Promise.resolve(sendTx<MsgUpdateMetadataAuthority>(client, '/bluzelle.curium.nft.MsgUpdateMetadataAuthority', {
        sender: client.address,
        metadataId: new Long(metadataId),
        newAuthority
    }, broadcastOptions));

export const updateMintAuthority = (client: BluzelleClient, metadataId: number, newAuthority: string, broadcastOptions: BroadcastOptions) =>
    Promise.resolve(sendTx<MsgUpdateMintAuthority>(client, '/bluzelle.curium.nft.MsgUpdateMintAuthority', {
        sender: client.address,
        metadataId: new Long(metadataId),
        newAuthority
    }, broadcastOptions));

export const updateCollectionUri = (client: BluzelleClient, collectionId: number, uri: string, broadcastOptions: BroadcastOptions) =>
    Promise.resolve(sendTx<MsgUpdateCollectionUri>(client, '/bluzelle.curium.nft.MsgUpdateCollectionUri', {
        sender: client.address,
        collectionId: new Long(collectionId),
        uri
    }, broadcastOptions));

export const updateCollectionMutableUri = (client: BluzelleClient, collectionId: number, uri: string, broadcastOptions: BroadcastOptions) =>
    Promise.resolve(sendTx<MsgUpdateCollectionMutableUri>(client, '/bluzelle.curium.nft.MsgUpdateCollectionMutableUri', {
        sender: client.address,
        collectionId: new Long(collectionId),
        uri
    }, broadcastOptions));

export const signMetadata = (client: BluzelleClient, metadataId: number, broadcastOptions: BroadcastOptions) =>
    Promise.resolve(sendTx<MsgSignMetadata>(client, '/bluzelle.curium.nft.MsgSignMetadata', {
        sender: client.address,
        metadataId: new Long(metadataId)
    }, broadcastOptions));