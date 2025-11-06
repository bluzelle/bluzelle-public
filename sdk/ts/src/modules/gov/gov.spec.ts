import {expect} from 'chai';
import {defaultSwarmConfig, startSwarmWithClient} from '@bluzelle/testing';
import {Swarm} from 'daemon-manager/src';
import {
    depositToProposal,
    submitCommunityPoolSpendProposal,
    submitParameterChangeProposal,
    // submitProposalFromJson,
    submitSoftwareUpgradeProposal,
    submitTextProposal
} from './tx';
import {getDeposit, getDepositParams, getProposal, getProposals, getTallyParams, getVotingParams} from './query';
import {TextProposal} from 'cosmjs-types/cosmos/gov/v1beta1/gov';
// import {SoftwareUpgradeProposal} from '../../curium/lib/generated/cosmos/upgrade/v1beta1/upgrade';
import {MsgExecLegacyContent} from '../../curium/lib/generated/cosmos/gov/v1/tx';
import {passThroughAwait} from 'promise-passthrough';
import * as path from 'path';
import {newBluzelleClient} from '../../core';
import {newLocalWallet} from '../../wallets/localWallet';
import {generateMnemonic} from '../../utils/generateMnemonic';
import {fundCommunityPool} from '../distribution';
import {ProposalStatus} from '../../curium/lib/generated/cosmos/gov/v1beta1/gov';
import {getModuleAccountByName} from '../auth/query';
import {withCtxAwait} from '@scottburch/with-context';
import {getStakingParams, parseBluzelleStakingParamsToParams} from '../staking/query';
import {isE2E} from '@bluzelle/testing/src/e2eUtils';
import {getContainerId, copyToContainer, ensurePathExists} from '@bluzelle/testing/src/dockerUtils';
import {
    SoftwareUpgradeProposal
} from '../../curium/lib/generated/cosmos/upgrade/v1beta1/upgrade';
import {
    MsgSoftwareUpgrade
} from '../../curium/lib/generated/cosmos/upgrade/v1beta1/tx';
import {parseNumToLong} from "../../shared/parse";


const PROPOSAL_VALUE: TextProposal = {
    title: 'My title',
    description: 'My description',
};

