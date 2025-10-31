package app

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
	"path/filepath"

	authcodec "github.com/cosmos/cosmos-sdk/x/auth/codec"

	"cosmossdk.io/client/v2/autocli"
	"cosmossdk.io/core/appmodule"
	tmlog "cosmossdk.io/log"
	"cosmossdk.io/x/tx/signing"
	upgradetypes "cosmossdk.io/x/upgrade/types"
	appAnte "github.com/bluzelle/bluzelle-public/curium/app/ante"
	appkeepers "github.com/bluzelle/bluzelle-public/curium/app/keepers"
	appTypes "github.com/bluzelle/bluzelle-public/curium/app/types"
	abci "github.com/cometbft/cometbft/abci/types"
	tmos "github.com/cometbft/cometbft/libs/os"
	dbm "github.com/cosmos/cosmos-db"
	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/codec/address"
	"github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/server/api"
	"github.com/cosmos/cosmos-sdk/server/config"
	servertypes "github.com/cosmos/cosmos-sdk/server/types"
	"github.com/cosmos/cosmos-sdk/std"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/cosmos/cosmos-sdk/version"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/auth/ante"
	authtx "github.com/cosmos/cosmos-sdk/x/auth/tx"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/cosmos/cosmos-sdk/x/crisis"
	crisistypes "github.com/cosmos/cosmos-sdk/x/crisis/types"
	distrtypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	slashingtypes "github.com/cosmos/cosmos-sdk/x/slashing/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	"github.com/cosmos/gogoproto/proto"
	"github.com/spf13/cast"

	"github.com/bluzelle/bluzelle-public/curium/app/openapiconsole"

	"github.com/bluzelle/bluzelle-public/curium/docs"

	storetypes "cosmossdk.io/store/types"
	faucetmoduletypes "github.com/bluzelle/bluzelle-public/curium/x/faucet/types"
	nfttypes "github.com/bluzelle/bluzelle-public/curium/x/nft/types"

	// this line is used by starport scaffolding # stargate/app/moduleImport

	authsims "github.com/cosmos/cosmos-sdk/x/auth/simulation"

	paramskeeper "github.com/cosmos/cosmos-sdk/x/params/keeper"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"

	tmservice "github.com/cosmos/cosmos-sdk/client/grpc/cmtservice"
	nodeservice "github.com/cosmos/cosmos-sdk/client/grpc/node"

	autocliv1 "cosmossdk.io/api/cosmos/autocli/v1"
	reflectionv1 "cosmossdk.io/api/cosmos/reflection/v1"
	"github.com/cosmos/cosmos-sdk/runtime"
	runtimeservices "github.com/cosmos/cosmos-sdk/runtime/services"
	consensusparamkeeper "github.com/cosmos/cosmos-sdk/x/consensus/keeper"

	// ica "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts"
	// icacontrollerkeeper "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts/controller/keeper"
	// icacontrollertypes "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts/controller/types"
	// icahost "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts/host"
	// icahostkeeper "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts/host/keeper"
	icahosttypes "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts/host/types"
	// icatypes "github.com/cosmos/ibc-go/v10/modules/apps/27-interchain-accounts/types"

	ibctransfertypes "github.com/cosmos/ibc-go/v10/modules/apps/transfer/types"
	ibcexported "github.com/cosmos/ibc-go/v10/modules/core/exported"

	"github.com/cosmos/cosmos-sdk/server"
	sigtypes "github.com/cosmos/cosmos-sdk/types/tx/signing"
	txmodule "github.com/cosmos/cosmos-sdk/x/auth/tx/config"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	ibchooks "github.com/cosmos/ibc-apps/modules/ibc-hooks/v8"
	// providertypes "github.com/cosmos/interchain-security/v7/x/ccv/provider/types"
)

// this line is used by starport scaffolding # stargate/wasm/app/enabledProposals

// func getGovProposalHandlers() []govclient.ProposalHandler {
// 	var govProposalHandlers []govclient.ProposalHandler
// 	// this line is used by starport scaffolding # stargate/app/govProposalHandlers

