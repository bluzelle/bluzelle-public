import {startSwarmWithClient} from "@bluzelle/testing"
import {defaultSwarmConfig} from "@bluzelle/testing/src/defaultConfigs";
import {passThroughAwait} from "promise-passthrough";
import {expect} from "chai";
import {Swarm} from "daemon-manager";
import {setGasTaxBp, setTaxCollector, setTransferTaxBp} from "./tx";
import {getTaxInfo} from "./query";
import {withCtxAwait} from "with-context";
import {newBluzelleClient} from "../../core";
import {newLocalWallet} from "../../wallets/localWallet";
import {faucetToken} from "../faucet";
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as bip39 from "bip39";
import {isE2E} from '@bluzelle/testing/src/e2eUtils';

dotenv.config({path: path.resolve(__dirname, '../../../../../.env')});

const MAX_GAS = 200000;
const GAS_PRICE = 2;

describe('tax module', function () {
    this.timeout(2_000_000);

    beforeEach(() =>
        Swarm.stopDaemons({...defaultSwarmConfig})
    );

    after(() =>
        Swarm.stopDaemons({...defaultSwarmConfig})
    );

    // skipping because we don't want to add admin info to repo right now
    describe('as admin', () => {

        it("setGasTaxBp should set gas tax bp", () =>
            startSwarmWithClient({
                isE2E: isE2E()
            })
                .then(() =>
                    newBluzelleClient({
                            url: 'localhost:26667',
                            wallet: newLocalWallet(process.env.TAX_ADMIN_MNEMONIC ? process.env.TAX_ADMIN_MNEMONIC : "")
                        }
                    ))
                .then(passThroughAwait(client => faucetToken(client, client.address)))
                .then(withCtxAwait("bp_before", client => getTaxInfo(client)))
                .then(passThroughAwait(client => setGasTaxBp(client, Number(client.bp_before.gasTaxBp) + 1, {
                    maxGas: MAX_GAS,
                    gasPrice: GAS_PRICE,
                    mode: 'sync'
                })))
                .then(withCtxAwait("bp_after", client => getTaxInfo(client)))
                .then(client => expect(Number(client.bp_after.gasTaxBp)).equal(Number(client.bp_before.gasTaxBp.add(1))))
        );

        it("setTransferTaxBp should set transfer tax bp", () =>
            startSwarmWithClient({
                isE2E: isE2E()
            })
                .then(() =>
                    newBluzelleClient({
                            url: 'localhost:26667',
                            wallet: newLocalWallet(process.env.TAX_ADMIN_MNEMONIC ? process.env.TAX_ADMIN_MNEMONIC : "")
                        }
                    ))
                .then(passThroughAwait(client => faucetToken(client, client.address)))
                .then(withCtxAwait("bp_before", client => getTaxInfo(client)))
                .then(passThroughAwait(client => setTransferTaxBp(client, Number(client.bp_before.transferTaxBp) + 1, {
                    maxGas: MAX_GAS,
                    gasPrice: GAS_PRICE,
                    mode: 'sync'
                })))
                .then(withCtxAwait("bp_after", client => getTaxInfo(client)))
                .then(client => expect(Number(client.bp_after.transferTaxBp)).equal(Number(client.bp_before.transferTaxBp.add(1))))
        );

        it("setTaxCollector should set tax collector", () =>
            startSwarmWithClient({
                isE2E: isE2E()
            })
                .then(() =>
                    newBluzelleClient({
                            url: 'localhost:26667',
                            wallet: newLocalWallet(process.env.TAX_ADMIN_MNEMONIC ? process.env.TAX_ADMIN_MNEMONIC : "")
                        }
                    ))
                .then(passThroughAwait(ctx => faucetToken(ctx, ctx.address)))
                .then(withCtxAwait('mnemonic', () => Promise.resolve(bip39.generateMnemonic(256))))
                .then(withCtxAwait('new_tax_collector', ctx =>
                    newBluzelleClient({
                        url: 'localhost:26667',
                        wallet: newLocalWallet(ctx.mnemonic)
                    })
                ))
                .then(passThroughAwait(client => setTaxCollector(client, client.new_tax_collector.address, {
                    maxGas: MAX_GAS,
                    gasPrice: GAS_PRICE,
                    mode: 'sync'
                })))
                .then(withCtxAwait("taxInfo", client => getTaxInfo(client)))
                .then(client => expect(client.taxInfo.taxCollector).equal(client.new_tax_collector.address))
        );

    });

    describe('as non-admin', () => {

        it("setGasTaxBp should not set gas tax bp", () =>
            startSwarmWithClient({
                isE2E: isE2E()
            })
                .then(withCtxAwait("bp_before", ctx => getTaxInfo(ctx.bzSdk)))
                .then(passThroughAwait(ctx => setGasTaxBp(ctx.bzSdk, Number(ctx.bp_before) + 1, {
                    maxGas: MAX_GAS,
                    gasPrice: GAS_PRICE,
                    mode: 'sync'
                })))
                .then(withCtxAwait("bp_after", ctx => getTaxInfo(ctx.bzSdk)))
                .then(ctx => expect(Number(ctx.bp_after.transferTaxBp)).equal(Number(ctx.bp_before.transferTaxBp)))
        );

        it("setTransferTaxBp should not set transfer tax bp", () =>
            startSwarmWithClient({
                isE2E: isE2E()
            })
                .then(withCtxAwait("bp_before", ctx => getTaxInfo(ctx.bzSdk)))
                .then(passThroughAwait(ctx => setTransferTaxBp(ctx.bzSdk, Number(ctx.bp_before.transferTaxBp) + 1, {
                    maxGas: MAX_GAS,
                    gasPrice: GAS_PRICE,
                    mode: 'sync'
                })))
                .then(withCtxAwait("bp_after", ctx => getTaxInfo(ctx.bzSdk)))
                .then(ctx => expect(Number(ctx.bp_after.transferTaxBp)).equal(Number(ctx.bp_before.transferTaxBp)))
        );

        it("setTaxCollector should not set tax collector", () =>
            startSwarmWithClient({
                isE2E: isE2E()
            })
                .then(passThroughAwait(ctx => setTaxCollector(ctx.bzSdk, ctx.bzSdk.address, {
                    maxGas: MAX_GAS,
                    gasPrice: GAS_PRICE,
                    mode: 'sync'
                })))
                .then(withCtxAwait("taxInfo", ctx => getTaxInfo(ctx.bzSdk)))
                .then(ctx => expect(ctx.taxInfo.taxCollector).not.equal(ctx.bzSdk.address))
        );

    });

});