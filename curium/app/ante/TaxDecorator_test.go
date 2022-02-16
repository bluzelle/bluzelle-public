package ante_test

import (
	"github.com/bluzelle/curium/app/ante"
	testutil "github.com/bluzelle/curium/testutil/keeper"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestNewTaxDecorator(t *testing.T) {

	t.Run("should return a TaxDecorator", func(t *testing.T) {
		taxKeeper, bankKeeper, accountKeeper, _ := testutil.SetupTaxKeepersAndCtx(t)
		taxDecorator := ante.NewTaxDecorator(accountKeeper, bankKeeper, taxKeeper)
		require.NotNil(t, taxDecorator)
	})

	//t.Run("TaxDecorator Antehandle", func(t *testing.T) {
	//
	//	t.Run("should return context", func(t *testing.T) {
	//		taxKeeper, bankKeeper, accountKeeper, ctx := testutil.SetupTaxKeepersAndCtx(t)
	//		_, pubKey, fromAddr := testdata.KeyTestPubAddr()
	//		_, _, toAddr := testdata.KeyTestPubAddr()
	//		//acc := accountKeeper.NewAccountWithAddress(ctx, fromAddr)
	//		//accountKeeper.SetAccount(ctx, acc)
	//
	//		taxDecorator := ante.NewTaxDecorator(accountKeeper, bankKeeper, taxKeeper)
	//		txBuilder := tx.NewBuilder()
	//		txBuilder.SetMsgs(&banktypes.MsgSend{
	//			FromAddress: fromAddr.String(),
	//			ToAddress:   toAddr.String(),
	//			Amount:      sdk.Coins{sdk.NewInt64Coin(appTypes.Denom, 10)},
	//		})
	//		txBuilder.SetFeePayer(fromAddr)
	//
	//		accSeq := uint64(1)
	//		sigData := &signingtypes.SingleSignatureData{
	//			SignMode: signingtypes.SignMode_SIGN_MODE_DIRECT,
	//		}
	//		sig := signingtypes.SignatureV2{
	//			PubKey:   pubKey,
	//			Data:     sigData,
	//			Sequence: accSeq,
	//		}
	//
	//		txBuilder.SetSignatures(sig)
	//
	//		feeAmount := sdk.NewCoins(sdk.NewInt64Coin(appTypes.Denom, 20))
	//		txBuilder.SetFeeAmount(feeAmount)
	//		tx := txBuilder.GetTx()
	//
	//		nextAnteHandler, _ := ante.NewAnteHandler(*testutilante.NewAnteHandlerOptions())
	//
	//		newCtx, err := taxDecorator.AnteHandle(ctx, tx, false, nextAnteHandler)
	//		require.NotNil(t, newCtx)
	//		require.Nil(t, err)
	//	})
	//
	//})

}
