import {expect} from "chai";
import {startSwarmWithClient} from "@bluzelle/testing";
import {withCtxAwait} from "@scottburch/with-context";
import {stopSwarm} from "@bluzelle/testing/src/swarmUtils";
import {createVestingAccount} from "./tx";
import {newBluzelleClient} from "../../core";
import {newLocalWallet} from "../../wallets/localWallet";
import {generateMnemonic} from "../../utils/generateMnemonic";
import { isE2E } from '@bluzelle/testing/src/e2eUtils';
import {passThroughAwait} from "promise-passthrough";


describe('vesting module', function () {
    this.timeout(2_000_000);

    beforeEach(stopSwarm);
    after(stopSwarm);

    it("should create vesting account", () =>
        startSwarmWithClient({
            isE2E: isE2E()
        })
            .then(withCtxAwait("client2", () => newBluzelleClient({
                url: 'http://localhost:26667',
                wallet: newLocalWallet(generateMnemonic())
            })))
            .then(ctx => createVestingAccount(ctx.bzSdk, {
                fromAddress: ctx.auth.address,
                toAddress: ctx.client2.address,
                amount: [{denom: 'ubnt', amount: 100_000}],
                endTime: new Date().getDate() + 100_000,
                delayed: true,
            }, {maxGas: 200_000, gasPrice: 10}))
            .then((res) => expect(res.code).to.not.equal(0))
    );

    it("should create vesting account with multiple denoms", () =>
        startSwarmWithClient()
            .then(withCtxAwait("client2", () => newBluzelleClient({
                url: 'http://localhost:26667',
                wallet: newLocalWallet(generateMnemonic())
            })))
            .then(ctx => createVestingAccount(ctx.bzSdk, {
                fromAddress: ctx.auth.address,
                toAddress: ctx.client2.address,
                amount: [{denom: 'ubnt', amount: 100_000}, {denom: 'uelt', amount: 100_000}, {
                    denom: 'ug4',
                    amount: 100_000
                }],
                endTime: new Date().getDate() + 100_000,
                delayed: false,
            }, {maxGas: 200_000, gasPrice: 10}))
            .then(passThroughAwait(res => console.log(`res: ${JSON.stringify(res)}`)))
            .then((res) => expect(res.code).to.equal(0))
    );

});