// 	govProposalHandlers = append(govProposalHandlers,
// 		paramsclient.ProposalHandler,
// 		upgradeclient.LegacyProposalHandler,
// 		upgradeclient.LegacyCancelProposalHandler,
// 		ibcclientclient.UpdateClientProposalHandler,
// 		ibcclientclient.UpgradeProposalHandler,
// 		// this line is used by starport scaffolding # stargate/app/govProposalHandler
// 	)

// 	return govProposalHandlers
// }

var (
	// DefaultNodeHome default home directories for the application daemon
	DefaultNodeHome string

	// ModuleBasics defines the module BasicManager is in charge of setting up basic,
	// non-dependant module elements, such as codec registration
	// and genesis verification.
	// ModuleBasics = module.NewBasicManager(
	// 	auth.AppModuleBasic{},
	// 	genutil.AppModuleBasic{},
	// 	bank.AppModuleBasic{},
	// 	capability.AppModuleBasic{},
	// 	mint.AppModuleBasic{},
	// 	gov.AppModuleBasic{},
	// 	params.AppModuleBasic{},
	// 	crisis.AppModuleBasic{},
	// 	slashing.AppModuleBasic{},
	// 	distr.AppModuleBasic{},
	// 	staking.AppModuleBasic{},
	// 	feegrantmodule.AppModuleBasic{},
	// 	ibc.AppModuleBasic{},
	// 	ibctm.AppModuleBasic{},
	// 	solomachine.AppModuleBasic{},
	// 	upgrade.AppModuleBasic{},
	// 	evidence.AppModuleBasic{},
	// 	transfer.AppModuleBasic{},
	// 	vesting.AppModuleBasic{},
	// 	consensus.AppModuleBasic{},
	// 	authzmodule.AppModuleBasic{},
	// 	curiummodule.AppModuleBasic{},
	// 	storagemodule.AppModuleBasic{},
	// 	faucetmodule.AppModuleBasic{},
	// 	taxmodule.AppModuleBasic{},
	// 	nftmodule.AppModuleBasic{},
	// 	// this line is used by starport scaffolding # stargate/app/moduleBasic
	// )

	// module account permissions

)

// var (
// 	_ cosmoscmd.CosmosApp = (*App)(nil)
// 	_ ServerApplication   = (*App)(nil)
// )

var (
	_ servertypes.Application = (*App)(nil)
	_ runtime.AppI            = (*App)(nil)
)

func init() {
	userHomeDir, err := os.UserHomeDir()
	if err != nil {
		panic(err)
	}

	DefaultNodeHome = filepath.Join(userHomeDir, "."+appTypes.Name)
}

// App extends an ABCI application, but with most of its parameters exported.
// They are exported for convenience in creating helper functions, as object
// capabilities aren't needed for testing.
type App struct {
	*baseapp.BaseApp
	legacyAmino       *codec.LegacyAmino
	appCodec          codec.Codec
	interfaceRegistry types.InterfaceRegistry
	txConfig          client.TxConfig

	//keepers
	appkeepers.AppKeepers
	// this line is used by starport scaffolding # stargate/app/keeperDeclaration
	ConsensusParamsKeeper consensusparamkeeper.Keeper
	HooksICS4Wrapper      ibchooks.ICS4Middleware
	// the module manager
	mm *module.Manager

	// simulation manager
	sm *module.SimulationManager

	ModuleBasics module.BasicManager
	configurator module.Configurator
}

