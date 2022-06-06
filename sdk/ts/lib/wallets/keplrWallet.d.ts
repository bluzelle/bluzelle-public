/// <reference types="long" />
import { SigningBluzelleClient } from "../sdk";
import { SequenceResponse } from "@cosmjs/stargate";
import { BluzelleWallet } from "./BluzelleWallet";
import { AccountData, DirectSignResponse, OfflineDirectSigner } from "@cosmjs/proto-signing/build/signer";
interface SignDoc {
    bodyBytes: Uint8Array;
    authInfoBytes: Uint8Array;
    chainId: string;
    accountNumber: Long;
}
export declare const newKeplrWallet: (nodeAddress: string) => () => Promise<BluzelleWallet>;
declare type AccountAddress = string;
export declare class BluzelleKeplrWallet implements BluzelleWallet {
    getAccounts: () => Promise<readonly AccountData[]>;
    signDirect: (signerAddress: string, signDoc: SignDoc) => Promise<DirectSignResponse>;
    constructor(keplrOfflineSigner: OfflineDirectSigner);
    sequenceTable: Record<AccountAddress, SequenceResponse>;
    getSequenceQueue: Promise<SequenceResponse>;
    getSequence(client: SigningBluzelleClient, signerAddress: string): Promise<SequenceResponse>;
}
export {};
//# sourceMappingURL=keplrWallet.d.ts.map