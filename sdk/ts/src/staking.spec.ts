import {startSwarmWithClient} from "@bluzelle/testing";
import {withCtxAwait} from "@scottburch/with-context";
import {DaemonConfig, Environment, SwarmConfig, SwarmTypes} from "daemon-manager/src/SwarmConfig";
import {passThroughAwait} from "promise-passthrough";
import {delegate, redelegate, send, undelegate, withdrawDelegatorReward} from "./tx";
import {
    getDelegation,
    getDelegationRewards,
    getDelegations,
    getDelegationTotalRewards,
    getValidatorsInfo
} from "./query";
import {expect} from "chai";
import {newBluzelleClient} from "./sdk";
import {newLocalWallet} from "./wallets/localWallet";
import * as bip39 from "bip39";
import {mint} from "./faucet";
import {stopSwarm} from "@bluzelle/testing/src/swarmUtils";

describe('staking', function () {
    this.timeout(2_000_000);

    beforeEach(stopSwarm);

    it("should be able to delegate the expected amount", () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getDelegation(ctx.bzSdk, ctx.auth.address, ctx.valoper))
            .then(delegation => expect(delegation?.balance?.amount).to.equal(5_000_000))
    );

    it("should be able to undelegate", () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => undelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper, 2_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getDelegation(ctx.bzSdk, ctx.auth.address, ctx.valoper))
            .then(delegation => expect(delegation?.balance?.amount).to.equal(3_000_000))
    );


    it("should be able to redelegate", () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(withCtxAwait('valoper2', ctx => ctx.swarm.getValidators()[2].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => redelegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, ctx.valoper2, 2_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(withCtxAwait('delegationToValidator1',ctx => getDelegation(ctx.bzSdk, ctx.auth.address, ctx.valoper1)))
            .then(withCtxAwait('delegationToValidator2',ctx => getDelegation(ctx.bzSdk, ctx.auth.address, ctx.valoper2)))
            .then(passThroughAwait(ctx => expect(ctx.delegationToValidator1?.balance?.amount).to.equal(3_000_000)))
            .then(passThroughAwait(ctx => expect(ctx.delegationToValidator2?.balance?.amount).to.equal(2_000_000)))
    );

    it('should get all delegations of the delegator with the correct amount', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(withCtxAwait('valoper2', ctx => ctx.swarm.getValidators()[2].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper2, 4_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getDelegations(ctx.bzSdk, ctx.auth.address))
            .then(res => res.delegations.flatMap(delegation => delegation.balance?.amount))
            .then(passThroughAwait(amounts => expect(amounts).to.include(5_000_000)))
            .then(passThroughAwait(amounts => expect(amounts).to.include(4_000_000)))
    );

    it('should get validators info', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(ctx => getValidatorsInfo(ctx.bzSdk))
            .then(res => expect(res.validators.length).to.equal(3))
    );

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
            .then(passThroughAwait(ctx => withdrawDelegatorReward(ctx.sentry, ctx.sentry.address, ctx.valoper, {maxGas: 200_000, gasPrice: 10})))
    );

    it('should get total delegation rewards', () =>
        startSwarmWithClient({...swarmConfig()})
            .then(withCtxAwait('valoper1', ctx => ctx.swarm.getValidators()[1].getValoper()))
            .then(withCtxAwait('valoper2', ctx => ctx.swarm.getValidators()[2].getValoper()))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper1, 5_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(passThroughAwait(ctx => delegate(ctx.bzSdk, ctx.auth.address, ctx.valoper2, 4_000_000, {maxGas: 200_000, gasPrice: 10})))
            .then(ctx => getDelegationTotalRewards(ctx.bzSdk, ctx.auth.address))
    );

});

const swarmConfig = (): SwarmConfig => ({
    denom: 'bnt',
    genesisTokenBalance: 500_000_000,
    monikerBase: 'test',
    chainId: 'my-chain',
    minGasPrice: 0.000000002,
    targetBranch: process.env.BRANCH || 'devel',
    environment: Environment.DEVEL,
    swarmType: SwarmTypes.Docker,
    bluzelleFaucet: true,
    storageBaseDir: '',
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