func NewCuriumApp(
	logger tmlog.Logger,
	db dbm.DB,
	traceStore io.Writer,
	loadLatest bool,
	skipUpgradeHeights map[int64]bool,
	homePath string,
	ipfsOn bool,
	appOpts servertypes.AppOptions,
	baseAppOptions ...func(*baseapp.BaseApp),
) *App {
	invCheckPeriod := cast.ToUint(appOpts.Get(server.FlagInvCheckPeriod))
	legacyAmino := codec.NewLegacyAmino()
	interfaceRegistry, err := types.NewInterfaceRegistryWithOptions(types.InterfaceRegistryOptions{
		ProtoFiles: proto.HybridResolver,
		SigningOptions: signing.Options{
			AddressCodec: address.Bech32Codec{
				Bech32Prefix: sdk.GetConfig().GetBech32AccountAddrPrefix(),
			},
			ValidatorAddressCodec: address.Bech32Codec{
				Bech32Prefix: sdk.GetConfig().GetBech32ValidatorAddrPrefix(),
			},
		},
	})

	if err != nil {
		panic(err)
	}
	appCodec := codec.NewProtoCodec(interfaceRegistry)
	txConfig := authtx.NewTxConfig(appCodec, authtx.DefaultSignModes)

	std.RegisterLegacyAminoCodec(legacyAmino)
	std.RegisterInterfaces(interfaceRegistry)

	bApp := baseapp.NewBaseApp(appTypes.Name, logger, db, txConfig.TxDecoder(), baseAppOptions...)
	bApp.SetCommitMultiStoreTracer(traceStore)
	bApp.SetVersion(version.Version)
	bApp.SetInterfaceRegistry(interfaceRegistry)
	bApp.SetTxEncoder(txConfig.TxEncoder())

	app := &App{
		BaseApp:           bApp,
		legacyAmino:       legacyAmino,
		appCodec:          appCodec,
		interfaceRegistry: interfaceRegistry,
		txConfig:          txConfig,
	}

	moduleAccountAddresses := app.ModuleAccountAddrs()
	app.AppKeepers = appkeepers.NewAppKeeper(
		appCodec,
		bApp,
		legacyAmino,
		maccPerms,
		moduleAccountAddresses,
		app.BlockedAddresses(moduleAccountAddresses),
		skipUpgradeHeights,
		homePath,
		invCheckPeriod,
		txConfig,
		ipfsOn,
		logger,
		appOpts,
	)

	// clientKeeper := app.IBCKeeper.ClientKeeper
	// tmLightClientModule := ibctm.NewLightClientModule(appCodec, clientKeeper.GetStoreProvider())
	// clientKeeper.AddRoute(ibctm.ModuleName, &tmLightClientModule)
	/****  Module Options ****/

	// NOTE: we may consider parsing `appOpts` inside module constructors. For the moment
	// we prefer to be more strict in what arguments the modules expect.
	var skipGenesisInvariants = cast.ToBool(appOpts.Get(crisis.FlagSkipGenesisInvariants))

	// NOTE: Any module instantiated in the module manager that is later modified
	// must be passed by reference here.
	app.mm = module.NewManager(
		appModules(app, appCodec, txConfig, skipGenesisInvariants)...,
	)

	app.ModuleBasics = newBasicManagerFromManager(app)
	enabledSignModes := append([]sigtypes.SignMode(nil), authtx.DefaultSignModes...)
	enabledSignModes = append(enabledSignModes, sigtypes.SignMode_SIGN_MODE_TEXTUAL)

	txConfigOpts := authtx.ConfigOptions{
		EnabledSignModes:           enabledSignModes,
		TextualCoinMetadataQueryFn: txmodule.NewBankKeeperCoinMetadataQueryFn(app.BankKeeper),
	}
	txConfig, err = authtx.NewTxConfigWithOptions(
		appCodec,
		txConfigOpts,
	)
	if err != nil {
		panic(err)
	}
	app.txConfig = txConfig
	// During begin block slashing happens after distr.BeginBlocker so that
	// there is nothing left over in the validator fee pool, so as to keep the
	// CanWithdrawInvariant invariant.
	// NOTE: staking module is required if HistoricalEntrie
	//s param > 0
	app.mm.SetOrderPreBlockers(
		upgradetypes.ModuleName,
	)
	app.mm.SetOrderBeginBlockers(
		orderBeginBlockers()...,
	)

	app.mm.SetOrderEndBlockers(
		orderEndBlockers()...,
	)

	// NOTE: The genutils module must occur after staking so that pools are
	// properly initialized with tokens from genesis accounts.
	// NOTE: Capability module must occur first so that it can initialize any capabilities
	// so that other modules that want to create or claim capabilities afterwards in InitChain
	// can do so safely.

	app.mm.SetOrderInitGenesis(
		orderInitBlockers()...,
	// this line is used by starport scaffolding # stargate/app/initGenesis
	)

	app.mm.SetOrderExportGenesis(
		orderInitBlockers()...,
	// this line is used by starport scaffolding # stargate/app/initGenesis
	)

	app.mm.RegisterInvariants(app.CrisisKeeper)
	app.configurator = module.NewConfigurator(app.appCodec, app.MsgServiceRouter(), app.GRPCQueryRouter())
	app.mm.RegisterServices(app.configurator)

	autocliv1.RegisterQueryServer(app.GRPCQueryRouter(), runtimeservices.NewAutoCLIQueryService(app.mm.Modules))
	reflectionSvc, err := runtimeservices.NewReflectionService()
	if err != nil {
		panic(err)
	}
	reflectionv1.RegisterReflectionServiceServer(app.GRPCQueryRouter(), reflectionSvc)

	app.sm = module.NewSimulationManager(simulationModules(app, appCodec)...)

	app.sm.RegisterStoreDecoders()

	// initialize stores
	app.MountKVStores(app.GetKVStoreKey())
	app.MountTransientStores(app.GetTransientStoreKey())
	app.MountMemoryStores(app.GetMemoryStoreKey())

	// initialize BaseApp
	app.SetInitChainer(app.InitChainer)
	app.SetPreBlocker(app.PreBlocker)
	app.SetBeginBlocker(app.BeginBlocker)

	anteHandler, err := appAnte.NewAnteHandler(
		appTypes.AnteHandlerOptions{
			AccountKeeper:   app.AccountKeeper,
			BankKeeper:      app.BankKeeper.(bankkeeper.BaseKeeper),
			TaxKeeper:       app.TaxKeeper,
			SignModeHandler: txConfig.SignModeHandler(),
			FeegrantKeeper:  app.FeeGrantKeeper,
			SigGasConsumer:  ante.DefaultSigVerificationGasConsumer,
			GasMeterKeeper:  app.GasMeterKeeper,
		},
	)
	if err != nil {
		panic(err)
	}

	app.SetAnteHandler(anteHandler)
	app.SetEndBlocker(app.EndBlocker)
	app.upgrade(app.Configurator())
	if loadLatest {
		if err := app.LoadLatestVersion(); err != nil {
			tmos.Exit(err.Error())
		}
	}

	// this line is used by starport scaffolding # stargate/app/beforeInitReturn

	overrideModules := map[string]module.AppModuleSimulation{
		authtypes.ModuleName: auth.NewAppModule(app.appCodec, app.AccountKeeper, authsims.RandomGenesisAccounts, app.GetSubspace(authtypes.ModuleName)),
	}
	app.sm = module.NewSimulationManagerFromAppModules(app.mm.Modules, overrideModules)
	app.sm.RegisterStoreDecoders()

	return app
}

