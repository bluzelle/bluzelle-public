package keeper_test

import (
	testutil "github.com/bluzelle/curium/testutil/keeper"
	"github.com/bluzelle/curium/x/tax"
	taxTypes "github.com/bluzelle/curium/x/tax/types"
	gogotypes "github.com/gogo/protobuf/types"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestTaxKeeper(t *testing.T) {

	t.Run("SetTaxInfo should return no error", func(t *testing.T) {
		genesisState := taxTypes.GenesisState{
			GasTaxBp:      10,
			TransferTaxBp: 15,
			TaxCollector:  taxTypes.TaxCollector,
		}
		taxKeeper, ctx := testutil.TaxKeeper(t)
		tax.InitGenesis(ctx, *taxKeeper, genesisState)
		got := tax.ExportGenesis(ctx, *taxKeeper)

		err := taxKeeper.SetTaxInfo(ctx, *got)

		require.Nil(t, err)
	})

	t.Run("GetTaxInfo", func(t *testing.T) {

		t.Run("should return genesis state", func(t *testing.T) {
			taxKeeper, ctx := testutil.TaxKeeper(t)
			gs, err := taxKeeper.GetTaxInfo(ctx)
			require.NotNil(t, gs)
			require.Nil(t, err)
		})

		t.Run("should return the same genesis state that was set", func(t *testing.T) {
			genesisState := taxTypes.GenesisState{
				GasTaxBp:      10,
				TransferTaxBp: 15,
				TaxCollector:  taxTypes.TaxCollector,
			}
			taxKeeper, ctx := testutil.TaxKeeper(t)
			tax.InitGenesis(ctx, *taxKeeper, genesisState)

			err1 := taxKeeper.SetTaxInfo(ctx, genesisState)
			require.Nil(t, err1)

			gs, err2 := taxKeeper.GetTaxInfo(ctx)
			require.NotNil(t, gs)
			require.Nil(t, err2)
			require.Equal(t, genesisState, gs)
		})

	})

	t.Run("GetGasTaxBp should return gas tax basis point", func(t *testing.T) {
		taxKeeper, ctx := testutil.TaxKeeper(t)
		store := taxKeeper.GetKVStore(ctx)
		bz := taxKeeper.GetCodec().MustMarshal(&gogotypes.Int64Value{Value: taxTypes.GasTaxBp})
		store.Set([]byte(taxTypes.KeyGasTaxBp), bz)
		gasTaxBp := taxKeeper.GetGasTaxBp(ctx)

		require.NotNil(t, gasTaxBp.Value)
		require.Equal(t, taxTypes.GasTaxBp, gasTaxBp.Value)
	})

	t.Run("GetTransferTaxBp should return transfer tax basis point", func(t *testing.T) {
		taxKeeper, ctx := testutil.TaxKeeper(t)
		store := taxKeeper.GetKVStore(ctx)
		bz := taxKeeper.GetCodec().MustMarshal(&gogotypes.Int64Value{Value: taxTypes.TransferTaxBp})
		store.Set([]byte(taxTypes.KeyTransferTaxBp), bz)
		transferTaxBp := taxKeeper.GetTransferTaxBp(ctx)

		require.NotNil(t, transferTaxBp.Value)
		require.Equal(t, taxTypes.TransferTaxBp, transferTaxBp.Value)
	})

	t.Run("GetTransferTaxBp should return transfer tax basis point", func(t *testing.T) {
		taxKeeper, ctx := testutil.TaxKeeper(t)
		store := taxKeeper.GetKVStore(ctx)
		bz := taxKeeper.GetCodec().MustMarshal(&gogotypes.Int64Value{Value: taxTypes.TransferTaxBp})
		store.Set([]byte(taxTypes.KeyTransferTaxBp), bz)
		transferTaxBp := taxKeeper.GetTransferTaxBp(ctx)

		require.NotNil(t, transferTaxBp.Value)
		require.Equal(t, taxTypes.TransferTaxBp, transferTaxBp.Value)
	})

	t.Run("GetTaxCollector should return tax collector", func(t *testing.T) {
		taxKeeper, ctx := testutil.TaxKeeper(t)
		expectedAddr, err := taxKeeper.SetTaxCollector(ctx, taxTypes.TaxCollector)
		require.Nil(t, err)
		addr, err := taxKeeper.GetTaxCollector(ctx)
		require.Nil(t, err)
		require.Equal(t, expectedAddr, addr)
	})

}
