package v11 // migrations.go

import (
	storetypes "cosmossdk.io/store/types"
	v1 "github.com/bluzelle/bluzelle-public/curium/x/storage/migrations/v1/types"
	"github.com/bluzelle/bluzelle-public/curium/x/storage/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func MigrateStore(ctx sdk.Context, storeKey storetypes.StoreKey, cdc codec.BinaryCodec) error {
	store := ctx.KVStore(storeKey)
	oldStoreIter := store.Iterator(nil, nil)

	for ; oldStoreIter.Valid(); oldStoreIter.Next() {
		key := oldStoreIter.Key()
		oldVal := store.Get(key)
		oldPin := &v1.MsgPin{}
		cdc.MustUnmarshal(oldVal, oldPin)
		newPin := &types.MsgPin{
			Creator: oldPin.Creator,
			Cid:     oldPin.Cid,
			Addrs:   nil,
		}
		store.Delete(key)
		pin := cdc.MustMarshal(newPin)
		store.Set(key, pin)
	}

	return nil
}
