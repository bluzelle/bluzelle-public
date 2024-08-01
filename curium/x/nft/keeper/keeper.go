package keeper

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"

	"github.com/bluzelle/bluzelle-public/curium/x/nft/types"
	log "github.com/cometbft/cometbft/libs/log"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
)

type Keeper struct {
	storeKey   storetypes.StoreKey
	cdc        codec.Codec
	bankKeeper types.BankKeeper
	paramSpace paramstypes.Subspace
}

func NewKeeper(
	cdc codec.Codec,
	key storetypes.StoreKey,
	paramSpace paramstypes.Subspace,
	bankKeeper types.BankKeeper,
) *Keeper {
	// set KeyTable if it has not already been set
	if !paramSpace.HasKeyTable() {
		paramSpace = paramSpace.WithKeyTable(types.ParamKeyTable())
	}

	return &Keeper{
		storeKey:   key,
		cdc:        cdc,
		paramSpace: paramSpace,
		bankKeeper: bankKeeper,
	}
}

// Logger returns a module-specific logger.
func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("go-bluzelle/%s", types.ModuleName))
}
