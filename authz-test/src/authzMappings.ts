import {MsgSend} from "./curium/lib/generated/cosmos/bank/v1beta1/tx";
import {MsgPin} from "./curium/lib/generated/storage/tx";
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate
} from "./curium/lib/generated/cosmos/staking/v1beta1/tx";
import {MsgVerifyInvariant} from "./curium/lib/generated/cosmos/crisis/v1beta1/tx";
import {
  MsgFundCommunityPool,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission
} from "./curium/lib/generated/cosmos/distribution/v1beta1/tx";
import {MsgSubmitEvidence} from "./curium/lib/generated/cosmos/evidence/v1beta1/tx";
import {MsgGrantAllowance, MsgRevokeAllowance} from "./curium/lib/generated/cosmos/feegrant/v1beta1/tx";
import {MsgDeposit, MsgSubmitProposal, MsgVote, MsgVoteWeighted} from "./curium/lib/generated/cosmos/gov/v1beta1/tx";
import {MsgUnjail} from "./curium/lib/generated/cosmos/slashing/v1beta1/tx";
import {
  MsgCreateCollection,
  MsgCreateNFT,
  MsgPrintEdition,
  MsgSignMetadata,
  MsgTransferNFT,
  MsgUpdateCollectionAuthority,
  MsgUpdateMetadata,
  MsgUpdateMetadataAuthority,
  MsgUpdateMintAuthority
} from "./curium/lib/generated/nft/tx";
import {GenericAuthorization} from "./curium/lib/generated/cosmos/authz/v1beta1/authz";
import {SendAuthorization} from "./curium/lib/generated/cosmos/bank/v1beta1/authz";
import {StakeAuthorization} from "./curium/lib/generated/cosmos/staking/v1beta1/authz";
import {Coin} from "./curium/lib/generated/cosmos/base/v1beta1/coin";

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

export type MsgTypeToTypeUrlMap = {
  [K in MsgType]: string;
};

export const msgMapping: MsgTypeToTypeUrlMap = {
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
};


export type MsgTypeToMsgMap = {
  [MsgType.SEND]: MsgSend,
  [MsgType.CREATE_VALIDATOR]: MsgCreateValidator,
  [MsgType.EDIT_VALIDATOR]: MsgEditValidator,
  [MsgType.DELEGATE]: MsgDelegate,
  [MsgType.REDELEGATE]: MsgBeginRedelegate,
  [MsgType.UNDELEGATE]: MsgUndelegate,

  [MsgType.VERIFY_INVARIANT]: MsgVerifyInvariant,
  [MsgType.SET_WITHDRAW_ADDRESS]: MsgSetWithdrawAddress,
  [MsgType.WITHDRAW_DELEGATOR_REWARD]: MsgWithdrawDelegatorReward,
  [MsgType.WITHDRAW_VALIDATOR_COMMISSION]: MsgWithdrawValidatorCommission,
  [MsgType.FUND_COMMUNITIY_POOL]: MsgFundCommunityPool,
  [MsgType.SUBMIT_EVIDENCE]: MsgSubmitEvidence,
  [MsgType.GRANT_ALLOWANCE]: MsgGrantAllowance,
  [MsgType.REVOKE_ALLOWANCE]: MsgRevokeAllowance,
  [MsgType.SUBMIT_PROPOSAL]: MsgSubmitProposal,
  [MsgType.DEPOSIT]: MsgDeposit,
  [MsgType.VOTE]: MsgVote,
  [MsgType.VOTE_WEIGHTED]: MsgVoteWeighted,
  [MsgType.UNJAIL]: MsgUnjail,
  // custom module msgs
  [MsgType.CREATE_NFT]: MsgCreateNFT,
  [MsgType.PRINT_EDITION]: MsgPrintEdition,
  [MsgType.TRANSFER_NFT]: MsgTransferNFT,
  [MsgType.SIGN_METADATA]: MsgSignMetadata,
  [MsgType.UPDATE_METADATA]: MsgUpdateMetadata,
  [MsgType.UPDATE_METADATA_AUTHORITY]: MsgUpdateMetadataAuthority,
  [MsgType.UPDATE_MINT_AUTHORITIY]: MsgUpdateMintAuthority,
  [MsgType.CREATE_COLLECTION]: MsgCreateCollection,
  [MsgType.UPDATE_COLLECTION_AUTHORITY]: MsgUpdateCollectionAuthority,
  [MsgType.PIN]: MsgPin
};

type MsgTypeToEncodeFnMap = {
  [K in MsgType]: (msg: MsgTypeToMsgMap[K]) => Uint8Array;
};

