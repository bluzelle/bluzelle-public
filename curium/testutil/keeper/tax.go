package keeper

import (
	"github.com/bluzelle/curium/x/tax"
	"github.com/bluzelle/curium/x/tax/keeper"
	"github.com/bluzelle/curium/x/tax/types"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/simapp"
	"github.com/cosmos/cosmos-sdk/store"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	bankKeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	typesparams "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/stretchr/testify/require"
	"github.com/tendermint/tendermint/libs/log"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	tmdb "github.com/tendermint/tm-db"
	"testing"
)

func TaxKeeper(t testing.TB) (*keeper.Keeper, sdk.Context) {
	storeKey := sdk.NewKVStoreKey(types.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)

	db := tmdb.NewMemDB()
	stateStore := store.NewCommitMultiStore(db)
	stateStore.MountStoreWithDB(storeKey, sdk.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(memStoreKey, sdk.StoreTypeMemory, nil)
	require.NoError(t, stateStore.LoadLatestVersion())

	registry := codectypes.NewInterfaceRegistry()
	cdc := codec.NewProtoCodec(registry)

	paramsSubspace := typesparams.NewSubspace(cdc,
		types.Amino,
		storeKey,
		memStoreKey,
		"TaxParams",
	)

	app := simapp.Setup(false)
	bankKeeper := app.BankKeeper.(bankkeeper.BaseKeeper)

	accKey := app.GetKey(authtypes.StoreKey)
	accountKeeper := acctypes.NewAccountKeeper(cdc, accKey, app.GetSubspace(authtypes.ModuleName),
		authtypes.ProtoBaseAccount, simapp.GetMaccPerms())

	k := keeper.NewKeeper(
		cdc,
		storeKey,
		memStoreKey,
		paramsSubspace,
		bankKeeper,
		accountKeeper,
	)

	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, log.NewNopLogger())

	// Initialize params
	//	k.SetParams(ctx, types.DefaultParams())

	return k, ctx
}

func GetKeepers(t testing.TB) (*keeper.Keeper, bankKeeper.Keeper, acctypes.AccountKeeper, sdk.Context) {
	//storeKey := sdk.NewKVStoreKey(types.StoreKey)
	storeKey := sdk.NewKVStoreKey(authtypes.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)

	db := tmdb.NewMemDB()
	stateStore := store.NewCommitMultiStore(db)
	stateStore.MountStoreWithDB(storeKey, sdk.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(memStoreKey, sdk.StoreTypeMemory, nil)
	require.NoError(t, stateStore.LoadLatestVersion())

	registry := codectypes.NewInterfaceRegistry()
	//registry.RegisterInterface("cosmos.auth.v1beta1.AccountI", (*authtypes.AccountI)(nil))
	registry.RegisterImplementations((*authtypes.AccountI)(nil), &authtypes.BaseAccount{})
	cdc := codec.NewProtoCodec(registry)

	paramsSubspace := typesparams.NewSubspace(cdc,
		types.Amino,
		storeKey,
		memStoreKey,
		"TaxParams",
	)

	app := simapp.Setup(false)
	bankKeeper := app.BankKeeper.(bankkeeper.BaseKeeper)
	accountKeeper := acctypes.NewAccountKeeper(cdc, storeKey, app.GetSubspace(authtypes.ModuleName),
		authtypes.ProtoBaseAccount, simapp.GetMaccPerms())

	//accKey := *app.GetKey(authtypes.StoreKey)
	//accKey := sdk.NewKVStoreKey(authtypes.StoreKey)
	//accountKeeper := acctypes.NewAccountKeeper(cdc, accKey, accountSubspace,
	//	authtypes.ProtoBaseAccount, simapp.GetMaccPerms())
	//stateStore.MountStoreWithDB(accKey, sdk.StoreTypeIAVL, db)

	k := keeper.NewKeeper(
		cdc,
		storeKey,
		memStoreKey,
		paramsSubspace,
		bankKeeper,
		accountKeeper,
	)

	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, log.NewNopLogger())

	// Initialize params
	//	k.SetParams(ctx, types.DefaultParams())

	return k, bankKeeper, accountKeeper, ctx
}

func SetupTaxKeepersAndCtx(t testing.TB) (*keeper.Keeper, bankkeeper.Keeper, acctypes.AccountKeeper, sdk.Context) {
	genesisState := types.GenesisState{
		GasTaxBp:      10,
		TransferTaxBp: 15,
		TaxCollector:  "bluzelle1dvc2u4l84hyfeem5fmfm9eyjlndpsycwwfhtln",
	}
	taxKeeper, bankKeeper, accountKeeper, ctx := GetKeepers(t)
	tax.InitGenesis(ctx, *taxKeeper, genesisState)
	taxKeeper.SetTaxInfoKeep(ctx, &genesisState)

	return taxKeeper, bankKeeper, accountKeeper, ctx
}
