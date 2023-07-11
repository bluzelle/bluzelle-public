package types

import (
	"testing"

	"github.com/bluzelle/bluzelle-public/curium/testutil/sample"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"
)

func TestMsgPin_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgPin
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgPin{
				Creator: "invalid_address",
				Cid:     "cid",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgPin{
				Creator: sample.AccAddress(),
				Cid:     "cid",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.msg.ValidateBasic()
			if tt.err != nil {
				require.ErrorIs(t, err, tt.err)
				return
			}
			require.NoError(t, err)
		})
	}
}
