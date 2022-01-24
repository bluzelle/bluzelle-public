package gasmeter

import sdk "github.com/cosmos/cosmos-sdk/types"

type Gas = uint64

type ChargingGasMeterInterface interface {
	GasConsumed() Gas
	GasConsumedToLimit() Gas
	Limit() Gas
	ConsumeGas(amount Gas, descriptor string)
	RefundGas(amount Gas, descriptor string)
	IsPastLimit() bool
	IsOutOfGas() bool
	String() string
	Charge(ctx sdk.Context) error
	GetGasPrice() sdk.DecCoins
}
