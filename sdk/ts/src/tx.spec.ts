import {pinCid, setGasTaxBp, setTaxCollector, setTransferTaxBp, withTransaction} from "./tx";
import {startSwarmWithClient} from "@bluzelle/testing/src/swarmUtils";
import {defaultSwarmConfig} from "@bluzelle/testing/src/defaultConfigs";
import {getTaxInfo} from "./query";
import {passThroughAwait} from "promise-passthrough";
import {expect} from "chai";
import {withCtxAwait} from "@scottburch/with-context";
import {Swarm} from "daemon-manager/src/Swarm";

const MAX_GAS = 200000;
const GAS_PRICE = 2;

describe('sending transactions', function () {
    this.timeout(2_000_000);

    it('should have a withTransaction that can bundle messages', () => {
        return startSwarmWithClient({...defaultSwarmConfig, bluzelleFaucet: true})
            .then(({bzSdk}) => withTransaction(bzSdk, () => {
                pinCid(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000});
                pinCid(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000});
                pinCid(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000});
            }))
    });

    it('should store pin to state in a pin tx', () =>
        startSwarmWithClient()
            .then(passThroughAwait(({bzSdk}) => pinCid(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000})))
            .then(withCtxAwait('whitelist',({swarm}) => getWhiteListForGenesisExport(swarm)))
            .then(withCtxAwait('sentry',({swarm}) => Promise.resolve(swarm.getSentries()[0])))
            .then(withCtxAwait('exportedGenesis', ({sentry, whitelist}) => sentry.exportGenesis({
                whitelist: whitelist
            })))
            .then(withCtxAwait('genesis', ({exportedGenesis}) => Promise.resolve(exportedGenesis as {
                app_state: {
                    storage: {
                        pins: {
                            cid: string,
                            creator: string
                        }[]
                    }
                }
            })))
            .then(({genesis, auth}) => expect(genesis.app_state.storage.pins[0]).to.deep.equal({
                cid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                creator: auth.address
            }))
    );

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



});

const getWhiteListForGenesisExport = (swarm: Swarm): Promise<string[]> =>
    Promise.resolve(swarm.getValidators()[0])
        .then(validator => validator.exec('curiumd query staking validators'))
        .then(validators => validators as {validators: { operator_address: string }[]})
        .then(addresses => addresses.validators.map(addr => addr.operator_address));