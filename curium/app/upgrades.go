package app

import (
	upgrade "github.com/bluzelle/bluzelle-public/curium/app/upgrades/v12"
	"github.com/cosmos/cosmos-sdk/types/module"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	ibctransfertypes "github.com/cosmos/ibc-go/v8/modules/apps/transfer/types"
	clienttypes "github.com/cosmos/ibc-go/v8/modules/core/02-client/types"
	connectiontypes "github.com/cosmos/ibc-go/v8/modules/core/03-connection/types"
	ibcexported "github.com/cosmos/ibc-go/v8/modules/core/exported"
)

// NOTE: This upgrade defines a reference implementation of what an upgrade
// could look like when an application is migrating from Cosmos SDK version
// v0.45.x to v0.47.x.

func (app *App) setupUpgradeHandlers(
	configurator module.Configurator,
) {
	// Fix IBC module parameters before migration
	// This is required for v0.47 to v0.50 upgrade

	// Fix IBC core module parameters
	ibcSubspace, exists := app.ParamsKeeper.GetSubspace(ibcexported.ModuleName)
	if exists && !ibcSubspace.HasKeyTable() {
		// Create parameter key table for IBC core module with required parameters
		keyTable := paramstypes.NewKeyTable()

		// Register client parameters (includes AllowedClients)
		keyTable.RegisterParamSet(&clienttypes.Params{})

		// Register connection parameters (includes MaxExpectedTimePerBlock)
		keyTable.RegisterParamSet(&connectiontypes.Params{})

		ibcSubspace.WithKeyTable(keyTable)
	}

	// Fix IBC transfer module parameters
	transferSubspace, exists := app.ParamsKeeper.GetSubspace(ibctransfertypes.ModuleName)
	if exists && !transferSubspace.HasKeyTable() {
		// Create parameter key table for IBC transfer module
		keyTable := paramstypes.NewKeyTable()

		// Register transfer parameters (includes SendEnabled)
		keyTable.RegisterParamSet(&ibctransfertypes.Params{})

		transferSubspace.WithKeyTable(keyTable)
	}

	app.UpgradeKeeper.SetUpgradeHandler(upgrade.UpgradeName, upgrade.CreateV12UpgradeHandler(app.mm, configurator))
}

func (app *App) setupUpgradeStoreLoaders() {
	// No store upgrades needed for v0.47 to v0.50 migration
	// Crisis and consensus stores already exist from previous upgrades
}

func (app *App) upgrade(configurator module.Configurator) {
	app.setupUpgradeHandlers(configurator)
	app.setupUpgradeStoreLoaders()
}
