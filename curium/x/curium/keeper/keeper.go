package keeper

import (
	"fmt"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/bluzelle/curium/x/curium/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/bluzelle/curium/app/ante/gasmeter"
)

type (
	Keeper struct {
		cdc       codec.BinaryCodec
		storeKey  sdk.StoreKey
		memKey    sdk.StoreKey
		newKeeper gasmeter.GasMeterKeeper
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey sdk.StoreKey,
	memKey sdk.StoreKey,
	newKeeper gasmeter.GasMeterKeeper,
) *Keeper {
	return &Keeper{
		cdc:       cdc,
		storeKey:  storeKey,
		memKey:    memKey,
		newKeeper: newKeeper,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}
