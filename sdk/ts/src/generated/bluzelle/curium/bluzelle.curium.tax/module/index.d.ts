import { StdFee } from "@cosmjs/launchpad";
import { Registry, OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgSetGasTaxBp } from "./types/tax/tx";
import { MsgSetTransferTaxBp } from "./types/tax/tx";
import { MsgSetTaxCollector } from "./types/tax/tx";
export declare const MissingWalletError: Error;
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
}
interface SignAndBroadcastOptions {
    fee: StdFee;
    memo?: string;
}
declare const txClient: (wallet: OfflineSigner, { addr: addr }?: TxClientOptions) => Promise<{
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }?: SignAndBroadcastOptions) => any;
    msgSetGasTaxBp: (data: MsgSetGasTaxBp) => EncodeObject;
    msgSetTransferTaxBp: (data: MsgSetTransferTaxBp) => EncodeObject;
    msgSetTaxCollector: (data: MsgSetTaxCollector) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
