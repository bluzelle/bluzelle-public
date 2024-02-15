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
    getDelegatorValidatorsInfo,
    getHistoricalInfo,
    getPoolInfo,
    getRedelegations,
    getStakingParams,
    getUnbondingDelegation,
    getValidatorDelegations,
    getValidatorInfo,
    getValidatorUnbondingDelegations,
    getValidatorsInfo
} from './query';

describe('staking module', function () {
    this.timeout(2_000_000);

    beforeEach(stopSwarm);

    it("should be able to delegate the expected amount", () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, { maxGas: 200_000, gasPrice: 10 })))
            .then(ctx => getDelegation(ctx.bzSdk, ctx.auth.address, ctx.valoper))
            .then(delegation => expect(delegation?.balance?.amount).to.equal(5_000_000))
    );

    it("should return bluzelle tx response on delegate", () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, { maxGas: 200_000, gasPrice: 10 }))
            .then(res => expect(res.code).to.equal(0))
    );

    it("should be able to undelegate", () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, { maxGas: 200_000, gasPrice: 10 })))
            .then(passThroughAwait(ctx => undelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 2_000_000, { maxGas: 200_000, gasPrice: 10 })))
            .then(ctx => getDelegation(ctx.bzSdk, ctx.auth.address, ctx.valoper))
            .then(delegation => expect(delegation?.balance?.amount).to.equal(3_000_000))
    );

    it("should return bluzelle tx response on undelegate", () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, { maxGas: 200_000, gasPrice: 10 })))
            .then(ctx => undelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 2_000_000, { maxGas: 200_000, gasPrice: 10 }))
            .then(res => expect(res.code).to.equal(0))
    );

    it("should be able to redelegate", () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(withCtxAwait('valoper2', ctx => ctx.swarm.getValidators()[2].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 5_000_000, { maxGas: 500_000, gasPrice: 10 })))
            .then(passThroughAwait(ctx => redelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, ctx.valoper2, 2_000_000, { maxGas: 500_000, gasPrice: 10 })))
            .then(withCtxAwait('delegationToValidator1', ctx => getDelegation(ctx.bzSdk, ctx.auth.address, ctx.valoper1)))
            .then(withCtxAwait('delegationToValidator2', ctx => getDelegation(ctx.bzSdk, ctx.auth.address, ctx.valoper2)))
            .then(passThroughAwait(ctx => expect(ctx.delegationToValidator1?.balance?.amount).to.equal(3_000_000)))
            .then(passThroughAwait(ctx => expect(ctx.delegationToValidator2?.balance?.amount).to.equal(2_000_000)))
    );

    it("should return bluzelle tx response on redelegate", () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(withCtxAwait('valoper2', ctx => ctx.swarm.getValidators()[2].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 5_000_000, { maxGas: 500_000, gasPrice: 10 })))
            .then(ctx => redelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, ctx.valoper2, 2_000_000, { maxGas: 500_000, gasPrice: 10 }))
            .then(res => expect(res.code).to.equal(0))
    );

    it('should get all delegations of the delegator with the correct amount', () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(withCtxAwait('valoper2', ctx => ctx.swarm.getValidators()[2].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 5_000_000, { maxGas: 200_000, gasPrice: 10 })))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper2, 4_000_000, { maxGas: 200_000, gasPrice: 10 })))
            .then(ctx => getDelegatorDelegations(ctx.bzSdk, ctx.auth.address))
            .then(res => res.delegations.flatMap(delegation => delegation.balance?.amount))
            .then(passThroughAwait(amounts => expect(amounts).to.include(5_000_000)))
            .then(passThroughAwait(amounts => expect(amounts).to.include(4_000_000)))
    );

    it('should get validators info', () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(ctx => getValidatorsInfo(ctx.bzSdk))
            .then(res => expect(res.validators.length).to.equal(3))
    );

    it("should query unbonding delegations of a delegator", () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(withCtxAwait('valoper2', ctx => ctx.swarm.getValidators()[2].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 5_000_000, { maxGas: 200_000, gasPrice: 10 })))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper2, 5_000_000, { maxGas: 200_000, gasPrice: 10 })))
            .then(passThroughAwait(ctx => undelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 2_000_000, { maxGas: 200_000, gasPrice: 10 })))
            .then(passThroughAwait(ctx => undelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 1_000_000, { maxGas: 200_000, gasPrice: 10 })))
            .then(passThroughAwait(ctx => undelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper2, 4_000_000, { maxGas: 200_000, gasPrice: 10 })))
            .then(ctx => getDelegatorUnbondingDelegations(ctx.bzSdk, ctx.auth.address))
            .then(res => res.unbondingDelegations.flatMap(unbondingDelegation => unbondingDelegation.totalBalance))
            .then(passThroughAwait(totalBalances => expect(totalBalances).to.include(3_000_000)))
            .then(passThroughAwait(totalBalances => expect(totalBalances).to.include(4_000_000)))
    );

    it("should get the validator's info", () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(ctx => getValidatorInfo(ctx.bzSdk, ctx.valoper1))
            .then(res => expect(res.validator.description.moniker).to.equal('b.validator'))    
    );

    it("should get all delegations of the validator", () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(withCtxAwait('result', ctx => getValidatorDelegations(ctx.bzSdk, ctx.valoper1)))
            .then(ctx => expect(ctx.result.delegationResponses[0].delegation.validatorAddress).to.equal(ctx.valoper1))    
    );

    it("should get all delegations of the validator", () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 5_000_000, { maxGas: 200_000, gasPrice: 10 })))
            .then(passThroughAwait(ctx => undelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 2_000_000, { maxGas: 200_000, gasPrice: 10 })))
            .then(withCtxAwait('result', ctx => getValidatorUnbondingDelegations(ctx.bzSdk, ctx.valoper1)))
            .then(ctx => expect(ctx.result.unbondingDelegations[0].totalBalance).to.equal(2_000_000))    
    );

    it("should get an unbonding delegation between a validator and a delegator", () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 5_000_000, { maxGas: 200_000, gasPrice: 10 })))
            .then(passThroughAwait(ctx => undelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 2_000_000, { maxGas: 200_000, gasPrice: 10 })))
            .then(withCtxAwait('result', ctx => getUnbondingDelegation(ctx.bzSdk,ctx.auth.address, ctx.valoper1)))
            .then(ctx => expect(ctx.result.totalBalance).to.equal(2_000_000))    
    );

    it("should get an redelegation info", () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(withCtxAwait('valoper2', ctx => ctx.swarm.getValidators()[2].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 5_000_000, { maxGas: 500_000, gasPrice: 10 })))
            .then(passThroughAwait(ctx => redelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, ctx.valoper2, 2_000_000, { maxGas: 500_000, gasPrice: 10 })))
            .then(withCtxAwait('result', ctx => getRedelegations(ctx.bzSdk,ctx.auth.address, ctx.valoper1, ctx.valoper2)))
            .then(ctx => expect(ctx.result.redelegation[0].entries[0].balance).to.equal(2_000_000))    
    );

    it("should get info of validators of the delegator", () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(withCtxAwait('valoper2', ctx => ctx.swarm.getValidators()[2].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 5_000_000, { maxGas: 500_000, gasPrice: 10 })))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper2, 4_000_000, { maxGas: 500_000, gasPrice: 10 })))
            .then(withCtxAwait('result', ctx => getDelegatorValidatorsInfo(ctx.bzSdk,ctx.auth.address)))
            .then(ctx => expect(ctx.result.validators.length).to.equal(3))    
    );

    it("should get historical info of the chain", () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('result', ctx => getHistoricalInfo(ctx.bzSdk, 1)))
            .then(ctx => expect(ctx.result.valSet[0].minSelfDelegation).to.equal(1))
    );

    it("should get pool info of the chain", () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('result', ctx => getPoolInfo(ctx.bzSdk)))
            .then(ctx => expect(ctx.result.notBondedTokens).to.equal(0))
    );


    it("should get staking params of the chain", () =>
        startSwarmWithClient({ ...swarmConfig() })
            .then(withCtxAwait('result', ctx => getStakingParams(ctx.bzSdk)))
            .then(ctx => expect(ctx.result.bondDenom).to.equal('ubnt'))
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
    filter: 'server',
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