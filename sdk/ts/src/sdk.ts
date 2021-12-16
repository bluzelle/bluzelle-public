import {DirectSecp256k1HdWallet, EncodeObject, Registry} from "@cosmjs/proto-signing";
import {SigningStargateClient} from "@cosmjs/stargate";
import {MsgPin} from "./generated/bluzelle/curium/bluzelle.curium.storage/module/types/storage/tx";
import {OfflineDirectSigner} from "@cosmjs/proto-signing/build/signer";
import {Subject} from "rxjs";

export interface BluzelleConfig {
    url: string;
    wallet: () => Promise<OfflineDirectSigner>;
}

export interface BluzelleClient {
    url: string;
    address: string;
    sgClient: SigningStargateClient;
}

const registry = new Registry([
    ["/bluzelle.curium.storage.MsgPin", MsgPin]
]);

export const newLocalWallet = (mnemonic: string) => () => DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {prefix: 'bluzelle'});

export const newBluzelleClient = (config: BluzelleConfig) =>
    config.wallet()
        .then(wallet =>
            SigningStargateClient.connectWithSigner(config.url, wallet, {prefix: 'bluzelle', registry})
                .then(sgClient => Promise.all([
                    sgClient,
                    wallet.getAccounts().then(acc => acc[0].address),
                ])))
        .then(([sgClient, address]) => ({
            url: config.url,
            sgClient,
            address,
        }));


export interface BroadcastOptions {
    gasPrice: number,
    maxGas: number,
    memo?: string
}

export const pinCid = (client: BluzelleClient, cid: string, options: BroadcastOptions) =>
    sendTx(client, 'storage.MsgPin', {cid, creator: client.address}, options);

const sendTx = <T>(client: BluzelleClient, type: string, msg: T, options: BroadcastOptions) =>
    Promise.resolve(msg)
        .then(msg => ({
            typeUrl: `/bluzelle.curium.${type}`,
            value: msg
        }))
        .then(msg => client.sgClient.signAndBroadcast(
            client.address,
            [msg],
            {
                gas: options.maxGas.toFixed(0), amount: [{
                    denom: 'ubnt',
                    amount: (options.gasPrice * options.maxGas).toFixed(0)
                }]
            },
            options.memo,
        ))



