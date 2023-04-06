import {pinCid, send, setGasTaxBp, setTaxCollector, setTransferTaxBp, withTransaction} from "./tx";
import {startSwarmWithClient} from "@bluzelle/testing"
import {defaultSwarmConfig} from "@bluzelle/testing/src/defaultConfigs";
import {getAccountBalance, getTaxInfo, getTx} from "./query";
import {passThroughAwait} from "promise-passthrough";
import {withCtxAwait} from "@scottburch/with-context";
import {mint} from "./faucet";
import {expect} from "chai";
import {Swarm} from "daemon-manager";
import {BluzelleClient, newBluzelleClient} from "./sdk";
import {newLocalWallet} from "./wallets/localWallet";
import {generateMnemonic} from "./generateMnemonic";
import delay from "delay";

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
                pinCid(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000, mode: 'sync'});
                pinCid(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000, mode: 'sync'});
                pinCid(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000, mode: 'sync'});
            }))
    });

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

    it('should return a valid transaction for a failing message', () =>
        startSwarmWithClient()
            .then(() => newBluzelleClient({
                url: 'http://localhost:26667',
                wallet: newLocalWallet(generateMnemonic())
            }))
            .then(passThroughAwait(bzSdk =>
                mint(bzSdk, bzSdk.address)))
            .then(bzSdk =>
                (send(bzSdk, 'bluzelle10dj35urh78dym3c24yzdmss8mxtcy8hqgqwmrn', 300000000, {
                    gasPrice: 0.02,
                    maxGas: 1000000000
                }, 'bogus') as any)
                    .then((resp: any) => ({
                        resp,
                        bzSdk
                    })))
            .then(({bzSdk, resp}) => getTx(bzSdk, resp.transactionHash) as any)
            .then((response: any) => {
                expect(response.tx).not.to.be.undefined;
                expect(response.txResponse).not.to.be.undefined;
                expect(response.tx.body.messages[0].typeUrl).to.deep.equal("/cosmos.bank.v1beta1.MsgSend");
                expect(response.txResponse.rawLog).to.contain('fail');
                expect(response.txResponse.code).to.not.equal(0);
            })
    );

    it('should be able to broadcast a transaction asynchronously', () => {
        let hash: string;
        let client: BluzelleClient;
        return startSwarmWithClient()
            .then(({bzSdk}) =>
                (pinCid(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {
                    gasPrice: 0.02,
                    maxGas: 1000000,
                    mode: 'async'
                }) as any)
                    .then((resp: string) => {
                        hash = resp;
                        client = bzSdk
             }))
            .then(() => getTx(client, hash))
            .catch(passThroughAwait(err => expect(err.message).to.include('not found')))
            .then(passThroughAwait(() => delay(6_000)))
            .then(() => getTx(client, hash))
    });

    it('should reject a transaction if the gas price is too low', () =>
        startSwarmWithClient({...defaultSwarmConfig, minGasPrice: defaultSwarmConfig.minGasPrice * 10})
            .then(({bzSdk}) => pinCid(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: defaultSwarmConfig.minGasPrice, maxGas: 200000, mode: 'sync'}))
            .then(x =>
                {throw x}
            )
            .catch(err =>
                expect(err.message).to.include('insufficient fees')
            )
    );


    // skipping because we don't want to add admin info to repo right now
    describe.skip('as admin', () => {

        const BP = 7777;
        const TAX_COLLECTOR = "bluzelle197xx52k9tw08e7h0jqahptwucyv3e6pxex3xfe";

        it("setGasTaxBp should set gas tax bp", () =>
            startSwarmWithClient()
                .then(passThroughAwait(client => setGasTaxBp(client.bzSdk, BP, {maxGas: MAX_GAS, gasPrice: GAS_PRICE, mode: 'sync'})))
                .then(client => getTaxInfo(client.bzSdk))
                .then(taxInfo => expect(taxInfo.gasTaxBp).equal(BP))
        );

        it("setTransferTaxBp should set transfer tax bp", () =>
            startSwarmWithClient()
                .then(passThroughAwait(client => setTransferTaxBp(client.bzSdk, BP, {
                    maxGas: MAX_GAS,
                    gasPrice: GAS_PRICE,
                    mode: 'sync'
                })))
                .then(client => getTaxInfo(client.bzSdk))
                .then(taxInfo => expect(taxInfo.transferTaxBp).equal(BP))
        );

        it("setTaxCollector should set tax collector", () =>
            startSwarmWithClient()
                .then(passThroughAwait(client => setTaxCollector(client.bzSdk, TAX_COLLECTOR, {
                    maxGas: MAX_GAS,
                    gasPrice: GAS_PRICE,
                    mode: 'sync'
                })))
                .then(client => getTaxInfo(client.bzSdk))
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


})




