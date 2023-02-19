package keeper_test

import (
	"testing"

	testutil "github.com/bluzelle/bluzelle-public/curium/testutil/keeper"
	"github.com/bluzelle/bluzelle-public/curium/x/tax"
	taxTypes "github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	"github.com/stretchr/testify/require"
)

func TestTaxKeeper(t *testing.T) {

	t.Run("SetTaxInfo should return no error", func(t *testing.T) {
		genesisState := taxTypes.GenesisState{
			GasTaxBp:      10,
			TransferTaxBp: 15,
			TaxCollector:  "tax-collector",
		}
		taxKeeper, ctx := testutil.TaxKeeper(t)
		tax.InitGenesis(ctx, *taxKeeper, genesisState)
		got := tax.ExportGenesis(ctx, *taxKeeper)

		err := taxKeeper.SetTaxInfoKeep(ctx, got)

		require.Nil(t, err)
	})

	t.Run("GetTaxInfoKeep", func(t *testing.T) {

		t.Run("should return genesis state", func(t *testing.T) {
			taxKeeper, ctx := testutil.TaxKeeper(t)
			gs, err := taxKeeper.GetTaxInfoKeep(ctx)
			require.NotNil(t, gs)
			require.Nil(t, err)
		})

		t.Run("should return the same genesis state that was set", func(t *testing.T) {
			genesisState := taxTypes.GenesisState{
				GasTaxBp:      10,
				TransferTaxBp: 15,
				TaxCollector:  "tax-collector",
			}
			taxKeeper, ctx := testutil.TaxKeeper(t)
			tax.InitGenesis(ctx, *taxKeeper, genesisState)

			err1 := taxKeeper.SetTaxInfoKeep(ctx, &genesisState)
			require.Nil(t, err1)

			gs, err2 := taxKeeper.GetTaxInfoKeep(ctx)
			require.NotNil(t, gs)
			require.Nil(t, err2)
			require.Equal(t, genesisState, gs)
		})

	})

}
