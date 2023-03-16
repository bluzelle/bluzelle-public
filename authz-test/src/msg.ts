export const enum MsgType {
  // crisis module msgs
  VERIFY_INVARIANT,
  // distribution module msgs
  SET_WITHDRAW_ADDRESS,
  WITHDRAW_DELEGATOR_REWARD,
  WITHDRAW_VALIDATOR_COMMISSION,
  FUND_COMMUNITIY_POOL,
  // evidence moduel msgs
  SUBMIT_EVIDENCE,
  // feegrant module msgs
  GRANT_ALLOWANCE,
  REVOKE_ALLOWANCE,
  // gov module msgs
  SUBMIT_PROPOSAL,
  DEPOSIT,
  VOTE,
  VOTE_WEIGHTED,
  // slashing msgs
  UNJAIL,
  // nft module msgs
  CREATE_NFT,
  PRINT_EDITION,
  TRANSFER_NFT,
  SIGN_METADATA,
  UPDATE_METADATA,
  UPDATE_METADATA_AUTHORITY,
  UPDATE_MINT_AUTHORITIY,
  CREATE_COLLECTION,
  UPDATE_COLLECTION_AUTHORITY,
  // storage msgs
  PIN,
  //bank module msgs
  SEND,
  // staking module msgs
  CREATE_VALIDATOR,
  EDIT_VALIDATOR,
  DELEGATE,
  REDELEGATE,
  UNDELEGATE,
}

export const MsgMapping = {
  [MsgType.SEND]: "/cosmos.bank.v1beta1.MsgSend",
  [MsgType.CREATE_VALIDATOR]: "/cosmos.staking.v1beta1.MsgCreateValidator",
  [MsgType.EDIT_VALIDATOR]: "/cosmos.staking.v1beta1.MsgEditValidator",
  [MsgType.DELEGATE]: "/cosmos.staking.v1beta1.MsgDelegate",
  [MsgType.REDELEGATE]: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
  [MsgType.UNDELEGATE]: "/cosmos.staking.v1beta1.MsgUndelegate",

  [MsgType.VERIFY_INVARIANT]: "/cosmos.crisis.v1beta1.MsgVerifyInvariant",
  [MsgType.SET_WITHDRAW_ADDRESS]: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress",
  [MsgType.WITHDRAW_DELEGATOR_REWARD]: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
  [MsgType.WITHDRAW_VALIDATOR_COMMISSION]: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
  [MsgType.FUND_COMMUNITIY_POOL]: "/cosmos.distribution.v1beta1.MsgFundCommunityPool",
  [MsgType.SUBMIT_EVIDENCE]: "/cosmos.evidence.v1beta1.MsgSubmitEvidence",
  [MsgType.GRANT_ALLOWANCE]: "/cosmos.feegrant.v1beta1.MsgGrantAllowance",
  [MsgType.REVOKE_ALLOWANCE]: "/cosmos.feegrant.v1beta1.MsgRevokeAllowance",
  [MsgType.SUBMIT_PROPOSAL]: "/cosmos.gov.v1beta1.MsgSubmitProposal",
  [MsgType.DEPOSIT]: "/cosmos.gov.v1beta1.MsgDeposit",
  [MsgType.VOTE]: "/cosmos.gov.v1beta1.MsgVote",
  [MsgType.VOTE_WEIGHTED]: "/cosmos.gov.v1beta1.MsgVoteWeighted",
  [MsgType.UNJAIL]: "/cosmos.slashing.v1beta1.MsgUnjail",
  // custom module msgs
  [MsgType.CREATE_NFT]: "/bluzelle.curium.nft.MsgCreateNFT",
  [MsgType.PRINT_EDITION]: "/bluzelle.curium.nft.MsgPrintEdition",
  [MsgType.TRANSFER_NFT]: "/bluzelle.curium.nft.MsgTransferNFT",
  [MsgType.SIGN_METADATA]: "/bluzelle.curium.nft.MsgSignMetadata",
  [MsgType.UPDATE_METADATA]: "/bluzelle.curium.nft.MsgUpdateMetadata",
  [MsgType.UPDATE_METADATA_AUTHORITY]: "/bluzelle.curium.nft.MsgUpdateMetadataAuthority",
  [MsgType.UPDATE_MINT_AUTHORITIY]: "/bluzelle.curium.nft.MsgUpdateMintAuthority",
  [MsgType.CREATE_COLLECTION]: "/bluzelle.curium.nft.MsgCreateCollection",
  [MsgType.UPDATE_COLLECTION_AUTHORITY]: "/bluzelle.curium.nft.MsgUpdateCollectionAuthority",
  [MsgType.PIN]: "/bluzelle.curium.storage.MsgPin",
}

