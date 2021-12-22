package cli

import (
	"strconv"

	"github.com/spf13/cobra"

	"github.com/bluzelle/curium/x/storage/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
)

var _ = strconv.Itoa(0)

func CmdHasContent() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "has-content",
		Short: "Query hasContent",
		Args:  cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryHasContentRequest{}

			res, err := queryClient.HasContent(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
