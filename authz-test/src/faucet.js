"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitUntilFunded = exports.mint = exports.createAddress = void 0;
const promise_passthrough_1 = require("promise-passthrough");
const bip39 = __importStar(require("bip39"));
const monet_1 = require("monet");
const bip32_1 = __importDefault(require("bip32"));
const ecc = __importStar(require("tiny-secp256k1"));
const bech32_1 = require("bech32");
const delay_1 = __importDefault(require("delay"));
const query_1 = require("./query");
const hdPath = "m/44'/483'/0'/0/0";
const bech32Prefix = "bluzelle";
function createAddress(mnemonic = bip39.generateMnemonic(256)) {
    return (0, monet_1.Some)({ mnemonic })
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
            .then(balance => balance === startBalance && (0, delay_1.default)(1000).then(() => waitForMint(startBalance)));
    }
}
exports.waitUntilFunded = waitUntilFunded;
