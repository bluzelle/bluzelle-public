import { BluzelleClient } from "./sdk";
import { EncodeObject, Registry } from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { Creator } from "./curium/lib/generated/nft/nft";
export interface BroadcastMode {
    async: (client: BluzelleClient, msgs: EncodeObject[], options: BroadcastOptions) => Promise<string>;
    sync: (client: BluzelleClient, msgs: EncodeObject[], options: BroadcastOptions) => Promise<DeliverTxResponse>;
}
export type BluzelleTxResponse = DeliverTxResponse;
type MetadataHumanReadable = {
    id: number;
    name: string;
    uri: string;
    sellerFeeBasisPoints: number;
    primarySaleHappened: boolean;
    isMutable: boolean;
    creators: Creator[];
    metadataAuthority: string;
    mintAuthority: string;
    masterEdition?: {
        supply: number;
        maxSupply: number;
    };
};
export declare const withTransaction: (client: BluzelleClient, fn: () => unknown) => Promise<DeliverTxResponse>;
export declare const registerMessages: (registry: Registry) => Registry;
export interface BroadcastOptions {
    gasPrice: number;
    maxGas: number;
    mode?: 'async' | 'sync';
    memo?: string;
}
export declare const pinCid: (client: BluzelleClient, cid: string, options: BroadcastOptions) => undefined;
export declare const send: (client: BluzelleClient, toAddress: string, amount: number, options: BroadcastOptions, denom?: string) => undefined;
export declare const setGasTaxBp: (client: BluzelleClient, bp: number, options: BroadcastOptions) => undefined;
export declare const setTransferTaxBp: (client: BluzelleClient, bp: number, options: BroadcastOptions) => undefined;
export declare const setTaxCollector: (client: BluzelleClient, taxCollector: string, options: BroadcastOptions) => undefined;
export declare const delegate: (client: BluzelleClient, delegatorAddress: string, validatorAddress: string, amount: number, options: BroadcastOptions) => Promise<BluzelleTxResponse>;
export declare const undelegate: (client: BluzelleClient, delegatorAddress: string, validatorAddress: string, amount: number, options: BroadcastOptions) => Promise<BluzelleTxResponse>;
export declare const redelegate: (client: BluzelleClient, delegatorAddress: string, validatorSrcAddress: string, validatorDstAddress: string, amount: number, options: BroadcastOptions) => Promise<BluzelleTxResponse>;
export declare const withdrawDelegatorReward: (client: BluzelleClient, delegatorAddress: string, validatorAddress: string, options: BroadcastOptions) => Promise<BluzelleTxResponse>;
export declare function createNft(client: BluzelleClient, props: {
    collId: number;
    metadata?: MetadataHumanReadable;
}, options: BroadcastOptions): Promise<undefined>;
export declare const createCollection: (client: BluzelleClient, sender: string, symbol: string, name: string, uri: string, isMutable: boolean, updateAuthority: string, options: BroadcastOptions) => Promise<undefined>;
export declare const transferNft: (client: BluzelleClient, id: string, toAddress: string, broadcastOptions: BroadcastOptions) => Promise<undefined>;
export declare const printNftEdition: (client: BluzelleClient, metadataId: number, collId: number, owner: string, broadcastOptions: BroadcastOptions) => Promise<undefined>;
export declare function updateMetadata(client: BluzelleClient, props: {
    sender: string;
    metadataId: number;
    name: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Creator[];
}, broadcastOptions: BroadcastOptions): Promise<undefined>;
export declare const updateMetadataAuthority: (client: BluzelleClient, metadataId: number, newAuthority: string, broadcastOptions: BroadcastOptions) => Promise<undefined>;
export declare const updateMintAuthority: (client: BluzelleClient, metadataId: number, newAuthority: string, broadcastOptions: BroadcastOptions) => Promise<undefined>;
export declare const signMetadata: (client: BluzelleClient, metadataId: number, broadcastOptions: BroadcastOptions) => Promise<undefined>;
export {};
//# sourceMappingURL=tx.d.ts.map