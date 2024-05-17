package app

import (
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
)

func (app *App) setupUpgradeHandlers(
	configurator module.Configurator,
) {
	app.UpgradeKeeper.SetUpgradeHandler("bravo", func(ctx sdk.Context, plan upgradetypes.Plan, fromVM module.VersionMap) (module.VersionMap, error) {
		return app.mm.RunMigrations(ctx, configurator, fromVM)
	})
	var storeUpgrades *storetypes.StoreUpgrades

	storeUpgrades = &storetypes.StoreUpgrades{
		Deleted: []string{"faucet"},
	}

	if storeUpgrades != nil {
		app.SetStoreLoader(upgradetypes.UpgradeStoreLoader(30, storeUpgrades))
	}
}