describe('gov module', function() {
    this.timeout(10_800_000)

    beforeEach(() =>
        Swarm.stopDaemons({ ...defaultSwarmConfig })
    );

    // after(() =>
    //     Swarm.stopDaemons({ ...defaultSwarmConfig })
    // );

    it('should get voting params', () =>
        startSwarmWithClient({
            config: defaultSwarmConfig,
            isE2E: isE2E()
        })
            .then(client => getVotingParams(client.bzSdk))
            .then(params => expect(typeof params.votingPeriod?.nanos).to.equal('number'))
    );

    it('should get deposit params', () =>
        startSwarmWithClient({
            config: defaultSwarmConfig,
            isE2E: isE2E()
        })
            .then(client => getDepositParams(client.bzSdk))
            .then(x => x)
    );

    it('should get tally params', () =>
        startSwarmWithClient({
            config: defaultSwarmConfig,
            isE2E: isE2E()
        })
            .then(client => getTallyParams(client.bzSdk))
            .then(params => {
                expect(typeof params.threshold).to.equal('number');
                expect(typeof params.quorum).to.equal('number');
                expect(typeof params.vetoThreshold).to.equal('number');
            })
    );

    it('should be able to submit and query a text proposal', () =>
        startSwarmWithClient({
            config: defaultSwarmConfig,
            isE2E: isE2E()
        })
            .then(withCtxAwait("govModuleAddress", client => getModuleAccountByName(client.bzSdk, "gov")))
            .then(passThroughAwait(client => submitTextProposal(client.bzSdk, {
                    title: 'My title',
                    description: 'My description',
                    proposer: client.auth.address,
                    authority: client.govModuleAddress?.baseAccount?.address as string,
                    initialDeposit: [{
                        amount: 100000,
                        denom: 'ubnt'
                    }],
                    summary: 'Test summary',
                    metadata: 'Test metadata',
                }, {
                    maxGas: 200_000,
                    gasPrice: 10
                })
            ))
            .then(client =>
                getProposals(client.bzSdk)
                    .then(res => (res.proposals.length).toString())
                    .then(proposalId => getProposal(client.bzSdk, proposalId))
            )
            .then(proposal => expect(TextProposal.decode(proposal.content.value))
                .to
                .deep
                .equal(PROPOSAL_VALUE))
    );

    it('should be able to submit and query a software upgrade proposal', () =>
        startSwarmWithClient({
            config: defaultSwarmConfig,
            isE2E: isE2E()
        })
            .then(passThroughAwait(ctx => submitSoftwareUpgradeProposal(ctx.bzSdk, {
                title: 'My title',
                description: 'My description',
                proposer: ctx.auth.address,
                initialDeposit: [{
                    amount: 500_000,
                    denom: 'ubnt'
                }],
                summary: 'Test summary',
                metadata: 'Test metadata',
                plan: {
                    name: 'My plan',
                    height: 20000,
                    info: 'some information',
                }
            }, {
                maxGas: 200_000,
                gasPrice: 10
            })))
            .then(client =>
                getProposals(client.bzSdk)
                    .then(res => (res.proposals.length).toString())
                    .then(proposalId => getProposal(client.bzSdk, proposalId))
            )
            .then(proposal => expect(MsgSoftwareUpgrade.decode(proposal.content.value).plan.height.toNumber())
                .to
                .equal(20000))
    );

    // it('should be able to submit and query a parameters change proposal', () =>
    //     startSwarmWithClient({
    //         config: defaultSwarmConfig,
    //         isE2E: isE2E()
    //     })
    //         .then(withCtxAwait("initialParams", client => getStakingParams(client.bzSdk)
    //         ))
    //         .then(withCtxAwait("govModuleAddress", client => getModuleAccountByName(client.bzSdk, "gov")))
    //         .then(passThroughAwait(client => submitParameterChangeProposal(client.bzSdk,
    //             {
    //                 title: 'My title',
    //                 description: 'My description',
    //                 proposer: client.auth.address,
    //                 initialDeposit: [{
    //                     amount: 2_000_000_000,
    //                     denom: 'ubnt'
    //                 }],
    //             },
    //             {
    //                 authority: client.govModuleAddress?.baseAccount?.address as string,
    //                 params: {...parseBluzelleStakingParamsToParams(client.initialParams), maxValidators: 120},
    //             },
    //             "staking",
    //             "test summary",
    //             "test metadata",
    //             {
    //                 maxGas: 200_000,
    //                 gasPrice: 10
    //             })))
    //         .then(client =>
    //             getProposals(client.bzSdk)
    //                 .then(res => (res.proposals.length).toString())
    //                 .then(proposalId => getProposal(client.bzSdk, proposalId))
    //         )
    //         .then(proposal => expect(proposal.status).to.equal(ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD))
    // );
    //
    // it('should be able to submit and query a community pool spend proposal. This is considered as normal v1 proposal submit test.', () =>
    //     startSwarmWithClient({
    //         config: defaultSwarmConfig,
    //         isE2E: isE2E()
    //     })
    //         .then(passThroughAwait(ctx => fundCommunityPool(ctx.bzSdk, {
    //             amount: [{amount: 100_000_000, denom: 'ubnt'}],
    //             depositor: ctx.auth.address
    //         }, {maxGas: 200_000, gasPrice: 10})))
    //         .then(withCtxAwait("govModuleAddress", ctx => getModuleAccountByName(ctx.bzSdk, "gov")))
    //         .then(passThroughAwait(client =>
    //             newBluzelleClient({
    //                 url: 'http://localhost:26667',
    //                 wallet: newLocalWallet(generateMnemonic())
    //             })
    //                 .then(recipient =>{
    //                         console.log(client)
    //                         return submitCommunityPoolSpendProposal(client.bzSdk, {
    //                             title: 'My title',
    //                             description: 'My description',
    //                             recipient: recipient.address,
    //                             amount: [{
    //                                 amount: 10_000_000,
    //                                 denom: `ubnt`
    //                             }],
    //                             proposer: client.auth.address,
    //                             initialDeposit: [{
    //                                 amount: 3_000_000,
    //                                 denom: `ubnt`
    //                             }],
    //                             authority: client.govModuleAddress?.baseAccount?.address as string
    //                         }, {
    //                             maxGas: 200_000,
    //                             gasPrice: 10
    //                         })
    //                     }
    //
    //                 )
    //                 .then(res => expect(res.code).to.equal(0))
    //         ))
    // );
    //
    // it('should be able to deposit to a proposal', () =>
    //     startSwarmWithClient({
    //         config: defaultSwarmConfig,
    //         isE2E: isE2E()
    //     })
    //         .then(withCtxAwait("govModuleAddress", client => getModuleAccountByName(client.bzSdk, "gov")))
    //         .then(passThroughAwait(ctx => submitTextProposal(ctx.bzSdk, {
    //                 title: 'My title',
    //                 description: 'My description',
    //                 proposer: ctx.auth.address,
    //                 authority: ctx.govModuleAddress?.baseAccount?.address as string,
    //                 initialDeposit: [{
    //                     amount: 100,
    //                     denom: 'ubnt'
    //                 }],
    //                 summary: 'Test summary',
    //                 metadata: 'Test metadata',
    //             }, {
    //                 maxGas: 200_000,
    //                 gasPrice: 10
    //             })
    //         ))
    //         .then(client =>
    //             getProposals(client.bzSdk)
    //                 .then(res => (res.proposals.length).toString())
    //                 .then(id => depositToProposal(client.bzSdk, {
    //                     proposalId: id,
    //                     depositor: client.auth.address,
    //                     amount: [{amount: 1_000_000_000, denom: 'ubnt'}],
    //                 }, { maxGas: 200_000, gasPrice: 10 }))
    //         )
    //         .then(res => expect(res.code).to.equal(0))
    // );
    //
    // it('should be in deposit period after submitting a proposal', () =>
    //     startSwarmWithClient({
    //         config: defaultSwarmConfig,
    //         isE2E: isE2E()
    //     })
    //         .then(withCtxAwait("govModuleAddress", client => getModuleAccountByName(client.bzSdk, "gov")))
    //         .then(passThroughAwait(ctx => submitTextProposal(ctx.bzSdk, {
    //                 title: 'My title',
    //                 description: 'My description',
    //                 proposer: ctx.auth.address,
    //                 authority: ctx.govModuleAddress?.baseAccount?.address as string,
    //                 initialDeposit: [{
    //                     amount: 50,
    //                     denom: 'ubnt'
    //                 }],
    //                 summary: 'Test summary',
    //                 metadata: 'Test metadata',
    //             }, {
    //                 maxGas: 200_000,
    //                 gasPrice: 10
    //             })
    //                 .then(x => x)
    //         ))
    //         .then(client =>
    //             getProposals(client.bzSdk)
    //                 .then(res => (res.proposals.length).toString())
    //                 .then(proposalId => getProposal(client.bzSdk, proposalId))
    //         )
    //         .then(proposal => expect(proposal.status).to.equal(ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD))
    // );
    //
    // it('should query deposit', () =>
    //     startSwarmWithClient({
    //         config: defaultSwarmConfig,
    //         isE2E: isE2E()
    //     })
    //         .then(withCtxAwait("govModuleAddress", client => getModuleAccountByName(client.bzSdk, "gov")))
    //         .then(passThroughAwait(ctx => submitTextProposal(ctx.bzSdk, {
    //             title: 'My title',
    //             description: 'My description',
    //             authority: ctx.govModuleAddress?.baseAccount?.address as string,
    //             proposer: ctx.auth.address,
    //             initialDeposit: [{
    //                 amount: 100,
    //                 denom: 'ubnt'
    //             }],
    //             summary: 'Test summary',
    //             metadata: 'Test metadata',
    //         }, {
    //             maxGas: 200_000,
    //             gasPrice: 10
    //         })))
    //         .then(client =>
    //             getProposals(client.bzSdk)
    //                 .then(res => (res.proposals.length).toString())
    //                 .then(id => getDeposit(client.bzSdk, {
    //                     proposalId: id,
    //                     depositor: client.auth.address,
    //                 }))
    //         )
    //         .then(deposit => expect(deposit.amount)
    //             .to
    //             .deep
    //             .equal([{
    //                 denom: 'ubnt',
    //                 amount: 100
    //             }]))
    // );

});
