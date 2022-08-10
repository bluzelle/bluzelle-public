import {newBluzelleClient, SigningBluzelleClient} from "../sdk";
import {SequenceResponse} from "@cosmjs/stargate";
import {passThrough, passThroughAwait} from "promise-passthrough";
import {BluzelleWallet} from "./BluzelleWallet";
import {Window} from '@keplr-wallet/types';
import {AccountData, DirectSignResponse, OfflineDirectSigner} from "@cosmjs/proto-signing/build/signer";
import {getStatus} from "../queryTendermint";
import {newLocalWallet} from "./localWallet";
import * as bip39 from 'bip39';

interface SignDoc {
    bodyBytes: Uint8Array;
    authInfoBytes: Uint8Array;
    chainId: string;
    accountNumber: Long;
}

export type Ports = {
    rpcPort: number,
    restPort: number
}

const addBluzelleChain = (chainId: string, nodeAddress: string, ports: Ports) =>
    (window as Window).keplr?.experimentalSuggestChain({
        chainId: chainId,
        chainName: `Bluzelle:${chainId}`,
        rpc: `http://${nodeAddress}:${ports.rpcPort}`,
        rest: `http://${nodeAddress}:${ports.restPort}`,
        bip44: {
            coinType: 483,
        },
        bech32Config: {
            bech32PrefixAccAddr: "bluzelle",
            bech32PrefixAccPub: "bluzelle" + "pub",
            bech32PrefixValAddr: "bluzelle" + "valoper",
            bech32PrefixValPub: "bluzelle" + "valoperpub",
            bech32PrefixConsAddr: "bluzelle" + "valcons",
            bech32PrefixConsPub: "bluzelle" + "valconspub",
        },
        currencies: [
            {
                coinDenom: "BLZ",
                coinMinimalDenom: "ubnt",
                coinDecimals: 6,
                coinGeckoId: "bluzelle",
            },
        ],
        feeCurrencies: [
            {
                coinDenom: "BLZ",
                coinMinimalDenom: "ubnt",
                coinDecimals: 6,
                coinGeckoId: "bluzelle",
            },
        ],
        stakeCurrency: {
            coinDenom: "BLZ",
            coinMinimalDenom: "ubnt",
            coinDecimals: 6,
            coinGeckoId: "bluzelle",
        },
        coinType: 483,
        gasPriceStep: {
            low: 0.002,
            average: 0.002,
            high: 0.002,
        }
    });

export const newKeplrWallet = (
    nodeAddress: string,
    ports: Ports = {rpcPort: 26657, restPort: 1317}
) => (): Promise<BluzelleWallet> =>
    generateMnemonic()
        .then(mnemonic => newBluzelleClient({
            url: `${nodeAddress}:${ports.rpcPort}`,
            wallet: newLocalWallet(mnemonic)
        }))
        .then(client => getStatus(client))
        .then(passThroughAwait(status =>
            (window as Window).keplr?.enable(status.chainId)
                .catch(e => {console.log(e); return addBluzelleChain(status.chainId, nodeAddress, ports)})
        ))
        .then(status => (window as Window).keplr?.getOfflineSigner(status.chainId))
        .then((keplrOfflineSigner) => new BluzelleKeplrWallet(keplrOfflineSigner as OfflineDirectSigner));

type AccountAddress = string;

export class BluzelleKeplrWallet implements BluzelleWallet {

    getAccounts: () => Promise<readonly AccountData[]>;
    signDirect: (signerAddress: string, signDoc: SignDoc) => Promise<DirectSignResponse>;

    constructor(keplrOfflineSigner: OfflineDirectSigner) {
        this.getAccounts = keplrOfflineSigner.getAccounts.bind(keplrOfflineSigner)
        this.signDirect = keplrOfflineSigner.signDirect.bind(keplrOfflineSigner)
    }

    sequenceTable: Record<AccountAddress, SequenceResponse> = {}
    getSequenceQueue: Promise<SequenceResponse> = Promise.resolve({} as SequenceResponse)

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

const generateMnemonic = (): Promise<string> =>
    Promise.resolve(bip39.generateMnemonic(256))
