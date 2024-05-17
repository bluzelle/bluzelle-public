package main

import (
	"os"
	"path/filepath"

	appTypes "github.com/bluzelle/bluzelle-public/curium/app/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/bluzelle/bluzelle-public/curium/app"
	svrcmd "github.com/cosmos/cosmos-sdk/server/cmd"
	"github.com/tendermint/spm/cosmoscmd"
	cmd "github.com/tendermint/tendermint/cmd/tendermint/commands"
	"github.com/tendermint/tendermint/libs/log"
)

func main() {
	config := sdk.GetConfig()
	config.SetCoinType(appTypes.CoinType)
	config.SetBech32PrefixForAccount("bluzelle", "bluzellepub")

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
	} else {
		if len(os.Args) > 2 && os.Args[2] == "unsafe-reset-all" {
			config, _ := cmd.ParseConfig(cmd.ResetAllCmd)
			//dbDir := filepath.Join(ctx.Config.RootDir, ctx.Config.DBDir())
			storageDir := filepath.Join(config.RootDir, "storage")
			logger := log.NewTMLogger(log.NewSyncWriter(os.Stdout))
			if err := os.RemoveAll(storageDir); err == nil {
				logger.Info("Removed all storage history", "dir", storageDir)
			} else {
				logger.Error("Error removing all storage history", "dir", storageDir, "err", err)
			}
		}
	}
}
