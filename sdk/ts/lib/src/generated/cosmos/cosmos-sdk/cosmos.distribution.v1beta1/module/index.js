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
const tx_1 = require("./types/cosmos/distribution/v1beta1/tx");
const tx_2 = require("./types/cosmos/distribution/v1beta1/tx");
const tx_3 = require("./types/cosmos/distribution/v1beta1/tx");
const tx_4 = require("./types/cosmos/distribution/v1beta1/tx");
const types = [
    ["/cosmos.distribution.v1beta1.MsgSetWithdrawAddress", tx_1.MsgSetWithdrawAddress],
    ["/cosmos.distribution.v1beta1.MsgFundCommunityPool", tx_2.MsgFundCommunityPool],
    ["/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission", tx_3.MsgWithdrawValidatorCommission],
    ["/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward", tx_4.MsgWithdrawDelegatorReward],
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
        msgSetWithdrawAddress: (data) => ({ typeUrl: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress", value: tx_1.MsgSetWithdrawAddress.fromPartial(data) }),
        msgFundCommunityPool: (data) => ({ typeUrl: "/cosmos.distribution.v1beta1.MsgFundCommunityPool", value: tx_2.MsgFundCommunityPool.fromPartial(data) }),
        msgWithdrawValidatorCommission: (data) => ({ typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission", value: tx_3.MsgWithdrawValidatorCommission.fromPartial(data) }),
        msgWithdrawDelegatorReward: (data) => ({ typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward", value: tx_4.MsgWithdrawDelegatorReward.fromPartial(data) }),
    };
});
exports.txClient = txClient;
const queryClient = ({ addr: addr } = { addr: "http://localhost:1317" }) => __awaiter(void 0, void 0, void 0, function* () {
    return new rest_1.Api({ baseUrl: addr });
});
exports.queryClient = queryClient;
//# sourceMappingURL=index.js.map