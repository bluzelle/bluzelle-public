package gasmeter

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type Keeper struct {
	gasMeters []*ChargingGasMeter
}

func NewGasMeterKeeper() *Keeper {
	return &Keeper{
		gasMeters: []*ChargingGasMeter{},
	}
}

func (gk *Keeper) ChargeAll(ctx sdk.Context) []error {
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

func (gk *Keeper) GetAllGasMeters() []*ChargingGasMeter {
	return gk.gasMeters
}

func (gk *Keeper) AddGasMeter(gasMeter *ChargingGasMeter) {
	gk.gasMeters = append(gk.gasMeters, gasMeter)
}

func (gk *Keeper) ClearAll() {
	gk.gasMeters = make([]*ChargingGasMeter, 0)
}
