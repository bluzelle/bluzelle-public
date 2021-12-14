import {DirectSecp256k1HdWallet} from "@cosmjs/proto-signing";
import {SigningStargateClient} from "@cosmjs/stargate";
import {txClient} from "./generated/bluzelle/curium/bluzelle.curium.storage/module/index";

export interface BluzelleConfig {
    url: string;
    wallet: DirectSecp256k1HdWallet;
}

export interface BluzelleClient {
    url: string;
    address: string;
    chainId: string;
    sgClient: SigningStargateClient;
    wallet: DirectSecp256k1HdWallet;
}

export const newBluzelleClient = (config: BluzelleConfig) =>
    txClient(config.wallet, {addr: config.url})
        .then(sgClient => Promise.all([
            sgClient,
            config.wallet.getAccounts().then(acc => acc[0].address),
            'chain-id'
        ]))
        .then(([sgClient, address, chainId]) => ({
               url: config.url,
            sgClient,
            chainId,
            address,
            wallet: config.wallet
            }));









