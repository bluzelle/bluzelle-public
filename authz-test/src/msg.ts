export const enum MsgType {
  // crisis module msgs
  VERIFY_INVARIENT = 0,
  // distribution module msgs
  SET_WITHDRAW_ADDRESS = 1,
  WITHDRAW_DELEGATOR_REWARD = 2,
  WITHDRAW_VALIDATOR_COMMISSION = 3,
  FUND_COMMUNITIY_POOL = 4,
  // evidence moduel msgs
  SUBMIT_EVIDENCE = 5,
  // feegrant module msgs
  GRANT_ALLOWANCE = 6,
  REVOKE_ALLOWANCE = 7,
  // gov module msgs
  SUBMIT_PROPOSAL = 8,
  DEPOSIT = 9,
  VOTE = 10,
  VOTE_WEIGHTED = 11,
  // slashing msgs
  UNJAIL = 12,
  // faucet msgs
  FAUCET_MINT = 13,
  // nft module msgs
  CREATE_NFT = 14,
  PRINT_EDITION = 15,
  TRANSFER_NFT = 16,
  SIGN_METADATA = 17,
  UPDATE_METADATA = 18,
  UPDATE_METADATA_AUTHORITY = 19,
  UPDATE_MINT_AUTHORITIY = 20,
  CREATE_COLLECTION = 21,
  UPDATE_COLLECTION_AUTHORITY = 22,
  // storage msgs
  PIN = 23,
  // tax module msgs
  SET_GAS_TAX_BP = 24,
  SET_TRANSFER_TAX_BP = 25,
  SET_TAX_COLLECTOR = 26,
  //bank module msgs
  SEND = 27,
  // staking module msgs
  CREATE_VALIDATOR = 28,
  EDIT_VALIDATOR = 29,
  DELEGATE = 30,
  REDELEGATE = 31,
  UNDELEGATE = 32,
}

export const MsgMapping = {
  [MsgType.SEND]: "/cosmos.bank.v1beta1.MsgSend",
  [MsgType.CREATE_VALIDATOR]: "/cosmos.staking.v1beta1.MsgCreateValidator",
  [MsgType.EDIT_VALIDATOR]: "/cosmos.staking.v1beta1.MsgEditValidator",
  [MsgType.DELEGATE]: "/cosmos.staking.v1beta1.MsgDelegate",
  [MsgType.REDELEGATE]: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
  [MsgType.UNDELEGATE]: "/cosmos.staking.v1beta1.MsgUndelegate",

  [MsgType.VERIFY_INVARIENT]: "/cosmos.crisis.v1beta1.MsgVerifyInvarient",
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
  [MsgType.FAUCET_MINT]: "/bluzelle.curium.faucet.MsgMint",
  [MsgType.CREATE_NFT]: "/bluzelle.curium.nft.MsgCreateNFT",
  [MsgType.PRINT_EDITION]: "/bluzelle.curium.nft.MsgPrintEdition",
  [MsgType.TRANSFER_NFT]: "/bluzelle.curium.nft.MsgTransferNFT",
  [MsgType.SIGN_METADATA]: "/bluzelle.curium.nft.MsgSignMetadata",
  [MsgType.UPDATE_METADATA]: "/bluzelle.curium.nft.MsgUpdateMetaData",
  [MsgType.UPDATE_METADATA_AUTHORITY]: "/bluzelle.curium.nft.MsgUpdateMetadataAuthority",
  [MsgType.UPDATE_MINT_AUTHORITIY]: "/bluzelle.curium.nft.MsgUpdateMintAuthority",
  [MsgType.CREATE_COLLECTION]: "/bluzelle.curium.nft.MsgCreateCollection",
  [MsgType.UPDATE_COLLECTION_AUTHORITY]: "/bluzelle.curium.nft.MsgUpdateCollectionAuthoritiy",
  [MsgType.PIN]: "/bluzelle.curium.storage.MsgPin",
  [MsgType.SET_GAS_TAX_BP]: "/bluzelle.curium.tax.MsgSetGasTaxBp",
  [MsgType.SET_TRANSFER_TAX_BP]: "/bluzelle.curium.tax.MsgSetTransferTaxBp",
  [MsgType.SET_TAX_COLLECTOR]: "/bluzelle.curium.tax.MsgSetTaxCollector",
}

