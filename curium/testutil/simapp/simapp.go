package simapp

import (
	curiumApp "github.com/bluzelle/bluzelle-public/curium/app"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
)

func CreateTestApp() (*curiumApp.App, sdk.Context, keeper.AccountKeeper) {
	app := curiumApp.Setup(true)
	ctx := app.BaseApp.NewContext(true, tmproto.Header{})
	app.AccountKeeper.SetParams(ctx, authtypes.DefaultParams())
	accountKeeper := app.AccountKeeper
	return app, ctx, accountKeeper
}
