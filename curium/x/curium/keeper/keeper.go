package keeper

import (
	"fmt"

	"github.com/bluzelle/bluzelle-public/curium/app/ante/gasmeter"

	"github.com/cometbft/cometbft/libs/log"

	"github.com/bluzelle/bluzelle-public/curium/x/curium/types"
	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type (
	Keeper struct {
		cdc            codec.BinaryCodec
		storeKey       storetypes.StoreKey
		memKey         storetypes.StoreKey
		GasMeterKeeper *gasmeter.Keeper
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey storetypes.StoreKey,
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
