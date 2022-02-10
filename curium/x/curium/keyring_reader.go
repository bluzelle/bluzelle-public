package curium

import (
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type KeyRingReader struct{ keyringDir string }

func NewKeyRingReader(keyringDir string) *KeyRingReader {
	return &KeyRingReader{
		keyringDir: keyringDir,
	}
}

func (krr KeyRingReader) GetAddress(name string) (sdk.AccAddress, error) {
	kr, err := keyring.New("curium", keyring.BackendTest, krr.keyringDir, nil)
	if err != nil {
		return nil, err
	}
	keys, err := kr.Key(name)
	if err != nil {
		return nil, err
	}
	return keys.GetAddress(), nil

}
