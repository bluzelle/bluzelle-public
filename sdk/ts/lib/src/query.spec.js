"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commonUtils_1 = require("@bluzelle/testing/src/commonUtils");
const fileUtils_1 = require("@bluzelle/testing/src/fileUtils");
const query_1 = require("./query");
const tx_1 = require("./tx");
const rxjs_1 = require("rxjs");
const lodash_1 = require("lodash");
const promise_passthrough_1 = require("promise-passthrough");
const with_context_1 = require("with-context");
const ipfs_http_client_1 = require("ipfs-http-client");
const chai_1 = require("chai");
const ipfsClient = (0, ipfs_http_client_1.create)({ host: '127.0.0.1', port: 5001, protocol: 'http' });
const curiumUrl = 'http://localhost:26667';
const mnemonic = new rxjs_1.BehaviorSubject("");
describe('query', function () {
    this.timeout(120000);
    beforeEach(() => (0, commonUtils_1.restartIpfsServerAndSwarm)()
        .then((swarmMnemonic) => mnemonic.next(swarmMnemonic)));
    it('hasContent should return true if content is pinned', () => Promise.all((0, lodash_1.times)(2).map(() => Promise.resolve((0, fileUtils_1.generateContent)(0.01))
        .then((content) => ipfsClient.add(content))))
        .then((addResults) => (0, with_context_1.createCtx)('addResults', () => addResults))
        .then((0, with_context_1.withCtxAwait)('client', () => (0, commonUtils_1.getBlzClient)(curiumUrl, mnemonic.getValue())))
        .then((0, promise_passthrough_1.passThroughAwait)((ctx) => Promise.all(ctx.addResults.map((addResult) => (0, tx_1.pinCid)(ctx.client, addResult.path, { maxGas: 200000, gasPrice: 0.002 })))))
        .then(ctx => Promise.all(ctx.addResults.map(addResult => (0, query_1.hasContent)(ctx.client, addResult.path)
        .then((confirm) => (0, chai_1.expect)(confirm).to.be.true)))));
    it('hasContent should return false if content is NOT pinned', () => Promise.all((0, lodash_1.times)(2).map(() => Promise.resolve((0, fileUtils_1.generateContent)(0.01))
        .then((content) => ipfsClient.add(content))))
        .then((addResults) => (0, with_context_1.createCtx)('addResults', () => addResults))
        .then((0, with_context_1.withCtxAwait)('client', () => (0, commonUtils_1.getBlzClient)(curiumUrl, mnemonic.getValue())))
        .then(ctx => Promise.all(ctx.addResults.map(addResult => (0, query_1.hasContent)(ctx.client, addResult.path)
        .then((confirm) => (0, chai_1.expect)(confirm).to.be.false)))));
    it('getAccountBalance should return account balance', () => Promise.all((0, lodash_1.times)(5).map(() => Promise.resolve({ content: (0, fileUtils_1.generateContent)(0.01) })
        .then(ctx => ipfsClient.add(ctx.content)
        .then((addResult) => ({ content: ctx.content, cid: addResult.path })))))
        .then((contents) => (0, with_context_1.createCtx)('contents', () => contents))
        .then((0, with_context_1.withCtxAwait)('client', () => (0, commonUtils_1.getBlzClient)(curiumUrl, mnemonic.getValue())))
        .then((0, promise_passthrough_1.passThroughAwait)(ctx => (0, tx_1.withTransaction)(ctx.client, () => ctx.contents.forEach((contentObj) => (0, tx_1.pinCid)(ctx.client, contentObj.cid, { maxGas: 200000, gasPrice: 0.002 })))))
        .then(ctx => (0, query_1.getAccountBalance)(ctx.client, ctx.client.address))
        .then(res => typeof (res) === "number"));
    it("getAccountBalance should not charge gas", () => Promise.resolve((0, with_context_1.createCtxAwait)('client', () => (0, commonUtils_1.getBlzClient)(curiumUrl, mnemonic.getValue())))
        .then((0, with_context_1.withCtxAwait)('balanceBefore', (ctx) => (0, query_1.getAccountBalance)(ctx.client, ctx.client.address)))
        .then((0, with_context_1.withCtxAwait)('balanceAfter', (ctx) => (0, query_1.getAccountBalance)(ctx.client, ctx.client.address)))
        .then((ctx) => (0, chai_1.expect)(ctx.balanceAfter).equal(ctx.balanceBefore)));
});
//# sourceMappingURL=query.spec.js.map