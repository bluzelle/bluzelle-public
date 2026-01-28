package v12

import (
	"context"

	upgradetypes "cosmossdk.io/x/upgrade/types"
	"github.com/bluzelle/bluzelle-public/curium/app/types/global"
	curiummodulekeeper "github.com/bluzelle/bluzelle-public/curium/x/curium/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
)

func CreateV12UpgradeHandler(
	mm *module.Manager,
	configurator module.Configurator,
	curiumKeeper *curiummodulekeeper.Keeper,
) upgradetypes.UpgradeHandler {
	return func(ctx context.Context, plan upgradetypes.Plan, fromVM module.VersionMap) (module.VersionMap, error) {
		sdkCtx := sdk.UnwrapSDKContext(ctx)

		// Initialize AdminAddress if it's not already set
		// This is the first upgrade where AdminAddress store variable is created in the curium module
		adminAddress := curiumKeeper.GetAdminAddressString(ctx)
		if adminAddress == "" {
			curiumKeeper.SetAdminAddress(ctx, global.AdminAddress)
			sdkCtx.Logger().Info("Initialized AdminAddress in curium module", "address", global.AdminAddress)
		}

		return mm.RunMigrations(ctx, configurator, fromVM)
	}
}

const UpgradeName = "v12.0"
