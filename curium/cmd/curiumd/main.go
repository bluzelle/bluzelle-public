package main

import (
	"github.com/bluzelle/bluzelle/curium/app"
	appTypes "github.com/bluzelle/bluzelle/curium/app/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/config"
	"github.com/cosmos/cosmos-sdk/client/debug"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/keys"
	"github.com/cosmos/cosmos-sdk/client/rpc"
	"github.com/cosmos/cosmos-sdk/server"
	svrcmd "github.com/cosmos/cosmos-sdk/server/cmd"
	serverconfig "github.com/cosmos/cosmos-sdk/server/config"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	authcmd "github.com/cosmos/cosmos-sdk/x/auth/client/cli"
	"github.com/cosmos/cosmos-sdk/x/auth/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/cosmos/cosmos-sdk/x/crisis"
	genutilcli "github.com/cosmos/cosmos-sdk/x/genutil/client/cli"
	"github.com/spf13/cobra"
	"github.com/spf13/pflag"
	tmcli "github.com/tendermint/tendermint/libs/cli"
	"os"
)

func main() {
	config := sdk.GetConfig()
	config.SetCoinType(appTypes.CoinType)

	rootCmd, _ := NewRootCmd(
		appTypes.Name,
		appTypes.AccountAddressPrefix,
		app.DefaultNodeHome,
		appTypes.Name,
		app.ModuleBasics,
		app.New,
		// this line is used by starport scaffolding # root/arguments
	)

	if err := svrcmd.Execute(rootCmd, app.DefaultNodeHome); err != nil {
		os.Exit(1)
	}

}

type Option func(*rootOptions)

// scaffoldingOptions keeps set of options to apply scaffolding.
type rootOptions struct {
	addSubCmds         []*cobra.Command
	startCmdCustomizer func(*cobra.Command)
}

func newRootOptions(options ...Option) rootOptions {
	opts := rootOptions{}
	opts.apply(options...)
	return opts
}

func (s *rootOptions) apply(options ...Option) {
	for _, o := range options {
		o(s)
	}
}

func NewRootCmd(
	appName,
	accountAddressPrefix,
	defaultNodeHome,
	defaultChainID string,
	moduleBasics module.BasicManager,
	buildApp app.AppBuilder,
	options ...Option,
) (*cobra.Command, app.EncodingConfig) {
	rootOptions := newRootOptions(options...)

	// Set config for prefixes
	SetPrefixes(accountAddressPrefix)

	encodingConfig := app.MakeEncodingConfig(moduleBasics)
	initClientCtx := client.Context{}.
		WithCodec(encodingConfig.Marshaler).
		WithInterfaceRegistry(encodingConfig.InterfaceRegistry).
		WithTxConfig(encodingConfig.TxConfig).
		WithLegacyAmino(encodingConfig.Amino).
		WithInput(os.Stdin).
		WithAccountRetriever(types.AccountRetriever{}).
		WithBroadcastMode(flags.BroadcastBlock).
		WithHomeDir(defaultNodeHome).
		WithViper("")

	rootCmd := &cobra.Command{
		Use:   appName + "d",
		Short: "Stargate CosmosHub CuriumApp",
		PersistentPreRunE: func(cmd *cobra.Command, _ []string) error {
			initClientCtx, err := client.ReadPersistentCommandFlags(initClientCtx, cmd.Flags())
			if err != nil {
				return err
			}
			initClientCtx, err = config.ReadFromClientConfig(initClientCtx)
			if err != nil {
				return err
			}

			if err := client.SetCmdClientContextHandler(initClientCtx, cmd); err != nil {
				return err
			}

			customAppTemplate, customAppConfig := initAppConfig()

			return server.InterceptConfigsPreRunHandler(cmd, customAppTemplate, customAppConfig)
		},
	}

	initRootCmd(
		rootCmd,
		encodingConfig,
		defaultNodeHome,
		moduleBasics,
		buildApp,
		rootOptions,
	)
	overwriteFlagDefaults(rootCmd, map[string]string{
		flags.FlagChainID:        defaultChainID,
		flags.FlagKeyringBackend: "test",
	})

	return rootCmd, encodingConfig
}

func SetPrefixes(accountAddressPrefix string) {
	// Set prefixes
	accountPubKeyPrefix := accountAddressPrefix + "pub"
	validatorAddressPrefix := accountAddressPrefix + "valoper"
	validatorPubKeyPrefix := accountAddressPrefix + "valoperpub"
	consNodeAddressPrefix := accountAddressPrefix + "valcons"
	consNodePubKeyPrefix := accountAddressPrefix + "valconspub"

	// Set and seal config
	config := sdk.GetConfig()
	config.SetBech32PrefixForAccount(accountAddressPrefix, accountPubKeyPrefix)
	config.SetBech32PrefixForValidator(validatorAddressPrefix, validatorPubKeyPrefix)
	config.SetBech32PrefixForConsensusNode(consNodeAddressPrefix, consNodePubKeyPrefix)
	config.Seal()
}

