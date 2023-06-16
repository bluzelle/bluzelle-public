import { expect } from 'chai';
import { defaultSwarmConfig, startSwarmWithClient } from '@bluzelle/testing';
import { Swarm } from 'daemon-manager/src';
import {
  depositToProposal,
  submitCommunityPoolSpendProposal,
  submitParameterChangeProposal,
  submitSoftwareUpgradeProposal,
  submitTextProposal
} from './tx';
import {
  getDeposit,
  getDepositParams,
  getProposal,
  getTallyParams,
  getVotingParams
} from './query';
import { TextProposal } from 'cosmjs-types/cosmos/gov/v1beta1/gov';
import { passThroughAwait } from 'promise-passthrough';
import { newBluzelleClient } from '../../core';
import { newLocalWallet } from '../../wallets/localWallet';
import { generateMnemonic } from '../../utils/generateMnemonic';
import { ProposalStatus } from '../../curium/lib/generated/cosmos/gov/v1beta1/gov';

const PROPOSAL_VALUE: TextProposal = {
  title: 'My title',
  description: 'My description',
};

const FIRST_PROPOSAL_ID = '1';

describe('gov module', () => {

  beforeEach(() =>
    Swarm.stopDaemons({ ...defaultSwarmConfig })
  );

  it('should get voting params', () =>
    startSwarmWithClient()
      .then(client => getVotingParams(client.bzSdk))
      .then(params => expect(typeof params.votingPeriod?.nanos).to.equal('number'))
  );

  it('should get deposit params', () =>
    startSwarmWithClient()
      .then(client => getDepositParams(client.bzSdk))
      .then(x => x)
  );

  it('should get tally params', () =>
    startSwarmWithClient()
      .then(client => getTallyParams(client.bzSdk))
      .then(params => {
        expect(typeof params.threshold).to.equal('number');
        expect(typeof params.quorum).to.equal('number');
        expect(typeof params.vetoThreshold).to.equal('number');
      })
  );

  it('should be able to submit and query a text proposal', () =>
    startSwarmWithClient()
      .then(passThroughAwait(client => submitTextProposal(client.bzSdk, {
        title: 'My title',
        description: 'My description',
        proposer: client.auth.address,
        initialDeposit: [{
          amount: 100,
          denom: 'ubnt'
        }],
      }, {
        maxGas: 200_000,
        gasPrice: 10
      })))
      .then(client => getProposal(client.bzSdk, FIRST_PROPOSAL_ID))
      .then(proposal => expect(TextProposal.decode(proposal.content.value))
        .to
        .deep
        .equal(PROPOSAL_VALUE))
  );

  it('should be able to submit and query a software upgrade proposal', () =>
    startSwarmWithClient()
      .then(passThroughAwait(client => submitSoftwareUpgradeProposal(client.bzSdk, {
        title: 'My title',
        description: 'My description',
        plan: {
          name: 'My plan',
          height: 20,
          info: 'some information',
        },
        proposer: client.auth.address,
        initialDeposit: [{
          amount: 100,
          denom: 'ubnt'
        }],
      }, {
        maxGas: 200_000,
        gasPrice: 10
      })))
      .then(client => getProposal(client.bzSdk, FIRST_PROPOSAL_ID))
      .then(proposal => expect(TextProposal.decode(proposal.content.value))
        .to
        .deep
        .equal(PROPOSAL_VALUE))
  );

  it('should be able to submit and query a parameters change proposal', () =>
    startSwarmWithClient()
      .then(passThroughAwait(client => submitParameterChangeProposal(client.bzSdk, {
        title: 'My title',
        description: 'My description',
        changes: [{
          'subspace': 'staking',
          'key': 'MaxValidators',
          'value': '200'
        }],
        proposer: client.auth.address,
        initialDeposit: [{
          amount: 100,
          denom: `ubnt`
        }],
      }, {
        maxGas: 200_000,
        gasPrice: 10
      })))
      .then(client => getProposal(client.bzSdk, FIRST_PROPOSAL_ID))
      .then(proposal => expect(TextProposal.decode(proposal.content.value))
        .to
        .deep
        .equal(PROPOSAL_VALUE))
  );

  it('should be able to submit and query a community pool spend proposal', () =>
    startSwarmWithClient()
      .then(passThroughAwait(client =>
        newBluzelleClient({
          url: 'http://localhost:26667',
          wallet: newLocalWallet(generateMnemonic())
        })
          .then(recipient =>
            submitCommunityPoolSpendProposal(client.bzSdk, {
              title: 'My title',
              description: 'My description',
              recipient: recipient.address,
              amount: [{
                amount: 500,
                denom: `ubnt`
              }],
              proposer: client.auth.address,
              initialDeposit: [{
                amount: 100,
                denom: `ubnt`
              }],
            }, {
              maxGas: 200_000,
              gasPrice: 10
            })
          )
      ))
  );

  it('should be able to deposit to a proposal', () =>
    startSwarmWithClient()
      .then(passThroughAwait(client => submitTextProposal(client.bzSdk, {
          title: 'My title',
          description: 'My description',
          proposer: client.auth.address,
          initialDeposit: [{
            amount: 100,
            denom: 'ubnt'
          }],
        }, {
          maxGas: 200_000,
          gasPrice: 10
        })
      ))
      .then(client => depositToProposal(client.bzSdk, {
        proposalId: FIRST_PROPOSAL_ID,
        depositor: client.auth.address,
        amount: [{amount: 500_000_000_000, denom: 'ubnt'}],
      }, { maxGas: 200_000, gasPrice: 10 }))
      .then(res => expect(res.code).to.equal(0))
  );

  it('should be in deposit period after submitting a proposal', () =>
    startSwarmWithClient()
      .then(passThroughAwait(client => submitTextProposal(client.bzSdk, {
          title: 'My title',
          description: 'My description',
          proposer: client.auth.address,
          initialDeposit: [{
            amount: 500_000_000_000,
            denom: 'ubnt'
          }],
        }, {
          maxGas: 200_000,
          gasPrice: 10
        })
          .then(x => x)
      ))
      .then(client => getProposal(client.bzSdk, FIRST_PROPOSAL_ID))
      .then(proposal => expect(proposal.status).to.equal(ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD))
  );

  it('should query deposit', () =>
    startSwarmWithClient()
      .then(passThroughAwait(client => submitTextProposal(client.bzSdk, {
        title: 'My title',
        description: 'My description',
        proposer: client.auth.address,
        initialDeposit: [{
          amount: 100,
          denom: 'ubnt'
        }],
      }, {
        maxGas: 200_000,
        gasPrice: 10
      })))
      .then(client => getDeposit(client.bzSdk, {
        proposalId: FIRST_PROPOSAL_ID,
        depositor: client.auth.address,
      }))
      .then(deposit => expect(deposit.amount)
        .to
        .deep
        .equal([{
          denom: 'ubnt',
          amount: 100
        }]))
  );

});
