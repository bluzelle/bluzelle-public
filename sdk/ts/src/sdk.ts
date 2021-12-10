import {DirectSecp256k1HdWallet, Registry} from "@cosmjs/proto-signing";
import {SigningStargateClient} from "@cosmjs/stargate";
import {MsgPin} from "./generated/bluzelle/curium/bluzelle.curium.storage/module/types/storage/tx";
import {OfflineDirectSigner} from "@cosmjs/proto-signing/build/signer";

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
            address
        }));

export const pinCid = (client: BluzelleClient, cid: string) => {
    const msg = {
        typeUrl: "/bluzelle.curium.storage.MsgPin", value: {
            cid,
            creator: client.address
        } as MsgPin
    }
    return client.sgClient.signAndBroadcast(client.address, [msg], {gas: "2000000", amount: [{amount: '2000000', denom: 'ubnt'}]})
}

