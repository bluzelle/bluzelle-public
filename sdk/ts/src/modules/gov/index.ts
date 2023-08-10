export {
  submitTextProposal,
  submitSoftwareUpgradeProposal,
  submitCommunityPoolSpendProposal,
  submitParameterChangeProposal,
  vote,
  depositToProposal
} from  './tx';


export {
  getVotingParams,
  getDepositParams,
  getTallyParams,
  getProposal,
  getDeposit,
} from './query';

export {
  VoteOption
} from '../../curium/lib/generated/cosmos/gov/v1beta1/gov';
