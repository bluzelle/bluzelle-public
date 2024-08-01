package app

import (
	"encoding/json"
	"log"

	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"

	tmtypes "github.com/cometbft/cometbft/types"
	servertypes "github.com/cosmos/cosmos-sdk/server/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	slashingtypes "github.com/cosmos/cosmos-sdk/x/slashing/types"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	"github.com/cosmos/cosmos-sdk/x/staking/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"

	cryptocodec "github.com/cosmos/cosmos-sdk/crypto/codec"
)

// ExportAppStateAndValidators exports the state of the application for a genesis
// file.
func (app *App) ExportAppStateAndValidators(
	forZeroHeight bool, jailAllowedAddrs []string,
) (servertypes.ExportedApp, error) {

	// as if they could withdraw from the start of the next block
	ctx := app.NewContext(true, tmproto.Header{Height: app.LastBlockHeight()})

	// We export at last height + 1, because that's the height at which
	// Tendermint will start InitChain.
	height := app.LastBlockHeight() + 1
	if forZeroHeight {
		height = 0
		app.prepForZeroHeightGenesis(ctx, jailAllowedAddrs)
	}
	genState := app.mm.ExportGenesis(ctx, app.appCodec)

	genState["staking"] = app.appCodec.MustMarshalJSON(ExportStakingGenesis(ctx, *app.StakingKeeper))
	appState, err := json.MarshalIndent(genState, "", "  ")
	if err != nil {
		return servertypes.ExportedApp{}, err
	}

	validators, err := WriteUnjailedValidators(ctx, *app.StakingKeeper)
	if err != nil {
		return servertypes.ExportedApp{}, err
	}
	return servertypes.ExportedApp{
		AppState:        appState,
		Validators:      validators,
		Height:          height,
		ConsensusParams: app.BaseApp.GetConsensusParams(ctx),
	}, nil
}

func WriteUnjailedValidators(ctx sdk.Context, keeper stakingkeeper.Keeper) (vals []tmtypes.GenesisValidator, err error) {
	keeper.IterateLastValidators(ctx, func(_ int64, validator types.ValidatorI) (stop bool) {

		if validator.IsJailed() {
			return false
		}
		pk, err := validator.ConsPubKey()
		if err != nil {
			return true
		}
		tmPk, err := cryptocodec.ToTmPubKeyInterface(pk)
		if err != nil {
			return true
		}
		vals = append(vals, tmtypes.GenesisValidator{
			Address: sdk.ConsAddress(tmPk.Address()).Bytes(),
			PubKey:  tmPk,
			Power:   validator.GetConsensusPower(keeper.PowerReduction(ctx)),
			Name:    validator.GetMoniker(),
		})

		return false
	})

	return
}

func ExportStakingGenesis(ctx sdk.Context, keeper stakingkeeper.Keeper) *stakingtypes.GenesisState {
	var unbondingDelegations []stakingtypes.UnbondingDelegation

	keeper.IterateUnbondingDelegations(ctx, func(_ int64, ubd stakingtypes.UnbondingDelegation) (stop bool) {
		unbondingDelegations = append(unbondingDelegations, ubd)
		return false
	})

	var redelegations []stakingtypes.Redelegation

	keeper.IterateRedelegations(ctx, func(_ int64, red stakingtypes.Redelegation) (stop bool) {
		redelegations = append(redelegations, red)
		return false
	})

	var lastValidatorPowers []stakingtypes.LastValidatorPower
	lastPower := sdk.NewInt(0)
	keeper.IterateLastValidatorPowers(ctx, func(addr sdk.ValAddress, power int64) (stop bool) {
		v, _ := keeper.GetValidator(ctx, addr)
		if v.Jailed {
			return false
		}
		lastPower = lastPower.Add(sdk.NewIntFromUint64(uint64(power)))
		lastValidatorPowers = append(lastValidatorPowers, stakingtypes.LastValidatorPower{Address: addr.String(), Power: power})
		return false
	})
	keeper.SetLastTotalPower(ctx, lastPower)
	return &stakingtypes.GenesisState{
		Params:               keeper.GetParams(ctx),
		LastTotalPower:       keeper.GetLastTotalPower(ctx),
		LastValidatorPowers:  lastValidatorPowers,
		Validators:           keeper.GetAllValidators(ctx),
		Delegations:          keeper.GetAllDelegations(ctx),
		UnbondingDelegations: unbondingDelegations,
		Redelegations:        redelegations,
		Exported:             true,
	}
}

