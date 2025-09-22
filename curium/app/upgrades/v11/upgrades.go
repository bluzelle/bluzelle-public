package v11

import (
	upgradetypes "cosmossdk.io/x/upgrade/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	consensusparamskeeper "github.com/cosmos/cosmos-sdk/x/consensus/keeper"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
)

func CreateV11UpgradeHandler(
	mm *module.Manager,
	configurator module.Configurator,
	baseAppLegacySS paramstypes.Subspace,
	consensusParamsKeeper *consensusparamskeeper.Keeper,
) upgradetypes.UpgradeHandler {
	return func(ctx sdk.Context, plan upgradetypes.Plan, fromVM module.VersionMap) (module.VersionMap, error) {
		baseapp.MigrateParams(ctx, baseAppLegacySS, consensusParamsKeeper)

		return mm.RunMigrations(ctx, configurator, fromVM)
	}
}

const UpgradeName = "v11.0"
