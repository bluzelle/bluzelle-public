package keeper

import (
	"testing"

	simapp "cosmossdk.io/simapp"
	curiumapp "github.com/bluzelle/bluzelle-public/curium/app"
	curiumcmd "github.com/bluzelle/bluzelle-public/curium/cmd/curiumd/cmd"
	"github.com/bluzelle/bluzelle-public/curium/x/nft/keeper"
	"github.com/bluzelle/bluzelle-public/curium/x/nft/types"
	tmdb "github.com/cometbft/cometbft-db"
	"github.com/cometbft/cometbft/libs/log"
	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/store"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	typesparams "github.com/cosmos/cosmos-sdk/x/params/types"
)

func NftKeeper(t *testing.T) (*keeper.Keeper, *bankkeeper.BaseKeeper, *acctypes.AccountKeeper, sdk.Context) {
	govAuthAddr := authtypes.NewModuleAddress(govtypes.ModuleName)
	govAuthAddrStr := govAuthAddr.String()
	storeKey := sdk.NewKVStoreKey(types.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)

	db := tmdb.NewMemDB()
	stateStore := store.NewCommitMultiStore(db)
	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(memStoreKey, storetypes.StoreTypeMemory, nil)
	_ = stateStore.LoadLatestVersion()

	registry := codectypes.NewInterfaceRegistry()
	registry.RegisterImplementations((*authtypes.AccountI)(nil), &authtypes.BaseAccount{}, &authtypes.ModuleAccount{})
	cdc := codec.NewProtoCodec(registry)
	paramsSubspace := typesparams.NewSubspace(cdc,
		curiumcmd.MakeEncodingConfig(curiumapp.ModuleBasics).Amino,
		storeKey,
		memStoreKey,
		types.ModuleName,
	)
	maccPerms := map[string][]string{}
	//accKey := app.GetKey(authtypes.StoreKey)
	accountKeeper := acctypes.NewAccountKeeper(cdc, storeKey, authtypes.ProtoBaseAccount, maccPerms, sdk.GetConfig().GetBech32AccountAddrPrefix(), govAuthAddrStr)

	bankKeeper := bankkeeper.NewBaseKeeper(
		cdc, storeKey, accountKeeper, simapp.BlockedAddresses(), govAuthAddrStr,
	)

	k := keeper.NewKeeper(
		cdc,
		storeKey,
		paramsSubspace,
		bankKeeper,
	)

	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, log.NewNopLogger())

	return k, &bankKeeper, &accountKeeper, ctx
}
