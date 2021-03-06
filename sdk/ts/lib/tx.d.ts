import { BluzelleClient } from "./sdk";
import { Registry } from "@cosmjs/proto-signing";
export declare const withTransaction: (client: BluzelleClient, fn: () => unknown) => Promise<import("@cosmjs/stargate/build/stargateclient").BroadcastTxSuccess | import("@cosmjs/stargate/build/stargateclient").BroadcastTxFailure>;
export declare const registerMessages: (registry: Registry) => Registry;
export interface BroadcastOptions {
    gasPrice: number;
    maxGas: number;
    memo?: string;
}
export declare const pinCid: (client: BluzelleClient, cid: string, options: BroadcastOptions) => undefined;
export declare const send: (client: BluzelleClient, toAddress: string, amount: number, options: BroadcastOptions) => undefined;
export declare const setGasTaxBp: (client: BluzelleClient, bp: number, options: BroadcastOptions) => undefined;
export declare const setTransferTaxBp: (client: BluzelleClient, bp: number, options: BroadcastOptions) => undefined;
export declare const setTaxCollector: (client: BluzelleClient, taxCollector: string, options: BroadcastOptions) => undefined;
//# sourceMappingURL=tx.d.ts.map