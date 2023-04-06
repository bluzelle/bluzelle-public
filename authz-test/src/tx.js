"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeGrant = exports.revoke = exports.grant = exports.signMetadata = exports.updateMintAuthority = exports.updateMetadataAuthority = exports.updateMetadata = exports.printNftEdition = exports.transferNft = exports.createCollection = exports.createNft = exports.withdrawDelegatorReward = exports.redelegate = exports.undelegate = exports.delegate = exports.setTaxCollector = exports.setTransferTaxBp = exports.setGasTaxBp = exports.send = exports.pinCid = exports.registerMessages = exports.withTransaction = void 0;
const tx_1 = require("./curium/lib/generated/storage/tx");
const Deferred_1 = require("./utils/Deferred");
const monet_1 = require("monet");
const promise_passthrough_1 = require("promise-passthrough");
const lodash_1 = require("lodash");
const tx_2 = require("./curium/lib/generated/cosmos/bank/v1beta1/tx");
const tx_3 = require("./curium/lib/generated/nft/tx");
const tx_4 = require("./curium/lib/generated/tax/tx");
const tx_5 = require("./curium/lib/generated/cosmos/staking/v1beta1/tx");
const tx_6 = require("./curium/lib/generated/cosmos/distribution/v1beta1/tx");
// Authz Msg import
const tx_7 = require("./curium/lib/generated/cosmos/authz/v1beta1/tx");
const encoding_1 = require("@cosmjs/encoding");
const tx_8 = require("./curium/lib/generated/cosmos/tx/v1beta1/tx");
const authzMappings_1 = require("./authzMappings");
const Long = require('long');
let msgQueue;
const getDefaultBroadcastMode = () => ({
    async: broadcastTxAsync,
    sync: broadcastTx
});
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
    registry.register('/bluzelle.curium.tax.MsgSetGasTaxBp', tx_4.MsgSetGasTaxBp);
    registry.register('/bluzelle.curium.tax.MsgSetTransferTaxBp', tx_4.MsgSetTransferTaxBp);
    registry.register('/bluzelle.curium.tax.MsgSetTaxCollector', tx_4.MsgSetTaxCollector);
    registry.register('/cosmos.staking.v1beta1.MsgDelegate', tx_5.MsgDelegate);
    registry.register('/cosmos.staking.v1beta1.MsgUndelegate', tx_5.MsgUndelegate);
    registry.register('/cosmos.staking.v1beta1.MsgBeginRedelegate', tx_5.MsgBeginRedelegate);
    registry.register('/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward', tx_6.MsgWithdrawDelegatorReward);
    registry.register('/bluzelle.curium.nft.MsgCreateNFT', tx_3.MsgCreateNFT);
    registry.register('/bluzelle.curium.nft.MsgCreateCollection', tx_3.MsgCreateCollection);
    registry.register('/bluzelle.curium.nft.MsgTransferNFT', tx_3.MsgTransferNFT);
    registry.register('/bluzelle.curium.nft.MsgUpdateMintAuthority', tx_3.MsgUpdateMintAuthority);
    registry.register('/bluzelle.curium.nft.MsgUpdateMetadata', tx_3.MsgUpdateMetadata);
    registry.register('/bluzelle.curium.nft.MsgUpdateMetadataAuthority', tx_3.MsgUpdateMetadataAuthority);
    registry.register('/bluzelle.curium.nft.MsgPrintEdition', tx_3.MsgPrintEdition);
    registry.register('/bluzelle.curium.nft.MsgSignMetadata', tx_3.MsgSignMetadata);
    ///authz msg register
    registry.register('/cosmos.authz.v1beta1.MsgGrant', tx_7.MsgGrant);
    registry.register('/cosmos.authz.v1beta1.MsgExec', tx_7.MsgExec);
    registry.register('/cosmos.authz.v1beta1.MsgRevoke', tx_7.MsgRevoke);
    return registry;
};
exports.registerMessages = registerMessages;
const queueMessage = (msg, options) => (0, monet_1.Some)({
    msg, options, deferred: (0, Deferred_1.newDeferred)()
})
    .map((0, promise_passthrough_1.passThrough)(item => msgQueue === null || msgQueue === void 0 ? void 0 : msgQueue.push(item)));
