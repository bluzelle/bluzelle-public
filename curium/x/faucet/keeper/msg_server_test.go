package keeper_test

import (
	"context"
	"testing"

	keepertest "github.com/bluzelle/bluzelle-public/curium/testutil/keeper"
	"github.com/bluzelle/bluzelle-public/curium/x/faucet/keeper"
	"github.com/bluzelle/bluzelle-public/curium/x/faucet/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.FaucetKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
