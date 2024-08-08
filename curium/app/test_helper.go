package app

import (
	"encoding/json"
	"fmt"
	"time"

	curiumcmd "github.com/bluzelle/bluzelle-public/curium/cmd/curiumd/cmd"
	dbm "github.com/cometbft/cometbft-db"
	abci "github.com/cometbft/cometbft/abci/types"
	"github.com/cometbft/cometbft/libs/cli"
	"github.com/cometbft/cometbft/libs/log"
	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
	tmtypes "github.com/cometbft/cometbft/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/testutil"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	bankcli "github.com/cosmos/cosmos-sdk/x/bank/client/cli"
)

var DefaultConsensusParams = &tmproto.ConsensusParams{
	Block: &tmproto.BlockParams{
		MaxBytes: 200000,
		MaxGas:   2000000,
	},
	Evidence: &tmproto.EvidenceParams{
		MaxAgeNumBlocks: 302400,
		MaxAgeDuration:  504 * time.Hour, // 3 weeks is the max duration
		MaxBytes:        10000,
	},
	Validator: &tmproto.ValidatorParams{
		PubKeyTypes: []string{
			tmtypes.ABCIPubKeyTypeEd25519,
		},
	},
}

type EmptyAppOptions struct{}

func (EmptyAppOptions) Get(_ string) interface{} { return nil }

func Setup(isCheckTx bool) *App {
	db := dbm.NewMemDB()
	app := NewCuriumApp(log.NewNopLogger(), db, nil, true, map[int64]bool{}, DefaultNodeHome, 5, curiumcmd.MakeEncodingConfig(ModuleBasics), EmptyAppOptions{}, baseapp.SetChainID("testing"))
	if !isCheckTx {
		genesisState := NewDefaultGenesisState(curiumcmd.MakeEncodingConfig(ModuleBasics).Marshaler)
		stateBytes, err := json.MarshalIndent(genesisState, "", " ")
		if err != nil {
			panic(err)
		}

		app.InitChain(
			abci.RequestInitChain{
				Validators:      []abci.ValidatorUpdate{},
				ConsensusParams: DefaultConsensusParams,
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