// New returns a reference to an initialized Gaia.
func New(
	logger tmlog.Logger,
	db dbm.DB,
	traceStore io.Writer,
	loadLatest bool,
	skipUpgradeHeights map[int64]bool,
	homePath string,
	ipfsOn bool,
	appOpts servertypes.AppOptions,
	baseAppOptions ...func(*baseapp.BaseApp),
) *App {
	return NewCuriumApp(
		logger,
		db,
		traceStore,
		loadLatest,
		skipUpgradeHeights,
		homePath,
		ipfsOn,
		appOpts,
		baseAppOptions...,
	)
}

// Name returns the name of the App
func (app *App) Name() string { return app.BaseApp.Name() }

// PreBlocker application updates every pre block
func (app *App) PreBlocker(ctx sdk.Context, _ *abci.RequestFinalizeBlock) (*sdk.ResponsePreBlock, error) {
	return app.mm.PreBlock(ctx)
}

// BeginBlocker application updates every begin block
func (app *App) BeginBlocker(ctx sdk.Context) (sdk.BeginBlock, error) {
	return app.mm.BeginBlock(ctx)
}

// EndBlocker application updates every end block
func (app *App) EndBlocker(ctx sdk.Context) (sdk.EndBlock, error) {
	return app.mm.EndBlock(ctx)
}

