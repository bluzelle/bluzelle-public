"use strict";
// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
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
exports.queryClient = exports.txClient = exports.registry = exports.MissingWalletError = void 0;
const stargate_1 = require("@cosmjs/stargate");
const proto_signing_1 = require("@cosmjs/proto-signing");
const rest_1 = require("./rest");
const tx_1 = require("./types/tax/tx");
const tx_2 = require("./types/tax/tx");
const tx_3 = require("./types/tax/tx");
const types = [
    ["/bluzelle.curium.tax.MsgSetGasTaxBp", tx_1.MsgSetGasTaxBp],
    ["/bluzelle.curium.tax.MsgSetTaxCollector", tx_2.MsgSetTaxCollector],
    ["/bluzelle.curium.tax.MsgSetTransferTaxBp", tx_3.MsgSetTransferTaxBp],
];
exports.MissingWalletError = new Error("wallet is required");
exports.registry = new proto_signing_1.Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!wallet)
        throw exports.MissingWalletError;
    let client;
    if (addr) {
        client = yield stargate_1.SigningStargateClient.connectWithSigner(addr, wallet, { registry: exports.registry });
    }
    else {
        client = yield stargate_1.SigningStargateClient.offline(wallet, { registry: exports.registry });
    }
    const { address } = (yield wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgSetGasTaxBp: (data) => ({ typeUrl: "/bluzelle.curium.tax.MsgSetGasTaxBp", value: tx_1.MsgSetGasTaxBp.fromPartial(data) }),
        msgSetTaxCollector: (data) => ({ typeUrl: "/bluzelle.curium.tax.MsgSetTaxCollector", value: tx_2.MsgSetTaxCollector.fromPartial(data) }),
        msgSetTransferTaxBp: (data) => ({ typeUrl: "/bluzelle.curium.tax.MsgSetTransferTaxBp", value: tx_3.MsgSetTransferTaxBp.fromPartial(data) }),
    };
});
exports.txClient = txClient;
const queryClient = ({ addr: addr } = { addr: "http://localhost:1317" }) => __awaiter(void 0, void 0, void 0, function* () {
    return new rest_1.Api({ baseUrl: addr });
});
exports.queryClient = queryClient;
//# sourceMappingURL=index.js.map