package keeper

import (
	"testing"

	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"

	"cosmossdk.io/log"
	"cosmossdk.io/store"
	"cosmossdk.io/store/metrics"
	storetypes "cosmossdk.io/store/types"
	curiumapp "github.com/bluzelle/bluzelle-public/curium/app"
	curiumcmd "github.com/bluzelle/bluzelle-public/curium/cmd/curiumd/cmd"
	"github.com/bluzelle/bluzelle-public/curium/x/nft/keeper"
	"github.com/bluzelle/bluzelle-public/curium/x/nft/types"
	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
	dbm "github.com/cosmos/cosmos-db"
	"github.com/cosmos/cosmos-sdk/codec/address"
	"github.com/cosmos/cosmos-sdk/runtime"
	sdk "github.com/cosmos/cosmos-sdk/types"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	typesparams "github.com/cosmos/cosmos-sdk/x/params/types"
)

func NftKeeper(t testing.TB) (*keeper.Keeper, *bankkeeper.BaseKeeper, *acctypes.AccountKeeper, sdk.Context) {
	testAddr := authtypes.NewModuleAddress("").String()
	storeKey := storetypes.NewKVStoreKey(types.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)
	authStoreKey := storetypes.NewKVStoreKey(authtypes.StoreKey)
	bankStoreKey := storetypes.NewKVStoreKey(banktypes.StoreKey)

	db := dbm.NewMemDB()
	stateStore := store.NewCommitMultiStore(db, log.NewNopLogger(), metrics.NewNoOpMetrics())
	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(memStoreKey, storetypes.StoreTypeMemory, nil)
	stateStore.MountStoreWithDB(authStoreKey, storetypes.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(bankStoreKey, storetypes.StoreTypeIAVL, db)
	_ = stateStore.LoadLatestVersion()

	// Create a test app to get proper codec and module basics
	testApp := curiumapp.Setup(true)
	cdc := testApp.AppCodec()
	paramsSubspace := typesparams.NewSubspace(cdc,
		curiumcmd.MakeEncodingConfig(testApp.ModuleBasics).Amino,
		storeKey,
		memStoreKey,
		types.ModuleName,
	)
	maccPerms := map[string][]string{
		types.ModuleName: {authtypes.Minter, authtypes.Burner},
	}
	bech32Prefix := sdk.GetConfig().GetBech32AccountAddrPrefix()
	ac := address.NewBech32Codec(bech32Prefix)
	accountKeeper := acctypes.NewAccountKeeper(
		cdc,
		runtime.NewKVStoreService(authStoreKey),
		authtypes.ProtoBaseAccount,
		maccPerms,
		ac,
		bech32Prefix,
		testAddr,
	)

	maccPermsBool := make(map[string]bool)
	for k := range maccPerms {
		maccPermsBool[k] = true
	}

	bankKeeper := bankkeeper.NewBaseKeeper(
		cdc,
		runtime.NewKVStoreService(bankStoreKey),
		accountKeeper,
		maccPermsBool,
		testAddr,
		log.NewNopLogger(),
	)

	k := keeper.NewKeeper(
		cdc,
		storeKey,
		paramsSubspace,
		bankKeeper,
	)

	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, log.NewNopLogger())

	nftModuleAccount := authtypes.NewEmptyModuleAccount(types.ModuleName, authtypes.Minter, authtypes.Burner)
	accountKeeper.SetModuleAccount(ctx, nftModuleAccount)

	return k, &bankKeeper, &accountKeeper, ctx
}