// InitChainer application update at chain initialization
func (app *App) InitChainer(ctx sdk.Context, req *abci.RequestInitChain) (*abci.ResponseInitChain, error) {
	var genesisState GenesisState
	if err := json.Unmarshal(req.AppStateBytes, &genesisState); err != nil {
		panic(err)
	}

	app.UpgradeKeeper.SetModuleVersionMap(ctx, app.mm.GetVersionMap())
	return app.mm.InitGenesis(ctx, app.appCodec, genesisState)
}

// LoadHeight loads a particular height
func (app *App) LoadHeight(height int64) error {
	return app.LoadVersion(height)
}

// ModuleAccountAddrs returns all the app's module account addresses.
func (app *App) BlockedAddresses(modAccAddrs map[string]bool) map[string]bool {
	// remove module accounts that are ALLOWED to received funds
	delete(modAccAddrs, authtypes.NewModuleAddress(govtypes.ModuleName).String())

	// Remove the ConsumerRewardsPool from the group of blocked recipient addresses in bank
	// delete(modAccAddrs, authtypes.NewModuleAddress(providertypes.ConsumerRewardsPool).String())

	return modAccAddrs
}

// NOTE: This is solely to be used for testing purposes as it may be desirable
// for modules to register their own custom testing types.
func (app *App) LegacyAmino() *codec.LegacyAmino {
	return app.legacyAmino
}

// AppCodec returns Gaia's app codec.
//
// NOTE: This is solely to be used for testing purposes as it may be desirable
// for modules to register their own custom testing types.
func (app *App) AppCodec() codec.Codec {
	return app.appCodec
}

// InterfaceRegistry returns Gaia's InterfaceRegistry
func (app *App) InterfaceRegistry() types.InterfaceRegistry {
	return app.interfaceRegistry
}

// GetKey returns the KVStoreKey for the provided store key.
//
// NOTE: This is solely to be used for testing purposes.
// func (app *App) GetKey(storeKey string) *storetypes.KVStoreKey {
// 	return keys
// }

func (app *App) GetSubspace(moduleName string) paramstypes.Subspace {
	subspace, _ := app.ParamsKeeper.GetSubspace(moduleName)
	return subspace
}

// RegisterAPIRoutes registers all application module routes with the provided
// API server.
func (app *App) RegisterAPIRoutes(apiSvr *api.Server, apiConfig config.APIConfig) {
	clientCtx := apiSvr.ClientCtx
	// rpc.RegisterRoutes(clientCtx, apiSvr.Router)
	// Register legacy tx routes.
	// Register new tx routes from grpc-gateway.
	authtx.RegisterGRPCGatewayRoutes(clientCtx, apiSvr.GRPCGatewayRouter)
	// Register new tendermint queries routes from grpc-gateway.
	tmservice.RegisterGRPCGatewayRoutes(clientCtx, apiSvr.GRPCGatewayRouter)

	// Register legacy and grpc-gateway routes for all modules.
	// ModuleBasics.RegisterRESTRoutes(clientCtx, apiSvr.Router)
	app.ModuleBasics.RegisterGRPCGatewayRoutes(clientCtx, apiSvr.GRPCGatewayRouter)
	nodeservice.RegisterGRPCGatewayRoutes(clientCtx, apiSvr.GRPCGatewayRouter)
	// register app's OpenAPI routes.
	apiSvr.Router.Handle("/static/openapi.yml", http.FileServer(http.FS(docs.Docs)))
	apiSvr.Router.HandleFunc("/", openapiconsole.Handler(appTypes.Name, "/static/openapi.yml"))
}

// RegisterTxService implements the Application.RegisterTxService method.
func (app *App) RegisterTxService(clientCtx client.Context) {
	authtx.RegisterTxService(app.GRPCQueryRouter(), clientCtx, app.BaseApp.Simulate, app.interfaceRegistry)
}

// RegisterTendermintService implements the Application.RegisterTendermintService method.
func (app *App) RegisterTendermintService(clientCtx client.Context) {
	tmservice.RegisterTendermintService(clientCtx, app.GRPCQueryRouter(), app.interfaceRegistry, app.Query)
}

