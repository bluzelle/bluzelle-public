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
const tx_1 = require("./types/cosmos/staking/v1beta1/tx");
const tx_2 = require("./types/cosmos/staking/v1beta1/tx");
const tx_3 = require("./types/cosmos/staking/v1beta1/tx");
const tx_4 = require("./types/cosmos/staking/v1beta1/tx");
const tx_5 = require("./types/cosmos/staking/v1beta1/tx");
const types = [
    ["/cosmos.staking.v1beta1.MsgEditValidator", tx_1.MsgEditValidator],
    ["/cosmos.staking.v1beta1.MsgCreateValidator", tx_2.MsgCreateValidator],
    ["/cosmos.staking.v1beta1.MsgBeginRedelegate", tx_3.MsgBeginRedelegate],
    ["/cosmos.staking.v1beta1.MsgDelegate", tx_4.MsgDelegate],
    ["/cosmos.staking.v1beta1.MsgUndelegate", tx_5.MsgUndelegate],
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
        msgEditValidator: (data) => ({ typeUrl: "/cosmos.staking.v1beta1.MsgEditValidator", value: tx_1.MsgEditValidator.fromPartial(data) }),
        msgCreateValidator: (data) => ({ typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator", value: tx_2.MsgCreateValidator.fromPartial(data) }),
        msgBeginRedelegate: (data) => ({ typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate", value: tx_3.MsgBeginRedelegate.fromPartial(data) }),
        msgDelegate: (data) => ({ typeUrl: "/cosmos.staking.v1beta1.MsgDelegate", value: tx_4.MsgDelegate.fromPartial(data) }),
        msgUndelegate: (data) => ({ typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate", value: tx_5.MsgUndelegate.fromPartial(data) }),
    };
});
exports.txClient = txClient;
const queryClient = ({ addr: addr } = { addr: "http://localhost:1317" }) => __awaiter(void 0, void 0, void 0, function* () {
    return new rest_1.Api({ baseUrl: addr });
});
exports.queryClient = queryClient;
//# sourceMappingURL=index.js.map