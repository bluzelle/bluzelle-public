package keeper

import (
	"github.com/bluzelle/bluzelle-public/curium/x/faucet/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// GetParams get all parameters as types.Params
func (k Keeper) GetParams(ctx sdk.Context) types.Params {
	return types.NewParams(
		k.Testnet(ctx),
	)
}

// SetParams set the params
func (k Keeper) SetParams(ctx sdk.Context, params types.Params) {
	k.paramstore.SetParamSet(ctx, &params)
}

// Testnet returns the Testnet param
func (k Keeper) Testnet(ctx sdk.Context) (res string) {
	k.paramstore.Get(ctx, types.KeyTestnet, &res)
	return
}
