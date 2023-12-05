package main

import (
	"io/ioutil"
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

		if len(os.Args) > 1 && os.Args[1] == "init" {
			logger := log.NewTMLogger(log.NewSyncWriter(os.Stdout))
			rootDir := app.DefaultNodeHome

			for i, arg := range os.Args {
				if arg == "--home" && i+1 < len(os.Args) {
					rootDir = os.Args[i+1]
					break
				}
			}

			storageDir := filepath.Join(rootDir, "storage")

			newContent := "storage-dir = " + "\"" + storageDir + "\"\n" + "filter = \"server\"\n"
			appFilePath := filepath.Join(rootDir, "config/app.toml")
			existingContent, err := ioutil.ReadFile(appFilePath)
			if err != nil {
				logger.Error("Error reading file:", err)
				return
			}
			fullContent := newContent + string(existingContent)
			err = ioutil.WriteFile(appFilePath, []byte(fullContent), 0644)
			if err != nil {
				logger.Error("Error writing to file:", err)
				return
			}
			logger.Info("Storage Config successfully added into app.toml")

		}
	}
}
