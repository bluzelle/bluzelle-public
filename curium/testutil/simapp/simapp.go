package simapp

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	"cosmossdk.io/simapp"
	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
)

// // New creates application instance with in-memory database and disabled logging.
// func New(dir string) cosmoscmd.App {
// 	db := tmdb.NewMemDB()
// 	logger := log.NewNopLogger()

// 	encoding := cosmoscmd.MakeEncodingConfig(app.ModuleBasics)

// 	a := app.New(logger, db, nil, true, map[int64]bool{}, dir, 0, encoding,
// 		simapp.EmptyAppOptions{})
// 	// InitChain updates deliverState which is required when app.NewContext is called
// 	a.InitChain(abci.RequestInitChain{
// 		ConsensusParams: defaultConsensusParams,
// 		AppStateBytes:   []byte("{}"),
// 	})

// 	return a
// }

// var defaultConsensusParams = &abci.ConsensusParams{
// 	Block: &abci.BlockParams{
// 		MaxBytes: 200000,
// 		MaxGas:   2000000,
// 	},
// 	Evidence: &tmproto.EvidenceParams{
// 		MaxAgeNumBlocks: 302400,
// 		MaxAgeDuration:  504 * time.Hour, // 3 weeks is the max duration
// 		MaxBytes:        10000,
// 	},
// 	Validator: &tmproto.ValidatorParams{
// 		PubKeyTypes: []string{
// 			tmtypes.ABCIPubKeyTypeEd25519,
// 		},
// 	},
// }

func CreateTestApp(t *testing.T, isCheckTx bool) (*simapp.SimApp, sdk.Context, keeper.AccountKeeper) {
	app := simapp.Setup(t, isCheckTx)
	ctx := app.BaseApp.NewContext(isCheckTx, tmproto.Header{})
	app.AccountKeeper.SetParams(ctx, authtypes.DefaultParams())
	accountKeeper := app.AccountKeeper

	return app, ctx, accountKeeper
}
