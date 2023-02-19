package ante_test

import (
	"testing"

	"github.com/bluzelle/bluzelle-public/curium/app/ante"
	testutil "github.com/bluzelle/bluzelle-public/curium/testutil/keeper"
	"github.com/stretchr/testify/require"
)

func TestNewTaxDecorator(t *testing.T) {

	t.Run("should return a TaxDecorator", func(t *testing.T) {
		taxKeeper, bankKeeper, accountKeeper, _ := testutil.SetupTaxKeepersAndCtx(t)
		taxDecorator := ante.NewTaxDecorator(accountKeeper, bankKeeper, taxKeeper)
		require.NotNil(t, taxDecorator)
	})
}