const pinCid = (client, cid, options) => sendTx(client, '/bluzelle.curium.storage.MsgPin', { cid, creator: client.address }, options);
exports.pinCid = pinCid;
const send = (client, toAddress, amount, options, denom = "ubnt") => Promise.resolve(sendTx(client, '/cosmos.bank.v1beta1.MsgSend', {
    toAddress: toAddress,
    amount: [{ denom, amount: amount.toString() }],
    fromAddress: client.address
}, options));
exports.send = send;
const setGasTaxBp = (client, bp, options) => sendTx(client, '/bluzelle.curium.tax.MsgSetGasTaxBp', { bp, creator: client.address }, options);
exports.setGasTaxBp = setGasTaxBp;
const setTransferTaxBp = (client, bp, options) => sendTx(client, '/bluzelle.curium.tax.MsgSetTransferTaxBp', { bp, creator: client.address }, options);
exports.setTransferTaxBp = setTransferTaxBp;
const setTaxCollector = (client, taxCollector, options) => sendTx(client, '/bluzelle.curium.tax.MsgSetTaxCollector', { taxCollector, creator: client.address }, options);
exports.setTaxCollector = setTaxCollector;
const delegate = (client, delegatorAddress, validatorAddress, amount, options) => Promise.resolve(sendTx(client, '/cosmos.staking.v1beta1.MsgDelegate', {
    delegatorAddress,
    validatorAddress,
    amount: { denom: 'ubnt', amount: amount.toString() },
}, options))
    .then(res => res ? res : {});
exports.delegate = delegate;
const undelegate = (client, delegatorAddress, validatorAddress, amount, options) => Promise.resolve(sendTx(client, '/cosmos.staking.v1beta1.MsgUndelegate', {
    delegatorAddress,
    validatorAddress,
    amount: { denom: 'ubnt', amount: amount.toString() },
}, options))
    .then(res => res ? res : {});
exports.undelegate = undelegate;
const redelegate = (client, delegatorAddress, validatorSrcAddress, validatorDstAddress, amount, options) => Promise.resolve(sendTx(client, '/cosmos.staking.v1beta1.MsgBeginRedelegate', {
    delegatorAddress,
    validatorSrcAddress,
    validatorDstAddress,
    amount: { denom: 'ubnt', amount: amount.toString() },
}, options))
    .then(res => res ? res : {});
exports.redelegate = redelegate;
const withdrawDelegatorReward = (client, delegatorAddress, validatorAddress, options) => Promise.resolve(sendTx(client, '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward', {
    delegatorAddress,
    validatorAddress,
}, options))
    .then(res => res ? res : {});
