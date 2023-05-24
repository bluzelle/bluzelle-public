package app

import (
	"encoding/json"
	"fmt"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/simapp"
	"github.com/cosmos/cosmos-sdk/testutil"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	bankcli "github.com/cosmos/cosmos-sdk/x/bank/client/cli"
	"github.com/tendermint/spm/cosmoscmd"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/libs/cli"
	"github.com/tendermint/tendermint/libs/log"
	dbm "github.com/tendermint/tm-db"
)

func Setup(isCheckTx bool) cosmoscmd.App {
	db := dbm.NewMemDB()
	app := New(log.NewNopLogger(), db, nil, true, map[int64]bool{}, DefaultNodeHome, 5, cosmoscmd.MakeEncodingConfig(ModuleBasics), simapp.EmptyAppOptions{})
	if !isCheckTx {
		genesisState := NewDefaultGenesisState(cosmoscmd.MakeEncodingConfig(ModuleBasics).Marshaler)
		stateBytes, err := json.MarshalIndent(genesisState, "", " ")
		if err != nil {
			panic(err)
		}

		app.InitChain(
			abci.RequestInitChain{
				Validators:      []abci.ValidatorUpdate{},
				ConsensusParams: simapp.DefaultConsensusParams,
				AppStateBytes:   stateBytes,
			},
		)
	}

	return app
}

func QueryBalanceExec(clientCtx client.Context, address string, denom string, extraArgs ...string) (testutil.BufferWriter, error) {
	args := []string{
		address,
		fmt.Sprintf("--%s=%s", bankcli.FlagDenom, denom),
		fmt.Sprintf("--%s=json", cli.OutputFlag),
	}
	args = append(args, extraArgs...)

	return clitestutil.ExecTestCLICmd(clientCtx, bankcli.GetBalancesCmd(), args)
}
