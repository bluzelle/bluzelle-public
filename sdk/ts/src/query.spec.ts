import {getBlzClient, restartIpfsServerAndSwarm} from "@bluzelle/testing/src/commonUtils";
import {generateContent} from "@bluzelle/testing/src/fileUtils";
import {hasContent, getAccountBalance} from "./query";
import {pinCid, withTransaction} from "./tx";
import {BehaviorSubject} from "rxjs";
import {times} from "lodash";
import {passThroughAwait} from "promise-passthrough";
import {createCtx, createCtxAwait, withCtxAwait} from "@scottburch/with-context";
import {create} from "ipfs-http-client";
import {expect} from "chai";

const ipfsClient = create({host: '127.0.0.1', port: 5001, protocol: 'http'})

const curiumUrl = 'http://localhost:26667';
const mnemonic = new BehaviorSubject<string>("");

describe('query', function () {
    this.timeout(120_000);

    beforeEach(() =>
        restartIpfsServerAndSwarm()
            .then((swarmMnemonic) => mnemonic.next(swarmMnemonic))
    )

    it('hasContent should return true if content is pinned', () =>
        Promise.all(times(2).map(() =>
            Promise.resolve(generateContent(0.01))
                .then((content) => ipfsClient.add(content))
        ))
            .then((addResults) => createCtx('addResults', () => addResults))
            .then(withCtxAwait('client', () => getBlzClient(curiumUrl, mnemonic.getValue())))
            .then(passThroughAwait((ctx) =>
                Promise.all(ctx.addResults.map((addResult) =>
                    pinCid(ctx.client, addResult.path, {maxGas: 200000, gasPrice: 0.002})
                ))
            ))
            .then(ctx => Promise.all(ctx.addResults.map(addResult =>
                hasContent(ctx.client, addResult.path)
                    .then((confirm) => expect(confirm).to.be.true)
            )))
    );


    it('hasContent should return false if content is NOT pinned', () =>
        Promise.all(times(2).map(() =>
            Promise.resolve(generateContent(0.01))
                .then((content) => ipfsClient.add(content))
        ))
            .then((addResults) => createCtx('addResults', () => addResults))
            .then(withCtxAwait('client', () => getBlzClient(curiumUrl, mnemonic.getValue())))
            .then(ctx => Promise.all(ctx.addResults.map(addResult =>
                hasContent(ctx.client, addResult.path)
                    .then((confirm) => expect(confirm).to.be.false)
            )))
    );

    it('getAccountBalance should return account balance', () =>
        Promise.all(times(5).map(() =>
            Promise.resolve({content: generateContent(0.01)})
                .then(ctx => ipfsClient.add(ctx.content)
                    .then((addResult) => ({content: ctx.content, cid: addResult.path})))
        ))
            .then((contents) => createCtx('contents',() => contents))
            .then(withCtxAwait('client', () => getBlzClient(curiumUrl, mnemonic.getValue())))
            .then(passThroughAwait(ctx => withTransaction(ctx.client, () =>
                ctx.contents.forEach((contentObj) => pinCid(ctx.client, contentObj.cid, {maxGas: 200000, gasPrice: 0.002}))
            )))
            .then(ctx => getAccountBalance(ctx.client, ctx.client.address))
    );

    it("getAccountBalance should not charge gas", () =>
        Promise.resolve(createCtxAwait('client', () => getBlzClient(curiumUrl, mnemonic.getValue())))
            .then(withCtxAwait('balanceBefore', (ctx) => getAccountBalance(ctx.client, ctx.client.address)))
            .then(withCtxAwait('balanceAfter', (ctx) => getAccountBalance(ctx.client, ctx.client.address)))
            .then((ctx) => expect(ctx.balanceAfter).equal(ctx.balanceBefore))
    );

})