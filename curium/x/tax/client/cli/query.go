package cli

import (
	"fmt"
	"strings"

	"github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/version"
	"github.com/spf13/cobra"
)

// GetQueryCmd returns the cli query commands for this module
func GetQueryCmd(queryRoute string) *cobra.Command {
	// Group tax queries under a subcommand
	cmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("Querying commands for the %s module", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(
		GetTaxInfoCmd(),
	)
	// this line is used by starport scaffolding # 1

	return cmd
}

func GetTaxInfoCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "info",
		Short: "Query for tax info",
		Long: strings.TrimSpace(
			fmt.Sprintf(`Query for tax info`,
				version.AppName, types.ModuleName, version.AppName, types.ModuleName,
			),
		),
		Args: cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			ctx := cmd.Context()

			res, err := queryClient.GetTaxInfo(ctx, &types.QueryGetTaxInfoRequest{})
			if err != nil {
				return err
			}
			return clientCtx.PrintProto(res)
		},
	}

	return cmd
}
