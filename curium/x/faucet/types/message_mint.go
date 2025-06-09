package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgFaucetToken = "faucet-mint"

var _ sdk.Msg = &MsgFaucetToken{}

func NewMsgMint(creator string, address string) *MsgFaucetToken {
	return &MsgFaucetToken{
		Creator: creator,
		Address: address,
	}
}

func (msg *MsgFaucetToken) Route() string {
	return RouterKey
}

func (msg *MsgFaucetToken) Type() string {
	return TypeMsgFaucetToken
}

func (msg *MsgFaucetToken) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgFaucetToken) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgFaucetToken) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
