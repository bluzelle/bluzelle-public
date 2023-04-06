"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grantTypeToEncodeFnMap = exports.grantMapping = exports.msgTypeToEncodeFnMap = exports.msgMapping = void 0;
const tx_1 = require("./curium/lib/generated/cosmos/bank/v1beta1/tx");
const tx_2 = require("./curium/lib/generated/storage/tx");
const tx_3 = require("./curium/lib/generated/cosmos/staking/v1beta1/tx");
const tx_4 = require("./curium/lib/generated/cosmos/crisis/v1beta1/tx");
const tx_5 = require("./curium/lib/generated/cosmos/distribution/v1beta1/tx");
const tx_6 = require("./curium/lib/generated/cosmos/evidence/v1beta1/tx");
const tx_7 = require("./curium/lib/generated/cosmos/feegrant/v1beta1/tx");
const tx_8 = require("./curium/lib/generated/cosmos/gov/v1beta1/tx");
const tx_9 = require("./curium/lib/generated/cosmos/slashing/v1beta1/tx");
const tx_10 = require("./curium/lib/generated/nft/tx");
const authz_1 = require("./curium/lib/generated/cosmos/authz/v1beta1/authz");
const authz_2 = require("./curium/lib/generated/cosmos/bank/v1beta1/authz");
const authz_3 = require("./curium/lib/generated/cosmos/staking/v1beta1/authz");
exports.msgMapping = {
    [23 /* MsgType.SEND */]: "/cosmos.bank.v1beta1.MsgSend",
    [24 /* MsgType.CREATE_VALIDATOR */]: "/cosmos.staking.v1beta1.MsgCreateValidator",
    [25 /* MsgType.EDIT_VALIDATOR */]: "/cosmos.staking.v1beta1.MsgEditValidator",
    [26 /* MsgType.DELEGATE */]: "/cosmos.staking.v1beta1.MsgDelegate",
    [27 /* MsgType.REDELEGATE */]: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
    [28 /* MsgType.UNDELEGATE */]: "/cosmos.staking.v1beta1.MsgUndelegate",
    [0 /* MsgType.VERIFY_INVARIANT */]: "/cosmos.crisis.v1beta1.MsgVerifyInvariant",
    [1 /* MsgType.SET_WITHDRAW_ADDRESS */]: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress",
    [2 /* MsgType.WITHDRAW_DELEGATOR_REWARD */]: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
    [3 /* MsgType.WITHDRAW_VALIDATOR_COMMISSION */]: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
    [4 /* MsgType.FUND_COMMUNITIY_POOL */]: "/cosmos.distribution.v1beta1.MsgFundCommunityPool",
    [5 /* MsgType.SUBMIT_EVIDENCE */]: "/cosmos.evidence.v1beta1.MsgSubmitEvidence",
    [6 /* MsgType.GRANT_ALLOWANCE */]: "/cosmos.feegrant.v1beta1.MsgGrantAllowance",
    [7 /* MsgType.REVOKE_ALLOWANCE */]: "/cosmos.feegrant.v1beta1.MsgRevokeAllowance",
    [8 /* MsgType.SUBMIT_PROPOSAL */]: "/cosmos.gov.v1beta1.MsgSubmitProposal",
    [9 /* MsgType.DEPOSIT */]: "/cosmos.gov.v1beta1.MsgDeposit",
    [10 /* MsgType.VOTE */]: "/cosmos.gov.v1beta1.MsgVote",
    [11 /* MsgType.VOTE_WEIGHTED */]: "/cosmos.gov.v1beta1.MsgVoteWeighted",
    [12 /* MsgType.UNJAIL */]: "/cosmos.slashing.v1beta1.MsgUnjail",
    // custom module msgs
    [13 /* MsgType.CREATE_NFT */]: "/bluzelle.curium.nft.MsgCreateNFT",
    [14 /* MsgType.PRINT_EDITION */]: "/bluzelle.curium.nft.MsgPrintEdition",
    [15 /* MsgType.TRANSFER_NFT */]: "/bluzelle.curium.nft.MsgTransferNFT",
    [16 /* MsgType.SIGN_METADATA */]: "/bluzelle.curium.nft.MsgSignMetadata",
    [17 /* MsgType.UPDATE_METADATA */]: "/bluzelle.curium.nft.MsgUpdateMetadata",
    [18 /* MsgType.UPDATE_METADATA_AUTHORITY */]: "/bluzelle.curium.nft.MsgUpdateMetadataAuthority",
    [19 /* MsgType.UPDATE_MINT_AUTHORITIY */]: "/bluzelle.curium.nft.MsgUpdateMintAuthority",
    [20 /* MsgType.CREATE_COLLECTION */]: "/bluzelle.curium.nft.MsgCreateCollection",
    [21 /* MsgType.UPDATE_COLLECTION_AUTHORITY */]: "/bluzelle.curium.nft.MsgUpdateCollectionAuthority",
    [22 /* MsgType.PIN */]: "/bluzelle.curium.storage.MsgPin",
};
exports.msgTypeToEncodeFnMap = {
    [23 /* MsgType.SEND */]: (msg) => tx_1.MsgSend.encode(msg).finish(),
    [24 /* MsgType.CREATE_VALIDATOR */]: (msg) => tx_3.MsgCreateValidator.encode(msg).finish(),
    [25 /* MsgType.EDIT_VALIDATOR */]: (msg) => tx_3.MsgEditValidator.encode(msg).finish(),
    [26 /* MsgType.DELEGATE */]: (msg) => tx_3.MsgDelegate.encode(msg).finish(),
    [27 /* MsgType.REDELEGATE */]: (msg) => tx_3.MsgBeginRedelegate.encode(msg).finish(),
    [28 /* MsgType.UNDELEGATE */]: (msg) => tx_3.MsgUndelegate.encode(msg).finish(),
    [0 /* MsgType.VERIFY_INVARIANT */]: (msg) => tx_4.MsgVerifyInvariant.encode(msg).finish(),
    [1 /* MsgType.SET_WITHDRAW_ADDRESS */]: (msg) => tx_5.MsgSetWithdrawAddress.encode(msg).finish(),
    [2 /* MsgType.WITHDRAW_DELEGATOR_REWARD */]: (msg) => tx_5.MsgWithdrawDelegatorReward.encode(msg).finish(),
    [3 /* MsgType.WITHDRAW_VALIDATOR_COMMISSION */]: (msg) => tx_5.MsgWithdrawValidatorCommission.encode(msg).finish(),
    [4 /* MsgType.FUND_COMMUNITIY_POOL */]: (msg) => tx_5.MsgFundCommunityPool.encode(msg).finish(),
    [5 /* MsgType.SUBMIT_EVIDENCE */]: (msg) => tx_6.MsgSubmitEvidence.encode(msg).finish(),
    [6 /* MsgType.GRANT_ALLOWANCE */]: (msg) => tx_7.MsgGrantAllowance.encode(msg).finish(),
    [7 /* MsgType.REVOKE_ALLOWANCE */]: (msg) => tx_7.MsgRevokeAllowance.encode(msg).finish(),
    [8 /* MsgType.SUBMIT_PROPOSAL */]: (msg) => tx_8.MsgSubmitProposal.encode(msg).finish(),
    [9 /* MsgType.DEPOSIT */]: (msg) => tx_8.MsgDeposit.encode(msg).finish(),
    [10 /* MsgType.VOTE */]: (msg) => tx_8.MsgVote.encode(msg).finish(),
    [11 /* MsgType.VOTE_WEIGHTED */]: (msg) => tx_8.MsgVoteWeighted.encode(msg).finish(),
    [12 /* MsgType.UNJAIL */]: (msg) => tx_9.MsgUnjail.encode(msg).finish(),
    // custom module msgs
    [13 /* MsgType.CREATE_NFT */]: (msg) => tx_10.MsgCreateNFT.encode(msg).finish(),
    [14 /* MsgType.PRINT_EDITION */]: (msg) => tx_10.MsgPrintEdition.encode(msg).finish(),
    [15 /* MsgType.TRANSFER_NFT */]: (msg) => tx_10.MsgTransferNFT.encode(msg).finish(),
    [16 /* MsgType.SIGN_METADATA */]: (msg) => tx_10.MsgSignMetadata.encode(msg).finish(),
    [17 /* MsgType.UPDATE_METADATA */]: (msg) => tx_10.MsgUpdateMetadata.encode(msg).finish(),
    [18 /* MsgType.UPDATE_METADATA_AUTHORITY */]: (msg) => tx_10.MsgUpdateMetadataAuthority.encode(msg).finish(),
    [19 /* MsgType.UPDATE_MINT_AUTHORITIY */]: (msg) => tx_10.MsgUpdateMintAuthority.encode(msg).finish(),
    [20 /* MsgType.CREATE_COLLECTION */]: (msg) => tx_10.MsgCreateCollection.encode(msg).finish(),
    [21 /* MsgType.UPDATE_COLLECTION_AUTHORITY */]: (msg) => tx_10.MsgUpdateCollectionAuthority.encode(msg).finish(),
    [22 /* MsgType.PIN */]: (msg) => tx_2.MsgPin.encode(msg).finish()
};
exports.grantMapping = {
    [0 /* GrantType.GENERIC */]: "/cosmos.authz.v1beta1.GenericAuthorization",
    [1 /* GrantType.SEND */]: "/cosmos.bank.v1beta1.SendAuthorization",
    [2 /* GrantType.STAKE */]: "/cosmos.staking.v1beta1.StakeAuthorization"
};
exports.grantTypeToEncodeFnMap = {
    [0 /* GrantType.GENERIC */]: (params) => authz_1.GenericAuthorization.encode({ msg: exports.msgMapping[params.msgType] }).finish(),
    [1 /* GrantType.SEND */]: (params) => authz_2.SendAuthorization.encode({ spendLimit: params.spendLimit }).finish(),
    [2 /* GrantType.STAKE */]: (params) => authz_3.StakeAuthorization.encode(params.stakeAuthorization).finish(),
};
