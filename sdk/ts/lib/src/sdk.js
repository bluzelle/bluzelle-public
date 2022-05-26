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
exports.SigningBluzelleClient = exports.newBluzelleClient = void 0;
const stargate_1 = require("@cosmjs/stargate");
const registry_1 = require("./registry");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const query_1 = require("./generated/bluzelle/curium/bluzelle.curium.storage/module/types/storage/query");
const query_2 = require("./generated/cosmos/cosmos-sdk/cosmos.bank.v1beta1/module/types/cosmos/bank/v1beta1/query");
const query_3 = require("./generated/bluzelle/curium/bluzelle.curium.faucet/module/types/faucet/query");
const query_4 = require("./generated/bluzelle/curium/bluzelle.curium.tax/module/types/tax/query");
const newBluzelleClient = (config) => config.wallet()
    .then(wallet => SigningBluzelleClient.connectWithSigner(config.url, wallet, { prefix: 'bluzelle', registry: (0, registry_1.getRegistry)() })
    .then(sgClient => Promise.all([
    getRpcClient(config.url),
    sgClient,
    wallet.getAccounts().then(acc => acc[0].address),
    tendermint_rpc_1.Tendermint34Client.connect(config.url)
])))
    .then(([queryClient, sgClient, address, tmClient]) => ({
    url: config.url,
    queryClient,
    sgClient,
    address,
    tmClient
}));
exports.newBluzelleClient = newBluzelleClient;
const getRpcClient = (url) => tendermint_rpc_1.Tendermint34Client.connect(url)
    .then(tendermintClient => new stargate_1.QueryClient(tendermintClient))
    .then(stargate_1.createProtobufRpcClient)
    .then(rpcClient => Promise.resolve({
    storage: new query_1.QueryClientImpl(rpcClient),
    bank: new query_2.QueryClientImpl(rpcClient),
    faucet: new query_3.QueryClientImpl(rpcClient),
    tax: new query_4.QueryClientImpl(rpcClient)
}));
class SigningBluzelleClient extends stargate_1.SigningStargateClient {
    constructor(tmClient, signer, options) {
        super(tmClient, signer, options);
        this.wallet = signer;
    }
    getSequenceFromNetwork(address) {
        return super.getSequence(address);
    }
    getSequence(address) {
        return this.wallet.getSequence(this, address);
    }
    static connectWithSigner(endpoint, signer, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return tendermint_rpc_1.Tendermint34Client.connect(endpoint)
                .then(tmClient => new SigningBluzelleClient(tmClient, signer, options));
        });
    }
}
exports.SigningBluzelleClient = SigningBluzelleClient;
//# sourceMappingURL=sdk.js.map