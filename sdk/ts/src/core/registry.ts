import {Registry} from "@cosmjs/proto-signing";
import {Some} from "monet";
import {memoize} from "lodash";
import { MsgPin } from '../curium/lib/generated/storage/tx';
import { MsgMultiSend, MsgSend } from '../curium/lib/generated/cosmos/bank/v1beta1/tx';
import {
  MsgSetGasTaxBp,
  MsgSetTaxCollector,
  MsgSetTransferTaxBp
} from '../curium/lib/generated/tax/tx';
import {
  MsgBeginRedelegate,
  MsgDelegate, MsgEditValidator,
  MsgUndelegate
} from '../curium/lib/generated/cosmos/staking/v1beta1/tx';
import {
  MsgFundCommunityPool, MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward, MsgWithdrawValidatorCommission,
  MsgCommunityPoolSpend
} from '../curium/lib/generated/cosmos/distribution/v1beta1/tx';
import {
  MsgBurnNFT,
  MsgCreateCollection,
  MsgCreateNFT,
  MsgMultiSendNFT,
  MsgPrintEdition,
  MsgSignMetadata,
  MsgTransferNFT,
  MsgUpdateCollectionMutableUri,
  MsgUpdateCollectionUri,
  MsgUpdateMetadata,
  MsgUpdateMetadataAuthority,
  MsgUpdateMintAuthority
} from '../curium/lib/generated/nft/tx';
import { MsgExec, MsgGrant, MsgRevoke } from '../curium/lib/generated/cosmos/authz/v1beta1/tx';
import { MsgCreateVestingAccount } from '../curium/lib/generated/cosmos/vesting/v1beta1/tx';
import {
  MsgDeposit,
  MsgExecLegacyContent,
  MsgSubmitProposal,
  MsgVote,
  MsgVoteWeighted
} from '../curium/lib/generated/cosmos/gov/v1/tx';
import {
  MsgGrantAllowance,
  MsgRevokeAllowance,
} from '../curium/lib/generated/cosmos/feegrant/v1beta1/tx';
import {
  BasicAllowance,
  PeriodicAllowance,
  AllowedMsgAllowance
} from '../curium/lib/generated/cosmos/feegrant/v1beta1/feegrant';

import {
  MsgSubmitProposal as MsgSubmitLegacyProposal
} from '../curium/lib/generated/cosmos/gov/v1beta1/tx';

export const getRegistry = memoize(() =>
    Some(new Registry())
        .map(registerMessages)
        .join()
);


const registerMessages = (registry: Registry) => {
  registry.register('/storage.MsgPin', MsgPin);
  registry.register('/cosmos.bank.v1beta1.MsgSend', MsgSend)
  registry.register('/cosmos.bank.v1beta1.MsgMultiSend', MsgMultiSend)
  registry.register('/tax.MsgSetGasTaxBp', MsgSetGasTaxBp)
  registry.register('/tax.MsgSetTransferTaxBp', MsgSetTransferTaxBp)
  registry.register('/tax.MsgSetTaxCollector', MsgSetTaxCollector)
  registry.register('/cosmos.staking.v1beta1.MsgDelegate', MsgDelegate)
  registry.register('/cosmos.staking.v1beta1.MsgUndelegate', MsgUndelegate)
  registry.register('/cosmos.staking.v1beta1.MsgBeginRedelegate', MsgBeginRedelegate)
  registry.register('/cosmos.staking.v1beta1.MsgEditValidator', MsgEditValidator)
  registry.register('/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward', MsgWithdrawDelegatorReward)
  registry.register('/cosmos.distribution.v1beta1.MsgFundCommunityPool', MsgFundCommunityPool)
  registry.register('/cosmos.distribution.v1beta1.MsgSetWithdrawAddress', MsgSetWithdrawAddress)
  registry.register('/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission', MsgWithdrawValidatorCommission)
  registry.register('/cosmos.distribution.v1beta1.MsgCommunityPoolSpend', MsgCommunityPoolSpend)
  registry.register('/nft.MsgCreateNFT', MsgCreateNFT)
  registry.register('/nft.MsgCreateCollection', MsgCreateCollection)
  registry.register('/nft.MsgTransferNFT', MsgTransferNFT)
  registry.register('/nft.MsgUpdateMintAuthority', MsgUpdateMintAuthority)
  registry.register('/nft.MsgUpdateMetadata', MsgUpdateMetadata)
  registry.register('/nft.MsgUpdateMetadataAuthority', MsgUpdateMetadataAuthority)
  registry.register('/nft.MsgPrintEdition', MsgPrintEdition)
  registry.register('/nft.MsgSignMetadata', MsgSignMetadata)
  registry.register('/nft.MsgMultiSendNFT', MsgMultiSendNFT)
  registry.register('/nft.MsgBurnNFT', MsgBurnNFT)
  registry.register('/cosmos.authz.v1beta1.MsgGrant', MsgGrant)
  registry.register('/cosmos.authz.v1beta1.MsgExec', MsgExec)
  registry.register('/cosmos.authz.v1beta1.MsgRevoke', MsgRevoke)
  registry.register('/nft.MsgUpdateCollectionUri', MsgUpdateCollectionUri)
  registry.register('/nft.MsgUpdateCollectionMutableUri', MsgUpdateCollectionMutableUri)
  registry.register('/cosmos.vesting.v1beta1.MsgCreateVestingAccount', MsgCreateVestingAccount)
  registry.register('/cosmos.gov.v1.MsgSubmitProposal', MsgSubmitProposal)
  registry.register('/cosmos.gov.v1beta1.MsgSubmitProposal', MsgSubmitLegacyProposal)
  registry.register('/cosmos.gov.v1.MsgExecLegacyContent', MsgExecLegacyContent)
  registry.register('/cosmos.gov.v1.MsgVote', MsgVote)
  registry.register('/cosmos.gov.v1.MsgDeposit', MsgDeposit)
  registry.register('/cosmos.gov.v1.MsgVoteWeighted', MsgVoteWeighted)
  registry.register('/cosmos.feegrant.v1beta1.MsgGrantAllowance', MsgGrantAllowance)
  registry.register('/cosmos.feegrant.v1beta1.MsgRevokeAllowance', MsgRevokeAllowance)
  registry.register('/cosmos.feegrant.v1beta1.BasicAllowance', BasicAllowance)
  registry.register('/cosmos.feegrant.v1beta1.PeriodicAllowance', PeriodicAllowance)
  registry.register('/cosmos.feegrant.v1beta1.AllowedMsgAllowance', AllowedMsgAllowance)

  return registry
};