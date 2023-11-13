import {startSwarmWithClient} from "@bluzelle/testing";
import {withCtxAwait} from "@scottburch/with-context";
import {DaemonConfig, Environment, SwarmConfig, SwarmTypes} from "daemon-manager/src/SwarmConfig";
import {passThroughAwait} from "promise-passthrough";
import {expect} from "chai";
import {newBluzelleClient} from "../../core";
import {newLocalWallet} from "../../wallets/localWallet";
import * as bip39 from "bip39";
import {mint} from "../faucet";
import {stopSwarm} from "@bluzelle/testing/src/swarmUtils";
import {getOtherTokenDefaults} from "@bluzelle/testing/src/commonUtils";
import { fundCommunityPool, setWithdrawAddress, withdrawDelegatorReward, withdrawValidatorCommission } from './tx';
import {getCommission, getDelegationRewards, getDelegationTotalRewards, getOutstandingRewards, getSlashes, getDelegatorValidators, getWithdrawAddress, getCommunityPoolBalances, getDistributionParams} from "./query";
import {send} from "../bank";
import {pinCid} from "../storage";
import {delegate} from "../staking";


describe('distribution module', function () {
    this.timeout(2_000_000);

    beforeEach(stopSwarm);


    it('should have reward for delegating', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => send(ctx.bzSdk, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj', 100_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getDelegationRewards(ctx.bzSdk, ctx.auth.address, ctx.valoper))
            .then(rewards => expect(rewards.length).to.equal(1))
    );

    it('should reward delegator when other addresses send tx', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('mnemonic', () => Promise.resolve(bip39.generateMnemonic(256))))
            .then(withCtxAwait('sentry', ctx =>
                newBluzelleClient({
                    url: 'localhost:26667',
                    wallet: newLocalWallet(ctx.mnemonic)
                })
            ))
            .then(passThroughAwait(ctx => mint(ctx.bzSdk, ctx.sentry.address)))
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.sentry, ctx.sentry.address, ctx.valoper, 100_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => send(ctx.bzSdk, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj', 100_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getDelegationRewards(ctx.sentry, ctx.sentry.address, ctx.valoper))
            .then(rewards => expect(rewards.length).to.equal(1))
    );

    it('should withdraw delegation rewards', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('mnemonic', () => Promise.resolve(bip39.generateMnemonic(256))))
            .then(withCtxAwait('sentry', ctx =>
                newBluzelleClient({
                    url: 'localhost:26667',
                    wallet: newLocalWallet(ctx.mnemonic)
                })
            ))
            .then(passThroughAwait(ctx => mint(ctx.bzSdk, ctx.sentry.address)))
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.sentry, ctx.sentry.address, ctx.valoper, 100_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => send(ctx.bzSdk, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj', 10_000_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => withdrawDelegatorReward(ctx.sentry, ctx.sentry.address, ctx.valoper, {maxGas: 200_000, gasPrice: 10}))
            .then(res => expect(res.code).to.equal(0))
    );

    it('should not throw error when get total delegation rewards', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(withCtxAwait('valoper2', ctx => ctx.swarm.getValidators()[2].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper2, 4_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getDelegationTotalRewards(ctx.bzSdk, ctx.auth.address))
    );

    it('should get total delegation rewards', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('sentry', () => newBluzelleClient({
                url: 'http://localhost:26667',
                wallet: newLocalWallet('forget era scatter fiction write what final correct pause purchase argue scheme fire cattle play eight flag trust rely hello brick decline avoid any')
            })))
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => send(ctx.bzSdk, ctx.sentry.address, 500_000_000, {maxGas: 200_000, gasPrice: 0.002})))
            .then(passThroughAwait(ctx => delegate(ctx.sentry, ctx.sentry.address, ctx.valoper1, 400_000_000, {maxGas: 200_000, gasPrice: 0.002})))
            .then(passThroughAwait(ctx => pinCid(ctx.bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {maxGas: 200_000, gasPrice: 50})))
            .then(passThroughAwait(ctx => pinCid(ctx.bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {maxGas: 200_000, gasPrice: 50})))
            .then(ctx => getDelegationTotalRewards(ctx.sentry, ctx.sentry.address))
            .then(res => expect(res.rewards[0].totalReward.amount).to.be.greaterThan(0))
    );

    it('should fund community pool', () =>
      startSwarmWithClient({...swarmConfig()})
          .then(ctx => fundCommunityPool(ctx.bzSdk, {
              amount: [{amount: 100_000_000, denom: 'ubnt'}],
              depositor: ctx.auth.address
          }, {maxGas: 200_000, gasPrice: 10}))
          .then(res => expect(res.code).to.equal(0))
    );

    it('should get params', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(ctx => getDistributionParams(ctx.bzSdk))
            .then(result => expect(result.withdrawAddrEnabled).to.equal(true))
    );

    it('should get commissions', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(ctx => getCommission(ctx.bzSdk, ctx.valoper))
            .then(result => expect(result.length).equal(0))
    );

    it('should get commissions and should be greater than 0', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => send(ctx.bzSdk, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj', 100_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getCommission(ctx.bzSdk, ctx.valoper))
            .then(result => expect(result[0].amount).to.greaterThan(0))
    );

    it('should get outstanding rewards', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(ctx => getOutstandingRewards(ctx.bzSdk, ctx.valoper))
            .then(result => expect(result.length).to.equal(0))
    );

    it('should get outstanding rewards and should be greater than 0', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => send(ctx.bzSdk, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj', 100_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getOutstandingRewards(ctx.bzSdk, ctx.valoper))
            .then(result => expect(result[0].amount).to.greaterThan(0))
    );

    it('should get slashes info', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getSlashes(ctx.bzSdk, ctx.valoper, 1, 10))
            .then(result => expect(result.slashes.length).to.equal(0))
    );

    it('should get validators info which a given delegator delegate its tokens', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getDelegatorValidators(ctx.bzSdk, ctx.auth.address))
            .then(result => expect(result.validators.length).to.equal(2))
    );

    it('should get withdraw address of the delegator', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getWithdrawAddress(ctx.bzSdk, ctx.auth.address))
            .then(result => expect(result.length).to.equal(47))
    );

    it('should get balances of the community pool', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getCommunityPoolBalances(ctx.bzSdk))
            .then(result => expect(result.length).to.equal(0))
    );


    it('Balances of the community pool should be greater than 0 after sending transaction', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => send(ctx.bzSdk, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj', 100_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getCommunityPoolBalances(ctx.bzSdk))
            .then(result => expect(result[0].amount).to.greaterThan(0))
    );


    it('It should be able to set withdraw address successfully with code 0', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => setWithdrawAddress(ctx.bzSdk, ctx.auth.address, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj', {maxGas: 200_000, gasPrice: 0.002}))
            .then(result => expect(result.code).to.equal(0))
    );

    it('the withdraw address should be changed after setting the withdraw address', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => setWithdrawAddress(ctx.bzSdk, ctx.auth.address, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj', {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getWithdrawAddress(ctx.bzSdk, ctx.auth.address))
            .then(result => expect(result).to.equal('bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj'))
    );


    it('should be able to withdraw commssion successfully with code 0', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[0].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => send(ctx.bzSdk, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj', 100_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(withCtxAwait('beforeWithdrawState',ctx => getCommission(ctx.bzSdk, ctx.valoper)))
            .then(ctx => withdrawValidatorCommission(ctx.bzSdk, ctx.valoper, {maxGas: 200_000, gasPrice: 0.002}))
            .then(result => expect(result.code).to.equal(0))
    );

    it('the commission reward amount should be reduced after withdraw', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[0].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => send(ctx.bzSdk, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj', 100_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(withCtxAwait('beforeWithdrawState',ctx => getCommission(ctx.bzSdk, ctx.valoper)))
            .then(passThroughAwait(ctx => withdrawValidatorCommission(ctx.bzSdk, ctx.valoper, {maxGas: 200_000, gasPrice: 0.002})))
            .then(withCtxAwait('afterWithdrawState', ctx => getCommission(ctx.bzSdk, ctx.valoper)))
            .then(ctx => expect(ctx.afterWithdrawState[0].amount).to.lessThan(ctx.beforeWithdrawState[0].amount))
    );
});


const swarmConfig = (): SwarmConfig => ({
    denom: 'bnt',
    otherTokens: getOtherTokenDefaults(),
    genesisTokenBalance: 500_000_000,
    monikerBase: 'test',
    chainId: 'my-chain',
    minGasPrice: 0.000000002,
    targetBranch: process.env.BRANCH || 'devel',
    environment: Environment.DEVEL,
    swarmType: SwarmTypes.Docker,
    bluzelleFaucet: true,
    storageBaseDir: '',
    storageMount: '/home/ubuntu/storage',
    filter: 'local-discovery',
    daemons: [{
        host: `local:a.validator`,
        restPort: 1317,
        rpcPort: 26657,
        p2pPort: 26656,
        ipfsP2pPort: 6001,
        ipfsRpcPort: 7001,
        prometheusPort: 26660,
        sentry: ''
    }, {
        host: `local:a.client.sentry`,
        restPort: 1327,
        rpcPort: 26667,
        p2pPort: 26666,
        ipfsP2pPort: 6011,
        ipfsRpcPort: 7011,
        prometheusPort: 26670,
        sentry: 'client'
    }, {
        host: `local:b.validator`,
        restPort: 1337,
        rpcPort: 26677,
        p2pPort: 26676,
        ipfsP2pPort: 6021,
        ipfsRpcPort: 7021,
        prometheusPort: 26680,
        sentry: ''
    }, {
        host: `local:c.validator`,
        restPort: 1347,
        rpcPort: 26687,
        p2pPort: 26686,
        ipfsP2pPort: 6031,
        ipfsRpcPort: 7031,
        prometheusPort: 26690,
        sentry: ''
    }] as DaemonConfig[],
});
