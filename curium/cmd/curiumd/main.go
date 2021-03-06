package main

import (
	appTypes "github.com/bluzelle/curium/app/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"os"

	"github.com/bluzelle/curium/app"
	svrcmd "github.com/cosmos/cosmos-sdk/server/cmd"
	"github.com/tendermint/spm/cosmoscmd"
)

func main() {
	config := sdk.GetConfig()
	config.SetCoinType(appTypes.CoinType)

	rootCmd, _ := cosmoscmd.NewRootCmd(
		appTypes.Name,
		appTypes.AccountAddressPrefix,
		app.DefaultNodeHome,
		appTypes.Name,
		app.ModuleBasics,
		app.New,
		// this line is used by starport scaffolding # root/arguments
	)

	if err := svrcmd.Execute(rootCmd, app.DefaultNodeHome); err != nil {
		os.Exit(1)
	}

}
