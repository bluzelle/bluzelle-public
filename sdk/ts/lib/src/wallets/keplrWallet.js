"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BluzelleKeplrWallet = exports.newKeplrWallet = void 0;
const sdk_1 = require("../sdk");
const promise_passthrough_1 = require("promise-passthrough");
const queryTendermint_1 = require("../queryTendermint");
const localWallet_1 = require("./localWallet");
const wallet_1 = require("@bluzelle/wallet/src/wallet");
const newKeplrWallet = (nodeAddress) => () => (0, wallet_1.generateMnemonic)()
    .then(mnemonic => (0, sdk_1.newBluzelleClient)({
    url: `${nodeAddress}:26657`,
    wallet: (0, localWallet_1.newLocalWallet)(mnemonic)
})).then(client => (0, queryTendermint_1.getStatus)(client))
    .then((0, promise_passthrough_1.passThroughAwait)(status => {
    var _a;
    return (_a = window.keplr) === null || _a === void 0 ? void 0 : _a.experimentalSuggestChain({
        chainId: status.chainId,
        chainName: "Bluzelle",
        rpc: `http://${nodeAddress}:26657`,
        rest: `http://${nodeAddress}:1317`,
        bip44: {
            coinType: 483,
        },
        bech32Config: {
            bech32PrefixAccAddr: "bluzelle",
            bech32PrefixAccPub: "bluzelle" + "pub",
            bech32PrefixValAddr: "bluzelle" + "valoper",
            bech32PrefixValPub: "bluzelle" + "valoperpub",
            bech32PrefixConsAddr: "bluzelle" + "valcons",
            bech32PrefixConsPub: "bluzelle" + "valconspub",
        },
        currencies: [
            {
                coinDenom: "BLZ",
                coinMinimalDenom: "ubnt",
                coinDecimals: 6,
                coinGeckoId: "bluzelle",
            },
        ],
        feeCurrencies: [
            {
                coinDenom: "BLZ",
                coinMinimalDenom: "ubnt",
                coinDecimals: 6,
                coinGeckoId: "bluzelle",
            },
        ],
        stakeCurrency: {
            coinDenom: "BLZ",
            coinMinimalDenom: "ubnt",
            coinDecimals: 6,
            coinGeckoId: "bluzelle",
        },
        coinType: 483,
        gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.03,
        }
    });
}))
    .then(status => { var _a; return (_a = window.keplr) === null || _a === void 0 ? void 0 : _a.getOfflineSigner(status.chainId); })
    .then((keplrOfflineSigner) => new BluzelleKeplrWallet(keplrOfflineSigner));
exports.newKeplrWallet = newKeplrWallet;
class BluzelleKeplrWallet {
    constructor(keplrOfflineSigner) {
        this.sequenceTable = {};
        this.getSequenceQueue = Promise.resolve({});
        this.getAccounts = keplrOfflineSigner.getAccounts.bind(keplrOfflineSigner);
        this.signDirect = keplrOfflineSigner.signDirect.bind(keplrOfflineSigner);
    }
    getSequence(client, signerAddress) {
        return this.getSequenceQueue = this.getSequenceQueue.then(() => Promise.resolve(this.sequenceTable[signerAddress])
            .then(accountInfo => accountInfo || client.getSequenceFromNetwork(signerAddress))
            .then((0, promise_passthrough_1.passThrough)(response => {
            this.sequenceTable[signerAddress] = Object.assign(Object.assign({}, response), { sequence: response.sequence + 1 });
        })));
    }
}
exports.BluzelleKeplrWallet = BluzelleKeplrWallet;
//# sourceMappingURL=keplrWallet.js.map