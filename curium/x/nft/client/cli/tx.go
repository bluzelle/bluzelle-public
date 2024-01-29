package cli

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/version"

	"github.com/bluzelle/bluzelle-public/curium/x/nft/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// NewTxCmd returns the transaction commands for the nft module.
func NewTxCmd() *cobra.Command {
	txCmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      "nft transaction subcommands",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	txCmd.AddCommand(
		GetCmdCreateNFT(),
		GetCmdPrintEdition(),
		GetCmdTransferNFT(),
		GetCmdSignMetadata(),
		GetCmdUpdateMetadata(),
		GetCmdUpdateMetadataAuthority(),
		GetCmdUpdateMintAuthority(),
		GetCmdCreateCollection(),
		GetCmdUpdateCollectionAuthority(),
		GetCmdUpdateCollectionUri(),
		GetCmdUpdateCollectionMutableUri(),
		GetCmdMultiSendNFT(),
	)

	return txCmd
}

func GetCmdCreateNFT() *cobra.Command {
	cmd := &cobra.Command{
		Use:  "create-nft",
		Long: "Create a nft from provided params",
		Example: fmt.Sprintf(
			`$ %s tx nft create-nft
				--name="Punk10"
				--uri="https://punk.com/10"
				--mutable-uri="https://starloop.com"
				--seller-fee-basis-points=100
				--creators="bluzelle1syeqq3hl327d53w6wz9fzamuhklg4qk47wl99m"
				--creator-shares="10"
				--mutable=false
				--update-authority="bluzelle1syeqq3hl327d53w6wz9fzamuhklg4qk47wl99m"`,
			version.AppName,
		),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			collId, err := cmd.Flags().GetUint64(FlagCollectionId)
			if err != nil {
				return err
			}

			updateAuthority, err := cmd.Flags().GetString(FlagUpdateAuthority)
			if err != nil {
				return err
			}

			isMutable, err := cmd.Flags().GetBool(FlagMutable)
			if err != nil {
				return err
			}

			masterEditionMaxSupply, err := cmd.Flags().GetUint64(FlagMasterEditionMaxSupply)
			if err != nil {
				return err
			}

			data, err := collectNftData(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateNFT(clientCtx.GetFromAddress(), collId, updateAuthority, data.Name, data.Uri, data.MutableUri, data.SellerFeeBasisPoints, false, isMutable, data.Creators, masterEditionMaxSupply)

			if err := msg.ValidateBasic(); err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().AddFlagSet(FlagCreateNFT())
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func GetCmdPrintEdition() *cobra.Command {
	cmd := &cobra.Command{
		Use:  "print-edition",
		Long: "Print a new edition from master edition metadata",
		Example: fmt.Sprintf(
			`$ %s tx nft print-edition
				--metadata-id=1`,
			version.AppName,
		),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			collId, err := cmd.Flags().GetUint64(FlagCollectionId)
			if err != nil {
				return err
			}

			metadataId, err := cmd.Flags().GetUint64(FlagMetadataId)
			if err != nil {
				return err
			}

			owner, err := cmd.Flags().GetString(FlagOwner)
			if err != nil {
				return err
			}

			msg := types.NewMsgPrintEdition(clientCtx.GetFromAddress(), collId, metadataId, owner)

			if err := msg.ValidateBasic(); err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().AddFlagSet(FlagPrintEdition())
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func GetCmdTransferNFT() *cobra.Command {
	cmd := &cobra.Command{
		Use:  "transfer-nft",
		Long: "Transfer a nft from sender to receiver",
		Example: fmt.Sprintf(
			`$ %s tx nft transfer-nft
				--nft-id="1:1:0"
				--new-owner="bluzelle1syeqq3hl327d53w6wz9fzamuhklg4qk47wl99m"`,
			version.AppName,
		),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			newOwner, err := cmd.Flags().GetString(FlagNewOwner)
			if err != nil {
				return err
			}
			nftId, err := cmd.Flags().GetString(FlagNftId)
			if err != nil {
				return err
			}

			msg := types.NewMsgTransferNFT(clientCtx.GetFromAddress(), nftId, newOwner)

			if err := msg.ValidateBasic(); err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().AddFlagSet(FlagTransferNFT())
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func GetCmdSignMetadata() *cobra.Command {
	cmd := &cobra.Command{
		Use:  "sign-metadata",
		Long: "Sign metadata and verify the address on creators field",
		Example: fmt.Sprintf(
			`$ %s tx nft sign-metadata
				--metadata-id=1`,
			version.AppName,
		),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			metadataId, err := cmd.Flags().GetUint64(FlagMetadataId)
			if err != nil {
				return err
			}

			msg := types.NewMsgSignMetadata(clientCtx.GetFromAddress(), metadataId)

			if err := msg.ValidateBasic(); err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().AddFlagSet(FlagSignMetadata())
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
func GetCmdUpdateMetadata() *cobra.Command {
	cmd := &cobra.Command{
		Use:  "update-metadata",
		Long: "Update metadata by id and params",
		Example: fmt.Sprintf(
			`$ %s tx nft update-metadata
				--metadata-id=1
				--name="Punk10"
				--symbol="PUNK"
				--uri="https://punk.com/10"
                --mutable-uri="https://starloop.com"
				--seller-fee-basis-points=100
				--creators="bluzelle1syeqq3hl327d53w6wz9fzamuhklg4qk47wl99m"
				--creator-shares="10"`,
			version.AppName,
		),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			metadataId, err := cmd.Flags().GetUint64(FlagMetadataId)
			if err != nil {
				return err
			}

			data, err := collectNftData(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateMetadata(clientCtx.GetFromAddress(), metadataId, data.Name, data.Uri, data.MutableUri, data.SellerFeeBasisPoints, data.Creators)

			if err := msg.ValidateBasic(); err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().AddFlagSet(FlagUpdateMetadata())
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func GetCmdUpdateMetadataAuthority() *cobra.Command {
	cmd := &cobra.Command{
		Use:  "update-metadata-authority",
		Long: "Update metadata by id and params",
		Example: fmt.Sprintf(
			`$ %s tx nft update-metadata-authority
				--metadata-id=1
				--new-authority="bluzelle1syeqq3hl327d53w6wz9fzamuhklg4qk47wl99m"`,
			version.AppName,
		),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			metadataId, err := cmd.Flags().GetUint64(FlagMetadataId)
			if err != nil {
				return err
			}

			newAuthority, err := cmd.Flags().GetString(FlagNewAuthority)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateMetadataAuthority(clientCtx.GetFromAddress(), metadataId, newAuthority)

			if err := msg.ValidateBasic(); err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().AddFlagSet(FlagUpdateMetadataAuthority())
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func GetCmdUpdateMintAuthority() *cobra.Command {
	cmd := &cobra.Command{
		Use:  "update-mint-authority",
		Long: "Update mint authority by id and params",
		Example: fmt.Sprintf(
			`$ %s tx nft update-mint-authority
				--metadata-id=1
				--new-authority="bluzelle1syeqq3hl327d53w6wz9fzamuhklg4qk47wl99m"`,
			version.AppName,
		),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			metadataId, err := cmd.Flags().GetUint64(FlagMetadataId)
			if err != nil {
				return err
			}

			newAuthority, err := cmd.Flags().GetString(FlagNewAuthority)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateMintAuthority(clientCtx.GetFromAddress(), metadataId, newAuthority)

			if err := msg.ValidateBasic(); err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().AddFlagSet(FlagUpdateMetadataAuthority())
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func GetCmdCreateCollection() *cobra.Command {
	cmd := &cobra.Command{
		Use:  "create-collection",
		Long: "Create collection from params",
		Example: fmt.Sprintf(
			`$ %s tx nft create-collection
				--name="punk-collection"
				--uri="https://punk.com"
				--update-authority="bluzelle1syeqq3hl327d53w6wz9fzamuhklg4qk47wl99m"
				--mutable-uri="https://starloop.com"
`,
			version.AppName,
		),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			symbol, err := cmd.Flags().GetString(FlagSymbol)
			if err != nil {
				return err
			}

			name, err := cmd.Flags().GetString(FlagName)
			if err != nil {
				return err
			}

			uri, err := cmd.Flags().GetString(FlagUri)
			if err != nil {
				return err
			}

			mutableUri, err := cmd.Flags().GetString(FlagMutableUri)
			if err != nil {
				return err
			}

			updateAuthority, err := cmd.Flags().GetString(FlagUpdateAuthority)
			if err != nil {
				return err
			}

			isMutable, err := cmd.Flags().GetBool(FlagMutable)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateCollection(clientCtx.GetFromAddress(), symbol, name, uri, mutableUri, updateAuthority, isMutable)

			if err := msg.ValidateBasic(); err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().AddFlagSet(FlagCreateCollection())
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func GetCmdUpdateCollectionAuthority() *cobra.Command {
	cmd := &cobra.Command{
		Use:  "update-collection-authority",
		Long: "Update collection authority to a new address",
		Example: fmt.Sprintf(
			`$ %s tx nft update-collection-authority
				--collection-id=1
				--new-authority="bluzelle1syeqq3hl327d53w6wz9fzamuhklg4qk47wl99m"`,
			version.AppName,
		),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			collectionId, err := cmd.Flags().GetUint64(FlagCollectionId)
			if err != nil {
				return err
			}

			newAuthority, err := cmd.Flags().GetString(FlagNewAuthority)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateCollectionAuthority(clientCtx.GetFromAddress(), collectionId, newAuthority)

			if err := msg.ValidateBasic(); err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().AddFlagSet(FlagUpdateCollectionAuthority())
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func GetCmdUpdateCollectionUri() *cobra.Command {
	cmd := &cobra.Command{
		Use:  "update-collection-uri",
		Long: "Update collection uri",
		Example: fmt.Sprintf(
			`$ %s tx nft update-collection-uri
				--collection-id=1
				--uri="https://punk.com"`,
			version.AppName,
		),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			collectionId, err := cmd.Flags().GetUint64(FlagCollectionId)
			if err != nil {
				return err
			}

			newUri, err := cmd.Flags().GetString(FlagUri)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateCollectionUri(clientCtx.GetFromAddress(), collectionId, newUri)

			if err := msg.ValidateBasic(); err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().AddFlagSet(FlagUpdateCollectionUri())
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func GetCmdUpdateCollectionMutableUri() *cobra.Command {
	cmd := &cobra.Command{
		Use:  "update-collection-mutable-uri",
		Long: "Update collection mutable uri",
		Example: fmt.Sprintf(
			`$ %s tx nft update-collection-mutable-uri
				--collection-id=1
				--mutable-uri="https://punk.com"`,
			version.AppName,
		),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			collectionId, err := cmd.Flags().GetUint64(FlagCollectionId)
			if err != nil {
				return err
			}

			newUri, err := cmd.Flags().GetString(FlagMutableUri)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateCollectionMutableUri(clientCtx.GetFromAddress(), collectionId, newUri)

			if err := msg.ValidateBasic(); err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().AddFlagSet(FlagUpdateCollectionMutableUri())
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}


func GetCmdMultiSendNFT() *cobra.Command {
	cmd := &cobra.Command{
		Use:  "multi-send-nft",
		Long: "send multiple nfts",
		Example: fmt.Sprintf(
			`$ %s tx nft multi-send-nft
				--nft-ids="1:1:0,1:2:0"
				--receivers="bluzelle1ev2xu82y6mkjws4ndz76cfyk8hcavp29u49dst,bluzelle1y45zr9mp6r44tztkczggn9r79p48c6pf6cq363"`,
			version.AppName,
		),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			nftIdsParam, err := cmd.Flags().GetString(FlagNftIds);
			if err != nil {
				return err
			}

			nftIds := strings.Split(nftIdsParam, ",");

			receiversParam, err := cmd.Flags().GetString(FlagReceivers)
			if err != nil {
				return err
			}

			receivers := strings.Split(receiversParam, ",");

			var multiSendOutput []*types.MultiSendNFTOutput;

			if len(nftIds) != len(receivers) {
				return sdkerrors.Wrapf(sdkerrors.ErrIO, "No match of receivers and nfts %s", err)
			}

			for idx := range nftIds {
				multiSendOutput = append(multiSendOutput, &types.MultiSendNFTOutput{
					Receiver: receivers[idx],
					NftId: nftIds[idx],
				})
			}
							
			msg := types.NewMsgMultiSendNFT(clientCtx.GetFromAddress(), multiSendOutput)

			if err := msg.ValidateBasic(); err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().AddFlagSet(FlagMultiSendNFT())
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CollectCreatorsData(cmd *cobra.Command) ([]types.Creator, error) {
	creators := []types.Creator{}
	creatorAccsStr, err := cmd.Flags().GetString(FlagCreators)
	if err != nil {
		return creators, err
	}
	creatorAccs := []string{}
	if creatorAccsStr != "" {
		creatorAccs = strings.Split(creatorAccsStr, ",")
	}
	creatorSharesStr, err := cmd.Flags().GetString(FlagCreatorShares)
	if err != nil {
		return creators, err
	}
	creatorShareStrs := []string{}
	if creatorSharesStr != "" {
		creatorShareStrs = strings.Split(creatorSharesStr, ",")
	}
	for index, creatorAcc := range creatorAccs {
		shareStr := creatorShareStrs[index]
		share, err := strconv.Atoi(shareStr)
		if err != nil {
			return creators, err
		}
		creators = append(creators, types.Creator{
			Address: creatorAcc,
			Share:   uint32(share),
		})
	}
	return creators, nil
}

func collectNftData(cmd *cobra.Command) (types.Metadata, error) {
	name, err := cmd.Flags().GetString(FlagName)
	if err != nil {
		return types.Metadata{}, err
	}
	uri, err := cmd.Flags().GetString(FlagUri)
	if err != nil {
		return types.Metadata{}, err
	}
	mutableUri, err := cmd.Flags().GetString(FlagMutableUri)
	if err != nil {
		return types.Metadata{}, err
	}
	sellerFeeBasisPoints, err := cmd.Flags().GetUint32(FlagSellerFeeBasisPoints)
	if err != nil {
		return types.Metadata{}, err
	}

	creators, err := CollectCreatorsData(cmd)
	if err != nil {
		return types.Metadata{}, err
	}

	return types.Metadata{
		Name:                 name,
		Uri:                  uri,
		MutableUri:           mutableUri,
		SellerFeeBasisPoints: sellerFeeBasisPoints,
		Creators:             creators,
	}, nil
}

