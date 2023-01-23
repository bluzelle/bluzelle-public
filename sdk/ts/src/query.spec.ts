import {getBlzClient, restartIpfsServerAndSwarm} from "@bluzelle/testing/src/commonUtils";
import {generateContent} from "@bluzelle/testing/src/fileUtils";
import {hasContent, getAccountBalance, parseDecTypeToNumber, getTx} from "./query";
import {pinCid, withTransaction} from "./tx";
import {BehaviorSubject} from "rxjs";
import {times} from "lodash";
import {passThroughAwait} from "promise-passthrough";
import {createCtx, createCtxAwait, withCtxAwait} from "@scottburch/with-context";
import {create} from "ipfs-http-client";
import {expect} from "chai";
import {CID} from "multiformats/cid";
import delay from "delay";
import {defaultSwarmConfig} from "@bluzelle/testing";

const ipfsClient = create({host: '127.0.0.1', port: 5001, protocol: 'http'})

const curiumUrl = 'http://localhost:26667';
const mnemonic = new BehaviorSubject<string>("");

describe('query', function () {
    this.timeout(600_000);

    beforeEach(() =>
        restartIpfsServerAndSwarm(({...defaultSwarmConfig, targetBranch: 'experimental'}))
            .then((swarmMnemonic) => mnemonic.next(swarmMnemonic))
    )

    it.skip('hasContent should return true if content is pinned', () =>
        Promise.all(times(2).map(() =>
            Promise.resolve(generateContent(0.01))
                .then((content) => ipfsClient.add(content))
        ))
            .then((addResults) => createCtx('addResults', () => addResults))
            .then(withCtxAwait('client', () => getBlzClient(curiumUrl, mnemonic.getValue())))
            .then(passThroughAwait((ctx) =>
                Promise.all(ctx.addResults.map((addResult) =>
                    pinCid(ctx.client, addResult.path, {maxGas: 200000, gasPrice: 0.002, mode: 'sync'})
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
            .then((contents) => createCtx('contents', () => contents))
            .then(withCtxAwait('client', () => getBlzClient(curiumUrl, mnemonic.getValue())))
            .then(passThroughAwait(ctx => withTransaction(ctx.client, () =>
                ctx.contents.forEach((contentObj) => pinCid(ctx.client, contentObj.cid, {
                    maxGas: 200000,
                    gasPrice: 0.002,
                    mode: 'sync'
                }))
            )))
            .then(ctx => getAccountBalance(ctx.client, ctx.client.address))
    );

    it('getAccountBalance should return account balance for the elt and g4 denoms', () =>
        getBlzClient(curiumUrl, mnemonic.getValue())
            .then(client => Promise.all([getAccountBalance(client, client.address, "uelt"), getAccountBalance(client, client.address, "ug4")]))
            .then(([ueltBal, ug4Bal]) => {
                expect(ueltBal).to.equal(500000000000000);
                expect(ug4Bal).to.equal(500000000000000);
            })
    );

    it("getAccountBalance should not charge gas", () =>
        Promise.resolve(createCtxAwait('client', () => getBlzClient(curiumUrl, mnemonic.getValue())))
            .then(withCtxAwait('balanceBefore', (ctx) => getAccountBalance(ctx.client, ctx.client.address)))
            .then(withCtxAwait('balanceAfter', (ctx) => getAccountBalance(ctx.client, ctx.client.address)))
            .then((ctx) => expect(ctx.balanceAfter).equal(ctx.balanceBefore))
    );

    it('should query for v1 cids', () =>
        getBlzClient(curiumUrl, mnemonic.getValue())
            .then(passThroughAwait(bzSdk =>
                pinCid(bzSdk, 'bafybeigsk4rb7soyyipuiyuhcaje5chgha25gwc7k5hgalexft5m2gi6ua', {
                    maxGas: 10000000,
                    gasPrice: 0.002,
                    mode: 'sync'
                })
            ))
            .then(passThroughAwait(() => delay(6_000)))
            .then(bzSdk => hasContent(bzSdk, 'bafybeigsk4rb7soyyipuiyuhcaje5chgha25gwc7k5hgalexft5m2gi6ua'))
            .then(resp => expect(resp).to.be.true)
    );

    it('should query for the same cid with either v0 or v1', () =>
        getBlzClient(curiumUrl, mnemonic.getValue())
            .then(passThroughAwait(bzSdk =>
                pinCid(bzSdk, CID.parse('bafybeigsk4rb7soyyipuiyuhcaje5chgha25gwc7k5hgalexft5m2gi6ua').toV0().toString(), {
                    maxGas: 10000000,
                    gasPrice: 0.002,
                    mode: 'sync'
                })
            ))
            .then(passThroughAwait(() => delay(6_000)))
            .then(bzSdk => hasContent(bzSdk, 'QmcVjPQnaQN2bgGG6gbA4G88JPp7BZuT3BpMLj9G3ufcxF'))
            .then(resp => expect(resp).to.be.true)
    );

    it('should query for the same cid with either v0 or v1 other direction', () =>
        getBlzClient(curiumUrl, mnemonic.getValue())
            .then(passThroughAwait(bzSdk =>
                (pinCid(bzSdk, 'bafybeigsk4rb7soyyipuiyuhcaje5chgha25gwc7k5hgalexft5m2gi6ua', {
                    maxGas: 10000000,
                    gasPrice: 0.002,
                    mode: 'sync'
                }) as any)
                    .then(console.log)
            ))
            .then(passThroughAwait(() => delay(12_000)))
            .then(bzSdk => hasContent(bzSdk, CID.parse('bafybeigsk4rb7soyyipuiyuhcaje5chgha25gwc7k5hgalexft5m2gi6ua').toV0().toString()))
            .then(resp => expect(resp).to.be.true)
    );

    it("should parse dec type to number", () => {
        expect(parseDecTypeToNumber("100000000000000000")).to.equal(0.1)
        expect(parseDecTypeToNumber("10000000000000000")).to.equal(0.01)
        expect(parseDecTypeToNumber("100500000000000")).to.equal(0.0001005)
        expect(parseDecTypeToNumber("20500000000000000000")).to.equal(20.5)
    });

    it('should query a transaction by hash', () => {
        return getBlzClient(curiumUrl, mnemonic.getValue())
            .then(bzSdk =>
                (pinCid(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {
                    maxGas: 10000000,
                    gasPrice: 0.002,
                    mode: 'sync'
                }) as any)
                    .then((resp: any) => ({
                        resp,
                        bzSdk
                    }))
            )
            .then(({resp, bzSdk}) => getTx(bzSdk, resp.transactionHash))
    })

});