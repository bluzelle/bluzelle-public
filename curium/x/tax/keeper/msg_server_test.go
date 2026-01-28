package keeper_test

import (
	"context"
	"testing"

	"cosmossdk.io/log"
	"cosmossdk.io/store"
	"cosmossdk.io/store/metrics"
	storetypes "cosmossdk.io/store/types"
	keepertest "github.com/bluzelle/bluzelle-public/curium/testutil/keeper"
	"github.com/bluzelle/bluzelle-public/curium/testutil/sample"
	testutil "github.com/bluzelle/bluzelle-public/curium/testutil/simapp"
	"github.com/bluzelle/bluzelle-public/curium/app/ante/gasmeter"
	curiumkeeper "github.com/bluzelle/bluzelle-public/curium/x/curium/keeper"
	"github.com/bluzelle/bluzelle-public/curium/x/tax/keeper"
	"github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/codec/address"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/runtime"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	bankKeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	typesparams "github.com/cosmos/cosmos-sdk/x/params/types"
	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
	dbm "github.com/cosmos/cosmos-db"
	"github.com/stretchr/testify/require"
)

func setupMsgServer(t *testing.T) (types.MsgServer, context.Context) {
	k, ctx := keepertest.TaxKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}

func setupMsgServerWithAdmin(t *testing.T) (types.MsgServer, context.Context, string, string) {
	adminAddress := sample.AccAddress()
	
	// Create a hacked address (different from admin)
	hackedAddress := sample.AccAddress()
	// Ensure hacked address is different from admin
	for hackedAddress == adminAddress {
		hackedAddress = sample.AccAddress()
	}
	
	// Create stores for both curium and tax modules
	curiumStoreKey := storetypes.NewKVStoreKey("curium")
	curiumMemStoreKey := storetypes.NewMemoryStoreKey("mem_curium")
	taxStoreKey := storetypes.NewKVStoreKey(types.StoreKey)
	taxMemStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)
	
	db := dbm.NewMemDB()
	stateStore := store.NewCommitMultiStore(db, log.NewNopLogger(), metrics.NewNoOpMetrics())
	stateStore.MountStoreWithDB(curiumStoreKey, storetypes.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(curiumMemStoreKey, storetypes.StoreTypeMemory, nil)
	stateStore.MountStoreWithDB(taxStoreKey, storetypes.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(taxMemStoreKey, storetypes.StoreTypeMemory, nil)
	require.NoError(t, stateStore.LoadLatestVersion())
	
	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, log.NewNopLogger())
	
	// Create curium keeper
	registry := codectypes.NewInterfaceRegistry()
	cdc := codec.NewProtoCodec(registry)
	gasMeterKeeper := gasmeter.NewGasMeterKeeper()
	curiumK := curiumkeeper.NewKeeper(
		cdc,
		curiumStoreKey,
		curiumMemStoreKey,
		gasMeterKeeper,
	)
	
	// Set admin address in curium keeper
	curiumK.SetAdminAddress(ctx, adminAddress)
	
	// Now create tax keeper with the curium keeper
	govAuthAddr := authtypes.NewModuleAddress(govtypes.ModuleName)
	govAuthAddrStr := govAuthAddr.String()
	
	paramsSubspace := typesparams.NewSubspace(cdc,
		types.Amino,
		taxStoreKey,
		taxMemStoreKey,
		"TaxParams",
	)
	
	app, _, _ := testutil.CreateTestApp()
	bankKeeper := app.BankKeeper.(bankKeeper.BaseKeeper)
	
	bech32Prefix := sdk.GetConfig().GetBech32AccountAddrPrefix()
	ac := address.NewBech32Codec(bech32Prefix)
	accountKeeper := acctypes.NewAccountKeeper(
		cdc,
		runtime.NewKVStoreService(taxStoreKey),
		authtypes.ProtoBaseAccount,
		map[string][]string{},
		ac,
		bech32Prefix,
		govAuthAddrStr,
	)
	
	// Create tax keeper with our curium keeper
	taxK := keeper.NewKeeper(
		cdc,
		taxStoreKey,
		taxMemStoreKey,
		paramsSubspace,
		bankKeeper,
		accountKeeper,
		curiumK,
	)
	
	return keeper.NewMsgServerImpl(*taxK), sdk.WrapSDKContext(ctx), adminAddress, hackedAddress
}

func TestSetTaxCollector_HackedAdminFails(t *testing.T) {
	msgServer, ctx, adminAddress, hackedAddress := setupMsgServerWithAdmin(t)
	
	// Test that admin can set tax collector
	adminMsg := types.NewMsgSetTaxCollector(adminAddress, sample.AccAddress())
	_, err := msgServer.SetTaxCollector(ctx, adminMsg)
	require.NoError(t, err)
	
	// Test that hacked address cannot set tax collector
	hackedMsg := types.NewMsgSetTaxCollector(hackedAddress, sample.AccAddress())
	_, err = msgServer.SetTaxCollector(ctx, hackedMsg)
	require.Error(t, err)
	require.Contains(t, err.Error(), "permission denied")
}

func TestSetTransferTaxBp_HackedAdminFails(t *testing.T) {
	msgServer, ctx, adminAddress, hackedAddress := setupMsgServerWithAdmin(t)
	
	// Test that admin can set transfer tax bp
	adminMsg := types.NewMsgSetTransferTaxBp(adminAddress, 100)
	_, err := msgServer.SetTransferTaxBp(ctx, adminMsg)
	require.NoError(t, err)
	
	// Test that hacked address cannot set transfer tax bp
	hackedMsg := types.NewMsgSetTransferTaxBp(hackedAddress, 200)
	_, err = msgServer.SetTransferTaxBp(ctx, hackedMsg)
	require.Error(t, err)
	require.Contains(t, err.Error(), "permission denied")
}

func TestSetGasTaxBp_HackedAdminFails(t *testing.T) {
	msgServer, ctx, adminAddress, hackedAddress := setupMsgServerWithAdmin(t)
	
	// Test that admin can set gas tax bp
	adminMsg := types.NewMsgSetGasTaxBp(adminAddress, 50)
	_, err := msgServer.SetGasTaxBp(ctx, adminMsg)
	require.NoError(t, err)
	
	// Test that hacked address cannot set gas tax bp
	hackedMsg := types.NewMsgSetGasTaxBp(hackedAddress, 75)
	_, err = msgServer.SetGasTaxBp(ctx, hackedMsg)
	require.Error(t, err)
	require.Contains(t, err.Error(), "permission denied")
}
