import {BluzelleClient} from "../../core";
import {passThroughAwait} from "promise-passthrough";
import * as bip39 from 'bip39';
import {Some} from "monet";
import BIP32Factory, {BIP32Interface} from 'bip32';
import * as ecc from 'tiny-secp256k1';
import {bech32} from "bech32"
import { delayWithLog } from "../../utils/delayWithLog";
import {getAccountBalance} from "../bank";

const defaultHdPath = "m/44'/483'/0'/0/0";
const bech32Prefix = "bluzelle"


export function createAddress(mnemonic: string = bip39.generateMnemonic(256), hdPath: string = defaultHdPath): ({address: string, mnemonic: string}) {
    return Some({mnemonic})
        .map(ctx => [ctx, bip39.mnemonicToSeedSync(ctx.mnemonic)])
        .map(([ctx, seed]) => [ctx, BIP32Factory(ecc).fromSeed(seed as Buffer)])
        .map(([ctx, node]) => [ctx, (node as BIP32Interface).derivePath(hdPath)])
        .map(([ctx, child]) => [ctx, bech32.toWords((child as BIP32Interface).identifier)])
        .map(([ctx, words]) => [ctx, bech32.encode(bech32Prefix, words as Buffer)])
        .map(([ctx, address]) => ({...ctx as { mnemonic: string }, address}))
        .join()
}

export function faucetToken(client: BluzelleClient, address?: string) {
    return address ? faucetTokenToAddress(address) : faucetTokenToNewAddress();

    function faucetTokenToAddress(address: string) {
        return client.queryClient.faucet.FaucetToken({address: address})
            .then(() => waitUntilFunded(client, address))
            .then(() => ({mnemonic: "", address}))
    }

    function faucetTokenToNewAddress() {
        return Promise.resolve(createAddress())
            .then(passThroughAwait(ctx => client.queryClient.faucet.FaucetToken({address: ctx.address})))
            .then(passThroughAwait(ctx => waitUntilFunded(client, ctx.address)))
    }
}

export function waitUntilFunded(client: BluzelleClient, address: string): Promise<unknown> {
    return getAccountBalance(client, address)
        .then(waitForFaucet);

    function waitForFaucet(startBalance: number): Promise<unknown> {
        return getAccountBalance(client, address)
            .then(passThroughAwait(balance => console.log('waiting for funds...', balance)))
            .then(balance => balance === startBalance && delayWithLog(1000, 'wait 1s for faucet funds to be reflected').then(() => waitForFaucet(startBalance)))
    }
}