package ante

import (
	"fmt"
	appTypes "github.com/bluzelle/curium/app/types"
	taxmodulekeeper "github.com/bluzelle/curium/x/tax/keeper"
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

func forSendMessagesOnly(msgs []sdk.Msg, fn func(msg sdk.Msg)) {
	for _, msg := range msgs {
		if sdk.MsgTypeURL(msg) == sdk.MsgTypeURL(&banktypes.MsgSend{}) {
			fn(msg)
		}
	}
}

func handleTx(ctx sdk.Context, td TaxDecorator, tx FeeTx) error {
	msgs := tx.GetMsgs()

	forSendMessagesOnly(msgs, func(msg sdk.Msg) {
		transferTaxes := calculateTaxesForSendMsg(ctx, td, msg)
		err := chargeTransactionTaxes(ctx, td, transferTaxes, tx)
		if err != nil {
			fmt.Println("ERROR: Can not charge tax")
		}
	})

	return nil
}

func calculateTaxesForSendMsg(ctx sdk.Context, td TaxDecorator, msg sdk.Msg) sdk.Coins {
	info, err := td.taxKeeper.GetTaxInfoKeep(ctx)
	if err != nil {
		return sdk.Coins{}
	}

	transferTaxBp := info.TransferTaxBp
	bankMsg := msg.(*banktypes.MsgSend)
	transferTaxes := sdk.Coins{}
	for _, coin := range bankMsg.Amount {
		feeAmt := coin.Amount.Int64() * transferTaxBp / 10_000
		if feeAmt > 0 {
			transferTax := sdk.NewInt64Coin(appTypes.Denom, feeAmt)
			transferTaxes = append(transferTaxes, transferTax)
		}
	}
	return transferTaxes
}

func chargeTransactionTaxes(ctx sdk.Context, td TaxDecorator, transferTaxes sdk.Coins, tx FeeTx) error {
	taxPayer := tx.FeePayer()
	taxPayerAcc := td.accountKeeper.GetAccount(ctx, taxPayer)
	if taxPayerAcc == nil {
		return sdkerrors.Wrapf(sdkerrors.ErrUnknownAddress, "fee payer address: %s does not exist", taxPayer)
	}

	if len(transferTaxes) > 0 {
		info, err := td.taxKeeper.GetTaxInfoKeep(ctx)
		if err != nil {
			return err
		}
		taxCollector, err := sdk.AccAddressFromBech32(info.TaxCollector)
		if err != nil {
			return err
		}
		if err := td.bankKeeper.SendCoins(ctx, taxPayer, taxCollector, transferTaxes); err != nil {
			return err
		}
	}
	return nil
}
