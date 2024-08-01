package tax

import (
	"math/rand"

	"github.com/bluzelle/bluzelle-public/curium/testutil/sample"
	taxsimulation "github.com/bluzelle/bluzelle-public/curium/x/tax/simulation"
	"github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = taxsimulation.FindAccount
	// _ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgSetGasTaxBp = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgSetGasTaxBp int = 100

	opWeightMsgSetTransferTaxBp = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgSetTransferTaxBp int = 100

	opWeightMsgSetTaxCollector = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgSetTaxCollector int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	taxGenesis := types.GenesisState{
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&taxGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
// func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {

// 	return []simtypes.ParamChange{}
// }

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgSetGasTaxBp int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgSetGasTaxBp, &weightMsgSetGasTaxBp, nil,
		func(_ *rand.Rand) {
			weightMsgSetGasTaxBp = defaultWeightMsgSetGasTaxBp
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgSetGasTaxBp,
		taxsimulation.SimulateMsgSetGasTaxBp(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgSetTransferTaxBp int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgSetTransferTaxBp, &weightMsgSetTransferTaxBp, nil,
		func(_ *rand.Rand) {
			weightMsgSetTransferTaxBp = defaultWeightMsgSetTransferTaxBp
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgSetTransferTaxBp,
		taxsimulation.SimulateMsgSetTransferTaxBp(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgSetTaxCollector int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgSetTaxCollector, &weightMsgSetTaxCollector, nil,
		func(_ *rand.Rand) {
			weightMsgSetTaxCollector = defaultWeightMsgSetTaxCollector
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgSetTaxCollector,
		taxsimulation.SimulateMsgSetTaxCollector(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
