import { SigningBluzelleClient } from "../sdk";
import { SequenceResponse } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet, DirectSecp256k1HdWalletOptions } from "@cosmjs/proto-signing/build/directsecp256k1hdwallet";
import { BluzelleWallet } from "./BluzelleWallet";
export interface LocalWalletOptions {
    coinType?: number;
    index?: number;
}
export declare const newLocalWallet: (mnemonic: string, options?: LocalWalletOptions) => () => Promise<BluzelleWallet>;
type AccountAddress = string;
export declare class BluzelleLocalWallet extends DirectSecp256k1HdWallet implements BluzelleWallet {
    sequenceTable: Record<AccountAddress, SequenceResponse>;
    getSequenceQueue: Promise<SequenceResponse>;
    static fromMnemonic(mnemonic: string, options?: Partial<DirectSecp256k1HdWalletOptions>): Promise<BluzelleLocalWallet>;
    getSequence(client: SigningBluzelleClient, signerAddress: string): Promise<SequenceResponse>;
}
export {};
//# sourceMappingURL=localWallet.d.ts.map