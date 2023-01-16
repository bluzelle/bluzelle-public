package types_test

import (
	taxTypes "github.com/bluzelle/bluzelle/curium/x/tax/types"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestGenesisState_Validate(t *testing.T) {

	t.Run("should return error if fee basis point is invalid", func(t *testing.T) {
		gs := taxTypes.GenesisState{
			GasTaxBp:      -1,
			TransferTaxBp: 0,
			TaxCollector:  "",
		}
		err := gs.Validate()
		require.NotNil(t, err)
	})

	t.Run("should return error if transfer basis point is invalid", func(t *testing.T) {
		gs := taxTypes.GenesisState{
			GasTaxBp:      10,
			TransferTaxBp: -1,
			TaxCollector:  "bluzelle197xx52k9tw08e7h0jqahptwucyv3e6pxex3xfe",
		}
		err := gs.Validate()
		require.NotNil(t, err)
	})

	t.Run("should return error if tax collector is empty string", func(t *testing.T) {
		gs := taxTypes.GenesisState{
			GasTaxBp:      10,
			TransferTaxBp: 10,
			TaxCollector:  "",
		}
		err := gs.Validate()
		require.NotNil(t, err)
	})

	t.Run("should return error if tax collector is not prefixed with bluzelle", func(t *testing.T) {
		gs := taxTypes.GenesisState{
			GasTaxBp:      10,
			TransferTaxBp: 10,
			TaxCollector:  "123456781dvc2u4l84hyfeem5fmfm9eyjlndpsycwwfhtln",
		}
		err := gs.Validate()
		require.NotNil(t, err)
	})

	t.Run("should return error if tax collector is not of the correct address length", func(t *testing.T) {
		gs := taxTypes.GenesisState{
			GasTaxBp:      10,
			TransferTaxBp: 10,
			TaxCollector:  "bluzelle197xx52k9tw08e7h0jqahptwucyv3e6pxex3xfe" + "random",
		}
		gs2 := taxTypes.GenesisState{
			GasTaxBp:      10,
			TransferTaxBp: 10,
			TaxCollector:  "bluzelle",
		}
		err := gs.Validate()
		err2 := gs2.Validate()
		require.NotNil(t, err)
		require.NotNil(t, err2)
	})

	t.Run("should return nil if GenesisState is valid", func(t *testing.T) {
		gs := taxTypes.GenesisState{
			GasTaxBp:      10,
			TransferTaxBp: 10,
			TaxCollector:  "bluzelle197xx52k9tw08e7h0jqahptwucyv3e6pxex3xfe",
		}
		err := gs.Validate()
		require.Nil(t, err)
	})

}
