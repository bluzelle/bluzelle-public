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
import { fundCommunityPool } from '../distribution';
import { ProposalStatus } from '../../curium/lib/generated/cosmos/gov/v1beta1/gov';
import { getModuleAccountByName } from '../auth/query';
import { withCtxAwait } from '@scottburch/with-context';
import { cli } from 'webpack';
import { getStakingParams, parseBluzelleStakingParamsToParams } from '../staking/query';

const PROPOSAL_VALUE: TextProposal = {
  title: 'My title',
  description: 'My description',
};

const FIRST_PROPOSAL_ID = '1';

describe('gov module', function() {
  this.timeout(10_800_000)

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
      .then(withCtxAwait("initialParams", client => getStakingParams(client.bzSdk)
      ))
      .then(withCtxAwait("govModuleAddress", client => getModuleAccountByName(client.bzSdk, "gov")))
      .then(passThroughAwait(client => submitParameterChangeProposal(client.bzSdk, 
        {
          title: 'change_max_validators',
          description: 'Increase max validators to 120',
          proposer: client.auth.address,
          initialDeposit: [{
            amount: 2_000_000,
            denom: 'ubnt'
          }],
        },
        {
          authority: client.govModuleAddress?.baseAccount?.address as string,
          params: {...parseBluzelleStakingParamsToParams(client.initialParams), maxValidators: 120},
        },
        "staking",
        {
          maxGas: 200_000,
          gasPrice: 10
        })))
      .then(client => getProposal(client.bzSdk, FIRST_PROPOSAL_ID))
      .then(proposal => expect(TextProposal.decode(proposal.content.value))
        .to
        .deep
        .equal(PROPOSAL_VALUE))
  );

  it('should be able to submit and query a community pool spend proposal. This is considered as normal v1 proposal submit test.', () =>
    startSwarmWithClient()
      .then(passThroughAwait(ctx => fundCommunityPool(ctx.bzSdk, {
        amount: [{amount: 100_000_000, denom: 'ubnt'}],
        depositor: ctx.auth.address
      }, {maxGas: 200_000, gasPrice: 10})))
      .then(withCtxAwait("govModuleAddress", ctx => getModuleAccountByName(ctx.bzSdk, "gov")))
      .then(passThroughAwait(client =>
        newBluzelleClient({
          url: 'http://localhost:26667',
          wallet: newLocalWallet(generateMnemonic())
        })
          .then(recipient =>{
            console.log(client)
            return submitCommunityPoolSpendProposal(client.bzSdk, {
              title: 'My title',
              description: 'My description',
              recipient: recipient.address,
              amount: [{
                amount: 10_000_000,
                denom: `ubnt`
              }],
              proposer: client.auth.address,
              initialDeposit: [{
                amount: 3_000_000,
                denom: `ubnt`
              }],
              authority: client.govModuleAddress?.baseAccount?.address as string
            }, {
              maxGas: 200_000,
              gasPrice: 10
            })
          }
            
          )
          .then(res => expect(res.code).to.equal(0))
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
            amount: 50,
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