export const msgTypeToEncodeFnMap: MsgTypeToEncodeFnMap = {
  [MsgType.SEND]: (msg: MsgSend) => MsgSend.encode(msg).finish(),
  [MsgType.CREATE_VALIDATOR]: (msg: MsgCreateValidator) => MsgCreateValidator.encode(msg).finish(),
  [MsgType.EDIT_VALIDATOR]: (msg: MsgEditValidator) => MsgEditValidator.encode(msg).finish(),
  [MsgType.DELEGATE]: (msg: MsgDelegate) => MsgDelegate.encode(msg).finish(),
  [MsgType.REDELEGATE]: (msg: MsgBeginRedelegate) => MsgBeginRedelegate.encode(msg).finish(),
  [MsgType.UNDELEGATE]: (msg: MsgUndelegate) => MsgUndelegate.encode(msg).finish(),

  [MsgType.VERIFY_INVARIANT]: (msg: MsgVerifyInvariant) => MsgVerifyInvariant.encode(msg).finish(),
  [MsgType.SET_WITHDRAW_ADDRESS]: (msg: MsgSetWithdrawAddress) => MsgSetWithdrawAddress.encode(msg).finish(),
  [MsgType.WITHDRAW_DELEGATOR_REWARD]: (msg: MsgWithdrawDelegatorReward) => MsgWithdrawDelegatorReward.encode(msg).finish(),
  [MsgType.WITHDRAW_VALIDATOR_COMMISSION]: (msg: MsgWithdrawValidatorCommission) => MsgWithdrawValidatorCommission.encode(msg).finish(),
  [MsgType.FUND_COMMUNITIY_POOL]: (msg: MsgFundCommunityPool) => MsgFundCommunityPool.encode(msg).finish(),
  [MsgType.SUBMIT_EVIDENCE]: (msg: MsgSubmitEvidence) => MsgSubmitEvidence.encode(msg).finish(),
  [MsgType.GRANT_ALLOWANCE]: (msg: MsgGrantAllowance) => MsgGrantAllowance.encode(msg).finish(),
  [MsgType.REVOKE_ALLOWANCE]: (msg: MsgRevokeAllowance) => MsgRevokeAllowance.encode(msg).finish(),
  [MsgType.SUBMIT_PROPOSAL]: (msg: MsgSubmitProposal) => MsgSubmitProposal.encode(msg).finish(),
  [MsgType.DEPOSIT]: (msg: MsgDeposit) => MsgDeposit.encode(msg).finish(),
  [MsgType.VOTE]: (msg: MsgVote) => MsgVote.encode(msg).finish(),
  [MsgType.VOTE_WEIGHTED]: (msg: MsgVoteWeighted) => MsgVoteWeighted.encode(msg).finish(),
  [MsgType.UNJAIL]: (msg: MsgUnjail) => MsgUnjail.encode(msg).finish(),
  // custom module msgs
  [MsgType.CREATE_NFT]: (msg: MsgCreateNFT) => MsgCreateNFT.encode(msg).finish(),
  [MsgType.PRINT_EDITION]: (msg: MsgPrintEdition) => MsgPrintEdition.encode(msg).finish(),
  [MsgType.TRANSFER_NFT]: (msg: MsgTransferNFT) => MsgTransferNFT.encode(msg).finish(),
  [MsgType.SIGN_METADATA]: (msg: MsgSignMetadata) => MsgSignMetadata.encode(msg).finish(),
  [MsgType.UPDATE_METADATA]: (msg: MsgUpdateMetadata) => MsgUpdateMetadata.encode(msg).finish(),
  [MsgType.UPDATE_METADATA_AUTHORITY]: (msg: MsgUpdateMetadataAuthority) => MsgUpdateMetadataAuthority.encode(msg).finish(),
  [MsgType.UPDATE_MINT_AUTHORITIY]: (msg: MsgUpdateMintAuthority) => MsgUpdateMintAuthority.encode(msg).finish(),
  [MsgType.CREATE_COLLECTION]: (msg: MsgCreateCollection) => MsgCreateCollection.encode(msg).finish(),
  [MsgType.UPDATE_COLLECTION_AUTHORITY]: (msg: MsgUpdateCollectionAuthority) => MsgUpdateCollectionAuthority.encode(msg).finish(),
  [MsgType.PIN]: (msg: MsgPin) => MsgPin.encode(msg).finish()
};

export type ExecuteAuthzMsg = {
  [T in MsgType]: {
    msgType: T;
    params: MsgTypeToMsgMap[T];
  };
}[MsgType];

export const enum GrantType {
  GENERIC,
  SEND,
  STAKE,
}

export type GrantTypeToGrantUrlMap = {
  [T in GrantType]: string;
}

export const grantMapping: GrantTypeToGrantUrlMap = {
  [GrantType.GENERIC]: "/cosmos.authz.v1beta1.GenericAuthorization",
  [GrantType.SEND]: "/cosmos.bank.v1beta1.SendAuthorization",
  [GrantType.STAKE]: "/cosmos.staking.v1beta1.StakeAuthorization"
}

type BaseGrantParam = {
  [T in GrantType]: {
    grantType: T,
    expiration: Date,
  }
}

type GenericGrantParam = BaseGrantParam[GrantType.GENERIC] & { msgType: MsgType }
type SendGrantParam = BaseGrantParam[GrantType.SEND] & { spendLimit: Coin[] }
type StakeGrantParam = BaseGrantParam[GrantType.STAKE] & { stakeAuthorization: StakeAuthorization }

export type GrantParam = GenericGrantParam | SendGrantParam | StakeGrantParam

type GrantTypeToGrantParamMap = {
  [GrantType.GENERIC]: GenericGrantParam,
  [GrantType.SEND]: SendGrantParam,
  [GrantType.STAKE]: StakeGrantParam
}

export type GrantTypeToEncodeFnMap = {
  [T in GrantType]: (grant: GrantTypeToGrantParamMap[T]) => Uint8Array;
}

export const grantTypeToEncodeFnMap: GrantTypeToEncodeFnMap = {
  [GrantType.GENERIC]: (params: GenericGrantParam) => GenericAuthorization.encode({msg: msgMapping[params.msgType]}).finish(),
  [GrantType.SEND]: (params: SendGrantParam) => SendAuthorization.encode({spendLimit: params.spendLimit}).finish(),
  [GrantType.STAKE]: (params: StakeGrantParam) => StakeAuthorization.encode(params.stakeAuthorization).finish(),
}

export type EncodeFn<T extends GrantParam> = (grantParam: T) => Uint8Array;