package tax_test

import (
	"testing"

	keepertest "github.com/bluzelle/curium/testutil/keeper"
	"github.com/bluzelle/curium/testutil/nullify"
	"github.com/bluzelle/curium/x/tax"
	"github.com/bluzelle/curium/x/tax/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{

		GasTaxBp:      10,
		TransferTaxBp: 10,
		TaxCollector:  "tax-collector",

		//Params: types.DefaultParams(),
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.TaxKeeper(t)
	tax.InitGenesis(ctx, *k, genesisState)
	got := tax.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
