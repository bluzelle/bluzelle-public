package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgSetTaxCollector = "set_tax_collector"

var _ sdk.Msg = &MsgSetTaxCollector{}

func NewMsgSetTaxCollector(creator string, taxCollector string) *MsgSetTaxCollector {
	return &MsgSetTaxCollector{
		Creator:      creator,
		TaxCollector: taxCollector,
	}
}

func (msg *MsgSetTaxCollector) Route() string {
	return RouterKey
}

func (msg *MsgSetTaxCollector) Type() string {
	return TypeMsgSetTaxCollector
}

func (msg *MsgSetTaxCollector) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSetTaxCollector) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSetTaxCollector) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
