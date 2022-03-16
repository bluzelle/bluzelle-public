import {newBluzelleClient, SigningBluzelleClient} from "../sdk";
import {SequenceResponse} from "@cosmjs/stargate";
import {passThrough, passThroughAwait} from "promise-passthrough";
import {BluzelleWallet} from "./BluzelleWallet";
import {Window} from '@keplr-wallet/types'
import {AccountData, DirectSignResponse, OfflineDirectSigner} from "@cosmjs/proto-signing/build/signer";
import {getStatus} from "../queryTendermint";
import {newLocalWallet} from "./localWallet";
import {generateMnemonic} from "@bluzelle/wallet/src/wallet";

interface SignDoc {
    bodyBytes: Uint8Array;
    authInfoBytes: Uint8Array;
    chainId: string;
    accountNumber: Long;
}

export const newKeplrWallet = (nodeAddress: string) => (): Promise<BluzelleWallet> =>
    generateMnemonic()
        .then(mnemonic => newBluzelleClient({
            url: `${nodeAddress}:26657`,
            wallet: newLocalWallet(mnemonic)
        })).then(client => getStatus(client))
        .then(passThroughAwait( status => (window as Window).keplr?.experimentalSuggestChain({
            chainId: status.chainId,
            chainName: "Bluzelle",
            rpc: `http://${nodeAddress}:26657`,
            rest: `http://${nodeAddress}:1317`,
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
                low: 0.01,
                average: 0.025,
                high: 0.03,
            }
        })))
        .then(status => (window as Window).keplr?.getOfflineSigner(status.chainId))
        .then((keplrOfflineSigner) => new BluzelleKeplrWallet(keplrOfflineSigner as OfflineDirectSigner))

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