package simapp

import (
	curiumApp "github.com/bluzelle/bluzelle-public/curium/app"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth/keeper"
)

func CreateTestApp() (*curiumApp.App, sdk.Context, keeper.AccountKeeper) {
	app := curiumApp.Setup(true)
	ctx := app.BaseApp.NewContext(true)
	accountKeeper := app.AccountKeeper
	return app, ctx, accountKeeper
}
