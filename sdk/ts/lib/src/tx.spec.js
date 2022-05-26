"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tx_1 = require("./tx");
const swarmUtils_1 = require("@bluzelle/testing/src/swarmUtils");
const defaultConfigs_1 = require("@bluzelle/testing/src/defaultConfigs");
const query_1 = require("./query");
const promise_passthrough_1 = require("promise-passthrough");
const chai_1 = require("chai");
const with_context_1 = require("with-context");
const MAX_GAS = 200000;
const GAS_PRICE = 2;
describe('sending transactions', function () {
    this.timeout(2000000);
    it('should have a withTransaction that can bundle messages', () => {
        return (0, swarmUtils_1.startSwarmWithClient)(Object.assign(Object.assign({}, defaultConfigs_1.defaultSwarmConfig), { bluzelleFaucet: true }))
            .then(({ bzSdk }) => (0, tx_1.withTransaction)(bzSdk, () => {
            (0, tx_1.pinCid)(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', { gasPrice: 0.002, maxGas: 200000 });
            (0, tx_1.pinCid)(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', { gasPrice: 0.002, maxGas: 200000 });
            (0, tx_1.pinCid)(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', { gasPrice: 0.002, maxGas: 200000 });
        }));
    });
    it('should store pin to state in a pin tx', () => (0, swarmUtils_1.startSwarmWithClient)()
        .then((0, promise_passthrough_1.passThroughAwait)(({ bzSdk }) => (0, tx_1.pinCid)(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', { gasPrice: 0.002, maxGas: 200000 })))
        .then((0, with_context_1.withCtxAwait)('whitelist', ({ swarm }) => getWhiteListForGenesisExport(swarm)))
        .then((0, with_context_1.withCtxAwait)('sentry', ({ swarm }) => Promise.resolve(swarm.getSentries()[0])))
        .then((0, with_context_1.withCtxAwait)('exportedGenesis', ({ sentry, whitelist }) => sentry.exportGenesis({
        whitelist: whitelist
    })))
        .then((0, with_context_1.withCtxAwait)('genesis', ({ exportedGenesis }) => Promise.resolve(exportedGenesis)))
        .then(({ genesis, auth }) => (0, chai_1.expect)(genesis.app_state.storage.pins[0]).to.deep.equal({
        cid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
        creator: auth.address
    })));
    // skipping because we don't want to add admin info to repo right now
    describe.skip('as admin', () => {
        const BP = 7777;
        const TAX_COLLECTOR = "bluzelle197xx52k9tw08e7h0jqahptwucyv3e6pxex3xfe";
        it("setGasTaxBp should set gas tax bp", () => (0, swarmUtils_1.startSwarmWithClient)()
            .then((0, promise_passthrough_1.passThroughAwait)(client => (0, tx_1.setGasTaxBp)(client.bzSdk, BP, { maxGas: MAX_GAS, gasPrice: GAS_PRICE })))
            .then(client => (0, query_1.getTaxInfo)(client.bzSdk))
            .then(taxInfo => (0, chai_1.expect)(taxInfo.gasTaxBp).equal(BP)));
        it("setTransferTaxBp should set transfer tax bp", () => (0, swarmUtils_1.startSwarmWithClient)()
            .then((0, promise_passthrough_1.passThroughAwait)(client => (0, tx_1.setTransferTaxBp)(client.bzSdk, BP, { maxGas: MAX_GAS, gasPrice: GAS_PRICE })))
            .then(client => (0, query_1.getTaxInfo)(client.bzSdk))
            .then(taxInfo => (0, chai_1.expect)(taxInfo.transferTaxBp).equal(BP)));
        it("setTaxCollector should set tax collector", () => (0, swarmUtils_1.startSwarmWithClient)()
            .then((0, promise_passthrough_1.passThroughAwait)(client => (0, tx_1.setTaxCollector)(client.bzSdk, TAX_COLLECTOR, { maxGas: MAX_GAS, gasPrice: GAS_PRICE })))
            .then(client => (0, query_1.getTaxInfo)(client.bzSdk))
            .then(taxInfo => (0, chai_1.expect)(taxInfo.taxCollector).equal(TAX_COLLECTOR)));
    });
    describe('as non-admin', () => {
        const BP = 1234;
        const TAX_COLLECTOR = "bluzelle197xx52k9tw08e7h0jqahptwucyv3e123456789";
        it("setGasTaxBp should not set gas tax bp", () => (0, swarmUtils_1.startSwarmWithClient)()
            .then((0, promise_passthrough_1.passThroughAwait)(client => (0, tx_1.setGasTaxBp)(client.bzSdk, BP, { maxGas: MAX_GAS, gasPrice: GAS_PRICE })))
            .then(client => (0, query_1.getTaxInfo)(client.bzSdk))
            .then(taxInfo => (0, chai_1.expect)(taxInfo.gasTaxBp).not.equal(BP)));
        it("setTransferTaxBp should not set transfer tax bp", () => (0, swarmUtils_1.startSwarmWithClient)()
            .then((0, promise_passthrough_1.passThroughAwait)(client => (0, tx_1.setTransferTaxBp)(client.bzSdk, BP, { maxGas: MAX_GAS, gasPrice: GAS_PRICE })))
            .then(client => (0, query_1.getTaxInfo)(client.bzSdk))
            .then(taxInfo => (0, chai_1.expect)(taxInfo.transferTaxBp).not.equal(BP)));
        it("setTaxCollector should not set tax collector", () => (0, swarmUtils_1.startSwarmWithClient)()
            .then((0, promise_passthrough_1.passThroughAwait)(client => (0, tx_1.setTaxCollector)(client.bzSdk, TAX_COLLECTOR, { maxGas: MAX_GAS, gasPrice: GAS_PRICE })))
            .then(client => (0, query_1.getTaxInfo)(client.bzSdk))
            .then(taxInfo => (0, chai_1.expect)(taxInfo.taxCollector).not.equal(TAX_COLLECTOR)));
    });
});
const getWhiteListForGenesisExport = (swarm) => Promise.resolve(swarm.getValidators()[0])
    .then(validator => validator.exec('curiumd query staking validators'))
    .then(validators => validators)
    .then(addresses => addresses.validators.map(addr => addr.operator_address));
//# sourceMappingURL=tx.spec.js.map