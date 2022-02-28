import { StdFee } from "@cosmjs/launchpad";
import { Registry, OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgSetTaxCollector } from "./types/tax/tx";
import { MsgSetGasTaxBp } from "./types/tax/tx";
import { MsgSetTransferTaxBp } from "./types/tax/tx";
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
    msgSetTaxCollector: (data: MsgSetTaxCollector) => EncodeObject;
    msgSetGasTaxBp: (data: MsgSetGasTaxBp) => EncodeObject;
    msgSetTransferTaxBp: (data: MsgSetTransferTaxBp) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
