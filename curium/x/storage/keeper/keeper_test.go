package keeper_test

import (
	testUtilKeeper "github.com/bluzelle/curium/testutil/keeper"
	"github.com/bluzelle/curium/x/storage/keeper"
	"github.com/bluzelle/curium/x/storage/types"
	"github.com/stretchr/testify/require"
	"testing"
	"time"
)

func TestStorageKeeper(t *testing.T) {

	t.Run("should add pin to storage node", func(t *testing.T) {

		pin := types.MsgPin{
			Creator: "my-creator",
			Cid:     "my-cid",
		}

		waiter := make(chan string)

		storageKeeper, ctx := testUtilKeeper.StorageKeeper(t)
		store := ctx.KVStore(storageKeeper.StoreKey)

		go func() {
			var passedCid string
			addPinMock := func(cid string) error {
				passedCid = cid
				return nil
			}

			keeper.DoPinFile(addPinMock, &pin, store, storageKeeper.Cdc)

			counter := 0
			for true {
				if passedCid == pin.Cid {
					waiter <- passedCid
					close(waiter)
				}
				counter++
				if counter > 10 {
					waiter <- ""
					close(waiter)
				}
				time.Sleep(time.Second)
			}
		}()

		require.Equal(t, pin.Cid, <-waiter)
	})

	t.Run("should store pin", func(t *testing.T) {
		pin := types.MsgPin{
			Creator: "my-creator",
			Cid:     "my-cid",
		}

		addPinMock := func(cid string) error {
			return nil
		}

		storageKeeper, ctx := testUtilKeeper.StorageKeeper(t)
		store := ctx.KVStore(storageKeeper.StoreKey)

		require.NotPanics(t, func() {
			keeper.DoPinFile(addPinMock, &pin, store, storageKeeper.Cdc)
		})
	})

	t.Run("should get pin from kvstore", func(t *testing.T) {
		pin := types.MsgPin{
			Creator: "my-creator",
			Cid:     "my-cid",
		}

		addPinMock := func(cid string) error {
			return nil
		}

		storageKeeper, ctx := testUtilKeeper.StorageKeeper(t)
		store := ctx.KVStore(storageKeeper.StoreKey)
		keeper.DoPinFile(addPinMock, &pin, store, storageKeeper.Cdc)
		key := types.PinKey(pin)

		pinReturned := keeper.GetPin(ctx, *storageKeeper, key)
		require.Equal(t, pin, *pinReturned)
	})

	t.Run("should export pins", func(t *testing.T) {
		storageKeeper, ctx := testUtilKeeper.StorageKeeper(t)
		store := ctx.KVStore(storageKeeper.StoreKey)
		addPinMock := func(cid string) error {
			return nil
		}

		pin0 := types.MsgPin{
			Creator: "my-creator-0",
			Cid:     "my-cid-0",
		}
		keeper.DoPinFile(addPinMock, &pin0, store, storageKeeper.Cdc)

		pin1 := types.MsgPin{
			Creator: "my-creator-1",
			Cid:     "my-cid-1",
		}
		keeper.DoPinFile(addPinMock, &pin1, store, storageKeeper.Cdc)

		pins := storageKeeper.ExportPins(ctx)
		require.NotNil(t, pins)
		require.Equal(t, []types.MsgPin{pin0, pin1}, pins)
	})

}
