"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swarmUtils_1 = require("@bluzelle/testing/src/swarmUtils");
const defaultConfigs_1 = require("@bluzelle/testing/src/defaultConfigs");
const chai_1 = require("chai");
const faucet_1 = require("./faucet");
describe('faucet', () => {
    it('should create an address', () => {
        return Promise.resolve((0, faucet_1.createAddress)())
            .then(result => {
            (0, chai_1.expect)(result.address).to.match(/^bluzelle/);
            (0, chai_1.expect)(result.address).to.have.length(47);
            (0, chai_1.expect)(result.mnemonic.split(' ')).to.have.length(24);
        });
    });
    it('should mint tokens to a given address', () => {
        return (0, swarmUtils_1.startSwarmWithClient)(Object.assign(Object.assign({}, defaultConfigs_1.defaultSwarmConfig), { bluzelleFaucet: true }))
            .then(({ bzSdk }) => (0, faucet_1.mint)(bzSdk, 'bluzelle1qst08g0f6hyr7z6a7xpgye3nv4ngtnxzz457zd'))
            .then(response => {
            (0, chai_1.expect)(response.mnemonic).to.be.empty;
            (0, chai_1.expect)(response.address).to.equal('bluzelle1qst08g0f6hyr7z6a7xpgye3nv4ngtnxzz457zd');
        });
    });
    it('should mint tokens with no given address', () => {
        return (0, swarmUtils_1.startSwarmWithClient)(Object.assign(Object.assign({}, defaultConfigs_1.defaultSwarmConfig), { bluzelleFaucet: true }))
            .then(({ bzSdk }) => (0, faucet_1.mint)(bzSdk))
            .then(response => {
            (0, chai_1.expect)(response.mnemonic.split(' ')).to.have.length(24);
            (0, chai_1.expect)(response.address).to.match(/^bluzelle/);
            (0, chai_1.expect)(response.address).to.have.length(47);
        });
    });
});
//# sourceMappingURL=faucet.spec.js.map