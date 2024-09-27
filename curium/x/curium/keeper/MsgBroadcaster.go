package keeper

import (
	"context"
	"time"

	"github.com/bluzelle/bluzelle-public/curium/app/params"
	abcitypes "github.com/cometbft/cometbft/abci/types"
	tenderminttypes "github.com/cometbft/cometbft/types"
	sdkclient "github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/crypto"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	"github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authsigning "github.com/cosmos/cosmos-sdk/x/auth/signing"
)

type KeyRingReader struct{ keyringDir string }

func NewKeyRingReader(keyringDir string) *KeyRingReader {
	return &KeyRingReader{
		keyringDir: keyringDir,
	}
}
func (krr KeyRingReader) GetAddress(name string) (sdk.AccAddress, error) {
	kr, err := keyring.New("curium", keyring.BackendTest, krr.keyringDir, nil, nil, nil)
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

type MsgBroadcaster func(ctx sdk.Context, msgs []types.Msg, from string) chan *MsgBroadcasterResponse

type MsgBroadcasterResponse struct {
	Response *abcitypes.TxResult
	Data     *[]byte
	Error    error
}

func NewMsgBroadcaster(accKeeper *keeper.AccountKeeper, keyringDir string) MsgBroadcaster {
	return func(ctx sdk.Context, msgs []types.Msg, from string) chan *MsgBroadcasterResponse {
		resp := make(chan *MsgBroadcasterResponse)

		go func() {
			returnError := func(err error) {
				resp <- &MsgBroadcasterResponse{
					Error: err,
				}
				close(resp)
			}

			// Choose your codec: Amino or Protobuf. Here, we use Protobuf, given by the
			// following function.
			encCfg := params.MakeEncodingConfig()

			// Create a new TxBuilder.
			txBuilder := encCfg.TxConfig.NewTxBuilder()

			err := txBuilder.SetMsgs(msgs...)
			if err != nil {
				returnError(err)
				return
			}

			gas := uint64(40000000)
			txBuilder.SetGasLimit(gas)

			txBuilder.SetFeeAmount(types.NewCoins(types.NewCoin("ubnt", types.NewInt(10000000))))
			txBuilder.SetMemo("memo")
			txBuilder.SetTimeoutHeight(uint64(ctx.BlockHeight() + 20))

			kr, err := keyring.New("curium", keyring.BackendTest, keyringDir, nil, nil, nil)
			if err != nil {
				returnError(err)
				return
			}
			keys, err := kr.Key(from)
			if err != nil {
				returnError(err)
				return
			}

			addr, _ := keys.GetAddress()
			accnt := accKeeper.GetAccount(ctx, addr)
			if accnt == nil {
				returnError(sdkerrors.New("curium", 2, "Cannot broadcast message, accnt does not exist"))
				return
			}

			privArmor, err := kr.ExportPrivKeyArmor(from, "")
			if err != nil {
				returnError(err)
				return
			}

			privKey, _, err := crypto.UnarmorDecryptPrivKey(privArmor, "")
			if err != nil {
				returnError(err)
				return
			}
			pubKey, _ := keys.GetPubKey()
			sigV2 := signing.SignatureV2{
				PubKey: pubKey,
				Data: &signing.SingleSignatureData{
					SignMode:  encCfg.TxConfig.SignModeHandler().DefaultMode(),
					Signature: nil,
				},
				Sequence: accnt.GetSequence(),
			}

			err = txBuilder.SetSignatures(sigV2)
			if err != nil {
				returnError(err)
				return
			}

			signerData := authsigning.SignerData{
				ChainID:       ctx.ChainID(),
				AccountNumber: accnt.GetAccountNumber(),
				Sequence:      accnt.GetSequence(),
			}

			sigV2, err = tx.SignWithPrivKey(
				encCfg.TxConfig.SignModeHandler().DefaultMode(), signerData,
				txBuilder, privKey, encCfg.TxConfig, accnt.GetSequence())
			if err != nil {
				returnError(err)
				return
			}

			err = txBuilder.SetSignatures(sigV2)
			if err != nil {
				returnError(err)
				return
			}

			txBytes, err := encCfg.TxConfig.TxEncoder()(txBuilder.GetTx())
			if err != nil {
				returnError(err)
				return
			}

			txCtx, _ := context.WithDeadline(context.Background(), time.Now().Add(time.Second*20))

			client, err := sdkclient.NewClientFromNode("http://localhost:26657")
			if err != nil {
				returnError(err)
				return
			}

			res, err := client.BroadcastTxSync(txCtx, txBytes)
			if err != nil {
				returnError(err)
				return
			}

			_ = res

			client.Start()

			sub, err := client.Subscribe(txCtx, "MsgBroadcaster", tenderminttypes.EventQueryTxFor(txBytes).String())
			if err != nil {
				returnError(err)
				return
			}
			result := <-sub

			a := result.Data.(tenderminttypes.EventDataTx)

			resp <- &MsgBroadcasterResponse{
				Response: &a.TxResult,
				Data:     &a.TxResult.Result.Data,
			}
			close(resp)
			client.Stop()
		}()

		return resp
	}

}