func initAppConfig() (string, interface{}) {

	type WASMConfig struct {
		QueryGasLimit uint64 `mapstructure:"query_gas_limit"`
		LruSize       uint64 `mapstructure:"lru_size"`
	}

	type CustomAppConfig struct {
		serverconfig.Config

		WASM WASMConfig `mapstructure:"wasm"`
	}

	srvCfg := serverconfig.DefaultConfig()
	srvCfg.MinGasPrices = "0stake"

	customAppConfig := CustomAppConfig{
		Config: *srvCfg,
		WASM: WASMConfig{
			LruSize:       1,
			QueryGasLimit: 300000,
		},
	}

	customAppTemplate := serverconfig.DefaultConfigTemplate + `
[wasm]
# This is the maximum sdk gas (wasm and storage) that we allow for any x/wasm "smart" queries
query_gas_limit = 300000
# This is the number of wasm vm instances we keep cached in memory for speed-up
# Warning: this is currently unstable and may lead to crashes, best to keep for 0 unless testing locally
lru_size = 0`

	return customAppTemplate, customAppConfig
}

func queryCommand(moduleBasics module.BasicManager) *cobra.Command {
	cmd := &cobra.Command{
		Use:                        "query",
		Aliases:                    []string{"q"},
		Short:                      "Querying subcommands",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(
		authcmd.GetAccountCmd(),
		rpc.ValidatorCommand(),
		rpc.BlockCommand(),
		authcmd.QueryTxsByEventsCmd(),
		authcmd.QueryTxCmd(),
	)

	moduleBasics.AddQueryCommands(cmd)
	cmd.PersistentFlags().String(flags.FlagChainID, "", "The network chain ID")

	return cmd
}

// txCommand returns the sub-command to send transactions to the app
func txCommand(moduleBasics module.BasicManager) *cobra.Command {
	cmd := &cobra.Command{
		Use:                        "tx",
		Short:                      "Transactions subcommands",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(
		authcmd.GetSignCommand(),
		authcmd.GetSignBatchCommand(),
		authcmd.GetMultiSignCommand(),
		authcmd.GetValidateSignaturesCommand(),
		flags.LineBreak,
		authcmd.GetBroadcastCommand(),
		authcmd.GetEncodeCommand(),
		authcmd.GetDecodeCommand(),
	)

	moduleBasics.AddTxCommands(cmd)
	cmd.PersistentFlags().String(flags.FlagChainID, "", "The network chain ID")

	return cmd
}

func addModuleInitFlags(startCmd *cobra.Command) {
	crisis.AddModuleInitFlags(startCmd)
}

func overwriteFlagDefaults(c *cobra.Command, defaults map[string]string) {
	set := func(s *pflag.FlagSet, key, val string) {
		if f := s.Lookup(key); f != nil {
			f.DefValue = val
			f.Value.Set(val)
		}
	}
	for key, val := range defaults {
		set(c.Flags(), key, val)
		set(c.PersistentFlags(), key, val)
	}
	for _, c := range c.Commands() {
		overwriteFlagDefaults(c, defaults)
	}
}

func initRootCmd(
	rootCmd *cobra.Command,
	encodingConfig app.EncodingConfig,
	defaultNodeHome string,
	moduleBasics module.BasicManager,
	buildApp app.AppBuilder,
	options rootOptions,
) {
	rootCmd.AddCommand(
		genutilcli.InitCmd(moduleBasics, defaultNodeHome),
		genutilcli.CollectGenTxsCmd(banktypes.GenesisBalancesIterator{}, defaultNodeHome),
		genutilcli.MigrateGenesisCmd(),
		genutilcli.GenTxCmd(
			moduleBasics,
			encodingConfig.TxConfig,
			banktypes.GenesisBalancesIterator{},
			defaultNodeHome,
		),
		genutilcli.ValidateGenesisCmd(moduleBasics),
		AddGenesisAccountCmd(defaultNodeHome),
		tmcli.NewCompletionCmd(rootCmd, true),
		debug.Cmd(),
		config.Cmd(),
	)

	a := app.AppCreator{
		encodingConfig,
		buildApp,
	}

	// add server commands
	server.AddCommands(
		rootCmd,
		defaultNodeHome,
		a.NewApp,
		a.AppExport,
		func(cmd *cobra.Command) {
			addModuleInitFlags(cmd)

			if options.startCmdCustomizer != nil {
				options.startCmdCustomizer(cmd)
			}
		},
	)

	// add keybase, auxiliary RPC, query, and tx child commands
	rootCmd.AddCommand(
		rpc.StatusCommand(),
		queryCommand(moduleBasics),
		txCommand(moduleBasics),
		keys.Commands(defaultNodeHome),
	)

	// add user given sub commands.
	for _, cmd := range options.addSubCmds {
		rootCmd.AddCommand(cmd)
	}
}
