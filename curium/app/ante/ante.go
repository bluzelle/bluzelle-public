package ante

import (
	appTypes "github.com/bluzelle/bluzelle-public/curium/app/types"
	"github.com/bluzelle/bluzelle-public/curium/app/types/global"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/auth/ante"
)

func NewAnteHandler(options appTypes.AnteHandlerOptions) (sdk.AnteHandler, error) {
	if options.SignModeHandler == nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrLogic, "sign mode handler is required for ante builder")
	}

	var sigGasConsumer = options.SigGasConsumer
	if sigGasConsumer == nil {
		sigGasConsumer = ante.DefaultSigVerificationGasConsumer
	}

	minGasPriceCoins := sdk.NewDecCoins().Add(sdk.NewDecCoin(global.Denom, sdk.NewInt(1)))

	anteDecorators := []sdk.AnteDecorator{
		NewSetUpContextDecorator(options.GasMeterKeeper, options.BankKeeper, options.AccountKeeper, options.TaxKeeper, minGasPriceCoins), // outermost AnteDecorator. SetUpContext must be called first
		//ante.NewExtensionOptionsDecorator(nil),
		//ante.NewDeductFeeDecorator(options.AccountKeeper, options.BankKeeper, options.FeegrantKeeper, nil),
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
	}

	return sdk.ChainAnteDecorators(anteDecorators...), nil
}
