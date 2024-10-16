package cli

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/spf13/cobra"

	"github.com/bluzelle/bluzelle-public/curium/x/storage/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/version"
)

var _ = strconv.Itoa(0)

func CmdPin() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "pin",
		Short: "Broadcast message pin",
		Args:  cobra.ExactArgs(1),
		Example: fmt.Sprintf(
			`$ %s tx storage pin QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR`,
			version.AppName,
		),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}
			cid := args[0]
			addrString, err := cmd.Flags().GetString("addresses")
			if err != nil {
				return err
			}
			nodeAddrs := []string{}
			if addrString != "" {
				nodeAddrs = strings.Split(addrString, ",")
			}
			msg := types.NewMsgPin(
				clientCtx.GetFromAddress().String(),
				cid,
				nodeAddrs,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)
	cmd.Flags().String("addresses", "", "Comma-separated list of node addresses")
	return cmd
}
