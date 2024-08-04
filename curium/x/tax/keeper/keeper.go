package keeper

import (
	"fmt"

	taxTypes "github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	bankKeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	paramTypes "github.com/cosmos/cosmos-sdk/x/params/types"

	log "github.com/cometbft/cometbft/libs/log"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
)

type Keeper struct {
	cdc           codec.BinaryCodec
	storeKey      storetypes.StoreKey
	memKey        storetypes.StoreKey
	paramstore    paramTypes.Subspace
	BankKeeper    bankKeeper.Keeper
	AccountKeeper acctypes.AccountKeeper
}

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey storetypes.StoreKey,
	ps paramTypes.Subspace,
	bankKeeper bankKeeper.Keeper,
	accountKeeper acctypes.AccountKeeper,
) *Keeper {
	return &Keeper{
		cdc:           cdc,
		storeKey:      storeKey,
		memKey:        memKey,
		paramstore:    ps,
		BankKeeper:    bankKeeper,
		AccountKeeper: accountKeeper,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", taxTypes.ModuleName))
}

func (k Keeper) GetKVStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.storeKey)
}

func (k Keeper) GetCodec() codec.BinaryCodec {
	return k.cdc
}

func (k Keeper) GetTaxInfoKeep(ctx sdk.Context) (taxTypes.GenesisState, error) {
	store := k.GetKVStore(ctx)
	var info taxTypes.GenesisState
	bz := store.Get([]byte(taxTypes.KeyTaxInfo))
	err := info.Unmarshal(bz)
	return info, err
}

func (k Keeper) SetTaxInfoKeep(ctx sdk.Context, info *taxTypes.GenesisState) error {
	store := k.GetKVStore(ctx)

	bz, err := info.Marshal()
	if err != nil {
		return err
	}
	store.Set([]byte(taxTypes.KeyTaxInfo), bz)
	return err
}

func (k Keeper) ChargeGasTax(ctx sdk.Context, taxPayer sdk.AccAddress, gasFee sdk.Coins) error {
	gasTaxes := k.calculateGasTax(ctx, gasFee)
	return k.chargeTax(ctx, taxPayer, gasTaxes)
}

func (k Keeper) calculateGasTax(ctx sdk.Context, gasFee sdk.Coins) sdk.Coins {
	info, err := k.GetTaxInfoKeep(ctx)
	if err != nil {
		return sdk.NewCoins(sdk.NewInt64Coin(taxTypes.Denom, 0))
	}
	return sdk.NewCoins(sdk.NewInt64Coin(taxTypes.Denom, gasFee.AmountOf(taxTypes.Denom).Int64()*info.GasTaxBp/10000))
}

func (k Keeper) ChargeTransferTax(ctx sdk.Context, taxPayer sdk.AccAddress, msg sdk.Msg) error {
	taxPayerAcc := k.AccountKeeper.GetAccount(ctx, taxPayer)
	if taxPayerAcc == nil {
		return sdkerrors.Wrapf(sdkerrors.ErrUnknownAddress, "fee payer address: %s does not exist", taxPayer)
	}
	transferTaxes, err := k.CalculateTransferTax(ctx, taxPayer, msg)
	if err != nil {
		return err
	}
	return k.chargeTax(ctx, taxPayer, transferTaxes)
}

func (k Keeper) CalculateTransferTax(ctx sdk.Context, taxPayer sdk.AccAddress, msg sdk.Msg) (sdk.Coins, error) {
	info, err := k.GetTaxInfoKeep(ctx)
	if err != nil {
		return sdk.NewCoins(sdk.NewInt64Coin(taxTypes.Denom, 0)), err
	}

	bankMsg := msg.(*banktypes.MsgSend)
	transferTaxes := sdk.Coins{}
	for _, coin := range bankMsg.Amount {
		feeAmt := coin.Amount.Int64() * info.TransferTaxBp / 10_000

		balance := k.BankKeeper.GetBalance(ctx, taxPayer, coin.Denom)
		if balance.Amount.Int64() < coin.Amount.Int64()+feeAmt {
			return nil, fmt.Errorf("insufficient funds to send transfer tax")
		}

		if feeAmt > 0 {
			switch coin.Denom {
			case taxTypes.Denom:
				transferTaxes = append(transferTaxes, sdk.NewInt64Coin(taxTypes.Denom, feeAmt))
			case taxTypes.DenomUg4:
				transferTaxes = append(transferTaxes, sdk.NewInt64Coin(taxTypes.DenomUg4, feeAmt))
			case taxTypes.DenomUelt:
				transferTaxes = append(transferTaxes, sdk.NewInt64Coin(taxTypes.DenomUelt, feeAmt))
			default:
				fmt.Println("unidentified coin denom, transfer tax is not charged")
			}
		}
	}
	return transferTaxes, nil
}

func (k Keeper) chargeTax(ctx sdk.Context, taxPayer sdk.AccAddress, taxes sdk.Coins) error {
	if !taxes.IsZero() {
		info, err := k.GetTaxInfoKeep(ctx)
		if err != nil {
			return err
		}
		taxCollector, err := sdk.AccAddressFromBech32(info.TaxCollector)
		if err != nil {
			return err
		}

		err = k.BankKeeper.SendCoinsFromAccountToModule(ctx, taxPayer, taxTypes.ModuleName, taxes)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, err.Error())
		}

		err = k.BankKeeper.SendCoinsFromModuleToAccount(ctx, taxTypes.ModuleName, taxCollector, taxes)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, err.Error())
		}
	}

	return nil
}
