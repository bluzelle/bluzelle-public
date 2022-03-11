package storage

import (
	"github.com/bluzelle/curium/x/storage/keeper"
	"github.com/bluzelle/curium/x/storage/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// this line is used by starport scaffolding # genesis/module/init
	k.ImportPins(ctx, &types.GenesisState{
		Pins: genState.Pins,
	})
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	// this line is used by starport scaffolding # genesis/module/export
	pins := k.ExportPins(ctx)

	return &types.GenesisState{
		Pins: pins,
	}
}
