package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgSetGasTaxBp = "set_gas_tax_bp"

var _ sdk.Msg = &MsgSetGasTaxBp{}

func NewMsgSetGasTaxBp(creator string, bp int64) *MsgSetGasTaxBp {
	return &MsgSetGasTaxBp{
		Creator: creator,
		Bp:      bp,
	}
}

func (msg *MsgSetGasTaxBp) Route() string {
	return RouterKey
}

func (msg *MsgSetGasTaxBp) Type() string {
	return TypeMsgSetGasTaxBp
}

func (msg *MsgSetGasTaxBp) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSetGasTaxBp) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSetGasTaxBp) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
