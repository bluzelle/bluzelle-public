import { BluzelleClient } from '../../core';
import {
  QueryDepositRequest,
  QueryDepositResponse,
  QueryParamsRequest,
  QueryParamsResponse,
  QueryProposalRequest,
  QueryProposalResponse,
  QueryProposalsRequest,
  QueryProposalsResponse
} from '../../curium/lib/generated/cosmos/gov/v1beta1/query';
import { BluzelleCoin } from '../../shared/types';
import { Any } from '../../curium/lib/generated/google/protobuf/any';
import {
  Proposal,
  ProposalStatus,
  TallyResult,
} from '../../curium/lib/generated/cosmos/gov/v1beta1/gov';
import { Decimal } from '@cosmjs/math';
import { Some } from 'monet';
import {
  PageRequest,
  PageResponse
} from '../../curium/lib/generated/cosmos/base/query/v1beta1/pagination';
import {
  BluzellePageRequest,
  defaultPaginationOptions,
  defaultPaginationResponse
} from '../../shared/pagination';
import { parseNumToLong, parseStringToLong } from '../../shared/parse';


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

type BluzelleProposals = {
  proposals: BluzelleProposal[],
  pagination: PageResponse,
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
    proposalId: parseStringToLong(proposalId),
  } as QueryProposalRequest)
    .then((res: QueryProposalResponse) => parseProposal(res.proposal));


export const getProposals = (
  client: BluzelleClient,
  params: {
    proposalStatus: ProposalStatus;
    voter: string;
    depositor: string;
  },
  pagination: BluzellePageRequest = defaultPaginationOptions()
): Promise<BluzelleProposals> =>
  client.queryClient.gov.Proposals({
    proposalStatus: params.proposalStatus,
    voter: params.voter,
    depositor: params.depositor,
    pagination: {
      key: pagination.key,
      offset: parseNumToLong(pagination.offset),
      limit: parseNumToLong(pagination.limit),
      countTotal: pagination.countTotal,
      reverse: pagination.reverse
    } as PageRequest
  } as QueryProposalsRequest)
    .then(parseProposals);

export const getDeposit = (
  client: BluzelleClient,
  params: {
    proposalId: string,
    depositor: string,
  }
): Promise<BluzelleDeposit> =>
  client.queryClient.gov.Deposit({
    proposalId: parseStringToLong(params.proposalId),
    depositor: params.depositor,
  } as QueryDepositRequest)
    .then(parseDeposit);

const parseProposal = (proposal?: Proposal): BluzelleProposal => ({
  proposalId: proposal?.proposalId ? proposal.proposalId.toString() : '',
  content: proposal?.content ? proposal.content : {} as Any,
  status: proposal?.status ? proposal.status : ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
  statusLabel: proposal?.status ? ProposalStatus[proposal.status] : 'PROPOSAL_STATUS_UNSPECIFIED',
  finalTallyResult: proposal?.finalTallyResult,
  submitTime: proposal?.submitTime,
  depositEndTime: proposal?.depositEndTime,
  totalDeposit: proposal?.totalDeposit ? proposal.totalDeposit.map(deposit => ({
    denom: 'ubnt',
    amount: Number(deposit.amount)
  })) : [],
  votingStartTime: proposal?.votingStartTime,
  votingEndTime: proposal?.votingEndTime,
});

const parseProposals = (res: QueryProposalsResponse): BluzelleProposals => ({
  proposals: res.proposals.map(proposal => parseProposal(proposal)),
  pagination: res.pagination ? res.pagination : defaultPaginationResponse(),
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
