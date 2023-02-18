package ante

import (
	appTypes "github.com/bluzelle/bluzelle/curium/app/types"
	"github.com/cosmos/cosmos-sdk/simapp"
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
	stakingtypes "github.com/bluzelle/bluzelle/curium/x/staking/types"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
)

func NewAnteHandlerOptions() *appTypes.AnteHandlerOptions {
	app := simapp.Setup(false)
	appCodec := simapp.MakeTestEncodingConfig().Marshaler
	keys := sdk.NewKVStoreKeys(
		authtypes.StoreKey, banktypes.StoreKey, stakingtypes.StoreKey,
		minttypes.StoreKey, distrtypes.StoreKey, slashingtypes.StoreKey,
		govtypes.StoreKey, paramstypes.StoreKey, upgradetypes.StoreKey, feegrant.StoreKey,
		evidencetypes.StoreKey, capabilitytypes.StoreKey, authzkeeper.StoreKey,
	)
	maccPerms := map[string][]string{}

	app.AccountKeeper = authkeeper.NewAccountKeeper(
		appCodec, keys[authtypes.StoreKey], app.GetSubspace(authtypes.ModuleName), authtypes.ProtoBaseAccount, maccPerms,
	)
	bankKeeper := bankkeeper.NewBaseKeeper(
		appCodec, keys[banktypes.StoreKey], app.AccountKeeper, app.GetSubspace(banktypes.ModuleName), app.ModuleAccountAddrs(),
	)
	app.BankKeeper = bankKeeper
	app.FeeGrantKeeper = feegrantkeeper.NewKeeper(appCodec, keys[feegrant.StoreKey], app.AccountKeeper)

	encodingConfig := simapp.MakeTestEncodingConfig()

	return &appTypes.AnteHandlerOptions{
		AccountKeeper:   app.AccountKeeper,
		BankKeeper:      bankKeeper,
		FeegrantKeeper:  app.FeeGrantKeeper,
		SignModeHandler: encodingConfig.TxConfig.SignModeHandler(),
		SigGasConsumer:  sdkante.DefaultSigVerificationGasConsumer,
	}
}
