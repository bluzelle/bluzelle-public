package app

import (
	doublesupply "github.com/bluzelle/bluzelle-public/curium/app/upgrades/doublesupply"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
)

// NOTE: This upgrade defines a reference implementation of what an upgrade
// could look like when an application is migrating from Cosmos SDK version
// v0.45.x to v0.47.x.

func (app *App) setupUpgradeHandlers(
	configurator module.Configurator,
) {
	app.UpgradeKeeper.SetUpgradeHandler(doublesupply.UpgradeName, doublesupply.CreateDoubleSupplyUpgradeHandler(app.mm, configurator, app.BankKeeper))
}

func (app *App) setupUpgradeStoreLoaders() {
	upgradeInfo, err := app.UpgradeKeeper.ReadUpgradeInfoFromDisk()
	if err != nil {
		panic("failed to read upgrade info from disk: " + err.Error())
	}
	var storeUpgrades *storetypes.StoreUpgrades

	if storeUpgrades != nil {
		app.SetStoreLoader(upgradetypes.UpgradeStoreLoader(upgradeInfo.Height, storeUpgrades))
	}

}

func (app *App) upgrade(configurator module.Configurator) {
	app.setupUpgradeHandlers(configurator)
	app.setupUpgradeStoreLoaders()
}
