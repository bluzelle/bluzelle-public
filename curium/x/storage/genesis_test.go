package storage_test

import (
	"testing"

	"github.com/bluzelle/bluzelle-public/curium/x/storage/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {

	t.Run("should initialize genesis", func(t *testing.T) {
		genesisState := types.GenesisState{
			Pins: make([]types.MsgPin, 0),
			// this line is used by starport scaffolding # genesis/test/state
		}

		require.NotNil(t, genesisState)

		// this line is used by starport scaffolding # genesis/test/assert
	})

	t.Run("should export genesis", func(t *testing.T) {
		genesisState := types.GenesisState{
			Pins: []types.MsgPin{
				{
					Creator: "my-creator-0",
					Cid:     "my-cid-0",
				},
				{
					Creator: "my-creator-1",
					Cid:     "my-cid-1",
				},
			},
		}

		require.NotNil(t, genesisState)
	})

}
