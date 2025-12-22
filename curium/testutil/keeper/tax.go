package keeper

import (
	"testing"

	"cosmossdk.io/log"
	"cosmossdk.io/store"
	"cosmossdk.io/store/metrics"
	storetypes "cosmossdk.io/store/types"
	testutil "github.com/bluzelle/bluzelle-public/curium/testutil/simapp"
	"github.com/bluzelle/bluzelle-public/curium/x/tax"
	"github.com/bluzelle/bluzelle-public/curium/x/tax/keeper"
	"github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
	dbm "github.com/cosmos/cosmos-db"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/codec/address"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/runtime"
	sdk "github.com/cosmos/cosmos-sdk/types"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	bankKeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	typesparams "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/stretchr/testify/require"
)

func TaxKeeper(t *testing.T) (*keeper.Keeper, sdk.Context) {
	govAuthAddr := authtypes.NewModuleAddress(govtypes.ModuleName)
	govAuthAddrStr := govAuthAddr.String()
	storeKey := storetypes.NewKVStoreKey(types.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)

	db := dbm.NewMemDB()
	stateStore := store.NewCommitMultiStore(db, log.NewNopLogger(), metrics.NewNoOpMetrics())
	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(memStoreKey, storetypes.StoreTypeMemory, nil)
	require.NoError(t, stateStore.LoadLatestVersion())

	registry := codectypes.NewInterfaceRegistry()
	cdc := codec.NewProtoCodec(registry)

	paramsSubspace := typesparams.NewSubspace(cdc,
		types.Amino,
		storeKey,
		memStoreKey,
		"TaxParams",
	)

	app, _, _ := testutil.CreateTestApp()
	bankKeeper := app.BankKeeper.(bankKeeper.BaseKeeper)

	maccPerms := map[string][]string{}
	//accKey := app.GetKey(authtypes.StoreKey)
	bech32Prefix := sdk.GetConfig().GetBech32AccountAddrPrefix()
	ac := address.NewBech32Codec(bech32Prefix)
	accountKeeper := acctypes.NewAccountKeeper(
		cdc,
		runtime.NewKVStoreService(storeKey),
		authtypes.ProtoBaseAccount,
		maccPerms,
		ac,
		bech32Prefix,
		govAuthAddrStr,
	)

	// Create a curium keeper for testing
	curiumK, _ := CuriumKeeper(t)
	k := keeper.NewKeeper(
		cdc,
		storeKey,
		memStoreKey,
		paramsSubspace,
		bankKeeper,
		accountKeeper,
		curiumK,
	)

	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, log.NewNopLogger())

	// Initialize params
	//	k.SetParams(ctx, types.DefaultParams())

	return k, ctx
}

func GetKeepers(t *testing.T) (*keeper.Keeper, bankKeeper.Keeper, acctypes.AccountKeeper, sdk.Context) {
	//storeKey := sdk.NewKVStoreKey(types.StoreKey)
	govAuthAddr := authtypes.NewModuleAddress(govtypes.ModuleName)
	govAuthAddrStr := govAuthAddr.String()
	storeKey := storetypes.NewKVStoreKey(authtypes.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)

	db := dbm.NewMemDB()
	stateStore := store.NewCommitMultiStore(db, log.NewNopLogger(), metrics.NewNoOpMetrics())
	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(memStoreKey, storetypes.StoreTypeMemory, nil)
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

	app, _, _ := testutil.CreateTestApp()
	bankKeeper := app.BankKeeper.(bankKeeper.BaseKeeper)
	maccPerms := map[string][]string{}
	//accKey := app.GetKey(authtypes.StoreKey)
	bech32Prefix := sdk.GetConfig().GetBech32AccountAddrPrefix()
	ac := address.NewBech32Codec(bech32Prefix)
	accountKeeper := acctypes.NewAccountKeeper(
		cdc,
		runtime.NewKVStoreService(storeKey),
		authtypes.ProtoBaseAccount,
		maccPerms,
		ac,
		bech32Prefix,
		govAuthAddrStr,
	)

	//accKey := *app.GetKey(authtypes.StoreKey)
	//accKey := sdk.NewKVStoreKey(authtypes.StoreKey)
	//accountKeeper := acctypes.NewAccountKeeper(cdc, accKey, accountSubspace,
	//	authtypes.ProtoBaseAccount, simapp.GetMaccPerms())
	//stateStore.MountStoreWithDB(accKey, sdk.StoreTypeIAVL, db)

	// Create a curium keeper for testing
	curiumK, _ := CuriumKeeper(t)
	k := keeper.NewKeeper(
		cdc,
		storeKey,
		memStoreKey,
		paramsSubspace,
		bankKeeper,
		accountKeeper,
		curiumK,
	)

	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, log.NewNopLogger())

	// Initialize params
	//	k.SetParams(ctx, types.DefaultParams())

	return k, bankKeeper, accountKeeper, ctx
}

func SetupTaxKeepersAndCtx(t *testing.T) (*keeper.Keeper, bankKeeper.Keeper, acctypes.AccountKeeper, sdk.Context) {
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
