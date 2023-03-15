"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgMapping = void 0;
exports.MsgMapping = {
    [27 /* MsgType.SEND */]: "/cosmos.bank.v1beta1.MsgSend",
    [28 /* MsgType.CREATE_VALIDATOR */]: "/cosmos.staking.v1beta1.MsgCreateValidator",
    [29 /* MsgType.EDIT_VALIDATOR */]: "/cosmos.staking.v1beta1.MsgEditValidator",
    [30 /* MsgType.DELEGATE */]: "/cosmos.staking.v1beta1.MsgDelegate",
    [31 /* MsgType.REDELEGATE */]: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
    [32 /* MsgType.UNDELEGATE */]: "/cosmos.staking.v1beta1.MsgUndelegate",
    [0 /* MsgType.VERIFY_INVARIENT */]: "/cosmos.crisis.v1beta1.MsgVerifyInvarient",
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
    [13 /* MsgType.FAUCET_MINT */]: "/bluzelle.curium.faucet.MsgMint",
    [14 /* MsgType.CREATE_NFT */]: "/bluzelle.curium.nft.MsgCreateNFT",
    [15 /* MsgType.PRINT_EDITION */]: "/bluzelle.curium.nft.MsgPrintEdition",
    [16 /* MsgType.TRANSFER_NFT */]: "/bluzelle.curium.nft.MsgTransferNFT",
    [17 /* MsgType.SIGN_METADATA */]: "/bluzelle.curium.nft.MsgSignMetadata",
    [18 /* MsgType.UPDATE_METADATA */]: "/bluzelle.curium.nft.MsgUpdateMetaData",
    [19 /* MsgType.UPDATE_METADATA_AUTHORITY */]: "/bluzelle.curium.nft.MsgUpdateMetadataAuthority",
    [20 /* MsgType.UPDATE_MINT_AUTHORITIY */]: "/bluzelle.curium.nft.MsgUpdateMintAuthority",
    [21 /* MsgType.CREATE_COLLECTION */]: "/bluzelle.curium.nft.MsgCreateCollection",
    [22 /* MsgType.UPDATE_COLLECTION_AUTHORITY */]: "/bluzelle.curium.nft.MsgUpdateCollectionAuthoritiy",
    [23 /* MsgType.PIN */]: "/bluzelle.curium.storage.MsgPin",
    [24 /* MsgType.SET_GAS_TAX_BP */]: "/bluzelle.curium.tax.MsgSetGasTaxBp",
    [25 /* MsgType.SET_TRANSFER_TAX_BP */]: "/bluzelle.curium.tax.MsgSetTransferTaxBp",
    [26 /* MsgType.SET_TAX_COLLECTOR */]: "/bluzelle.curium.tax.MsgSetTaxCollector",
};
