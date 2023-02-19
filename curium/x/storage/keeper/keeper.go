package keeper

import (
	"context"
	"fmt"

	curiumipfs "github.com/bluzelle/bluzelle-public/curium/x/storage-ipfs/ipfs"
	"github.com/tendermint/tendermint/libs/log"

	"github.com/bluzelle/bluzelle-public/curium/x/storage/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type (
	Keeper struct {
		Cdc         codec.BinaryCodec
		StoreKey    sdk.StoreKey
		memKey      sdk.StoreKey
		storageDir  string
		storageNode *curiumipfs.StorageIpfsNode
	}
)

func NewKeeper(
	Cdc codec.BinaryCodec,
	StoreKey,
	memKey sdk.StoreKey,
	storageDir string,
	storageNode *curiumipfs.StorageIpfsNode,

) *Keeper {
	return &Keeper{
		Cdc:         Cdc,
		StoreKey:    StoreKey,
		memKey:      memKey,
		storageDir:  storageDir,
		storageNode: storageNode,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func CreateRepoIfNotExist(repoPath string, options curiumipfs.CreateRepoOptions) error {
	if curiumipfs.RepoExists(repoPath) == false {
		return curiumipfs.CreateRepo(repoPath, options)
	}
	return nil
}

func StartStorageNode(repoPath string) (*curiumipfs.StorageIpfsNode, error) {
	node, err := curiumipfs.SpawnStorageIpfsNode(context.Background(), repoPath)
	if err != nil {
		return nil, err
	}
	return node, nil
}

func DoPinFile(addPinFn func(cid string) error, msg *types.MsgPin, store sdk.KVStore, cdc codec.BinaryCodec) {
	go (func() {
		addPinFn(msg.Cid)
	})()
	bz := cdc.MustMarshal(msg)
	store.Set(types.PinKey(*msg), bz)
}

func (k Keeper) PinFile(ctx sdk.Context, msg *types.MsgPin) {
	DoPinFile(
		k.storageNode.AddPin,
		msg,
		ctx.KVStore(k.StoreKey),
		k.Cdc)
}

func (k Keeper) ImportPins(ctx sdk.Context, storage *types.GenesisState) {
	for _, pin := range storage.Pins {
		k.PinFile(ctx, &pin)
	}
}

func (k Keeper) ExportPins(ctx sdk.Context) (pins []types.MsgPin) {
	k.iteratePins(ctx, func(pin types.MsgPin) {
		pins = append(pins, pin)
	})
	return
}

func (k Keeper) iteratePins(ctx sdk.Context, fn func(pin types.MsgPin)) {
	store := ctx.KVStore(k.StoreKey)
	iterator := store.Iterator(nil, nil)
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		val := GetPin(ctx, k, iterator.Key())
		if val != nil {
			fn(*val)
		}
	}
}

func GetPin(ctx sdk.Context, k Keeper, key []byte) (pin *types.MsgPin) {
	pin = &types.MsgPin{}
	store := ctx.KVStore(k.StoreKey)

	bz := store.Get(key)
	if bz == nil {
		return nil
	}

	k.Cdc.MustUnmarshal(bz, pin)
	return pin
}
