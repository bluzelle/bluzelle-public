import { expect } from 'chai';
import { defaultSwarmConfig, startSwarmWithClient } from '@bluzelle/testing';
import { Swarm } from 'daemon-manager/src';
import {
  depositToProposal,
  submitCommunityPoolSpendProposal,
  submitParameterChangeProposal,
  submitSoftwareUpgradeProposal,
  submitTextProposal,
  vote,
  voteWithWeights
} from './tx';
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
import { getAccountBalance, getTotalSupply } from '../bank/query';
import { getParamValue } from '../params';
import { fundCommunityPool } from '../distribution';
import { generateMnemonic } from '../../utils/generateMnemonic';
import { stopSwarm } from '@bluzelle/testing/src/swarmUtils';

describe.skip('gov module, local docker', () => {

  // Set genesis.app_state.gov.voting_params.voting_period to "10s" in daemon-manager/src/config.yml

  beforeEach(() =>
    Swarm.stopDaemons({ ...defaultSwarmConfig })
  );

  describe('text proposal', () => {

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

  });

  describe('software upgrade proposal', () => {

    it('should be able to vote on and pass a software upgrade proposal', () =>
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

  describe('parameters change proposal', () => {

    it('should be able to vote on and pass a parameters change proposal', () =>
      startSwarmWithClient()
        .then(passThroughAwait(client => submitParameterChangeProposal(client.bzSdk, {
            title: 'change_max_validators',
            description: 'Increase max validators to 120',
            proposer: client.auth.address,
            initialDeposit: [{
              amount: 2_000_000,
              denom: 'ubnt'
            }],
            changes: [{
              subspace: 'staking',
              key: 'MaxValidators',
              value: '120'
            }]
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
        .then(passThroughAwait(client =>
          getProposal(client.bzSdk, "1")
            .then(proposal => expect(proposal.statusLabel).to.equal('PROPOSAL_STATUS_PASSED'))
        ))
    );

    it('should be able to apply a parameters change proposal and see the parameter change', () =>
        startSwarmWithClient()
          .then(passThroughAwait(client => getParamValue(client.bzSdk, {
            subspace: 'staking',
            key: 'MaxValidators'
          })
            .then(res => expect(res.param?.value).to.equal('100'))
          ))
          .then(passThroughAwait(client => submitParameterChangeProposal(client.bzSdk, {
              title: 'change_max_validators',
              description: 'Increase max validators to 120',
              proposer: client.auth.address,
              initialDeposit: [{
                amount: 2_000_000,
                denom: 'ubnt'
              }],
              changes: [{
                subspace: 'staking',
                key: 'MaxValidators',
                value: '120'
              }]
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
          .then(passThroughAwait(client =>
            getProposal(client.bzSdk, "1")
              .then(proposal => expect(proposal.statusLabel).to.equal('PROPOSAL_STATUS_PASSED'))
          ))
          .then(passThroughAwait(() => delay(180_000)))
          .then(client => getParamValue(client.bzSdk, {
            subspace: 'staking',
            key: 'MaxValidators'
          }))
          .then(res => expect(res.param?.value).to.equal('120'))
    );

  });

  describe('community pool spend proposal', () => {

    it('should be able to vote on and pass a community pool spend proposal', () =>
      startSwarmWithClient()
        .then(passThroughAwait(ctx => fundCommunityPool(ctx.bzSdk, {
          amount: [{amount: 100_000_000, denom: 'ubnt'}],
          depositor: ctx.auth.address
        }, {maxGas: 200_000, gasPrice: 10})))
        .then(passThroughAwait(ctx => submitCommunityPoolSpendProposal(ctx.bzSdk, {
            title: 'community pool spend',
            description: 'Take funds from community pool',
            proposer: ctx.auth.address,
            recipient: ctx.auth.address,
            initialDeposit: [{
              amount: 2_000_000,
              denom: 'ubnt'
            }],
            amount: [{
              amount: 100_000_000,
              denom: 'ubnt'
            }]
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
        .then(passThroughAwait(client =>
          getProposal(client.bzSdk, "1")
            .then(proposal => expect(proposal.statusLabel).to.equal('PROPOSAL_STATUS_PASSED'))
        ))
    );

    it('should be able to receive funds from a community pool spend proposal', () =>
      startSwarmWithClient()
        .then(passThroughAwait(ctx => fundCommunityPool(ctx.bzSdk, {
          amount: [{amount: 500_000_000, denom: 'ubnt'}],
          depositor: ctx.auth.address
        }, {maxGas: 200_000, gasPrice: 10})))
        .then(withCtxAwait("recipient", () => newBluzelleClient({
          url: 'http://localhost:26667',
          wallet: newLocalWallet(generateMnemonic())
        })))
        .then(passThroughAwait(ctx =>
          submitCommunityPoolSpendProposal(ctx.bzSdk, {
            title: 'community pool spend',
            description: 'Take funds from community pool',
            proposer: ctx.auth.address,
            recipient: ctx.recipient.address,
            initialDeposit: [{
              amount: 2_000_000,
              denom: 'ubnt'
            }],
            amount: [{
              amount: 300_000_000,
              denom: 'ubnt'
            }]
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
        .then(passThroughAwait(client =>
          getProposal(client.bzSdk, "1")
            .then(proposal => expect(proposal.statusLabel).to.equal('PROPOSAL_STATUS_PASSED'))
        ))
        .then(ctx => getAccountBalance(ctx.bzSdk, ctx.recipient.address))
        .then(balance => expect(balance).to.equal(300_000_000))
    );

  });

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


describe.skip('gov votes', function () {
  this.timeout(2_000_000);

  beforeEach(stopSwarm);

  it('should be able to vote with weight', () =>
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
      .then(passThroughAwait(client => voteWithWeights(client.bzSdk, {
        proposalId: "1",
        voter: client.auth.address,
        options: [
          { option: VoteOption.VOTE_OPTION_YES, weight: 0.5 },
          { option: VoteOption.VOTE_OPTION_ABSTAIN, weight: 0.5 }
        ]
      }, { maxGas: 200_000, gasPrice: 10 })))
      .then(passThroughAwait(() => delay(15_000)))
      .then(client => getProposal(client.bzSdk, "1"))
      .then(proposal => expect(proposal.statusLabel).to.equal('PROPOSAL_STATUS_PASSED'))
  );

});
