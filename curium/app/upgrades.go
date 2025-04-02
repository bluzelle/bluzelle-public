package app

import (
	upgrade "github.com/bluzelle/bluzelle-public/curium/app/upgrades/v11"
	"github.com/cosmos/cosmos-sdk/baseapp"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	crisistypes "github.com/cosmos/cosmos-sdk/x/crisis/types"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
)

func (app *App) setupUpgradeHandlers(
	configurator module.Configurator,
) {
	baseAppLegacySS := app.ParamsKeeper.Subspace(baseapp.Paramspace).WithKeyTable(paramstypes.ConsensusParamsKeyTable())
	app.UpgradeKeeper.SetUpgradeHandler(upgrade.UpgradeName, upgrade.CreateV11UpgradeHandler(app.mm, configurator))
}

func (app *App) setupUpgradeStoreLoaders() {
	upgradeInfo, err := app.UpgradeKeeper.ReadUpgradeInfoFromDisk()
	if err != nil {
		panic("failed to read upgrade info from disk: " + err.Error())
	}
	var storeUpgrades *storetypes.StoreUpgrades

	storeUpgrades = &storetypes.StoreUpgrades{
		Added: []string{crisistypes.ModuleName},
	}

	if storeUpgrades != nil {
		app.SetStoreLoader(upgradetypes.UpgradeStoreLoader(upgradeInfo.Height, storeUpgrades))
	}

}

func (app *App) upgrade(configurator module.Configurator) {
	app.setupUpgradeHandlers(configurator)
	app.setupUpgradeStoreLoaders()
}