// prepare for fresh start at zero height
// NOTE zero height genesis is a temporary feature which will be deprecated
//
//	in favour of export at a block height
func (app *App) prepForZeroHeightGenesis(ctx sdk.Context, jailAllowedAddrs []string) {
	applyAllowedAddrs := false

	// check if there is a allowed address list
	if len(jailAllowedAddrs) > 0 {
		applyAllowedAddrs = true
	}

	allowedAddrsMap := make(map[string]bool)

	for _, addr := range jailAllowedAddrs {
		_, err := sdk.ValAddressFromBech32(addr)
		if err != nil {
			log.Fatal(err)
		}
		allowedAddrsMap[addr] = true
	}

	/* Just to be safe, assert the invariants on current state. */
	app.CrisisKeeper.AssertInvariants(ctx)

	/* Handle fee distribution state. */

	// withdraw all validator commission
	app.StakingKeeper.IterateValidators(ctx, func(_ int64, val stakingtypes.ValidatorI) (stop bool) {
		// only attempt to withdraw commission if it is non-zero. This is required to support
		// use cases where you have validators who have been jailed since the start of the chain
		// and therefore never earned commissions. These could be validators that died extremely
		// early on prior to any transactions or validations that were jailed in the genesis,
		// either a result of not being upgraded over to the new chain (and unjailed) or because
		// they were taken down or slash-jailed in the previous chain.
		if !app.DistrKeeper.GetValidatorAccumulatedCommission(ctx, val.GetOperator()).Commission.IsZero() {
			_, err := app.DistrKeeper.WithdrawValidatorCommission(ctx, val.GetOperator())
			if err != nil {
				panic(err)
			}
		}
		return false
	})

	// withdraw all delegator rewards
	dels := app.StakingKeeper.GetAllDelegations(ctx)
	for _, delegation := range dels {
		_, err := app.DistrKeeper.WithdrawDelegationRewards(ctx, delegation.GetDelegatorAddr(), delegation.GetValidatorAddr())
		if err != nil {
			panic(err)
		}
	}

	// clear validator slash events
	app.DistrKeeper.DeleteAllValidatorSlashEvents(ctx)

	// clear validator historical rewards
	app.DistrKeeper.DeleteAllValidatorHistoricalRewards(ctx)

	// set context height to zero
	height := ctx.BlockHeight()
	ctx = ctx.WithBlockHeight(0)

	// reinitialize all validators
	app.StakingKeeper.IterateValidators(ctx, func(_ int64, val stakingtypes.ValidatorI) (stop bool) {
		// donate any unwithdrawn outstanding reward fraction tokens to the community pool
		scraps := app.DistrKeeper.GetValidatorOutstandingRewardsCoins(ctx, val.GetOperator())
		feePool := app.DistrKeeper.GetFeePool(ctx)
		feePool.CommunityPool = feePool.CommunityPool.Add(scraps...)
		app.DistrKeeper.SetFeePool(ctx, feePool)

		app.DistrKeeper.Hooks().AfterValidatorCreated(ctx, val.GetOperator())
		return false
	})

	// reinitialize all delegations
	for _, del := range dels {
		app.DistrKeeper.Hooks().BeforeDelegationCreated(ctx, del.GetDelegatorAddr(), del.GetValidatorAddr())
		app.DistrKeeper.Hooks().AfterDelegationModified(ctx, del.GetDelegatorAddr(), del.GetValidatorAddr())
	}

	// reset context height
	ctx = ctx.WithBlockHeight(height)

	/* Handle staking state. */

	// iterate through redelegations, reset creation height
	app.StakingKeeper.IterateRedelegations(ctx, func(_ int64, red stakingtypes.Redelegation) (stop bool) {
		for i := range red.Entries {
			red.Entries[i].CreationHeight = 0
		}
		app.StakingKeeper.SetRedelegation(ctx, red)
		return false
	})

	// iterate through unbonding delegations, reset creation height
	app.StakingKeeper.IterateUnbondingDelegations(ctx, func(_ int64, ubd stakingtypes.UnbondingDelegation) (stop bool) {
		for i := range ubd.Entries {
			ubd.Entries[i].CreationHeight = 0
		}
		app.StakingKeeper.SetUnbondingDelegation(ctx, ubd)
		return false
	})

	// Iterate through validators by power descending, reset bond heights, and
	// update bond intra-tx counters.
	store := ctx.KVStore(app.keys[stakingtypes.StoreKey])
	iter := sdk.KVStoreReversePrefixIterator(store, stakingtypes.ValidatorsKey)
	counter := int16(0)

	for ; iter.Valid(); iter.Next() {
		addr := sdk.ValAddress(stakingtypes.AddressFromValidatorsKey(iter.Key()))
		validator, found := app.StakingKeeper.GetValidator(ctx, addr)
		if !found {
			panic("expected validator, not found")
		}

		validator.UnbondingHeight = 0
		if applyAllowedAddrs && !allowedAddrsMap[addr.String()] {
			validator.Jailed = true
		}

		app.StakingKeeper.SetValidator(ctx, validator)
		counter++
	}

	iter.Close()

	/* Handle slashing state. */

	// reset start height on signing infos
	app.SlashingKeeper.IterateValidatorSigningInfos(
		ctx,
		func(addr sdk.ConsAddress, info slashingtypes.ValidatorSigningInfo) (stop bool) {
			info.StartHeight = 0
			app.SlashingKeeper.SetValidatorSigningInfo(ctx, addr, info)
			return false
		},
	)
}
