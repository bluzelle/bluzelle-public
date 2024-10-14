package types

import (
	"strings"
)

// DefaultGenesis returns the default Capability genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// this line is used by starport scaffolding # genesis/types/validate
	if gs.GasTaxBp < 0 {
		return ErrInvalidGasTaxBp
	}

	if gs.TransferTaxBp < 0 {
		return ErrInvalidTransferTaxBp
	}

	if len(gs.TaxCollector) != 47 || !strings.HasPrefix(gs.TaxCollector, AccountAddressPrefix) {
		return ErrInvalidTaxCollector
	}

	return nil
}
