import {BluzelleWallet} from "./BluzelleWallet";
import {AccountData, DirectSignResponse, OfflineDirectSigner} from "@cosmjs/proto-signing/build/signer";
import {SequenceResponse} from "@cosmjs/stargate";
import {getStatus, newBluzelleClient, SigningBluzelleClient} from "../core";
import {passThrough, passThroughAwait} from "promise-passthrough";
import {Window as KeplrWindow} from "@keplr-wallet/types"
import {newLocalWallet} from "./localWallet";
import * as bip39 from "bip39";
import {Cosmos} from "@cosmostation/extension-client"
import {addChain, requestAccount} from "@cosmostation/extension-client/cosmos";
import {getExtensionOfflineSigner, connectWallet} from "@cosmostation/cosmos-client"

interface Window extends KeplrWindow {
    cosmostation?: Cosmos
}

type AccountAddress = string;

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

const addBluzelleChain = (chainId: string, nodeAddress: string, ports: Ports, protocol: 'https' | 'http') =>
    addChain({
        chainId: chainId,
        chainName: `Bluzelle:${chainId}`,
        baseDenom: "ubnt",
        displayDenom: "BLZ",
        restURL: `${protocol}://${nodeAddress}:${ports.restPort}`,
        coinType: "483",
        addressPrefix: "bluzelle",
        gasRate: {
            average: "0.002",
            low: "0.002",
            tiny: "0.002"
        },
        sendGas: "10000000"
    });

export class BluzelleCosmostationWallet implements BluzelleWallet {

    getAccounts: () => Promise<readonly AccountData[]>;
    signDirect: (signerAddress: string, signDoc: SignDoc) => Promise<DirectSignResponse>;

    constructor(cosmostationOfflineDirectSigner: OfflineDirectSigner) {
        this.getAccounts = cosmostationOfflineDirectSigner.getAccounts.bind(cosmostationOfflineDirectSigner)
        this.signDirect = cosmostationOfflineDirectSigner.signDirect.bind(cosmostationOfflineDirectSigner)
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


export const newCosmostationWallet = (
    nodeAddress: string,
    connectionParams: {ports: Ports, protocol: 'http' | 'https'} = {ports: {rpcPort: 26657, restPort: 1317}, protocol: 'https'}
) => (): Promise<BluzelleWallet> =>
    generateMnemonic()
        .then(mnemonic => newBluzelleClient({
            url: `${connectionParams.protocol}://${nodeAddress}:${connectionParams.ports.rpcPort}`,
            wallet: newLocalWallet(mnemonic)
        }))
        .then(client => getStatus(client))
        .then(passThroughAwait(status => {
                return requestAccount(status.chainId)
                    .catch(e => {
                        console.log(e);
                        return addBluzelleChain(status.chainId, nodeAddress, connectionParams.ports, connectionParams.protocol)
                    })
            }
        ))
        .then(status => getExtensionOfflineSigner(status.chainId))
        .then((cosmostationWallet) => new BluzelleCosmostationWallet(cosmostationWallet as OfflineDirectSigner));



const generateMnemonic = (): Promise<string> =>
    Promise.resolve(bip39.generateMnemonic(256))

