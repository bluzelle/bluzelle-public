import { BluzelleClient, BluzelleTxResponse, BroadcastOptions, sendTx } from '../../core';
import {
  MsgSubmitProposal,
  MsgVote,
  MsgVoteWeighted,
  MsgDeposit
} from '../../curium/lib/generated/cosmos/gov/v1/tx';
import {
  MsgSubmitProposal as MsgSubmitLegacyProposal
} from '../../curium/lib/generated/cosmos/gov/v1beta1/tx';
import { VoteOption, WeightedVoteOption } from '../../curium/lib/generated/cosmos/gov/v1/gov';
import { TextProposal } from 'cosmjs-types/cosmos/gov/v1beta1/gov';
import { ParamChange, ParameterChangeProposal } from 'cosmjs-types/cosmos/params/v1beta1/params';
import { CommunityPoolSpendProposal } from 'cosmjs-types/cosmos/distribution/v1beta1/distribution';
import { encodeSoftwareUpgradeProposal } from '../upgrade';
import { parseStringToLong, scaleTo18 } from '../../shared/parse';
import { MsgCommunityPoolSpend } from '../../curium/lib/generated/cosmos/distribution/v1beta1/tx';
import { MsgUpdateParams } from '../../curium/lib/generated/cosmos/staking/v1beta1/tx';
import { Duration } from '../../curium/lib/generated/google/protobuf/duration';
import { Params } from '../../curium/lib/generated/cosmos/staking/v1beta1/staking';


export type BluzelleWeightedVoteOption = {
  option: VoteOption;
  weight: number;
}

export const submitTextProposal = (
  client: BluzelleClient,
  params: {
    title: string,
    description: string,
    initialDeposit: {amount: number, denom: 'ubnt'}[]
    proposer: string,
  },
  options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
  Promise.resolve(sendTx(client, '/cosmos.gov.v1beta1.MsgSubmitProposal', {
    content: {
      typeUrl: '/cosmos.gov.v1beta1.TextProposal',
      value: TextProposal.encode({
        title: params.title,
        description: params.description,
      }).finish()
    },
    proposer: params.proposer,
    initialDeposit: params.initialDeposit.map(({amount, denom}) => ({amount: amount.toString(), denom})),
  } as MsgSubmitLegacyProposal, options))
    .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);


export const submitSoftwareUpgradeProposal = (
  client: BluzelleClient,
  params: {
    title: string,
    description: string,
    plan?: {
      name: string,
      height: number,
      info: string,
    },
    initialDeposit: {amount: number, denom: 'ubnt'}[]
    proposer: string,
  },
  options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
  Promise.resolve(sendTx(client, '/cosmos.gov.v1beta1.MsgSubmitProposal', {
    content: {
      typeUrl: '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
      value: encodeSoftwareUpgradeProposal({
        title: params.title,
        description: params.description,
        plan: params.plan,
      })
    },
    proposer: params.proposer,
    initialDeposit: params.initialDeposit.map(({amount, denom}) => ({amount: amount.toString(), denom})),
  } as MsgSubmitLegacyProposal, options))
    .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);


export const submitParameterChangeProposal = (
  client: BluzelleClient,
  authority: string,
  proposalParams: {
    title: string,
    description: string,
    initialDeposit: {amount: number, denom: 'ubnt'}[]
    proposer: string,
  },
  params: Params,
  options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
  Promise.resolve(sendTx(client, '/cosmos.gov.v1.MsgSubmitProposal', {
    messages: [{
      typeUrl: '/cosmos.staking.v1beta1.MsgUpdateParams',
      value: MsgUpdateParams.encode({
        authority: authority,
        params: params
      }).finish()
    }],
    title: proposalParams.title,
    proposer: proposalParams.proposer,
    summary: "test summary",
    initialDeposit: proposalParams.initialDeposit.map(({amount, denom}) => ({amount: amount.toString(), denom})),
    metadata: "test",
  } as MsgSubmitProposal, options))
    .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);


export const submitCommunityPoolSpendProposal = (
  client: BluzelleClient,
  params: {
    title: string,
    description: string,
    recipient: string;
    amount: {amount: number, denom: 'ubnt' | 'ug4' | 'uelt'}[];
    initialDeposit: {amount: number, denom: 'ubnt'}[]
    proposer: string,
    authority: string
  },
  options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
  Promise.resolve(sendTx(client, '/cosmos.gov.v1.MsgSubmitProposal', {
    messages:[{
      "typeUrl": '/cosmos.distribution.v1beta1.MsgCommunityPoolSpend',
      value: MsgCommunityPoolSpend.encode({
        authority: params.authority,
        recipient: params.recipient,
        amount: params.amount.map(({amount, denom}) => ({amount: amount.toString(), denom}))
      }).finish()
    }],
    title: params.title,
    proposer: params.proposer,
    summary: "test summary",
    initialDeposit: params.initialDeposit.map(({amount, denom}) => ({amount: amount.toString(), denom})),
    metadata: "test",
  } as MsgSubmitProposal, options))
    .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);


export const vote = (
  client: BluzelleClient,
  params: {
    proposalId: string,
    voter: string,
    option: VoteOption
  },
  options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
  Promise.resolve(sendTx(client, '/cosmos.gov.v1.MsgVote', {
    proposalId: parseStringToLong(params.proposalId),
    voter: params.voter,
    option: params.option,
  } as MsgVote, options))
    .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);


export const voteWithWeights = (
  client: BluzelleClient,
  params: {
    proposalId: string,
    voter: string,
    options: BluzelleWeightedVoteOption[]
  },
  options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
  Promise.resolve(sendTx(client, '/cosmos.gov.v1.MsgVoteWeighted', {
    proposalId: parseStringToLong(params.proposalId),
    voter: params.voter,
    options: params.options.map(parseBluzelleWeightedVoteOption),
  } as MsgVoteWeighted, options))
    .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);

const parseBluzelleWeightedVoteOption = (vote: BluzelleWeightedVoteOption) => ({
  ...vote,
  weight: scaleTo18(vote.weight)
});


export const depositToProposal = (
  client: BluzelleClient,
  params: {
    proposalId: string;
    depositor: string;
    amount: {amount: number, denom: 'ubnt'}[];
  },
  options: BroadcastOptions
) =>
  Promise.resolve(sendTx(client, '/cosmos.gov.v1.MsgDeposit', {
    proposalId: parseStringToLong(params.proposalId),
    depositor: params.depositor,
    amount: params.amount.map(({amount, denom}) => ({amount: amount.toString(), denom})),
  } as MsgDeposit, options))
    .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);
