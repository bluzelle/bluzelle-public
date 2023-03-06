"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidators = exports.getStatus = void 0;
const getStatus = (client) => client.tmClient.status()
    .then(result => ({
    nodeId: Buffer.from(result.nodeInfo.id).toString('hex'),
    chainId: result.nodeInfo.network,
    moniker: result.nodeInfo.moniker,
    blockHeight: result.syncInfo.latestBlockHeight,
    caughtUp: !result.syncInfo.catchingUp,
}));
exports.getStatus = getStatus;
const getValidators = (client) => client.tmClient.validators({})
    .then(result => result.validators.map(validator => ({
    address: Buffer.from(validator.address).toString('hex'),
    votingPower: validator.votingPower
})));
exports.getValidators = getValidators;
