import {withTransaction} from "./tx";
import {startSwarmWithClient} from "@bluzelle/testing"
import {defaultSwarmConfig} from "@bluzelle/testing/src/defaultConfigs";
import {getTx} from "./query";
import {passThroughAwait} from "promise-passthrough";
import {expect} from "chai";
import {Swarm} from "daemon-manager/src";
import {BluzelleClient, newBluzelleClient} from "./sdk";
import {newLocalWallet} from "../wallets/localWallet";
import {generateMnemonic} from "../utils/generateMnemonic";
import delay from "delay";
import {pinCid} from "../modules/storage";
import {send} from "../modules/bank";
import {mint} from "../modules/faucet";


describe('sending transactions', function () {
    this.timeout(2_000_000);

    beforeEach(() =>
        Swarm.stopDaemons({...defaultSwarmConfig})
    );

    it('should have a withTransaction that can bundle messages', () => {
        return startSwarmWithClient({...defaultSwarmConfig})
            .then(({bzSdk}) => withTransaction(bzSdk, () => {
                pinCid(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000, mode: 'sync'});
                pinCid(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000, mode: 'sync'});
                pinCid(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000, mode: 'sync'});
            }))
    });

    it('should return a valid transaction for a failing message', () =>
        startSwarmWithClient()
            .then(() => newBluzelleClient({
                url: 'http://localhost:26667',
                wallet: newLocalWallet(generateMnemonic())
            }))
            .then(passThroughAwait(bzSdk =>
                mint(bzSdk, bzSdk.address)))
            .then(bzSdk =>
                (send(bzSdk, 'bluzelle10dj35urh78dym3c24yzdmss8mxtcy8hqgqwmrn', 300, {
                    gasPrice: 0.02,
                    maxGas: 100000
                }, 'bogus') as any)
                    .then((resp: any) => ({
                        resp,
                        bzSdk
                    })))
            .then(() => expect(false).to.be.true)
           .catch(() => {})
            // .then(({bzSdk, resp}) => getTx(bzSdk, resp.transactionHash) as any)
            // .then((response: any) => {
            //     expect(response.tx).not.to.be.undefined;
            //     expect(response.txResponse).not.to.be.undefined;
            //     expect(response.tx.body.messages[0].typeUrl).to.deep.equal("/cosmos.bank.v1beta1.MsgSend");
            //     expect(response.txResponse.rawLog).to.contain('fail');
            //     expect(response.txResponse.code).to.not.equal(0);
            // })
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

});




