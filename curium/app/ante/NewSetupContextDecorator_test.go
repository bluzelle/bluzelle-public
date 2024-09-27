package ante_test

import (
	"testing"

	"github.com/bluzelle/bluzelle-public/curium/app/ante"
	"github.com/bluzelle/bluzelle-public/curium/app/ante/gasmeter"
	"github.com/bluzelle/bluzelle-public/curium/app/types/global"
	testutilante "github.com/bluzelle/bluzelle-public/curium/testutil/ante"
	testutil "github.com/bluzelle/bluzelle-public/curium/testutil/simapp"
	"github.com/bluzelle/bluzelle-public/curium/testutil/tx"
	"github.com/bluzelle/bluzelle-public/curium/x/faucet/types"
	taxmodulekeeper "github.com/bluzelle/bluzelle-public/curium/x/tax/keeper"
	taxmoduletypes "github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	"github.com/bluzelle/simapp"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	"github.com/cosmos/cosmos-sdk/testutil/testdata"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkante "github.com/cosmos/cosmos-sdk/x/auth/ante"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	typesparams "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/stretchr/testify/require"
)

func TestNewSetupContextDecorator(t *testing.T) {
	govAuthAddr := authtypes.NewModuleAddress(govtypes.ModuleName)
	govAuthAddrStr := govAuthAddr.String()
	txBuilder := tx.NewBuilder()
	txBuilder.SetGasLimit(20)

	_, _, addr := testdata.KeyTestPubAddr()
	minGasPriceCoins := sdk.NewDecCoins().Add(sdk.NewDecCoin(global.Denom, sdk.NewInt(1)))
	gasMeterKeeper := gasmeter.NewGasMeterKeeper()

	t.Run("NewSetUpContextDecorator should return a SetUpContextDecorator", func(t *testing.T) {
		app, ctx, accountKeeper := testutil.CreateTestApp(t, false)
		acc := accountKeeper.NewAccountWithAddress(ctx, addr)
		accountKeeper.SetAccount(ctx, acc)
		bankKeeper := bankkeeper.NewBaseKeeper(
			app.AppCodec(),
			app.GetKey(banktypes.StoreKey),
			accountKeeper,
			simapp.BlockedAddresses(),
			govAuthAddrStr)
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
			app, ctx, accountKeeper := testutil.CreateTestApp(t, false)
			acc := accountKeeper.NewAccountWithAddress(ctx, addr)
			accountKeeper.SetAccount(ctx, acc)
			bankKeeper := bankkeeper.NewBaseKeeper(
				app.AppCodec(),
				app.GetKey(banktypes.StoreKey),
				accountKeeper,
				simapp.BlockedAddresses(),
				govAuthAddrStr)
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
			app, ctx, accountKeeper := testutil.CreateTestApp(t, false)
			ctx = ctx.WithBlockHeight(ctx.BlockHeight() + 1)
			acc := accountKeeper.NewAccountWithAddress(ctx, addr)
			accountKeeper.SetAccount(ctx, acc)
			bankKeeper := bankkeeper.NewBaseKeeper(
				app.AppCodec(),
				app.GetKey(banktypes.StoreKey),
				accountKeeper,
				simapp.BlockedAddresses(),
				govAuthAddrStr)

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
			app, ctx, accountKeeper := testutil.CreateTestApp(t, false)
			ctx = ctx.WithBlockHeight(ctx.BlockHeight() + 1)
			acc := accountKeeper.NewAccountWithAddress(ctx, addr)
			accountKeeper.SetAccount(ctx, acc)
			bankKeeper := bankkeeper.NewBaseKeeper(
				app.AppCodec(),
				app.GetKey(banktypes.StoreKey),
				accountKeeper,
				simapp.BlockedAddresses(),
				govAuthAddrStr)

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
			require.Equal(t, "Specified gas price too low", err.Error())
		})

	})

	t.Run("SetUpContextDecorator AnteHandle", func(t *testing.T) {

		t.Run("should return context with a gas meter", func(t *testing.T) {
			app, ctx, accountKeeper := testutil.CreateTestApp(t, false)
			acc := accountKeeper.NewAccountWithAddress(ctx, addr)
			accountKeeper.SetAccount(ctx, acc)
			bankKeeper := bankkeeper.NewBaseKeeper(
				app.AppCodec(),
				app.GetKey(banktypes.StoreKey),
				accountKeeper,
				simapp.BlockedAddresses(),
				govAuthAddrStr)
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
			nextAnteHandler, _ := ante.NewAnteHandler(*testutilante.NewAnteHandlerOptions(t))

			newCtx, _ := setUpContextDecorator.AnteHandle(ctx, gasTx, true, nextAnteHandler)

			require.NotNil(t, newCtx)
			require.IsType(t, sdk.Context{}, newCtx)
			require.NotNil(t, newCtx.GasMeter())
		})

	})

}
