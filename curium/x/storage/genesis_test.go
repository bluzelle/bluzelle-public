package storage_test

import (
	"testing"

	keepertest "github.com/bluzelle/curium/testutil/keeper"
	"github.com/bluzelle/curium/x/storage"
	"github.com/bluzelle/curium/x/storage/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.StorageKeeper(t)
	storage.InitGenesis(ctx, *k, genesisState)
	got := storage.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	// this line is used by starport scaffolding # genesis/test/assert
}
