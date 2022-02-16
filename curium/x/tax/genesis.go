package tax

import (
	"github.com/bluzelle/curium/x/tax/keeper"
	"github.com/bluzelle/curium/x/tax/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// this line is used by starport scaffolding # genesis/module/init
	k.SetGasTaxBp(ctx, genState.GetGasTaxBp())
	k.SetTransferTaxBp(ctx, genState.GetTransferTaxBp())
	k.SetTaxCollector(ctx, genState.GetTaxCollector())
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	info, err := k.GetTaxInfo(ctx)
	if err != nil {
		panic("Invalid tax genesis info")
	}
	return &info
}
