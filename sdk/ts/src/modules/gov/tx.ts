import {BluzelleClient, BluzelleTxResponse, BroadcastOptions, sendTx} from '../../core';
import {
    MsgDeposit,
    MsgExecLegacyContent,
    MsgSubmitProposal,
    MsgUpdateParams as GovMsgUpdateParams,
    MsgVote,
    MsgVoteWeighted
} from '../../curium/lib/generated/cosmos/gov/v1/tx';
import {MsgSubmitProposal as MsgSubmitLegacyProposal} from '../../curium/lib/generated/cosmos/gov/v1beta1/tx';
import {VoteOption} from '../../curium/lib/generated/cosmos/gov/v1/gov';
import {TextProposal} from 'cosmjs-types/cosmos/gov/v1beta1/gov';
import {SoftwareUpgradeProposal} from "cosmjs-types/cosmos/upgrade/v1beta1/upgrade";
import {encodeSoftwareUpgradeProposal} from '../upgrade';
import {parseStringToLong} from '../../shared/parse';
import {
    MsgCommunityPoolSpend,
    MsgUpdateParams as DistributionMsgUpdateParams
} from '../../curium/lib/generated/cosmos/distribution/v1beta1/tx';
import {MsgUpdateParams as StakingMsgUpdateParams} from '../../curium/lib/generated/cosmos/staking/v1beta1/tx';
import {MsgUpdateParams as BankMsgUpdateParams} from '../../curium/lib/generated/cosmos/bank/v1beta1/tx';
import {MsgUpdateParams as CrisisMsgUpdateParams} from '../../curium/lib/generated/cosmos/crisis/v1beta1/tx';
import {MsgUpdateParams as SlashingMsgUpdateParams} from '../../curium/lib/generated/cosmos/slashing/v1beta1/tx';
import {MsgUpdateParams as AuthMsgUpdateParams} from '../../curium/lib/generated/cosmos/auth/v1beta1/tx';
import {Any} from '../../curium/lib/generated/google/protobuf/any';
import * as fs from 'fs';
import * as path from 'path';
import {Plan} from '../../curium/lib/generated/cosmos/upgrade/v1beta1/upgrade';
import {parseNumToLong} from '../../shared/parse';

import {getModuleAccountByName} from "../auth";
import {Coin} from "../../curium/lib/generated/cosmos/base/v1beta1/coin";
import {
    MsgSoftwareUpgrade
} from '../../curium/lib/generated/cosmos/upgrade/v1beta1/tx';


export type BluzelleWeightedVoteOption = {
  option: VoteOption;
  weight: number;
}

export const submitTextProposalLegacy = (
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

export const submitTextProposal = (
  client: BluzelleClient,
  params: {
    title: string,
    description: string,
    initialDeposit: {amount: number, denom: 'ubnt'}[]
    proposer: string,
    authority: string,
    summary?: string,
    metadata?: string,
  },
  options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
  Promise.resolve(sendTx(client, '/cosmos.gov.v1.MsgSubmitProposal', {
    messages: [{
      typeUrl: '/cosmos.gov.v1.MsgExecLegacyContent',
      value: MsgExecLegacyContent.encode({
        content: {
          typeUrl: '/cosmos.gov.v1beta1.TextProposal',
          value: TextProposal.encode({
            title: params.title,
            description: params.description,
          }).finish()
        },
        authority: params.authority,
      }).finish()
    } as Any],
    proposer: params.proposer,
    initialDeposit: params.initialDeposit.map(({amount, denom}) => ({amount: amount.toString(), denom})),
    title: params.title,
    summary: params.summary || '',
    metadata: params.metadata || '',
  } as MsgSubmitProposal, options))
    .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);


export const submitSoftwareUpgradeProposalLegacy = (
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




export const submitSoftwareUpgradeProposal = (
    client: BluzelleClient,
    params: {
        title: string,
        description: string,
        initialDeposit: {amount: number, denom: 'ubnt'}[]
        proposer: string,
        summary?: string,
        metadata?: string,
        plan: {
            name: string,
            height: number,
            info: string,
        },
    },
    options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
    getModuleAccountByName(client, "gov")
        .then(moduleAccount => sendTx(client, '/cosmos.gov.v1.MsgSubmitProposal', {
        messages: [{
            typeUrl: '/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade',
            value: MsgSoftwareUpgrade.encode({
                authority: moduleAccount?.baseAccount?.address as string,
                plan:{
                    name: params.plan.name,
                    info: params.plan.info,
                    height: parseNumToLong(params.plan.height)
                }
            }).finish()
        } as Any],
        proposer: params.proposer,
        initialDeposit: params.initialDeposit.map(({amount, denom}) => ({amount: amount.toString(), denom})),
        title: params.title,
        summary: params.summary || '',
        metadata: params.metadata || '',
    } as MsgSubmitProposal, options))
        .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);

export const submitParameterChangeProposal = (
  client: BluzelleClient,
  proposalParams: {
    title: string,
    description: string,
    initialDeposit: {amount: number, denom: 'ubnt'}[]
    proposer: string,
  },
  params: any,
  module: string,
  summary: string,
  metadata: string,
  options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
  Promise.resolve(sendTx(client, '/cosmos.gov.v1.MsgSubmitProposal', {
    messages: getMessages(module, params),
    title: proposalParams.title,
    proposer: proposalParams.proposer,
    summary: summary,
    initialDeposit: proposalParams.initialDeposit.map(({amount, denom}) => ({amount: amount.toString(), denom})),
    metadata: metadata,
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
  weight: vote.weight.toString()
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

const moduleNamesToParamsMapping = {
  "staking" : StakingMsgUpdateParams,
  "gov" : GovMsgUpdateParams,
  "distribution" : DistributionMsgUpdateParams,
  "slashing" : SlashingMsgUpdateParams,
  "auth" : AuthMsgUpdateParams ,
  "crisis" : CrisisMsgUpdateParams,
  "bank" : BankMsgUpdateParams,
} 

const getMessages = (module: string, updateParams: any): Any[] => {
  let msgValue;
  switch (module) {
    case "staking":
      msgValue = StakingMsgUpdateParams.encode(updateParams).finish()
      break;
    case "gov":
      msgValue = GovMsgUpdateParams.encode(updateParams).finish()
      break;
    case "distribution":
      msgValue = DistributionMsgUpdateParams.encode(updateParams).finish()
      break;
    case "slashing":
      msgValue = SlashingMsgUpdateParams.encode(updateParams).finish()
      break;
    case "auth":
      msgValue = AuthMsgUpdateParams.encode(updateParams).finish()
      break;
    case "crisis":
      msgValue = CrisisMsgUpdateParams.encode(updateParams).finish()
      break;
    case "bank":
      msgValue = BankMsgUpdateParams.encode(updateParams).finish()
      break;
    default:
      msgValue = StakingMsgUpdateParams.encode(updateParams).finish()
      break;
  }
  return [{
    typeUrl: `/cosmos.${module}.v1beta1.MsgUpdateParams`,
    value: msgValue
  } as Any];
}
