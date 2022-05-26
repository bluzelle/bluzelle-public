"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTaxCollector = exports.setTransferTaxBp = exports.setGasTaxBp = exports.send = exports.pinCid = exports.registerMessages = exports.withTransaction = void 0;
const tx_1 = require("./generated/bluzelle/curium/bluzelle.curium.storage/module/types/storage/tx");
const Deferred_1 = require("deferred/src/Deferred");
const monet_1 = require("monet");
const promise_passthrough_1 = require("promise-passthrough");
const lodash_1 = require("lodash");
const tx_2 = require("./generated/cosmos/cosmos-sdk/cosmos.bank.v1beta1/module/types/cosmos/bank/v1beta1/tx");
const tx_3 = require("./generated/bluzelle/curium/bluzelle.curium.tax/module/types/tax/tx");
let msgQueue;
const withTransaction = (client, fn) => {
    startTransaction();
    fn();
    const queue = msgQueue || [];
    msgQueue = undefined;
    return endTransaction(queue, client)
        .then((0, promise_passthrough_1.passThrough)(response => queue.map((it, idx) => { var _a; return it.deferred.resolve(Object.assign(Object.assign({}, response), { rawLog: (_a = response.rawLog) === null || _a === void 0 ? void 0 : _a[idx] })); })));
};
exports.withTransaction = withTransaction;
const startTransaction = () => msgQueue = [];
const endTransaction = (queue, client) => {
    return broadcastTx(client, (queue || []).map(it => it.msg), combineOptions(queue));
    function combineOptions(queue) {
        return (queue || []).reduce((options, item) => (Object.assign(Object.assign({}, options), { maxGas: options.maxGas + item.options.maxGas, gasPrice: item.options.gasPrice })), { maxGas: 0 });
    }
};
const registerMessages = (registry) => {
    registry.register('/bluzelle.curium.storage.MsgPin', tx_1.MsgPin);
    registry.register('/cosmos.bank.v1beta1.MsgSend', tx_2.MsgSend);
    registry.register('/bluzelle.curium.tax.MsgSetGasTaxBp', tx_3.MsgSetGasTaxBp);
    registry.register('/bluzelle.curium.tax.MsgSetTransferTaxBp', tx_3.MsgSetTransferTaxBp);
    registry.register('/bluzelle.curium.tax.MsgSetTaxCollector', tx_3.MsgSetTaxCollector);
    return registry;
};
exports.registerMessages = registerMessages;
const queueMessage = (msg, options) => (0, monet_1.Some)({
    msg, options, deferred: (0, Deferred_1.newDeferred)()
})
    .map((0, promise_passthrough_1.passThrough)(item => msgQueue === null || msgQueue === void 0 ? void 0 : msgQueue.push(item)));
const pinCid = (client, cid, options) => sendTx(client, '/bluzelle.curium.storage.MsgPin', { cid, creator: client.address }, options);
exports.pinCid = pinCid;
const send = (client, toAddress, amount, options) => sendTx(client, '/cosmos.bank.v1beta1.MsgSend', {
    to_address: toAddress,
    amount: [{ denom: 'ubnt', amount: amount.toString() }],
    from_address: client.address
}, options);
exports.send = send;
const setGasTaxBp = (client, bp, options) => sendTx(client, '/bluzelle.curium.tax.MsgSetGasTaxBp', { bp, creator: client.address }, options);
exports.setGasTaxBp = setGasTaxBp;
const setTransferTaxBp = (client, bp, options) => sendTx(client, '/bluzelle.curium.tax.MsgSetTransferTaxBp', { bp, creator: client.address }, options);
exports.setTransferTaxBp = setTransferTaxBp;
const setTaxCollector = (client, taxCollector, options) => sendTx(client, '/bluzelle.curium.tax.MsgSetTaxCollector', { taxCollector, creator: client.address }, options);
exports.setTaxCollector = setTaxCollector;
const sendTx = (client, type, msg, options) => (0, monet_1.Right)(msg)
    .map(msg => ({
    typeUrl: type,
    value: msg
}))
    .bind(msg => msgQueue ? (0, monet_1.Left)(msg) : (0, monet_1.Right)(msg))
    .map(msg => broadcastTx(client, [msg], options))
    .leftMap(msg => queueMessage(msg, options))
    .cata(lodash_1.identity, lodash_1.identity);
const broadcastTx = (client, msgs, options) => client.sgClient.signAndBroadcast(client.address, msgs, {
    gas: options.maxGas.toFixed(0), amount: [{
            denom: 'ubnt',
            amount: (options.gasPrice * options.maxGas).toFixed(0)
        }]
}, options.memo)
    .then(response => (Object.assign(Object.assign({}, response), { rawLog: typeof response.rawLog === "string" ? response.rawLog : JSON.parse(response.rawLog || '[]') })));
//# sourceMappingURL=tx.js.map