package ante_test

import (
	"github.com/bluzelle/bluzelle/curium/app/ante"
	"github.com/bluzelle/bluzelle/curium/app/ante/gasmeter"
	appTypes "github.com/bluzelle/bluzelle/curium/app/types"
	"github.com/bluzelle/bluzelle/curium/app/types/global"
	testutilante "github.com/bluzelle/bluzelle/curium/testutil/ante"
	testutil "github.com/bluzelle/bluzelle/curium/testutil/simapp"
	"github.com/bluzelle/bluzelle/curium/testutil/tx"
	"github.com/bluzelle/bluzelle/curium/x/faucet/types"
	taxmodulekeeper "github.com/bluzelle/bluzelle/curium/x/tax/keeper"
	taxmoduletypes "github.com/bluzelle/bluzelle/curium/x/tax/types"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	"github.com/cosmos/cosmos-sdk/testutil/testdata"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	sdkante "github.com/cosmos/cosmos-sdk/x/auth/ante"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	typesparams "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestNewSetupContextDecorator(t *testing.T) {

	txBuilder := tx.NewBuilder()
	txBuilder.SetGasLimit(20)

	_, _, addr := testdata.KeyTestPubAddr()
	minGasPriceCoins := sdk.NewDecCoins().Add(sdk.NewDecCoin(global.Denom, sdk.NewInt(1)))
	gasMeterKeeper := gasmeter.NewGasMeterKeeper()

	t.Run("NewSetUpContextDecorator should return a SetUpContextDecorator", func(t *testing.T) {
		app, ctx, accountKeeper := testutil.CreateTestApp(false)
		acc := accountKeeper.NewAccountWithAddress(ctx, addr)
		accountKeeper.SetAccount(ctx, acc)
		bankKeeper := bankkeeper.NewBaseKeeper(
			app.AppCodec(),
			app.GetKey(banktypes.StoreKey),
			accountKeeper,
			app.GetSubspace(banktypes.ModuleName),
			app.ModuleAccountAddrs())
		storeKey := sdk.NewKVStoreKey(taxmoduletypes.StoreKey)
		memStoreKey := storetypes.NewMemoryStoreKey(taxmoduletypes.MemStoreKey)
		paramsSubspace := typesparams.NewSubspace(
			app.AppCodec(),
			types.Amino,
			storeKey,
			memStoreKey,
			"TaxParams")
		taxKeeper := taxmodulekeeper.NewKeeper(
			app.AppCodec(),
			storeKey,
			memStoreKey,
			paramsSubspace,
			bankKeeper,
			accountKeeper)
		setUpContextDecorator := ante.NewSetUpContextDecorator(gasMeterKeeper, bankKeeper, accountKeeper, *taxKeeper, minGasPriceCoins)
		require.NotNil(t, setUpContextDecorator)
	})

	t.Run("SetGasMeter()", func(t *testing.T) {

		t.Run("should returns a new context with a gas meter with 0 consumed gas if block height is 0", func(t *testing.T) {
			app, ctx, accountKeeper := testutil.CreateTestApp(false)
			acc := accountKeeper.NewAccountWithAddress(ctx, addr)
			accountKeeper.SetAccount(ctx, acc)
			bankKeeper := bankkeeper.NewBaseKeeper(
				app.AppCodec(),
				app.GetKey(banktypes.StoreKey),
				accountKeeper,
				app.GetSubspace(banktypes.ModuleName),
				app.ModuleAccountAddrs())
			gasMeterCtx, _ := ante.SetGasMeter(ante.SetGasMeterOptions{
				Simulate:         true,
				Ctx:              ctx,
				GasLimit:         0,
				Tx:               nil,
				GasMeterKeeper:   gasMeterKeeper,
				BankKeeper:       bankKeeper,
				AccountKeeper:    accountKeeper,
				MinGasPriceCoins: minGasPriceCoins,
			})
			require.Equal(t, sdk.NewInfiniteGasMeter(), gasMeterCtx.GasMeter())
			require.Equal(t, uint64(0), gasMeterCtx.GasMeter().GasConsumed())
		})

		t.Run("should returns a new context with a charging gas meter", func(t *testing.T) {
			app, ctx, accountKeeper := testutil.CreateTestApp(false)
			ctx = ctx.WithBlockHeight(ctx.BlockHeight() + 1)
			acc := accountKeeper.NewAccountWithAddress(ctx, addr)
			accountKeeper.SetAccount(ctx, acc)
			bankKeeper := bankkeeper.NewBaseKeeper(
				app.AppCodec(),
				app.GetKey(banktypes.StoreKey),
				accountKeeper,
				app.GetSubspace(banktypes.ModuleName),
				app.ModuleAccountAddrs())

			taxKeeper := *taxmodulekeeper.NewKeeper(
				app.AppCodec(),
				app.GetKey(taxmoduletypes.StoreKey),
				app.GetKey(taxmoduletypes.MemStoreKey),
				app.GetSubspace(taxmoduletypes.ModuleName),
				bankKeeper,
				accountKeeper)

			feeAmount := sdk.NewCoins(sdk.NewInt64Coin(global.Denom, 20))
			txBuilder.SetFeeAmount(feeAmount)
			txBuilder.SetFeePayer(addr)
			newTx := txBuilder.GetTx()

			gasMeterCtx, _ := ante.SetGasMeter(ante.SetGasMeterOptions{
				Simulate:         false,
				Ctx:              ctx,
				GasLimit:         testdata.NewTestGasLimit(),
				Tx:               newTx,
				GasMeterKeeper:   gasMeterKeeper,
				BankKeeper:       bankKeeper,
				AccountKeeper:    accountKeeper,
				MinGasPriceCoins: minGasPriceCoins,
			})
			expectedChargingGasMeter := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, testdata.NewTestGasLimit(), addr, minGasPriceCoins)
			expectedGasMeter := sdk.GasMeter(expectedChargingGasMeter)
			require.EqualValues(t, expectedGasMeter.String(), gasMeterCtx.GasMeter().String())
		})

		t.Run("should return error message if gas price is too low", func(t *testing.T) {
			app, ctx, accountKeeper := testutil.CreateTestApp(false)
			ctx = ctx.WithBlockHeight(ctx.BlockHeight() + 1)
			acc := accountKeeper.NewAccountWithAddress(ctx, addr)
			accountKeeper.SetAccount(ctx, acc)
			bankKeeper := bankkeeper.NewBaseKeeper(
				app.AppCodec(),
				app.GetKey(banktypes.StoreKey),
				accountKeeper,
				app.GetSubspace(banktypes.ModuleName),
				app.ModuleAccountAddrs())

			feeAmount := sdk.NewCoins(sdk.NewInt64Coin(global.Denom, 19))
			txBuilder.SetFeeAmount(feeAmount)
			txBuilder.SetFeePayer(addr)
			newTx := txBuilder.GetTx()

			_, err := ante.SetGasMeter(ante.SetGasMeterOptions{
				Simulate:         false,
				Ctx:              ctx,
				GasLimit:         testdata.NewTestGasLimit(),
				Tx:               newTx,
				GasMeterKeeper:   gasMeterKeeper,
				BankKeeper:       bankKeeper,
				AccountKeeper:    accountKeeper,
				MinGasPriceCoins: minGasPriceCoins,
			})

			require.Equal(t, sdkerrors.New(appTypes.Name, 2, appTypes.ErrLowGasPrice), err)
		})

	})

	t.Run("SetUpContextDecorator AnteHandle", func(t *testing.T) {

		t.Run("should return context with a gas meter", func(t *testing.T) {
			app, ctx, accountKeeper := testutil.CreateTestApp(false)
			acc := accountKeeper.NewAccountWithAddress(ctx, addr)
			accountKeeper.SetAccount(ctx, acc)
			bankKeeper := bankkeeper.NewBaseKeeper(
				app.AppCodec(),
				app.GetKey(banktypes.StoreKey),
				accountKeeper,
				app.GetSubspace(banktypes.ModuleName),
				app.ModuleAccountAddrs())
			storeKey := sdk.NewKVStoreKey(taxmoduletypes.StoreKey)
			memStoreKey := storetypes.NewMemoryStoreKey(taxmoduletypes.MemStoreKey)
			paramsSubspace := typesparams.NewSubspace(
				app.AppCodec(),
				types.Amino,
				storeKey,
				memStoreKey,
				"TaxParams")
			taxKeeper := taxmodulekeeper.NewKeeper(
				app.AppCodec(),
				storeKey,
				memStoreKey,
				paramsSubspace,
				bankKeeper,
				accountKeeper)
			setUpContextDecorator := ante.NewSetUpContextDecorator(gasMeterKeeper, bankKeeper, accountKeeper, *taxKeeper, minGasPriceCoins)

			feeAmount := sdk.NewCoins(sdk.NewInt64Coin(global.Denom, 20))
			txBuilder.SetFeeAmount(feeAmount)
			txBuilder.SetFeePayer(addr)
			newTx := txBuilder.GetTx()
			gasTx := sdkante.GasTx(newTx)
			nextAnteHandler, _ := ante.NewAnteHandler(*testutilante.NewAnteHandlerOptions())

			newCtx, _ := setUpContextDecorator.AnteHandle(ctx, gasTx, true, nextAnteHandler)

			require.NotNil(t, newCtx)
			require.IsType(t, sdk.Context{}, newCtx)
			require.NotNil(t, newCtx.GasMeter())
		})

	})

}
