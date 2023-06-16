import { expect } from 'chai';
import { defaultSwarmConfig, startSwarmWithClient } from '@bluzelle/testing';
import { Swarm } from 'daemon-manager/src';
import { depositToProposal, submitSoftwareUpgradeProposal, submitTextProposal, vote } from './tx';
import { getProposal } from './query';
import { passThroughAwait } from 'promise-passthrough';
import { newBluzelleClient } from '../../core';
import { newLocalWallet } from '../../wallets/localWallet';
import { VoteOption } from '../../curium/lib/generated/cosmos/gov/v1beta1/gov';
import delay from 'delay';
import { copyToContainer, getContainerId } from '@bluzelle/testing/src/dockerUtils';
import * as path from 'path';
import { getAppliedPlan } from '../upgrade/query';
import { withCtxAwait } from '@scottburch/with-context';
import { getTotalSupply } from '../bank/query';

describe.skip('gov module, local docker', () => {

  // Set genesis.app_state.gov.voting_params.voting_period to "10s" in daemon-manager/src/config.yml

  beforeEach(() =>
    Swarm.stopDaemons({ ...defaultSwarmConfig })
  );

  it('should be able to submit a text proposal', () =>
    startSwarmWithClient()
      .then(client => submitTextProposal(client.bzSdk, {
          title: 'My title',
          description: 'My description',
          proposer: client.auth.address,
          initialDeposit: [{
            amount: 500_000,
            denom: 'ubnt'
          }],
        }, {
          maxGas: 200_000,
          gasPrice: 10
        })
      )
      .then(result => expect(result.code).to.equal(0))
  );

  it('should be able to get a text proposal to reach deposit period', () =>
    startSwarmWithClient()
      .then(passThroughAwait(client => submitTextProposal(client.bzSdk, {
          title: 'My title',
          description: 'My description',
          proposer: client.auth.address,
          initialDeposit: [{
            amount: 2_000_000,
            denom: 'ubnt'
          }],
        }, {
          maxGas: 200_000,
          gasPrice: 10
        })
      ))
      .then(passThroughAwait(client =>
        getProposal(client.bzSdk, "1")
          .then(proposal => expect(proposal.statusLabel).to.equal('PROPOSAL_STATUS_DEPOSIT_PERIOD'))
      ))
      .then(client => depositToProposal(client.bzSdk, {
        proposalId: "1",
        depositor: client.auth.address,
        amount: [{
          amount: 2_000_000,
          denom: 'ubnt'
        }]
      }, {
        maxGas: 200_000,
        gasPrice: 10
      }))
      .then(result => expect(result.code).to.equal(0))
  );

  it('should be able to get a text proposal to reach voting period', () =>
    startSwarmWithClient()
      .then(passThroughAwait(client => submitTextProposal(client.bzSdk, {
          title: 'My title',
          description: 'My description',
          proposer: client.auth.address,
          initialDeposit: [{
            amount: 500_000,
            denom: 'ubnt'
          }],
        }, {
          maxGas: 200_000,
          gasPrice: 10
        })
      ))
      .then(passThroughAwait(client =>
        getProposal(client.bzSdk, "1")
          .then(proposal => expect(proposal.statusLabel).to.equal('PROPOSAL_STATUS_DEPOSIT_PERIOD'))
      ))
      .then(passThroughAwait(client => depositToProposal(client.bzSdk, {
        proposalId: "1",
        depositor: client.auth.address,
        amount: [{
          amount: 1_000_000,
          denom: 'ubnt'
        }]
      }, {
        maxGas: 200_000,
        gasPrice: 10
      })))
      .then(client => getProposal(client.bzSdk, "1"))
      .then(proposal => expect(proposal.statusLabel).to.equal('PROPOSAL_STATUS_VOTING_PERIOD'))
  );

  it('should be able to pass a text proposal by voting yes', () =>
    startSwarmWithClient()
      .then(passThroughAwait(client => submitTextProposal(client.bzSdk, {
          title: 'My title',
          description: 'My description',
          proposer: client.auth.address,
          initialDeposit: [{
            amount: 500_000,
            denom: 'ubnt'
          }],
        }, {
          maxGas: 200_000,
          gasPrice: 10
        })
      ))
      .then(passThroughAwait(client => depositToProposal(client.bzSdk, {
        proposalId: "1",
        depositor: client.auth.address,
        amount: [{
          amount: 1_000_000,
          denom: 'ubnt'
        }]
      }, {
        maxGas: 200_000,
        gasPrice: 10
      })))
      .then(passThroughAwait(client => vote(client.bzSdk, {
        proposalId: "1",
        voter: client.auth.address,
        option: VoteOption.VOTE_OPTION_YES
      }, { maxGas: 200_000, gasPrice: 10 })))
      .then(passThroughAwait(() => delay(15_000)))
      .then(client => getProposal(client.bzSdk, "1"))
      .then(proposal => expect(proposal.statusLabel).to.equal('PROPOSAL_STATUS_PASSED'))
  );

  it('should be able to vote on and pass an upgrade proposal', () =>
    startSwarmWithClient()
      .then(passThroughAwait(client => submitSoftwareUpgradeProposal(client.bzSdk, {
          title: 'My title',
          description: 'My description',
          proposer: client.auth.address,
          initialDeposit: [{
            amount: 2_000_000,
            denom: 'ubnt'
          }],
          plan: {
            name: 'My upgrade plan',
            height: 100,
            info: 'My upgrade info',
          }
        }, {
          maxGas: 200_000,
          gasPrice: 10
        })
      ))
      .then(passThroughAwait(client => vote(client.bzSdk, {
        proposalId: "1",
        voter: client.auth.address,
        option: VoteOption.VOTE_OPTION_YES
      }, { maxGas: 200_000, gasPrice: 10 })))
      .then(passThroughAwait(() => delay(10_000)))
      .then(client => getProposal(client.bzSdk, "1"))
      .then(proposal => expect(proposal.statusLabel).to.equal('PROPOSAL_STATUS_PASSED'))
  );

  it('should apply a software upgrade proposal and confirm that it has been applied', () =>
    startSwarmWithClient()
      .then(passThroughAwait(client => submitSoftwareUpgradeProposal(client.bzSdk, {
          title: 'My title',
          description: 'My description',
          proposer: client.auth.address,
          initialDeposit: [{
            amount: 2_000_000,
            denom: 'ubnt'
          }],
          plan: {
            name: 'do_nothing',
            height: 25,
            info: 'this plan does nothing',
          }
        }, {
          maxGas: 200_000,
          gasPrice: 10
        })
      ))
      .then(passThroughAwait(client => vote(client.bzSdk, {
        proposalId: "1",
        voter: client.auth.address,
        option: VoteOption.VOTE_OPTION_YES
      }, { maxGas: 200_000, gasPrice: 10 })))
      .then(passThroughAwait(() => {
        getContainerId('a.client.sentry')
          .then(id => copyToContainer(id, path.join(__dirname, './plans/do_nothing'), '/root/.curium/cosmovisor/upgrades'))
        getContainerId('a.validator')
          .then(id => copyToContainer(id, path.join(__dirname, './plans/do_nothing'), '/root/.curium/cosmovisor/upgrades'))
      }))
      .then(passThroughAwait(() => delay(10_000)))
      .then(passThroughAwait(client =>
        getProposal(client.bzSdk, "1")
          .then(proposal => expect(proposal.statusLabel).to.equal('PROPOSAL_STATUS_PASSED'))
      ))
      .then(passThroughAwait(() => delay(120_000)))
      .then(client => getAppliedPlan(client.bzSdk, "do_nothing"))
      .then(plan => expect(plan.height).to.equal(25))
  );

  it('should apply a software upgrade proposal to double token supply', () =>
    startSwarmWithClient()
      .then(withCtxAwait("supply_before", client => getTotalSupply(client.bzSdk)))
      .then(passThroughAwait(client => submitSoftwareUpgradeProposal(client.bzSdk, {
          title: 'My title',
          description: 'My description',
          proposer: client.auth.address,
          initialDeposit: [{
            amount: 2_000_000,
            denom: 'ubnt'
          }],
          plan: {
            name: 'double_supply',
            height: 25,
            info: 'double the supply of ubnt',
          }
        }, {
          maxGas: 200_000,
          gasPrice: 10
        })
      ))
      .then(passThroughAwait(client => vote(client.bzSdk, {
        proposalId: "1",
        voter: client.auth.address,
        option: VoteOption.VOTE_OPTION_YES
      }, { maxGas: 200_000, gasPrice: 10 })))
      .then(passThroughAwait(() => {
        getContainerId('a.client.sentry')
          .then(id => copyToContainer(id, path.join(__dirname, './plans/double_supply'), '/root/.curium/cosmovisor/upgrades'))
        getContainerId('a.validator')
          .then(id => copyToContainer(id, path.join(__dirname, './plans/double_supply'), '/root/.curium/cosmovisor/upgrades'))
      }))
      .then(passThroughAwait(() => delay(10_000)))
      .then(passThroughAwait(client =>
        getProposal(client.bzSdk, "1")
          .then(proposal => expect(proposal.statusLabel).to.equal('PROPOSAL_STATUS_PASSED'))
      ))
      .then(passThroughAwait(() => delay(120_000)))
      .then(passThroughAwait(client =>
        getAppliedPlan(client.bzSdk, "double_supply")
          .then(plan => expect(plan.height).to.equal(25))
      ))
      .then(withCtxAwait("supply_after", client => getTotalSupply(client.bzSdk)))
      .then(ctx => expect(ctx.supply_after.supply[0].amount).to.equal(ctx.supply_before.supply[0].amount * 2))
  );

});


