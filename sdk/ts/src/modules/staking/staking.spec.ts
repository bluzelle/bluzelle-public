import { startSwarmWithClient } from '@bluzelle/testing';
import { withCtxAwait } from '@scottburch/with-context';
import { DaemonConfig, Environment, SwarmConfig, SwarmTypes } from 'daemon-manager/src/SwarmConfig';
import { passThroughAwait } from 'promise-passthrough';
import { expect } from 'chai';
import { stopSwarm } from '@bluzelle/testing/src/swarmUtils';
import { getOtherTokenDefaults } from '@bluzelle/testing/src/commonUtils';
import { delegate, redelegate, undelegate } from './tx';
import {
    getDelegation,
    getDelegatorDelegations,
    getDelegatorUnbondingDelegations,
    getValidatorsInfo
} from './query';

describe('staking module', function () {
    this.timeout(2_000_000);

    beforeEach(stopSwarm);

    it("should be able to delegate the expected amount", () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getDelegation(ctx.bzSdk, ctx.auth.address, ctx.valoper))
            .then(delegation => expect(delegation?.balance?.amount).to.equal(5_000_000))
    );

    it("should return bluzelle tx response on delegate", () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10}))
            .then(res => expect(res.code).to.equal(0))
    );

    it("should be able to undelegate", () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => undelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 2_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getDelegation(ctx.bzSdk, ctx.auth.address, ctx.valoper))
            .then(delegation => expect(delegation?.balance?.amount).to.equal(3_000_000))
    );

    it("should return bluzelle tx response on undelegate", () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => undelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 2_000_000, {maxGas: 200_000, gasPrice: 10}))
            .then(res => expect(res.code).to.equal(0))
    );

    it("should be able to redelegate", () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(withCtxAwait('valoper2', ctx => ctx.swarm.getValidators()[2].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 5_000_000, {maxGas: 500_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => redelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, ctx.valoper2, 2_000_000, {maxGas: 500_000, gasPrice: 10})))
            .then(withCtxAwait('delegationToValidator1',ctx => getDelegation(ctx.bzSdk, ctx.auth.address, ctx.valoper1)))
            .then(withCtxAwait('delegationToValidator2',ctx => getDelegation(ctx.bzSdk, ctx.auth.address, ctx.valoper2)))
            .then(passThroughAwait(ctx => expect(ctx.delegationToValidator1?.balance?.amount).to.equal(3_000_000)))
            .then(passThroughAwait(ctx => expect(ctx.delegationToValidator2?.balance?.amount).to.equal(2_000_000)))
    );

    it("should return bluzelle tx response on redelegate", () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(withCtxAwait('valoper2', ctx => ctx.swarm.getValidators()[2].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 5_000_000, {maxGas: 500_000, gasPrice: 10})))
            .then(ctx => redelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, ctx.valoper2, 2_000_000, {maxGas: 500_000, gasPrice: 10}))
            .then(res => expect(res.code).to.equal(0))
    );

    it('should get all delegations of the delegator with the correct amount', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(withCtxAwait('valoper2', ctx => ctx.swarm.getValidators()[2].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper2, 4_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getDelegatorDelegations(ctx.bzSdk, ctx.auth.address))
            .then(res => res.delegations.flatMap(delegation => delegation.balance?.amount))
            .then(passThroughAwait(amounts => expect(amounts).to.include(5_000_000)))
            .then(passThroughAwait(amounts => expect(amounts).to.include(4_000_000)))
    );

    it('should get validators info', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(ctx => getValidatorsInfo(ctx.bzSdk))
            .then(res => expect(res.validators.length).to.equal(3))
    );

    it("should query unbonding delegations of a delegator", () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(withCtxAwait('valoper2', ctx => ctx.swarm.getValidators()[2].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper2, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => undelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 2_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => undelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 1_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => undelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper2, 4_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getDelegatorUnbondingDelegations(ctx.bzSdk, ctx.auth.address))
            .then(res => res.unbondingDelegations.flatMap(unbondingDelegation => unbondingDelegation.totalBalance))
            .then(passThroughAwait(totalBalances => expect(totalBalances).to.include(3_000_000)))
            .then(passThroughAwait(totalBalances => expect(totalBalances).to.include(4_000_000)))
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