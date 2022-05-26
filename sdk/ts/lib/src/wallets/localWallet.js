"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BluzelleLocalWallet = exports.newLocalWallet = void 0;
const proto_signing_1 = require("@cosmjs/proto-signing");
const crypto_1 = require("@cosmjs/crypto");
const promise_passthrough_1 = require("promise-passthrough");
const newLocalWallet = (mnemonic) => () => Promise.resolve(BluzelleLocalWallet.fromMnemonic(mnemonic, { prefix: 'bluzelle', hdPaths: [makePath()] }));
exports.newLocalWallet = newLocalWallet;
class BluzelleLocalWallet extends proto_signing_1.DirectSecp256k1HdWallet {
    constructor() {
        super(...arguments);
        this.sequenceTable = {};
        this.getSequenceQueue = Promise.resolve({});
    }
    static fromMnemonic(mnemonic, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const mnemonicChecked = new crypto_1.EnglishMnemonic(mnemonic);
            const seed = yield crypto_1.Bip39.mnemonicToSeed(mnemonicChecked, options.bip39Password);
            return new BluzelleLocalWallet(mnemonicChecked, Object.assign(Object.assign({}, options), { seed: seed }));
        });
    }
    getSequence(client, signerAddress) {
        return this.getSequenceQueue = this.getSequenceQueue.then(() => Promise.resolve(this.sequenceTable[signerAddress])
            .then(accountInfo => accountInfo || client.getSequenceFromNetwork(signerAddress))
            .then((0, promise_passthrough_1.passThrough)(response => {
            this.sequenceTable[signerAddress] = Object.assign(Object.assign({}, response), { sequence: response.sequence + 1 });
        })));
    }
}
exports.BluzelleLocalWallet = BluzelleLocalWallet;
function makePath(idx = 0) {
    return [
        crypto_1.Slip10RawIndex.hardened(44),
        crypto_1.Slip10RawIndex.hardened(483),
        // Slip10RawIndex.hardened(118),
        crypto_1.Slip10RawIndex.hardened(0),
        crypto_1.Slip10RawIndex.normal(0),
        crypto_1.Slip10RawIndex.normal(idx),
    ];
}
//# sourceMappingURL=localWallet.js.map