package keeper

import (
	"testing"

	"github.com/bluzelle/bluzelle-public/curium/x/tax"
	"github.com/bluzelle/bluzelle-public/curium/x/tax/keeper"
	"github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	"github.com/bluzelle/simapp"
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
	bankKeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	typesparams "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/stretchr/testify/require"
)

func TaxKeeper(t *testing.T) (*keeper.Keeper, sdk.Context) {
	govAuthAddr := authtypes.NewModuleAddress(govtypes.ModuleName)
	govAuthAddrStr := govAuthAddr.String()
	storeKey := sdk.NewKVStoreKey(types.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)

	db := tmdb.NewMemDB()
	stateStore := store.NewCommitMultiStore(db)
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

	app := simapp.Setup(t, false)
	bankKeeper := app.BankKeeper.(bankkeeper.BaseKeeper)

	maccPerms := map[string][]string{}
	//accKey := app.GetKey(authtypes.StoreKey)
	accountKeeper := acctypes.NewAccountKeeper(cdc, storeKey, authtypes.ProtoBaseAccount, maccPerms, sdk.GetConfig().GetBech32AccountAddrPrefix(), govAuthAddrStr)
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

func GetKeepers(t *testing.T) (*keeper.Keeper, bankKeeper.Keeper, acctypes.AccountKeeper, sdk.Context) {
	//storeKey := sdk.NewKVStoreKey(types.StoreKey)
	govAuthAddr := authtypes.NewModuleAddress(govtypes.ModuleName)
	govAuthAddrStr := govAuthAddr.String()
	storeKey := sdk.NewKVStoreKey(authtypes.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)

	db := tmdb.NewMemDB()
	stateStore := store.NewCommitMultiStore(db)
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

	app := simapp.Setup(t, false)
	bankKeeper := app.BankKeeper.(bankkeeper.BaseKeeper)
	maccPerms := map[string][]string{}
	//accKey := app.GetKey(authtypes.StoreKey)
	accountKeeper := acctypes.NewAccountKeeper(cdc, storeKey, authtypes.ProtoBaseAccount, maccPerms, sdk.GetConfig().GetBech32AccountAddrPrefix(), govAuthAddrStr)

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

func SetupTaxKeepersAndCtx(t *testing.T) (*keeper.Keeper, bankkeeper.Keeper, acctypes.AccountKeeper, sdk.Context) {
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