func (app *App) RegisterNodeService(clientCtx client.Context, cfg config.Config) {
	nodeservice.RegisterNodeService(clientCtx, app.GRPCQueryRouter(), cfg)
}

func (app *App) SimulationManager() *module.SimulationManager {
	return app.sm
}

// TxConfig returns App's TxConfig.
func (app *App) TxConfig() client.TxConfig {
	return app.txConfig
}

// ModuleManager returns the app ModuleManager
func (app *App) ModuleManager() *module.Manager {
	return app.mm
}

// Configurator get app configurator
func (app *App) Configurator() module.Configurator {
	return app.configurator
}

// initParamsKeeper init params keeper and its subspaces
func initParamsKeeper(appCodec codec.BinaryCodec, legacyAmino *codec.LegacyAmino, key, tkey storetypes.StoreKey) paramskeeper.Keeper {
	paramsKeeper := paramskeeper.NewKeeper(appCodec, legacyAmino, key, tkey)

	// https://github.com/cosmos/ibc-go/issues/2010
	// Will remove all of these in the future. For now we keep for legacy proposals to work properly.

	paramsKeeper.Subspace(authtypes.ModuleName)
	paramsKeeper.Subspace(banktypes.ModuleName)
	paramsKeeper.Subspace(distrtypes.ModuleName)
	paramsKeeper.Subspace(slashingtypes.ModuleName)
	paramsKeeper.Subspace(govtypes.ModuleName)
	paramsKeeper.Subspace(crisistypes.ModuleName)

	paramsKeeper.Subspace(stakingtypes.ModuleName).WithKeyTable(stakingtypes.ParamKeyTable()) // Used for GlobalFee
	paramsKeeper.Subspace(minttypes.ModuleName)

	// custom
	paramsKeeper.Subspace(faucetmoduletypes.ModuleName)
	paramsKeeper.Subspace(nfttypes.ModuleName)
	paramsKeeper.Subspace(ibctransfertypes.ModuleName)
	paramsKeeper.Subspace(ibcexported.ModuleName)
	paramsKeeper.Subspace(icahosttypes.SubModuleName)

	return paramsKeeper
}

// BlockedAddresses returns all the app's blocked account addresses.
func BlockedAddresses() map[string]bool {
	modAccAddrs := make(map[string]bool)
	for acc := range GetMaccPerms() {
		modAccAddrs[authtypes.NewModuleAddress(acc).String()] = true
	}

	// allow the following addresses to receive funds
	delete(modAccAddrs, authtypes.NewModuleAddress(govtypes.ModuleName).String())

	return modAccAddrs
}

// GetMaccPerms returns a copy of the module account permissions
func GetMaccPerms() map[string][]string {
	return maccPerms
}

// ModuleAccountAddrs returns all the app's module account addresses.
func (app *App) ModuleAccountAddrs() map[string]bool {
	modAccAddrs := make(map[string]bool)
	for acc := range maccPerms {
		modAccAddrs[authtypes.NewModuleAddress(acc).String()] = true
	}

	return modAccAddrs
}

func (app *App) GetTxConfig() client.TxConfig {
	return app.txConfig
}

func (app *App) AutoCliOpts() autocli.AppOptions {
	modules := make(map[string]appmodule.AppModule, 0)
	for _, m := range app.mm.Modules {
		if moduleWithName, ok := m.(module.HasName); ok {
			moduleName := moduleWithName.Name()
			if appModule, ok := moduleWithName.(appmodule.AppModule); ok {
				modules[moduleName] = appModule
			}
		}
	}

	return autocli.AppOptions{
		Modules:               modules,
		AddressCodec:          authcodec.NewBech32Codec(sdk.GetConfig().GetBech32AccountAddrPrefix()),
		ValidatorAddressCodec: authcodec.NewBech32Codec(sdk.GetConfig().GetBech32ValidatorAddrPrefix()),
		ConsensusAddressCodec: authcodec.NewBech32Codec(sdk.GetConfig().GetBech32ConsensusAddrPrefix()),
	}
}
