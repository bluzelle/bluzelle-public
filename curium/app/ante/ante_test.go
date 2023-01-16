package ante_test

import (
	"github.com/bluzelle/bluzelle/curium/app/ante"
	testutilante "github.com/bluzelle/bluzelle/curium/testutil/ante"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestAnte(t *testing.T) {

	t.Run("NewAnteHandler should return an antehandler", func(t *testing.T) {

		anteHandler, err := ante.NewAnteHandler(*testutilante.NewAnteHandlerOptions())

		require.NotNil(t, anteHandler)
		require.Nil(t, err)

	})

}
