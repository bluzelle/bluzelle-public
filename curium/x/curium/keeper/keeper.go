package keeper

import (
	"fmt"

	"github.com/bluzelle/bluzelle-public/curium/app/ante/gasmeter"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/bluzelle/bluzelle-public/curium/x/curium/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type (
	Keeper struct {
		cdc            codec.BinaryCodec
		storeKey       sdk.StoreKey
		memKey         sdk.StoreKey
		GasMeterKeeper *gasmeter.Keeper
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey sdk.StoreKey,
	gasMeterKeeper *gasmeter.Keeper,
) *Keeper {
	return &Keeper{
		cdc:            cdc,
		storeKey:       storeKey,
		memKey:         memKey,
		GasMeterKeeper: gasMeterKeeper,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}
