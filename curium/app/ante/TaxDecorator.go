package ante

import (
	"fmt"
	taxmodulekeeper "github.com/bluzelle/bluzelle-public/curium/x/tax/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
)

type TaxDecorator struct {
	accountKeeper acctypes.AccountKeeper
	bankKeeper    bankkeeper.Keeper
	taxKeeper     *taxmodulekeeper.Keeper
}

func NewTaxDecorator(accountKeeper acctypes.AccountKeeper, bankKeeper bankkeeper.Keeper, taxKeeper *taxmodulekeeper.Keeper) TaxDecorator {
	return TaxDecorator{
		accountKeeper: accountKeeper,
		bankKeeper:    bankKeeper,
		taxKeeper:     taxKeeper,
	}
}

// FeeTx defines the interface to be implemented by Tx to use the FeeDecorators
type FeeTx interface {
	sdk.Tx
	GetGas() uint64
	GetFee() sdk.Coins
	FeePayer() sdk.AccAddress
}

func (td TaxDecorator) AnteHandle(ctx sdk.Context, tx sdk.Tx, simulate bool, next sdk.AnteHandler) (newCtx sdk.Context, err error) {
	if !simulate && ctx.BlockHeight() > 0 {

		feeTx, ok := tx.(FeeTx)
		if !ok {
			return ctx, sdkerrors.Wrap(sdkerrors.ErrTxDecode, "Tx must be a FeeTx")
		}

		if err := handleTx(ctx, td, feeTx); err != nil {
			return ctx, err
		}

	}
	return next(ctx, tx, simulate)
}

func validateTx(ctx sdk.Context, td TaxDecorator, taxPayer sdk.AccAddress, msg sdk.Msg) error {
	if _, err := td.taxKeeper.CalculateTransferTax(ctx, taxPayer, msg); err != nil {
		return err
	}
	return nil
}

func handleTx(ctx sdk.Context, td TaxDecorator, tx FeeTx) error {
	msgs := tx.GetMsgs()
	taxPayer := tx.FeePayer()
	err := forSendMessagesOnly(msgs, func(msg sdk.Msg) error {
		if err := validateTx(ctx, td, taxPayer, msg); err != nil {
			return err
		}
		if err := td.taxKeeper.ChargeTransferTax(ctx, taxPayer, msg); err != nil {
			return fmt.Errorf("ERROR: Can not charge tax")
		}
		return nil
	})
	if err != nil {
		return err
	}

	return nil
}

func forSendMessagesOnly(msgs []sdk.Msg, fn func(msg sdk.Msg) error) error {
	for _, msg := range msgs {
		if sdk.MsgTypeURL(msg) == sdk.MsgTypeURL(&banktypes.MsgSend{}) {
			if err := fn(msg); err != nil {
				return err
			}
		}
	}
	return nil
}