exports.withdrawDelegatorReward = withdrawDelegatorReward;
function createNft(client, props, options) {
    return Promise.resolve(sendTx(client, '/bluzelle.curium.nft.MsgCreateNFT', {
        sender: client.address,
        collId: new Long(props.collId),
        metadata: props.metadata && adaptMetadataProps(props.metadata),
    }, options));
    function adaptMetadataProps(props) {
        return (Object.assign(Object.assign({}, props), { id: new Long(props.id), masterEdition: props.masterEdition && {
                supply: new Long(props.masterEdition.supply),
                maxSupply: new Long(props.masterEdition.maxSupply)
            } }));
    }
}
exports.createNft = createNft;
const createCollection = (client, sender, symbol, name, uri, isMutable, updateAuthority, options) => Promise.resolve(sendTx(client, '/bluzelle.curium.nft.MsgCreateCollection', {
    sender,
    symbol,
    name,
    uri,
    isMutable,
    updateAuthority,
}, options));
exports.createCollection = createCollection;
const transferNft = (client, id, toAddress, broadcastOptions) => Promise.resolve(sendTx(client, '/bluzelle.curium.nft.MsgTransferNFT', {
    sender: client.address,
    id,
    newOwner: toAddress
}, broadcastOptions));
exports.transferNft = transferNft;
const printNftEdition = (client, metadataId, collId, owner, broadcastOptions) => Promise.resolve(sendTx(client, '/bluzelle.curium.nft.MsgPrintEdition', {
    sender: client.address,
    metadataId: new Long(metadataId),
    collId: new Long(collId),
    owner,
}, broadcastOptions));
exports.printNftEdition = printNftEdition;
function updateMetadata(client, props, broadcastOptions) {
    return Promise.resolve(sendTx(client, '/bluzelle.curium.nft.MsgUpdateMetadata', adaptUpdateMetadataProps(props.metadataId, props), broadcastOptions));
    function adaptUpdateMetadataProps(id, props) {
        return (Object.assign(Object.assign({}, props), { metadataId: new Long(id) }));
    }
}
exports.updateMetadata = updateMetadata;
const updateMetadataAuthority = (client, metadataId, newAuthority, broadcastOptions) => Promise.resolve(sendTx(client, '/bluzelle.curium.nft.MsgUpdateMetadataAuthority', {
    sender: client.address,
    metadataId: new Long(metadataId),
    newAuthority
}, broadcastOptions));
exports.updateMetadataAuthority = updateMetadataAuthority;
const updateMintAuthority = (client, metadataId, newAuthority, broadcastOptions) => Promise.resolve(sendTx(client, '/bluzelle.curium.nft.MsgUpdateMintAuthority', {
    sender: client.address,
    metadataId: new Long(metadataId),
    newAuthority
}, broadcastOptions));
exports.updateMintAuthority = updateMintAuthority;
const signMetadata = (client, metadataId, broadcastOptions) => Promise.resolve(sendTx(client, '/bluzelle.curium.nft.MsgSignMetadata', {
    sender: client.address,
    metadataId: new Long(metadataId)
}, broadcastOptions));
exports.signMetadata = signMetadata;
// Authz msg send functions begin.
const grant = (client, granter, grantee, grantParam, broadcastOptions) => {
    const encodingFn = authzMappings_1.grantTypeToEncodeFnMap[grantParam.grantType];
    return Promise.resolve({
        "authorization": {
            "typeUrl": authzMappings_1.grantMapping[grantParam.grantType],
            "value": encodingFn(grantParam)
        },
        "expiration": grantParam.expiration
    })
        .then((grant) => sendTx(client, '/cosmos.authz.v1beta1.MsgGrant', {
        granter,
        grantee,
        grant,
    }, broadcastOptions));
};
exports.grant = grant;
const revoke = (client, granter, grantee, msgTypeUrl, broadcastOptions) => Promise.resolve(sendTx(client, '/cosmos.authz.v1beta1.MsgRevoke', {
    granter,
    grantee,
    msgTypeUrl
}, broadcastOptions));
exports.revoke = revoke;
const executeGrant = (client, grantee, msgs, broadcastOptions) => Promise.resolve(msgs.map(({ msgType, params }) => {
    const encodingFn = authzMappings_1.msgTypeToEncodeFnMap[msgType];
    return {
        typeUrl: authzMappings_1.msgMapping[msgType],
        value: encodingFn(params),
    };
})).then((msgs) => sendTx(client, "/cosmos.authz.v1beta1.MsgExec", { grantee, msgs }, broadcastOptions));
exports.executeGrant = executeGrant;
// Authz msg send functions end
const sendTx = (client, type, msg, options, mode = getDefaultBroadcastMode()) => (0, monet_1.Right)(msg)
    .map(msg => ({
    typeUrl: type,
    value: msg
}))
    .bind(msg => msgQueue ? (0, monet_1.Left)(msg) : (0, monet_1.Right)(msg))
    .map(msg => options.mode ? mode[options.mode](client, [msg], options) : mode['sync'](client, [msg], options))
    .leftMap(msg => queueMessage(msg, options))
    .cata(lodash_1.identity, lodash_1.identity);
const broadcastTx = (client, msgs, options) => client.sgClient.signAndBroadcast(client.address, msgs, {
    gas: options.maxGas.toFixed(0), amount: [{
            denom: 'ubnt',
            amount: (options.gasPrice * options.maxGas).toFixed(0)
        }]
}, options.memo)
    .then(response => (Object.assign(Object.assign({}, response), { rawLog: tryJson(response.rawLog) })));
const broadcastTxAsync = (client, msgs, options) => client.sgClient.sign(client.address, msgs, {
    gas: options.maxGas.toFixed(0), amount: [{
            denom: 'ubnt',
            amount: (options.gasPrice * options.maxGas).toFixed(0)
        }]
}, options.memo || "")
    .then(txRaw => tx_8.TxRaw.encode(txRaw).finish())
    .then(txBytes => client.tmClient.broadcastTxAsync({
    tx: txBytes
}))
    .then(({ hash }) => (0, encoding_1.toHex)(hash).toUpperCase());
const tryJson = (s = '') => {
    try {
        return JSON.parse(s);
    }
    catch (e) {
        return s;
    }
};
