package simapp

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	"github.com/bluzelle/simapp"
	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
)

func CreateTestApp(t *testing.T, isCheckTx bool) (*simapp.SimApp, sdk.Context, keeper.AccountKeeper) {
	app := simapp.Setup(t, isCheckTx)
	ctx := app.BaseApp.NewContext(isCheckTx, tmproto.Header{})
	app.AccountKeeper.SetParams(ctx, authtypes.DefaultParams())
	accountKeeper := app.AccountKeeper
	return app, ctx, accountKeeper
}
