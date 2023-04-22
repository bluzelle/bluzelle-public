import {getBlzClient, restartIpfsServerAndSwarm} from "@bluzelle/testing/src/commonUtils";
import {BehaviorSubject} from "rxjs";
import {createCtxAwait, withCtxAwait} from "@scottburch/with-context";
import {expect} from "chai";
import {defaultSwarmConfig} from "@bluzelle/testing";
import {getAccountBalance} from "./query";

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

});