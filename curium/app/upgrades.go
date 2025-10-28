package app

import (
	upgrade "github.com/bluzelle/bluzelle-public/curium/app/upgrades/v12"
	"github.com/cosmos/cosmos-sdk/types/module"
)

// NOTE: This upgrade defines a reference implementation of what an upgrade
// could look like when an application is migrating from Cosmos SDK version
// v0.45.x to v0.47.x.

func (app *App) setupUpgradeHandlers(
	configurator module.Configurator,
) {
	// for _, subspace := range app.ParamsKeeper.GetSubspaces() {
	// 	subspace := subspace
	// 	var keyTable paramstypes.KeyTable
	// 	switch subspace.Name() {
	// 	case authtypes.ModuleName:
	// 		keyTable = authtypes.ParamKeyTable() //nolint:staticcheck
	// 	case banktypes.ModuleName:
	// 		keyTable = banktypes.ParamKeyTable() //nolint:staticcheck
	// 	case stakingtypes.ModuleName:
	// 		keyTable = stakingtypes.ParamKeyTable() //nolint:staticcheck
	// 	case minttypes.ModuleName:
	// 		keyTable = minttypes.ParamKeyTable() //nolint:staticcheck
	// 	case distrtypes.ModuleName:
	// 		keyTable = distrtypes.ParamKeyTable() //nolint:staticcheck
	// 	case slashingtypes.ModuleName:
	// 		keyTable = slashingtypes.ParamKeyTable() //nolint:staticcheck
	// 	case govtypes.ModuleName:
	// 		keyTable = govv1.ParamKeyTable() //nolint:staticcheck
	// 	case crisistypes.ModuleName:
	// 		keyTable = crisistypes.ParamKeyTable() //nolint:staticcheck
	// 	case nfttypes.ModuleName:
	// 		keyTable = nfttypes.ParamKeyTable() //nolint:staticcheck
	// 	case ibctransfertypes.ModuleName:
	// 		keyTable = ibctransfertypes.ParamKeyTable() //nolint:staticcheck
	// 	case icahosttypes.SubModuleName:
	// 		keyTable = icahosttypes.ParamKeyTable() //nolint:staticcheck
	// 	}
	// 	if !subspace.HasKeyTable() {
	// 		subspace.WithKeyTable(keyTable)
	// 	}
	// }

	app.UpgradeKeeper.SetUpgradeHandler(upgrade.UpgradeName, upgrade.CreateV12UpgradeHandler(app.mm, configurator))
}

// func (app *App) setupUpgradeStoreLoaders() {
// 	upgradeInfo, err := app.UpgradeKeeper.ReadUpgradeInfoFromDisk()
// 	if err != nil {
// 		panic("failed to read upgrade info from disk: " + err.Error())
// 	}
// 	storeUpgrades := &storetypes.StoreUpgrades{}
// 	app.SetStoreLoader(upgradetypes.UpgradeStoreLoader(upgradeInfo.Height, storeUpgrades))
// }

func (app *App) upgrade(configurator module.Configurator) {
	app.setupUpgradeHandlers(configurator)
	// app.setupUpgradeStoreLoaders()
}
