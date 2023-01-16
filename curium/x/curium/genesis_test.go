package curium_test

import (
	"testing"

	keepertest "github.com/bluzelle/bluzelle/curium/testutil/keeper"
	"github.com/bluzelle/bluzelle/curium/x/curium"
	"github.com/bluzelle/bluzelle/curium/x/curium/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.CuriumKeeper(t)
	curium.InitGenesis(ctx, *k, genesisState)
	got := curium.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	// this line is used by starport scaffolding # genesis/test/assert
}
