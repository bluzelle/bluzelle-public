package keeper

import (
	"github.com/bluzelle/bluzelle-public/curium/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// GetParamSet returns token params from the global param store
func (k Keeper) GetParamSet(ctx sdk.Context) types.Params {
	var p types.Params
	for _, pair := range p.ParamSetPairs() {
		k.paramSpace.GetIfExists(ctx, pair.Key, pair.Value)
	}
	return p
}

// SetParamSet sets token params to the global param store
func (k Keeper) SetParamSet(ctx sdk.Context, params types.Params) {
	k.paramSpace.SetParamSet(ctx, &params)
}
