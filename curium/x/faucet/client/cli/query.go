package cli

import (
	"context"
	"fmt"

	// "strings"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/version"

	// sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/bluzelle/bluzelle-public/curium/x/faucet/types"
)

// GetQueryCmd returns the cli query commands for this module
func GetQueryCmd(queryRoute string) *cobra.Command {
	// Group faucet queries under a subcommand
	cmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("Querying commands for the %s module", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(CmdQueryParams(), GetCmdQueryMint())
	flags.AddQueryFlagsToCmd(cmd)

	// this line is used by starport scaffolding # 1

	return cmd
}

func GetCmdQueryMint() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "mint [addr]",
		Long:    "faucet mint",
		Example: fmt.Sprintf(`$ %s faucet mint`, version.AppName),
		Args:    cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)

			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			res, err := queryClient.Mint(context.Background(), &types.QueryMintRequest{
				Address: args[0],
			})

			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
