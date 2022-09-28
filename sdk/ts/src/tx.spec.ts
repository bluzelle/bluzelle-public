import {pinCid, send, setGasTaxBp, setTaxCollector, setTransferTaxBp, withTransaction} from "./tx";
import {startSwarmWithClient} from "@bluzelle/testing"
import {defaultSwarmConfig} from "@bluzelle/testing/src/defaultConfigs";
import {getAccountBalance, getTaxInfo} from "./query";
import {passThroughAwait} from "promise-passthrough";
import {withCtxAwait} from "@scottburch/with-context";
import {mint} from "./faucet";
import {expect} from "chai";
import {Swarm} from "daemon-manager";
import {newBluzelleClient} from "./sdk";

const MAX_GAS = 200000;
const GAS_PRICE = 2;

describe('sending transactions', function () {
    this.timeout(2_000_000);

    beforeEach(() =>
        Swarm.stopDaemons({...defaultSwarmConfig})
    )

    it('should be able to mint tokens to a new account', () =>
        startSwarmWithClient({...defaultSwarmConfig, bluzelleFaucet: true}, {url: 'http://localhost:26667'})
            .then(info => ({client: info.bzSdk}))
            .then(withCtxAwait('mintResult', ctx => mint(ctx.client)))
            .then(ctx => getAccountBalance(ctx.client, ctx.mintResult.address))
            .then(balance => expect(balance).to.equal(200_000_000))
    );


    it('should be able to mint tokens to a new given', () =>
        startSwarmWithClient()
            .then(info => ({client: info.bzSdk}))
            .then(withCtxAwait('mintResult', ctx => mint(ctx.client, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj')))
            .then(ctx => getAccountBalance(ctx.client, ctx.mintResult.address))
            .then(balance => expect(balance).to.equal(200_000_000))
    );

    it('should not mint if bluzelleFaucet is not turned on', () =>
        startSwarmWithClient({...defaultSwarmConfig, bluzelleFaucet: false})
            .then(info => mint(info.bzSdk))
            .catch(err => expect(err.message.includes('invalid request')).to.be.true)
    )


    it('should have a withTransaction that can bundle messages', () => {
        return startSwarmWithClient({...defaultSwarmConfig})
            .then(({bzSdk}) => withTransaction(bzSdk, () => {
                pinCid(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000});
                pinCid(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000});
                pinCid(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000});
            }))
    });

    it('should send tokens in uelt and ug4', () =>
        startSwarmWithClient()
            .then(withCtxAwait('toAddress', ctx => mint(ctx.bzSdk).then(res => res.address)))
            .then(withCtxAwait('preBalances', ctx => Promise.all([
                getAccountBalance(ctx.bzSdk, ctx.bzSdk.address, 'uelt'),
                getAccountBalance(ctx.bzSdk, ctx.bzSdk.address, 'ug4'),
            ])))
            .then(withCtxAwait('toPreBalances', ctx => Promise.all([
                getAccountBalance(ctx.bzSdk, ctx.toAddress, 'uelt'),
                getAccountBalance(ctx.bzSdk, ctx.toAddress, 'ug4'),
            ])))
            .then(passThroughAwait(ctx => send(ctx.bzSdk, ctx.toAddress, 10000, {gasPrice: 0.002, maxGas: 200000}, 'uelt')))
            .then(passThroughAwait(ctx => send(ctx.bzSdk, ctx.toAddress, 10000, {gasPrice: 0.002, maxGas: 200000}, 'ug4')))
            .then(withCtxAwait('postBalances', ctx => Promise.all([
                getAccountBalance(ctx.bzSdk, ctx.bzSdk.address, 'uelt'),
                getAccountBalance(ctx.bzSdk, ctx.bzSdk.address, 'ug4'),
            ])))
            .then(withCtxAwait('toPostBalances', ctx => Promise.all([
                getAccountBalance(ctx.bzSdk, ctx.toAddress, 'uelt'),
                getAccountBalance(ctx.bzSdk, ctx.toAddress, 'ug4'),
            ])))
            .then(passThroughAwait(ctx => expect(ctx.postBalances).to.deep.equal(ctx.preBalances.map(b => b - 10000))))
            .then(ctx => expect(ctx.toPostBalances).to.deep.equal(ctx.toPreBalances.map(b => b + 10000)))

    )


    // skipping because we don't want to add admin info to repo right now
    describe.skip('as admin', () => {

        const BP = 7777;
        const TAX_COLLECTOR = "bluzelle197xx52k9tw08e7h0jqahptwucyv3e6pxex3xfe";

        it("setGasTaxBp should set gas tax bp", () =>
            startSwarmWithClient()
                .then(passThroughAwait(client => setGasTaxBp(client.bzSdk, BP, {maxGas: MAX_GAS, gasPrice: GAS_PRICE})))
                .then(client => getTaxInfo(client.bzSdk))
                .then(taxInfo => expect(taxInfo.gasTaxBp).equal(BP))
        );

        it("setTransferTaxBp should set transfer tax bp", () =>
            startSwarmWithClient()
                .then(passThroughAwait(client => setTransferTaxBp(client.bzSdk, BP, {maxGas: MAX_GAS, gasPrice: GAS_PRICE})))
                .then(client => getTaxInfo(client.bzSdk))
                .then(taxInfo => expect(taxInfo.transferTaxBp).equal(BP))
        );

        it("setTaxCollector should set tax collector", () =>
            startSwarmWithClient()
                .then(passThroughAwait(client => setTaxCollector(client.bzSdk, TAX_COLLECTOR, {maxGas: MAX_GAS, gasPrice: GAS_PRICE})))
                .then(client => getTaxInfo(client.bzSdk))
                .then(taxInfo => expect(taxInfo.taxCollector).equal(TAX_COLLECTOR))
        );

    });

    describe('as non-admin', () => {

        const BP = 1234;
        const TAX_COLLECTOR = "bluzelle197xx52k9tw08e7h0jqahptwucyv3e123456789";

        it("setGasTaxBp should not set gas tax bp", () =>
            startSwarmWithClient()
                .then(passThroughAwait(client => setGasTaxBp(client.bzSdk, BP, {maxGas: MAX_GAS, gasPrice: GAS_PRICE})))
                .then(client => getTaxInfo(client.bzSdk))
                .then(taxInfo => expect(taxInfo.gasTaxBp).not.equal(BP))
        );

        it("setTransferTaxBp should not set transfer tax bp", () =>
            startSwarmWithClient()
                .then(passThroughAwait(client => setTransferTaxBp(client.bzSdk, BP, {maxGas: MAX_GAS, gasPrice: GAS_PRICE})))
                .then(client => getTaxInfo(client.bzSdk))
                .then(taxInfo => expect(taxInfo.transferTaxBp).not.equal(BP))
        );

        it("setTaxCollector should not set tax collector", () =>
            startSwarmWithClient()
                .then(passThroughAwait(client => setTaxCollector(client.bzSdk, TAX_COLLECTOR, {maxGas: MAX_GAS, gasPrice: GAS_PRICE})))
                .then(client => getTaxInfo(client.bzSdk))
                .then(taxInfo => expect(taxInfo.taxCollector).not.equal(TAX_COLLECTOR))
        );

    });



})


