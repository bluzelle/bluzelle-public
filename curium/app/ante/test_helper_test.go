package ante_test

import (
	"testing"

	"github.com/cosmos/cosmos-sdk/runtime"

	curiumApp "github.com/bluzelle/bluzelle-public/curium/app"
	appTypes "github.com/bluzelle/bluzelle-public/curium/app/types"

	storetypes "cosmossdk.io/store/types"
	evidencetypes "cosmossdk.io/x/evidence/types"
	"cosmossdk.io/x/feegrant"
	feegrantkeeper "cosmossdk.io/x/feegrant/keeper"
	upgradetypes "cosmossdk.io/x/upgrade/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkante "github.com/cosmos/cosmos-sdk/x/auth/ante"
	authcodec "github.com/cosmos/cosmos-sdk/x/auth/codec"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	authzkeeper "github.com/cosmos/cosmos-sdk/x/authz/keeper"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	distrtypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	slashingtypes "github.com/cosmos/cosmos-sdk/x/slashing/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	capabilitytypes "github.com/cosmos/ibc-go/modules/capability/types"
)

func NewAnteHandlerOptions(t *testing.T) *appTypes.AnteHandlerOptions {
	govAuthAddr := authtypes.NewModuleAddress(govtypes.ModuleName)
	govAuthAddrStr := govAuthAddr.String()
	app := curiumApp.Setup(true)
	appCodec := app.AppCodec()
	keys := storetypes.NewKVStoreKeys(
		authtypes.StoreKey, banktypes.StoreKey, stakingtypes.StoreKey,
		minttypes.StoreKey, distrtypes.StoreKey, slashingtypes.StoreKey,
		govtypes.StoreKey, paramstypes.StoreKey, upgradetypes.StoreKey, feegrant.StoreKey,
		evidencetypes.StoreKey, capabilitytypes.StoreKey, authzkeeper.StoreKey,
	)
	bech32Prefix := sdk.GetConfig().GetBech32AccountAddrPrefix()
	ac := authcodec.NewBech32Codec(bech32Prefix)

	maccPerms := map[string][]string{}
	app.AccountKeeper = authkeeper.NewAccountKeeper(
		appCodec, runtime.NewKVStoreService(keys[authtypes.StoreKey]),
		authtypes.ProtoBaseAccount, maccPerms, ac, bech32Prefix, govAuthAddrStr,
	)
	moduleAccountAddresses := app.ModuleAccountAddrs()

	bankKeeper := bankkeeper.NewBaseKeeper(
		app.AppCodec(),
		runtime.NewKVStoreService(app.GetKey(banktypes.StoreKey)),
		app.AccountKeeper,
		app.BlockedAddresses(moduleAccountAddresses),
		govAuthAddrStr,
		app.Logger(),
	)
	app.BankKeeper = bankKeeper
	app.FeeGrantKeeper = feegrantkeeper.NewKeeper(appCodec, runtime.NewKVStoreService(keys[feegrant.StoreKey]), app.AccountKeeper)

	return &appTypes.AnteHandlerOptions{
		AccountKeeper:   app.AccountKeeper,
		BankKeeper:      bankKeeper,
		FeegrantKeeper:  app.FeeGrantKeeper,
		SignModeHandler: app.TxConfig().SignModeHandler(),
		SigGasConsumer:  sdkante.DefaultSigVerificationGasConsumer,
	}
}
