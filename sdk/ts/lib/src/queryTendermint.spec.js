"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swarmUtils_1 = require("@bluzelle/testing/src/swarmUtils");
const defaultConfigs_1 = require("@bluzelle/testing/src/defaultConfigs");
const queryTendermint_1 = require("./queryTendermint");
const chai_1 = require("chai");
describe('tendermint queries', () => {
    it('should get the status of a node', () => (0, swarmUtils_1.startSwarmWithClient)(Object.assign(Object.assign({}, defaultConfigs_1.defaultSwarmConfig), { bluzelleFaucet: true }))
        .then(({ bzSdk }) => (0, queryTendermint_1.getStatus)(bzSdk))
        .then(response => {
        (0, chai_1.expect)(response.nodeId.length).to.equal(40);
        (0, chai_1.expect)(response.caughtUp).to.be.true;
        (0, chai_1.expect)(response.chainId).to.equal('my-chain');
        (0, chai_1.expect)(response.blockHeight).to.be.greaterThan(0);
        (0, chai_1.expect)(response.moniker).to.equal('test-sentry-client-0');
    }));
    it('should return the validators on a network', () => (0, swarmUtils_1.startSwarmWithClient)(Object.assign(Object.assign({}, defaultConfigs_1.defaultSwarmConfig), { bluzelleFaucet: true }))
        .then(({ bzSdk }) => (0, queryTendermint_1.getValidators)(bzSdk))
        .then(response => {
        (0, chai_1.expect)(response[0].address.length).to.equal(40);
        (0, chai_1.expect)(response[0].votingPower).to.equal(100000000);
    }));
});
//# sourceMappingURL=queryTendermint.spec.js.map