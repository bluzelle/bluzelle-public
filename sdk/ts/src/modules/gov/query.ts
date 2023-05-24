import { BluzelleClient } from '../../core';
import {
  QueryDepositRequest,
  QueryDepositResponse,
  QueryParamsRequest,
  QueryParamsResponse,
  QueryProposalRequest,
  QueryProposalResponse,
} from '../../curium/lib/generated/cosmos/gov/v1beta1/query';
import { BluzelleCoin } from '../../shared/types';
import { Any } from '../../curium/lib/generated/google/protobuf/any';
import {
  ProposalStatus,
  TallyResult,
} from '../../curium/lib/generated/cosmos/gov/v1beta1/gov';
import { Decimal } from '@cosmjs/math';
import { Some } from 'monet';

const Long = require('long');

type BluzelleVotingParams = {
  votingPeriod: {
    seconds: string,
    nanos: number
  }
};

type BluzelleDepositParams = {
  minDeposit: BluzelleCoin[],
  maxDepositPeriod: {
    seconds: string,
    nanos: number
  }
};

type BluzelleTallyParams = {
  quorum: number,
  threshold: number,
  vetoThreshold: number,
};

type BluzelleProposal = {
  proposalId: string;
  content: Any;
  status: ProposalStatus;
  statusLabel: string;
  finalTallyResult?: TallyResult;
  submitTime?: Date;
  depositEndTime?: Date;
  totalDeposit: BluzelleCoin[];
  votingStartTime?: Date;
  votingEndTime?: Date;
}

type BluzelleDeposit = {
  proposalId: string,
  depositor: string,
  amount: BluzelleCoin[]
}

export const getVotingParams = (
  client: BluzelleClient,
): Promise<BluzelleVotingParams> =>
  client.queryClient.gov.Params({
    paramsType: 'voting',
  } as QueryParamsRequest)
    .then(parseVotingParams);

export const getDepositParams = (
  client: BluzelleClient,
): Promise<BluzelleDepositParams> =>
  client.queryClient.gov.Params({
    paramsType: 'deposit',
  } as QueryParamsRequest)
    .then(parseDepositParams);

export const getTallyParams = (
  client: BluzelleClient,
): Promise<BluzelleTallyParams> =>
  client.queryClient.gov.Params({
    paramsType: 'tallying',
  } as QueryParamsRequest)
    .then(parseTallyParams);

export const getProposal = (
  client: BluzelleClient,
  proposalId: string,
): Promise<BluzelleProposal> =>
  client.queryClient.gov.Proposal({
    proposalId: new Long(proposalId),
  } as QueryProposalRequest)
    .then(parseProposal);

export const getDeposit = (
  client: BluzelleClient,
  params: {
    proposalId: string,
    depositor: string,
  }
): Promise<BluzelleDeposit> =>
  client.queryClient.gov.Deposit({
    proposalId: new Long(params.proposalId),
    depositor: params.depositor,
  } as QueryDepositRequest)
    .then(parseDeposit);

const parseProposal = (res: QueryProposalResponse): BluzelleProposal => ({
  proposalId: res.proposal?.proposalId ? res.proposal.proposalId.toString() : '',
  content: res.proposal?.content ? res.proposal.content : {} as Any,
  status: res.proposal?.status ? res.proposal.status : ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
  statusLabel: res.proposal?.status ? ProposalStatus[res.proposal.status] : 'PROPOSAL_STATUS_UNSPECIFIED',
  finalTallyResult: res.proposal?.finalTallyResult,
  submitTime: res.proposal?.submitTime,
  depositEndTime: res.proposal?.depositEndTime,
  totalDeposit: res.proposal?.totalDeposit ? res.proposal.totalDeposit.map(deposit => ({
    denom: 'ubnt',
    amount: Number(deposit.amount)
  })) : [],
  votingStartTime: res.proposal?.votingStartTime,
  votingEndTime: res.proposal?.votingEndTime,
});

const parseDeposit = (res: QueryDepositResponse): BluzelleDeposit => ({
  depositor: res.deposit?.depositor ? res.deposit.depositor : '',
  amount: res.deposit?.amount ? res.deposit.amount.map(amount => ({
    denom: 'ubnt',
    amount: Number(amount.amount)
  })) : [],
  proposalId: res.deposit?.proposalId ? res.deposit.proposalId.toString() : '',
});

const parseVotingParams = (res: QueryParamsResponse): BluzelleVotingParams => res.votingParams?.votingPeriod ? ({
  votingPeriod: {
    seconds: res.votingParams.votingPeriod.seconds.toString(),
    nanos: res.votingParams?.votingPeriod?.nanos,
  }
}) : {
  votingPeriod: {
    seconds: '0',
    nanos: 0,
  }
};

const parseDepositParams = (res: QueryParamsResponse): BluzelleDepositParams => ({
  minDeposit: res.depositParams ? res.depositParams.minDeposit.map(amount => ({
    denom: 'ubnt',
    amount: Number(amount.amount)
  })) : [],
  maxDepositPeriod: res.depositParams?.maxDepositPeriod ? {
    seconds: res.depositParams.maxDepositPeriod.seconds.toString(),
    nanos: res.depositParams.maxDepositPeriod.nanos
  } : {
    seconds: '0',
    nanos: 0
  }
});

const parseTallyParams = (res: QueryParamsResponse): BluzelleTallyParams =>
  res.tallyParams ? {
    quorum: parseUint8ArrayToNumber(res.tallyParams.quorum),
    threshold: parseUint8ArrayToNumber(res.tallyParams.threshold),
    vetoThreshold: parseUint8ArrayToNumber(res.tallyParams.vetoThreshold),
  } : {
    quorum: 0,
    threshold: 0,
    vetoThreshold: 0,
  };

const parseUint8ArrayToNumber = (val: Uint8Array) =>
  Some(val)
    .map(val => Buffer.from(val)
      .toString('hex'))
    .map(val => Decimal.fromAtomics(val, 18))
    .map(Number)
    .join();

