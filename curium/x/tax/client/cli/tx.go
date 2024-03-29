package cli

import (
	"fmt"
	"strconv"
	"time"

	"github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/version"
	"github.com/spf13/cobra"
)

var (
	DefaultRelativePacketTimeoutTimestamp = uint64((time.Duration(10) * time.Minute).Nanoseconds())
)

// GetTxCmd returns the transaction commands for this module
func GetTxCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("%s transactions subcommands", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}
	cmd.AddCommand(
		GetCmdSetGasTaxBp(),
		GetCmdSetTaxCollector(),
		GetCmdSetTransferTaxBp(),
	)
	// this line is used by starport scaffolding # 1
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

func GetCmdSetGasTaxBp() *cobra.Command {
	cmd := &cobra.Command{
		Use:  "set-gas-tax-bp",
		Long: "Set gas tax basis point",
		Example: fmt.Sprintf(
			`$ %s tx tax set-bp 200 10`,
			version.AppName,
		),
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			bp, err := strconv.Atoi(args[0])
			creator := clientCtx.GetFromAddress().String()
			msg := types.NewMsgSetGasTaxBp(creator, int64(bp))
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}
	return cmd
}

func GetCmdSetTaxCollector() *cobra.Command {
	cmd := &cobra.Command{
		Use:  "set-tax-collector",
		Long: "Set tax collector",
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			newCollector := args[0]
			creator := clientCtx.GetFromAddress().String()
			msg := types.NewMsgSetTaxCollector(creator, newCollector)
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}
	return cmd
}

func GetCmdSetTransferTaxBp() *cobra.Command {
	cmd := &cobra.Command{
		Use:  "set-transfer-tx-bp",
		Long: "Set transfer tax basis point",
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			bp, err := strconv.Atoi(args[0])
			creator := clientCtx.GetFromAddress().String()
			msg := types.NewMsgSetTransferTaxBp(creator, int64(bp))
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}
	return cmd
}
