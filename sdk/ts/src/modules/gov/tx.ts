import { BluzelleClient, BluzelleTxResponse, BroadcastOptions, sendTx } from '../../core';
import {
  MsgSubmitProposal,
  MsgVote,
  MsgVoteWeighted,
  MsgDeposit
} from '../../curium/lib/generated/cosmos/gov/v1beta1/tx';
import { VoteOption, WeightedVoteOption } from '../../curium/lib/generated/cosmos/gov/v1beta1/gov';
import { TextProposal } from 'cosmjs-types/cosmos/gov/v1beta1/gov';
import { ParamChange, ParameterChangeProposal } from 'cosmjs-types/cosmos/params/v1beta1/params';
import { CommunityPoolSpendProposal } from 'cosmjs-types/cosmos/distribution/v1beta1/distribution';
import { encodeSoftwareUpgradeProposal } from '../upgrade';
import { parseStringToLong } from '../../shared/parse';


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
  } as MsgSubmitProposal, options))
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
  } as MsgSubmitProposal, options))
    .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);


export const submitParameterChangeProposal = (
  client: BluzelleClient,
  params: {
    title: string,
    description: string,
    changes: ParamChange[],
    initialDeposit: {amount: number, denom: 'ubnt'}[]
    proposer: string,
  },
  options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
  Promise.resolve(sendTx(client, '/cosmos.gov.v1beta1.MsgSubmitProposal', {
    content: {
      typeUrl: '/cosmos.params.v1beta1.ParameterChangeProposal',
      value: ParameterChangeProposal.encode({
        title: params.title,
        description: params.description,
        changes: params.changes,
      }).finish()
    },
    proposer: params.proposer,
    initialDeposit: params.initialDeposit.map(({amount, denom}) => ({amount: amount.toString(), denom})),
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
  },
  options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
  Promise.resolve(sendTx(client, '/cosmos.gov.v1beta1.MsgSubmitProposal', {
    content: {
      typeUrl: '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
      value: CommunityPoolSpendProposal.encode({
        title: params.title,
        description: params.description,
        recipient: params.recipient,
        amount: params.amount.map(({amount, denom}) => ({amount: amount.toString(), denom}))
      }).finish()
    },
    proposer: params.proposer,
    initialDeposit: params.initialDeposit.map(({amount, denom}) => ({amount: amount.toString(), denom})),
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
  Promise.resolve(sendTx(client, '/cosmos.gov.v1beta1.MsgVote', {
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
    options: WeightedVoteOption[]
  },
  options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
  Promise.resolve(sendTx(client, '/cosmos.gov.v1beta1.MsgVoteWeighted', {
    proposalId: parseStringToLong(params.proposalId),
    voter: params.voter,
    options: params.options,
  } as MsgVoteWeighted, options))
    .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);


export const depositToProposal = (
  client: BluzelleClient,
  params: {
    proposalId: string;
    depositor: string;
    amount: {amount: number, denom: 'ubnt'}[];
  },
  options: BroadcastOptions
) =>
  Promise.resolve(sendTx(client, '/cosmos.gov.v1beta1.MsgDeposit', {
    proposalId: parseStringToLong(params.proposalId),
    depositor: params.depositor,
    amount: params.amount.map(({amount, denom}) => ({amount: amount.toString(), denom})),
  } as MsgDeposit, options))
    .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);
