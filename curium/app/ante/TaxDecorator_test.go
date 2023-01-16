package ante_test

import (
	"github.com/bluzelle/bluzelle/curium/app/ante"
	testutil "github.com/bluzelle/bluzelle/curium/testutil/keeper"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestNewTaxDecorator(t *testing.T) {

	t.Run("should return a TaxDecorator", func(t *testing.T) {
		taxKeeper, bankKeeper, accountKeeper, _ := testutil.SetupTaxKeepersAndCtx(t)
		taxDecorator := ante.NewTaxDecorator(accountKeeper, bankKeeper, taxKeeper)
		require.NotNil(t, taxDecorator)
	})
}
