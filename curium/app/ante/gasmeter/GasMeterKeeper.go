package gasmeter

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type GasMeterKeeper struct {
	gasMeters []*ChargingGasMeter
}

func NewGasMeterKeeper() *GasMeterKeeper {
	return &GasMeterKeeper{
		gasMeters: make([]*ChargingGasMeter, 0),
	}
}

func (gk *GasMeterKeeper) ChargeAll(ctx sdk.Context) []error {
	errors := make([]error, 0)
	for _, gasMeter := range gk.gasMeters {
		gm := *gasMeter
		err := gm.Charge(ctx)
		if err != nil {
			errors = append(errors, err)
		}
	}
	return errors
}

func (gk *GasMeterKeeper) GetAllGasMeters() []*ChargingGasMeter {
	return gk.gasMeters
}

func (gk *GasMeterKeeper) AddGasMeter(gasMeter *ChargingGasMeter) {
	gk.gasMeters = append(gk.gasMeters, gasMeter)
}

func (gk *GasMeterKeeper) ClearAll() {
	gk.gasMeters = make([]*ChargingGasMeter, 0)
}
