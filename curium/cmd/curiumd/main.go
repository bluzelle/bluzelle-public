package main

import (
	"io/ioutil"
	"os"
	"path/filepath"

	appTypes "github.com/bluzelle/bluzelle-public/curium/app/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/bluzelle/bluzelle-public/curium/app"
	curiumcmd "github.com/bluzelle/bluzelle-public/curium/cmd/curiumd/cmd"
	cmd "github.com/cometbft/cometbft/cmd/cometbft/commands"
	"github.com/cometbft/cometbft/libs/log"
	svrcmd "github.com/cosmos/cosmos-sdk/server/cmd"
)

type EmptyAppOptions struct{}

func (EmptyAppOptions) Get(_ string) interface{} { return nil }

func main() {
	config := sdk.GetConfig()
	config.SetCoinType(appTypes.CoinType)
	config.SetBech32PrefixForAccount("bluzelle", "bluzellepub")

	rootCmd, _ := curiumcmd.NewRootCmd(
		appTypes.Name,
		appTypes.AccountAddressPrefix,
		app.DefaultNodeHome,
		appTypes.Name,
		app.ModuleBasics,
	)

	if err := svrcmd.Execute(rootCmd, "curiumd", app.DefaultNodeHome); err != nil {

		os.Exit(1)
	} else {
		if len(os.Args) > 2 && os.Args[2] == "unsafe-reset-all" {
			config, _ := cmd.ParseConfig(cmd.ResetAllCmd)
			//dbDir := filepath.Join(ctx.Config.RootDir, ctx.Config.DBDir())
			storageDir := filepath.Join(config.RootDir, "storage")
			logger := log.NewTMLogger(log.NewSyncWriter(os.Stdout))
			if err := os.RemoveAll(storageDir); err == nil {
				logger.Debug("Removed all storage history", "dir", storageDir)
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
			//logger.Debug("Storage Config successfully added into app.toml")

		}
	}
}
