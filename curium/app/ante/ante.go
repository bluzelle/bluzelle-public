package ante

import (
	errors "cosmossdk.io/errors"
	sdkmath "cosmossdk.io/math"
	appTypes "github.com/bluzelle/bluzelle-public/curium/app/types"
	"github.com/bluzelle/bluzelle-public/curium/app/types/global"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/auth/ante"
)

func NewAnteHandler(options appTypes.AnteHandlerOptions) (sdk.AnteHandler, error) {
	if options.SignModeHandler == nil {
		return nil, errors.Wrap(sdkerrors.ErrTxDecode, "sign mode handler is required for ante builder")
	}

	var sigGasConsumer = options.SigGasConsumer
	if sigGasConsumer == nil {
		sigGasConsumer = ante.DefaultSigVerificationGasConsumer
	}

	minGasPriceCoins := sdk.NewDecCoins().Add(sdk.NewDecCoin(global.Denom, sdkmath.NewInt(1)))

	anteDecorators := []sdk.AnteDecorator{
		NewSetUpContextDecorator(options.GasMeterKeeper, options.BankKeeper, options.AccountKeeper, options.TaxKeeper, minGasPriceCoins), // outermost AnteDecorator. SetUpContext must be called first
		ante.NewExtensionOptionsDecorator(nil),
		ante.NewValidateBasicDecorator(),
		ante.NewTxTimeoutHeightDecorator(),
		ante.NewValidateMemoDecorator(options.AccountKeeper),
		ante.NewConsumeGasForTxSizeDecorator(options.AccountKeeper),
		//ante.NewDeductFeeDecorator(options.AccountKeeper, options.BankKeeper, options.FeegrantKeeper),
		NewTaxDecorator(options.AccountKeeper, options.BankKeeper, &options.TaxKeeper),
		ante.NewSetPubKeyDecorator(options.AccountKeeper), // SetPubKeyDecorator must be called before all signature verification decorators
		ante.NewValidateSigCountDecorator(options.AccountKeeper),
		ante.NewSigGasConsumeDecorator(options.AccountKeeper, sigGasConsumer),
		ante.NewSigVerificationDecorator(options.AccountKeeper, options.SignModeHandler),
		ante.NewIncrementSequenceDecorator(options.AccountKeeper),
		ante.NewDeductFeeDecorator(options.AccountKeeper, options.BankKeeper, options.FeegrantKeeper, nil), // Fees are handled by SetUpContextDecorator
		NewChargeGasDecorator(options.GasMeterKeeper),                                                      // Charge gas meter after transaction - must be last
	}

	return sdk.ChainAnteDecorators(anteDecorators...), nil
}
