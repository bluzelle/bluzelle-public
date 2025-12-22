package keeper

import (
	"fmt"

	"context"

	"github.com/bluzelle/bluzelle-public/curium/app/ante/gasmeter"

	"cosmossdk.io/log"

	storetypes "cosmossdk.io/store/types"
	"github.com/bluzelle/bluzelle-public/curium/x/curium/types"
	"github.com/cosmos/cosmos-sdk/codec"
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
	cdc codec.Codec,
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

func (k Keeper) Logger(ctx context.Context) log.Logger {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	return sdkCtx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

// GetAdminAddress returns the admin address from the store
func (k Keeper) GetAdminAddress(ctx context.Context) string {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	store := sdkCtx.KVStore(k.storeKey)
	bz := store.Get([]byte(types.AdminAddressKey))
	if bz == nil {
		return ""
	}
	return string(bz)
}

// SetAdminAddress sets the admin address in the store
func (k Keeper) SetAdminAddress(ctx context.Context, adminAddress string) {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	store := sdkCtx.KVStore(k.storeKey)
	store.Set([]byte(types.AdminAddressKey), []byte(adminAddress))
}
