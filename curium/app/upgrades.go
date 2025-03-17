package app

import (
	upgrade "github.com/bluzelle/bluzelle-public/curium/app/upgrades/v10"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
)

func (app *App) setupUpgradeHandlers(
	configurator module.Configurator,
) {
	app.UpgradeKeeper.SetUpgradeHandler(upgrade.UpgradeName, upgrade.CreateV10UpgradeHandler(app.mm, configurator))
}

func (app *App) setupUpgradeStoreLoaders() {
	upgradeInfo, err := app.UpgradeKeeper.ReadUpgradeInfoFromDisk()
	if err != nil {
		panic("failed to read upgrade info from disk: " + err.Error())
	}
	var storeUpgrades *storetypes.StoreUpgrades

	storeUpgrades = &storetypes.StoreUpgrades{
		Deleted: []string{"faucet"},
	}

	if storeUpgrades != nil {
		app.SetStoreLoader(upgradetypes.UpgradeStoreLoader(upgradeInfo.Height, storeUpgrades))
	}

}

func (app *App) upgrade(configurator module.Configurator) {
	app.setupUpgradeHandlers(configurator)
	app.setupUpgradeStoreLoaders()
}
