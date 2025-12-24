package types

import (
	"cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgChangeAdmin = "change_admin"

var _ sdk.Msg = &MsgChangeAdmin{}

func NewMsgChangeAdmin(creator string, newAdmin string) *MsgChangeAdmin {
	return &MsgChangeAdmin{
		Creator:  creator,
		NewAdmin: newAdmin,
	}
}

func (msg *MsgChangeAdmin) Route() string {
	return RouterKey
}

func (msg *MsgChangeAdmin) Type() string {
	return TypeMsgChangeAdmin
}

func (msg *MsgChangeAdmin) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgChangeAdmin) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgChangeAdmin) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return errors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	_, err = sdk.AccAddressFromBech32(msg.NewAdmin)
	if err != nil {
		return errors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid new admin address (%s)", err)
	}
	return nil
}

