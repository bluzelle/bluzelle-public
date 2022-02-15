import {BluzelleClient} from "./sdk";
import {passThroughAwait} from "promise-passthrough";
import * as bip39 from 'bip39';
import {Some} from "monet";
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import {BIP32Interface} from 'bip32'
import {bech32} from "bech32"
import * as delay from "delay";
import {getAccountBalance} from "./query";

const bip32 = BIP32Factory(ecc);
const hdPath = "m/44'/483'/0'/0/0";
const bech32Prefix = "bluzelle"


export function createAddress(): Promise<{ mnemonic: string, address: string }> {
    return Some({mnemonic: bip39.generateMnemonic(256)})
        .map(ctx => [ctx, bip39.mnemonicToSeedSync(ctx.mnemonic)])
        .map(([ctx, seed]) => [ctx, bip32.fromSeed(seed as Buffer)])
        .map(([ctx, node]) => [ctx, (node as BIP32Interface).derivePath(hdPath)])
        .map(([ctx, child]) => [ctx, bech32.toWords((child as BIP32Interface).identifier)])
        .map(([ctx, words]) => [ctx, bech32.encode(bech32Prefix, words as Buffer)])
        .map(([ctx, address]) => ({...ctx as { mnemonic: string }, address}))
        .join()
}

export function mint(client: BluzelleClient, address?: string) {
    return address ? mintToAddress(address) : mintToNewAddress();

    function mintToAddress(address: string) {
        return client.queryClient.faucet.Mint({address: address})
            .then(() => waitUntilFunded(client, address))
            .then(() => ({mnemonic: "", address}))
    }

    function mintToNewAddress() {
        return Promise.resolve(createAddress())
            .then(passThroughAwait(ctx => client.queryClient.faucet.Mint({address: ctx.address})))
            .then(passThroughAwait(ctx => waitUntilFunded(client, ctx.address)))
    }
}

export function waitUntilFunded(client: BluzelleClient, address: string): Promise<unknown> {
    return getAccountBalance(client, address)
        .then(waitForMint);

    function waitForMint(startBalance: number): Promise<unknown> {
        return getAccountBalance(client, address)
            .then(passThroughAwait(balance => console.log('waiting for funds...', balance)))
            .then(balance => balance === startBalance && delay(1000).then(() => waitForMint(startBalance)))
    }
}