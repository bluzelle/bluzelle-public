package app

import (
	"time"

	"cosmossdk.io/log"
	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
	tmtypes "github.com/cometbft/cometbft/types"
	dbm "github.com/cosmos/cosmos-db"
	"github.com/cosmos/cosmos-sdk/baseapp"
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

type TestAppOptions struct {
}

func (TestAppOptions) Get(_ string) interface{} { return "test" }

func Setup(isCheckTx bool) *App {
	db := dbm.NewMemDB()
	app := NewCuriumApp(log.NewNopLogger(), db, nil, true, map[int64]bool{}, DefaultNodeHome, true, TestAppOptions{}, baseapp.SetChainID("testing"))
	// if !isCheckTx {
	// 	genesisState := NewDefaultGenesisState(curiumparams.MakeTestEncodingConfig().Marshaler)
	// 	stateBytes, err := json.MarshalIndent(genesisState, "", " ")
	// 	if err != nil {
	// 		panic(err)
	// 	}

	// 	app.InitChain(
	// 		&abci.RequestInitChain{
	// 			Validators:      []abci.ValidatorUpdate{},
	// 			ConsensusParams: DefaultConsensusParams,
	// 			AppStateBytes:   stateBytes,
	// 		},
	// 	)
	// }

	return app
}
