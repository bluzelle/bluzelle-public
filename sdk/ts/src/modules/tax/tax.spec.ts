import {startSwarmWithClient} from "@bluzelle/testing"
import {defaultSwarmConfig} from "@bluzelle/testing/src/defaultConfigs";
import {passThroughAwait} from "promise-passthrough";
import {expect} from "chai";
import {Swarm} from "daemon-manager";
import {setGasTaxBp, setTaxCollector, setTransferTaxBp} from "./tx";
import {getTaxInfo} from "./query";
import { withCtxAwait } from "with-context";
import { newBluzelleClient } from "../../core";
import { newLocalWallet } from "../../wallets/localWallet";
import { mint } from "../faucet";
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../../.env') });

const MAX_GAS = 200000;
const GAS_PRICE = 2;

describe('tax module', function () {
    this.timeout(2_000_000);

    beforeEach(() =>
        Swarm.stopDaemons({...defaultSwarmConfig})
    );

    // skipping because we don't want to add admin info to repo right now
    describe('as admin', () => {

        const BP = 7777;
        const TAX_COLLECTOR = "bluzelle197xx52k9tw08e7h0jqahptwucyv3e6pxex3xfe";
        it("setGasTaxBp should set gas tax bp", () =>
            startSwarmWithClient()
            .then(passThroughAwait(ctx => mint(ctx.bzSdk, process.env.TAX_ADMIN_ADDRESS)))
            .then(() =>newBluzelleClient({
                                    url: 'localhost:26667',
                                    wallet: newLocalWallet(process.env.TAX_ADMIN_MNEMONIC ? process.env.TAX_ADMIN_MNEMONIC: "" )
                                }
            ))
            .then(passThroughAwait(client => setGasTaxBp(client, BP, {maxGas: MAX_GAS, gasPrice: GAS_PRICE, mode: 'sync'})))
            .then(client => getTaxInfo(client))
            .then(taxInfo => expect(Number(taxInfo.gasTaxBp)).equal(BP))
        );

        it("setTransferTaxBp should set transfer tax bp", () =>
            startSwarmWithClient()
                .then(passThroughAwait(ctx => mint(ctx.bzSdk, process.env.TAX_ADMIN_ADDRESS)))
                .then(() =>newBluzelleClient({
                                        url: 'localhost:26667',
                                        wallet: newLocalWallet(process.env.TAX_ADMIN_MNEMONIC ? process.env.TAX_ADMIN_MNEMONIC: "" )
                                    }
                ))
                .then(passThroughAwait(client => setTransferTaxBp(client, BP, {
                    maxGas: MAX_GAS,
                    gasPrice: GAS_PRICE,
                    mode: 'sync'
                })))
                .then(client => getTaxInfo(client))
                .then(taxInfo => expect(Number(taxInfo.transferTaxBp)).equal(BP))
        );

        it("setTaxCollector should set tax collector", () =>
            startSwarmWithClient()
                .then(passThroughAwait(ctx => mint(ctx.bzSdk, process.env.TAX_ADMIN_ADDRESS)))
                .then(() =>newBluzelleClient({
                                        url: 'localhost:26667',
                                        wallet: newLocalWallet(process.env.TAX_ADMIN_MNEMONIC ? process.env.TAX_ADMIN_MNEMONIC: "" )
                                    }
                ))
                .then(passThroughAwait(client => setTaxCollector(client, TAX_COLLECTOR, {
                    maxGas: MAX_GAS,
                    gasPrice: GAS_PRICE,
                    mode: 'sync'
                })))
                .then(client => getTaxInfo(client))
                .then(taxInfo => expect(taxInfo.taxCollector).equal(TAX_COLLECTOR))
        );

    });

    describe('as non-admin', () => {

        const BP = 1234;
        const TAX_COLLECTOR = "bluzelle197xx52k9tw08e7h0jqahptwucyv3e123456789";

        it("setGasTaxBp should not set gas tax bp", () =>
            startSwarmWithClient()
                .then(passThroughAwait(client => setGasTaxBp(client.bzSdk, BP, {maxGas: MAX_GAS, gasPrice: GAS_PRICE, mode: 'sync'})))
                .then(client => getTaxInfo(client.bzSdk))
                .then(taxInfo => expect(taxInfo.gasTaxBp).not.equal(BP))
        );

        it("setTransferTaxBp should not set transfer tax bp", () =>
            startSwarmWithClient()
                .then(passThroughAwait(client => setTransferTaxBp(client.bzSdk, BP, {
                    maxGas: MAX_GAS,
                    gasPrice: GAS_PRICE,
                    mode: 'sync'
                })))
                .then(client => getTaxInfo(client.bzSdk))
                .then(taxInfo => expect(taxInfo.transferTaxBp).not.equal(BP))
        );

        it("setTaxCollector should not set tax collector", () =>
            startSwarmWithClient()
                .then(passThroughAwait(client => setTaxCollector(client.bzSdk, TAX_COLLECTOR, {
                    maxGas: MAX_GAS,
                    gasPrice: GAS_PRICE,
                    mode: 'sync'
                })))
                .then(client => getTaxInfo(client.bzSdk))
                .then(taxInfo => expect(taxInfo.taxCollector).not.equal(TAX_COLLECTOR))
        );

    });

});