package v11

import (
	"context"

	upgradetypes "cosmossdk.io/x/upgrade/types"
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
	return func(ctx context.Context, plan upgradetypes.Plan, fromVM module.VersionMap) (module.VersionMap, error) {
		// baseapp.MigrateParams(sdk.UnwrapSDKContext(ctx), baseAppLegacySS, consensusParamsKeeper)

		return mm.RunMigrations(ctx, configurator, fromVM)
	}
}

const UpgradeName = "v11.0"
