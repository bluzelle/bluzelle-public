package keeper

import (
	"fmt"

	"github.com/bluzelle/bluzelle-public/curium/x/curium"
	"github.com/bluzelle/bluzelle-public/curium/x/curium/keeper"

	"github.com/cometbft/cometbft/libs/log"

	"github.com/bluzelle/bluzelle-public/curium/x/faucet/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
)

type (
	Keeper struct {
		cdc           codec.BinaryCodec
		storeKey      sdk.StoreKey
		memKey        sdk.StoreKey
		paramstore    paramtypes.Subspace
		bankKeeper    types.BankKeeper
		keyringReader *curium.KeyRingReader
		broadcastMsg  keeper.MsgBroadcaster
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey sdk.StoreKey,
	ps paramtypes.Subspace,
	bankKeeper types.BankKeeper,
	keyringReader *curium.KeyRingReader,
	msgBroadcaster keeper.MsgBroadcaster,
) *Keeper {
	// set KeyTable if it has not already been set
	if !ps.HasKeyTable() {
		ps = ps.WithKeyTable(types.ParamKeyTable())
	}

	return &Keeper{
		cdc:           cdc,
		storeKey:      storeKey,
		memKey:        memKey,
		paramstore:    ps,
		bankKeeper:    bankKeeper,
		keyringReader: keyringReader,
		broadcastMsg:  msgBroadcaster,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}
