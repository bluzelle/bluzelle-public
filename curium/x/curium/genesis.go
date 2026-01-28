package curium

import (
	"github.com/bluzelle/bluzelle-public/curium/x/curium/keeper"
	"github.com/bluzelle/bluzelle-public/curium/x/curium/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	if genState.AdminAddress != "" {
		k.SetAdminAddress(ctx, genState.AdminAddress)
	}
	// this line is used by starport scaffolding # genesis/module/init
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()

	adminAddress := k.GetAdminAddressString(ctx)
	if adminAddress != "" {
		genesis.AdminAddress = adminAddress
	}

	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
