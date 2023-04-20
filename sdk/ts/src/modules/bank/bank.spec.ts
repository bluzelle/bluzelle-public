import {getBlzClient, restartIpfsServerAndSwarm} from "@bluzelle/testing/src/commonUtils";
import {BehaviorSubject} from "rxjs";
import {createCtxAwait, withCtxAwait} from "@scottburch/with-context";
import {expect} from "chai";
import {defaultSwarmConfig, startSwarmWithClient} from "@bluzelle/testing";
import {getAccountBalance} from "./query";
import {passThroughAwait} from "promise-passthrough";
import {send} from "./tx";
import {mint} from "../faucet";

const curiumUrl = 'http://localhost:26667';
const mnemonic = new BehaviorSubject<string>("");

describe('bank module', function () {
    this.timeout(600_000);

    beforeEach(() =>
        restartIpfsServerAndSwarm(({...defaultSwarmConfig, targetBranch: 'experimental'}))
            .then((swarmMnemonic) => mnemonic.next(swarmMnemonic))
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

    it('should send tokens in uelt and ug4', () =>
        startSwarmWithClient()
            .then(withCtxAwait('taxCost', () => 10000 * (1/10000)))
            .then(withCtxAwait('toAddress', ctx => mint(ctx.bzSdk).then(res => res.address)))
            .then(withCtxAwait('preBalances', ctx => Promise.all([
                getAccountBalance(ctx.bzSdk, ctx.bzSdk.address, 'uelt'),
                getAccountBalance(ctx.bzSdk, ctx.bzSdk.address, 'ug4'),
            ])))
            .then(withCtxAwait('toPreBalances', ctx => Promise.all([
                getAccountBalance(ctx.bzSdk, ctx.toAddress, 'uelt'),
                getAccountBalance(ctx.bzSdk, ctx.toAddress, 'ug4'),
            ])))
            .then(passThroughAwait(ctx => (send(ctx.bzSdk, ctx.toAddress, 10000, {
                    gasPrice: 0.002,
                    maxGas: 200000,
                    mode: 'sync'
                }, 'uelt') as any)
                    .then((x: any) => x)
            ))
            .then(passThroughAwait(ctx => Promise.resolve(send(ctx.bzSdk, ctx.toAddress, 10000, {
                gasPrice: 0.002,
                maxGas: 200000,
                mode: 'sync'
            }, 'ug4'))
                .then(x =>
                    x
                )))
            .then(withCtxAwait('postBalances', ctx => Promise.all([
                getAccountBalance(ctx.bzSdk, ctx.bzSdk.address, 'uelt'),
                getAccountBalance(ctx.bzSdk, ctx.bzSdk.address, 'ug4'),
            ])))
            .then(withCtxAwait('toPostBalances', ctx => Promise.all([
                getAccountBalance(ctx.bzSdk, ctx.toAddress, 'uelt'),
                getAccountBalance(ctx.bzSdk, ctx.toAddress, 'ug4'),
            ])))
            .then(passThroughAwait(ctx => expect(ctx.postBalances).to.deep.equal(ctx.preBalances.map(b => b - 10000 - ctx.taxCost))))
            .then(ctx => expect(ctx.toPostBalances).to.deep.equal(ctx.toPreBalances.map(b => b + 10000)))
    );

});