describe.skip('gov module, local machine', () => {

  // Run a local bluzelle instance
  // Set genesis.app_state.gov.deposit_params.max_deposit_period to "5s" in curium/config.yml
  // Set genesis.app_state.gov.voting_params.voting_period to "10s" in curium/config.yml

  const MNEMONIC = "";
  const CURIUM_URL = "http://localhost:26657";

  it('should be able to vote on and pass a text proposal', () =>
    newBluzelleClient({
      url: CURIUM_URL,
      wallet: newLocalWallet(MNEMONIC)
    })
      .then(passThroughAwait(client => submitTextProposal(client, {
          title: 'My title',
          description: 'My description',
          proposer: client.address,
          initialDeposit: [{
            amount: 500_000,
            denom: 'ubnt'
          }],
        }, {
          maxGas: 200_000,
          gasPrice: 10
        })
      ))
      .then(passThroughAwait(client => vote(client, {
        proposalId: "1",
        voter: client.address,
        option: VoteOption.VOTE_OPTION_YES
      }, { maxGas: 200_000, gasPrice: 10 })))
      .then(passThroughAwait(() => delay(10_000)))
      .then(client => getProposal(client, "1"))
      .then(proposal => expect(proposal.statusLabel).to.equal('PROPOSAL_STATUS_PASSED'))
  );


  it('should be able to vote on and pass an upgrade proposal', () =>
    newBluzelleClient({
      url: CURIUM_URL,
      wallet: newLocalWallet(MNEMONIC)
    })
      .then(passThroughAwait(client => submitSoftwareUpgradeProposal(client, {
          title: 'My title',
          description: 'My description',
          proposer: client.address,
          initialDeposit: [{
            amount: 500_000,
            denom: 'ubnt'
          }],
          plan: {
            name: 'My upgrade plan',
            height: 100,
            info: 'My upgrade info',
          }
        }, {
          maxGas: 200_000,
          gasPrice: 10
        })
      ))
      .then(passThroughAwait(client => vote(client, {
        proposalId: "1",
        voter: client.address,
        option: VoteOption.VOTE_OPTION_YES
      }, { maxGas: 200_000, gasPrice: 10 })))
      .then(passThroughAwait(() => delay(10_000)))
      .then(client => getProposal(client, "1"))
      .then(proposal => expect(proposal.statusLabel).to.equal('PROPOSAL_STATUS_PASSED'))
  );

});
