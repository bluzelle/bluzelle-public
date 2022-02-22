package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgSetTransferTaxBp = "set_transfer_tax_bp"

var _ sdk.Msg = &MsgSetTransferTaxBp{}

func NewMsgSetTransferTaxBp(creator string, bp int64) *MsgSetTransferTaxBp {
	return &MsgSetTransferTaxBp{
		Creator: creator,
		Bp:      bp,
	}
}

func (msg *MsgSetTransferTaxBp) Route() string {
	return RouterKey
}

func (msg *MsgSetTransferTaxBp) Type() string {
	return TypeMsgSetTransferTaxBp
}

func (msg *MsgSetTransferTaxBp) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSetTransferTaxBp) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSetTransferTaxBp) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
