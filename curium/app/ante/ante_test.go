package ante_test

import (
	"testing"

	"github.com/bluzelle/bluzelle-public/curium/app/ante"
	testutilante "github.com/bluzelle/bluzelle-public/curium/testutil/ante"
	"github.com/stretchr/testify/require"
)

func TestAnte(t *testing.T) {

	t.Run("NewAnteHandler should return an antehandler", func(t *testing.T) {

		anteHandler, err := ante.NewAnteHandler(*testutilante.NewAnteHandlerOptions())

		require.NotNil(t, anteHandler)
		require.Nil(t, err)

	})

}
