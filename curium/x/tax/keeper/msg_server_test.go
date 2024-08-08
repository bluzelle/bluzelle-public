package keeper_test

import (
	"context"
	"testing"

	keepertest "github.com/bluzelle/bluzelle-public/curium/testutil/keeper"
	"github.com/bluzelle/bluzelle-public/curium/x/tax/keeper"
	"github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t *testing.T) (types.MsgServer, context.Context) {
	k, ctx := keepertest.TaxKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
