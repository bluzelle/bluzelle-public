package main

import (
	appTypes "github.com/bluzelle/bluzelle/curium/app/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"os"

	"github.com/bluzelle/bluzelle/curium/app"
	"github.com/bluzelle/bluzelle/curium/cmd/cosmoscmd"
	svrcmd "github.com/cosmos/cosmos-sdk/server/cmd"
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
