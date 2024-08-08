package ante

import (
	"testing"

	"cosmossdk.io/simapp"
	appTypes "github.com/bluzelle/bluzelle-public/curium/app/types"
	testutil "github.com/bluzelle/bluzelle-public/curium/testutil/simapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkante "github.com/cosmos/cosmos-sdk/x/auth/ante"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	authzkeeper "github.com/cosmos/cosmos-sdk/x/authz/keeper"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	capabilitytypes "github.com/cosmos/cosmos-sdk/x/capability/types"
	distrtypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	evidencetypes "github.com/cosmos/cosmos-sdk/x/evidence/types"
	"github.com/cosmos/cosmos-sdk/x/feegrant"
	feegrantkeeper "github.com/cosmos/cosmos-sdk/x/feegrant/keeper"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	slashingtypes "github.com/cosmos/cosmos-sdk/x/slashing/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
)

func NewAnteHandlerOptions(t *testing.T) *appTypes.AnteHandlerOptions {
	// app := simapp.Setup(t, false)
	govAuthAddr := authtypes.NewModuleAddress(govtypes.ModuleName)
	govAuthAddrStr := govAuthAddr.String()
	app, _, _ := testutil.CreateTestApp(t, false)
	appCodec := app.AppCodec()
	keys := sdk.NewKVStoreKeys(
		authtypes.StoreKey, banktypes.StoreKey, stakingtypes.StoreKey,
		minttypes.StoreKey, distrtypes.StoreKey, slashingtypes.StoreKey,
		govtypes.StoreKey, paramstypes.StoreKey, upgradetypes.StoreKey, feegrant.StoreKey,
		evidencetypes.StoreKey, capabilitytypes.StoreKey, authzkeeper.StoreKey,
	)
	maccPerms := map[string][]string{}
	app.AccountKeeper = authkeeper.NewAccountKeeper(
		appCodec, keys[authtypes.StoreKey], authtypes.ProtoBaseAccount, maccPerms, sdk.GetConfig().GetBech32AccountAddrPrefix(), govAuthAddrStr,
	)
	bankKeeper := bankkeeper.NewBaseKeeper(
		appCodec, keys[banktypes.StoreKey], app.AccountKeeper, simapp.BlockedAddresses(), govAuthAddrStr,
	)
	app.BankKeeper = bankKeeper
	app.FeeGrantKeeper = feegrantkeeper.NewKeeper(appCodec, keys[feegrant.StoreKey], app.AccountKeeper)

	return &appTypes.AnteHandlerOptions{
		AccountKeeper:   app.AccountKeeper,
		BankKeeper:      bankKeeper,
		FeegrantKeeper:  app.FeeGrantKeeper,
		SignModeHandler: app.TxConfig().SignModeHandler(),
		SigGasConsumer:  sdkante.DefaultSigVerificationGasConsumer,
	}
}
