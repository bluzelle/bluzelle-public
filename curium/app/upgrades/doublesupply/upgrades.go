package v10

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	consensusparamskeeper "github.com/cosmos/cosmos-sdk/x/consensus/keeper"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
)

func CreateDoubleSupplyUpgradeHandler(
	mm *module.Manager,
	configurator module.Configurator,
	baseAppLegacySS paramstypes.Subspace,
	bankKeeper bankkeeper.Keeper,
	consensusParamsKeeper *consensusparamskeeper.Keeper,
) upgradetypes.UpgradeHandler {
	return func(ctx sdk.Context, plan upgradetypes.Plan, fromVM module.VersionMap) (module.VersionMap, error) {
		baseapp.MigrateParams(ctx, baseAppLegacySS, consensusParamsKeeper)

		fmt.Println("UPGRADE HANDLER FOR 'double_supply' HAS BEEN SET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

		currentSupply := bankkeeper.Keeper.GetSupply(bankKeeper, ctx, "ubnt")
		err := bankKeeper.MintCoins(ctx, minttypes.ModuleName, sdk.NewCoins(sdk.NewCoin("ubnt", currentSupply.Amount)))

		if err != nil {
			println("error doubling supply")
			return nil, err
		}

		return mm.RunMigrations(ctx, configurator, fromVM)
	}
}

const UpgradeName = "double_supply"
