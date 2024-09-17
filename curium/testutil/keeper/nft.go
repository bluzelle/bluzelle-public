package keeper

import (
	"testing"

	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"

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

func NftKeeper(t testing.TB) (*keeper.Keeper, *bankkeeper.BaseKeeper, *acctypes.AccountKeeper, sdk.Context) {
	govAuthAddr := authtypes.NewModuleAddress(govtypes.ModuleName)
	govAuthAddrStr := govAuthAddr.String()
	storeKey := sdk.NewKVStoreKey(types.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)
	authStoreKey := sdk.NewKVStoreKey(authtypes.StoreKey)
	bankStoreKey := sdk.NewKVStoreKey(banktypes.StoreKey)

	db := tmdb.NewMemDB()
	stateStore := store.NewCommitMultiStore(db)
	stateStore.MountStoreWithDB(storeKey, storetypes.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(memStoreKey, storetypes.StoreTypeMemory, nil)
	stateStore.MountStoreWithDB(authStoreKey, storetypes.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(bankStoreKey, storetypes.StoreTypeIAVL, db)
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
	maccPerms := map[string][]string{
		types.ModuleName: {authtypes.Minter, authtypes.Burner},
	}
	accountKeeper := acctypes.NewAccountKeeper(cdc, authStoreKey, authtypes.ProtoBaseAccount, maccPerms, sdk.GetConfig().GetBech32AccountAddrPrefix(), govAuthAddrStr)

	maccPermsBool := make(map[string]bool)
	for k := range maccPerms {
		maccPermsBool[k] = true
	}

	bankKeeper := bankkeeper.NewBaseKeeper(
		cdc, bankStoreKey, accountKeeper, maccPermsBool, govAuthAddrStr,
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
