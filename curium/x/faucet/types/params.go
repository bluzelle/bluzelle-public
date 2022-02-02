package types

import (
	"fmt"

	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"gopkg.in/yaml.v2"
)

var _ paramtypes.ParamSet = (*Params)(nil)


var (
	KeyTestnet = []byte("Testnet")
	// TODO: Determine the default value
	DefaultTestnet string = "testnet"
)


// ParamKeyTable the param key table for launch module
func ParamKeyTable() paramtypes.KeyTable {
	return paramtypes.NewKeyTable().RegisterParamSet(&Params{})
}

// NewParams creates a new Params instance
func NewParams(
	testnet string,
) Params {
	return Params{
        Testnet: testnet,
	}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	return NewParams(
        DefaultTestnet,
	)
}

// ParamSetPairs get the params.ParamSet
func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{
		paramtypes.NewParamSetPair(KeyTestnet, &p.Testnet, validateTestnet),
	}
}

// Validate validates the set of params
func (p Params) Validate() error {
   	if err := validateTestnet(p.Testnet); err != nil {
   		return err
   	}
   	
	return nil
}

// String implements the Stringer interface.
func (p Params) String() string {
	out, _ := yaml.Marshal(p)
	return string(out)
}

// validateTestnet validates the Testnet param
func validateTestnet(v interface{}) error {
	testnet, ok := v.(string)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}

	// TODO implement validation
	_ = testnet

	return nil
}
