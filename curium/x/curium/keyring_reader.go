package curium

import (
	"github.com/bluzelle/bluzelle-public/curium/app/params"
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
	encCfg := params.MakeEncodingConfig()
	kr, err := keyring.New("curium", keyring.BackendTest, krr.keyringDir, nil, encCfg.Marshaler)
	if err != nil {
		return nil, err
	}
	keys, err := kr.Key(name)
	if err != nil {
		return nil, err
	}
	addr, err := keys.GetAddress()
	if err != nil {
		return nil, err
	}
	return addr, nil

}
