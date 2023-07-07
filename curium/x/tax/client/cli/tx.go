package cli

import (
	"fmt"
	"time"

	"github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
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
	cmd.AddCommand()
	// this line is used by starport scaffolding # 1
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

// func GetCmdSetBp() *cobra.Command {
// 	// cmd := &cobra.Command{
// 	// 	Use:  "set-bp",
// 	// 	Long: "Set the Tax bp",
// 	// 	Example: fmt.Sprintf(
// 	// 		`$ %s tx tax set-bp 200 10`,
// 	// 		version.AppName,
// 	// 	),
// 	// 	RunE: func(cmd *cobra.Command, args []string) error {
// 	// 		clientCtx, err := client.GetClientTxContext(cmd)
// 	// 		if err != nil {
// 	// 			return err
// 	// 		}

// 	// 		data, err := collectNftData(cmd)
// 	// 		if err != nil {
// 	// 			return err
// 	// 		}

// 	// 		msg := types.NewMsgSetGasTaxBp(clientCtx.GetFromAddress())

// 	// 		if err := msg.ValidateBasic(); err != nil {
// 	// 			return err
// 	// 		}

// 	// 		return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
// 	// 	},
// 	// }

// 	// cmd.Flags().AddFlagSet(FlagCreateNFT())
// 	// flags.AddTxFlagsToCmd(cmd)

// 	// return cmd
// }
