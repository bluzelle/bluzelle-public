package testutil

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/testutil"
	sdk "github.com/cosmos/cosmos-sdk/types"

	nftcli "github.com/bluzelle/bluzelle-public/curium/x/nft/client/cli"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
)

func CreateNFT(clientCtx client.Context, from string, bondDenom string) (testutil.BufferWriter, error) {
	cmd := nftcli.GetCmdCreateNFT()

	return clitestutil.ExecTestCLICmd(clientCtx, cmd, []string{
		fmt.Sprintf("--%s=%d", nftcli.FlagCollectionId, 1),
		fmt.Sprintf("--%s=%s", nftcli.FlagName, "Punk10"),
		fmt.Sprintf("--%s=%s", nftcli.FlagSymbol, "PUNK"),
		fmt.Sprintf("--%s=%s", nftcli.FlagUri, "https://punk.com/10"),
		fmt.Sprintf("--%s=%d", nftcli.FlagSellerFeeBasisPoints, 100),
		fmt.Sprintf("--%s=%s", nftcli.FlagCreators, from),
		fmt.Sprintf("--%s=%s", nftcli.FlagCreatorShares, "10"),
		fmt.Sprintf("--%s=false", nftcli.FlagMutable),
		fmt.Sprintf("--%s=%s", nftcli.FlagUpdateAuthority, from),
		fmt.Sprintf("--%s=%s", flags.FlagFrom, from),

		fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
		fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.FlagTimeoutHeight),
		fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(bondDenom, sdk.NewInt(100))).String()),
	})
}

func CreateCollection(clientCtx client.Context, from string, bondDenom string) (testutil.BufferWriter, error) {
	cmd := nftcli.GetCmdCreateCollection()

	return clitestutil.ExecTestCLICmd(clientCtx, cmd, []string{
		fmt.Sprintf("--%s=%s", nftcli.FlagName, "Punk"),
		fmt.Sprintf("--%s=%s", nftcli.FlagUri, "https://punk.com"),
		fmt.Sprintf("--%s=%s", nftcli.FlagUpdateAuthority, from),
		fmt.Sprintf("--%s=%s", flags.FlagFrom, from),

		fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
		fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.FlagTimeoutHeight),
		fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(bondDenom, sdk.NewInt(100))).String()),
	})
}
