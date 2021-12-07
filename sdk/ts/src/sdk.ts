import {DirectSecp256k1HdWallet} from "@cosmjs/proto-signing";
import {txClient} from "./generated/bluzelle/curium/bluzelle.curium.storage/module";
import {Some} from 'monet'

export interface BluzelleConfig {
    url: string,
    mnemonic: string
}

export interface BluzelleSdk {
}

export const bluzelle = (config: BluzelleConfig) =>
    DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, {prefix: 'bluzelle'})
        .then(wallet => Promise.all([
            wallet.getAccounts(),
            txClient(wallet, {addr: config.url}),
            () => wallet
        ]))
        .then(([accounts, client, wallet]) => ({
            address: accounts[0].address,
            wallet, storage: client
        }))



bluzelle({
    url: 'localhost:26657',
    mnemonic: 'key merit cross zoo rally eternal stuff chapter match rally eye cement critic old shell renew staff swim trend black slam adjust frost spot'
}).then(client =>
    Some(client)
        .map(client => [client.storage.msgPin({cid: 'QmQiDiArzCFcMYZKkePM4gTfZZsL22GfDQwf9vjryhGUDB', creator: client.address})])
        .map(client.storage.signAndBroadcast)
        .join()
).then(x => x)
