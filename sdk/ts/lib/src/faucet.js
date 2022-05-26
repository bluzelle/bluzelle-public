"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitUntilFunded = exports.mint = exports.createAddress = void 0;
const promise_passthrough_1 = require("promise-passthrough");
const bip39 = require("bip39");
const monet_1 = require("monet");
const bip32_1 = require("bip32");
const ecc = require("tiny-secp256k1");
const bech32_1 = require("bech32");
const delay = require("delay");
const query_1 = require("./query");
const hdPath = "m/44'/483'/0'/0/0";
const bech32Prefix = "bluzelle";
function createAddress() {
    return (0, monet_1.Some)({ mnemonic: bip39.generateMnemonic(256) })
        .map(ctx => [ctx, bip39.mnemonicToSeedSync(ctx.mnemonic)])
        .map(([ctx, seed]) => [ctx, (0, bip32_1.default)(ecc).fromSeed(seed)])
        .map(([ctx, node]) => [ctx, node.derivePath(hdPath)])
        .map(([ctx, child]) => [ctx, bech32_1.bech32.toWords(child.identifier)])
        .map(([ctx, words]) => [ctx, bech32_1.bech32.encode(bech32Prefix, words)])
        .map(([ctx, address]) => (Object.assign(Object.assign({}, ctx), { address })))
        .join();
}
exports.createAddress = createAddress;
function mint(client, address) {
    return address ? mintToAddress(address) : mintToNewAddress();
    function mintToAddress(address) {
        return client.queryClient.faucet.Mint({ address: address })
            .then(() => waitUntilFunded(client, address))
            .then(() => ({ mnemonic: "", address }));
    }
    function mintToNewAddress() {
        return Promise.resolve(createAddress())
            .then((0, promise_passthrough_1.passThroughAwait)(ctx => client.queryClient.faucet.Mint({ address: ctx.address })))
            .then((0, promise_passthrough_1.passThroughAwait)(ctx => waitUntilFunded(client, ctx.address)));
    }
}
exports.mint = mint;
function waitUntilFunded(client, address) {
    return (0, query_1.getAccountBalance)(client, address)
        .then(waitForMint);
    function waitForMint(startBalance) {
        return (0, query_1.getAccountBalance)(client, address)
            .then((0, promise_passthrough_1.passThroughAwait)(balance => console.log('waiting for funds...', balance)))
            .then(balance => balance === startBalance && delay(1000).then(() => waitForMint(startBalance)));
    }
}
exports.waitUntilFunded = waitUntilFunded;
//# sourceMappingURL=faucet.js.map