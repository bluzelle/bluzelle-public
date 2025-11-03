package faucet_test

//import (
//	"testing"
//
//	keepertest "github.com/bluzelle/bluzelle-public/curium/testutil/keeper"
//	"github.com/bluzelle/bluzelle-public/curium/testutil/nullify"
//	"github.com/bluzelle/bluzelle-public/curium/x/faucet"
//	"github.com/bluzelle/bluzelle-public/curium/x/faucet/types"
//	"github.com/stretchr/testify/require"
//)
//
//func TestGenesis(t *testing.T) {
//	genesisState := types.GenesisState{
//		Params:	types.DefaultParams(),
//
//		// this line is used by starport scaffolding # genesis/test/state
//	}
//
//	k, ctx := keepertest.FaucetKeeper(t)
//	faucet.InitGenesis(ctx, *k, genesisState)
//	got := faucet.ExportGenesis(ctx, *k)
//	require.NotNil(t, got)
//
//	nullify.Fill(&genesisState)
//	nullify.Fill(got)
//
//
//
//	// this line is used by starport scaffolding # genesis/test/assert
//}
