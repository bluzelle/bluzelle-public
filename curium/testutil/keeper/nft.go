package keeper

import (
	curiumapp "github.com/bluzelle/bluzelle-public/curium/app"
	"github.com/bluzelle/bluzelle-public/curium/x/nft/keeper"
	"github.com/bluzelle/bluzelle-public/curium/x/nft/types"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	simapp "github.com/cosmos/cosmos-sdk/simapp"
	"github.com/cosmos/cosmos-sdk/store"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	typesparams "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/tendermint/spm/cosmoscmd"
	"github.com/tendermint/tendermint/libs/log"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	tmdb "github.com/tendermint/tm-db"
)

func NftKeeper() (*keeper.Keeper, *bankkeeper.BaseKeeper, *acctypes.AccountKeeper, sdk.Context) {
	storeKey := sdk.NewKVStoreKey(types.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)

	db := tmdb.NewMemDB()
	stateStore := store.NewCommitMultiStore(db)
	stateStore.MountStoreWithDB(storeKey, sdk.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(memStoreKey, sdk.StoreTypeMemory, nil)
	_ = stateStore.LoadLatestVersion()

	registry := codectypes.NewInterfaceRegistry()
	registry.RegisterImplementations((*authtypes.AccountI)(nil), &authtypes.BaseAccount{}, &authtypes.ModuleAccount{})
	cdc := codec.NewProtoCodec(registry)
	paramsSubspace := typesparams.NewSubspace(cdc,
		cosmoscmd.MakeEncodingConfig(curiumapp.ModuleBasics).Amino,
		storeKey,
		memStoreKey,
		types.ModuleName,
	)
	app := simapp.Setup(false)

	//accKey := app.GetKey(authtypes.StoreKey)
	accountKeeper := acctypes.NewAccountKeeper(cdc, storeKey, app.GetSubspace(authtypes.ModuleName),
		authtypes.ProtoBaseAccount, curiumapp.GetMaccPerms())

	bankKeeper := bankkeeper.NewBaseKeeper(
		cdc, storeKey, accountKeeper, app.GetSubspace(banktypes.ModuleName), app.ModuleAccountAddrs(),
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
