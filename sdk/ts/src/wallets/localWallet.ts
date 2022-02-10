import {DirectSecp256k1HdWallet} from "@cosmjs/proto-signing";
import {BluzelleWallet, SigningBluzelleClient} from "../sdk";
import {SequenceResponse} from "@cosmjs/stargate";
import {DirectSecp256k1HdWalletOptions} from "@cosmjs/proto-signing/build/directsecp256k1hdwallet";
import {EnglishMnemonic, Bip39, HdPath, Slip10RawIndex} from "@cosmjs/crypto";
import {passThrough} from "promise-passthrough";


export const newLocalWallet = (mnemonic: string) => (): Promise<BluzelleWallet> => Promise.resolve(
    BluzelleLocalWallet.fromMnemonic(mnemonic, {prefix: 'bluzelle', hdPaths:[makePath()]}));

type AccountAddress = string;

export class BluzelleLocalWallet extends DirectSecp256k1HdWallet implements BluzelleWallet {

    sequenceTable: Record<AccountAddress, SequenceResponse> = {}
    getSequenceQueue: Promise<SequenceResponse> = Promise.resolve({} as SequenceResponse)

    public static async fromMnemonic(
        mnemonic: string,
        options: Partial<DirectSecp256k1HdWalletOptions> = {},
    ): Promise<BluzelleLocalWallet> {

        const mnemonicChecked = new EnglishMnemonic(mnemonic);
        const seed = await Bip39.mnemonicToSeed(mnemonicChecked, options.bip39Password);
        return new BluzelleLocalWallet(mnemonicChecked, {
            ...options,
            seed: seed,
        });
    }

    getSequence(client: SigningBluzelleClient, signerAddress: string): Promise<SequenceResponse> {
        return this.getSequenceQueue = this.getSequenceQueue.then(() =>
            Promise.resolve(this.sequenceTable[signerAddress])
                .then(accountInfo => accountInfo || client.getSequenceFromNetwork(signerAddress))
                .then(passThrough(response => {
                    this.sequenceTable[signerAddress] = {
                        ...response,
                        sequence: response.sequence + 1,
                    }
                }))
        )
    }

}

function makePath(idx: number =  0): HdPath {
    return [
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(483),  // BNT
        Slip10RawIndex.hardened(0),
        Slip10RawIndex.normal(0),
        Slip10RawIndex.normal(idx),
    ];
}
