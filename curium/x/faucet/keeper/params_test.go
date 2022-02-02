package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "github.com/bluzelle/curium/testutil/keeper"
	"github.com/bluzelle/curium/x/faucet/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.FaucetKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
	require.EqualValues(t, params.Testnet, k.Testnet(ctx))
}
