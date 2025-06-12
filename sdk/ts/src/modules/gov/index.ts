export {
  submitTextProposal,
  submitSoftwareUpgradeProposal,
  submitCommunityPoolSpendProposal,
  submitParameterChangeProposal,
  vote,
  voteWithWeights,
  depositToProposal
} from  './tx';


export {
  getVotingParams,
  getDepositParams,
  getTallyParams,
  getProposal,
  getProposals,
  getDeposit,
} from './query';

export {
  VoteOption
} from '../../curium/lib/generated/cosmos/gov/v1/gov';
