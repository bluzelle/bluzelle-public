package simulation

import (
	"math/rand"

	"github.com/bluzelle/bluzelle-public/curium/x/tax/keeper"
	"github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
)

func SimulateMsgSetTransferTaxBp(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgSetTransferTaxBp{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the SetTransferTaxBp simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "SetTransferTaxBp simulation not implemented"), nil, nil
	}
}
