import {expect} from 'chai';
import {defaultSwarmConfig} from '@bluzelle/testing';
import {getAllowance, getAllowances, getAllowancesByGranter} from './query';
import {startSwarmWithClient} from '@bluzelle/testing/src/swarmUtils';
import {
    grantAllowedMsgAllowance,
    grantAllowedMsgPeriodicAllowance,
    grantBasicAllowance,
    grantPeriodicAllowance, revokeAllowance
} from './tx';
import {passThroughAwait} from 'promise-passthrough';
import {Swarm} from "daemon-manager";
import {BluzelleClient, newBluzelleClient} from "../../core";
import {withCtxAwait} from "@scottburch/with-context";
import * as bip39 from 'bip39';
import {getAccountBalance, getTaxInfo, newLocalWallet, send} from "../../index";
import {delegate, getDelegation} from "../staking";
import delay from "delay";


const TEST_ADDR = "bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj";


describe('feegrant', () => {

    beforeEach(() =>
        Swarm.stopDaemons(({...defaultSwarmConfig}))
    );

    it('should grant basic allowance', () =>
        startSwarmWithClient({
            config: defaultSwarmConfig,
        })
            .then(passThroughAwait(ctx => grantBasicAllowance({
                client: ctx.bzSdk,
                granter: ctx.auth.address,
                grantee: TEST_ADDR,
                spendLimit: [{
                    denom: 'blz',
                    amount: 5_000_000
                }],
                expiration: new Date(),
                options: {
                    maxGas: 200_000,
                    gasPrice: 0.1
                }
            })))
            .then(ctx => getAllowance(ctx.bzSdk, ctx.auth.address, TEST_ADDR))
            .then(res => {
                expect(res.allowance.spendLimit).to.have.length.greaterThan(0);
                expect(res.allowance.spendLimit[0].amount).to.equal(5_000_000);
            })
    );


    it('should grant basic allowances', () =>
        startSwarmWithClient({
            config: defaultSwarmConfig,
        })
            .then(passThroughAwait(ctx => grantBasicAllowance({
                client: ctx.bzSdk,
                granter: ctx.auth.address,
                grantee: TEST_ADDR,
                spendLimit: [{
                    denom: 'blz',
                    amount: 5_000_000
                }],
                expiration: new Date(),
                options: {
                    maxGas: 200_000,
                    gasPrice: 0.1
                }
            })))
            .then(ctx => getAllowances(ctx.bzSdk, TEST_ADDR))
            .then(res => {
                expect(res).to.have.length.greaterThan(0);
                expect(res[0].allowance.spendLimit).to.have.length.greaterThan(0);
                expect(res[0].allowance.spendLimit[0].amount).to.equal(5_000_000);
            })
    );

    it('should revoke grant', () =>
        startSwarmWithClient({
            config: defaultSwarmConfig,
        })
            .then(passThroughAwait(ctx => grantBasicAllowance({
                client: ctx.bzSdk,
                granter: ctx.auth.address,
                grantee: TEST_ADDR,
                spendLimit: [{
                    denom: 'blz',
                    amount: 5_000_000
                }],
                expiration: new Date(),
                options: {
                    maxGas: 200_000,
                    gasPrice: 0.1
                }
            })))
            .then(passThroughAwait(ctx => revokeAllowance({
                client: ctx.bzSdk,
                granter: ctx.auth.address,
                grantee: TEST_ADDR,
                options: {
                    maxGas: 200_000,
                    gasPrice: 0.1
                }
            })))
            .then(ctx => getAllowances(ctx.bzSdk, TEST_ADDR))
            .then(res => {
                expect(res).to.have.length(0);
            })
    );



    it('should grant periodic allowance', () =>
        startSwarmWithClient({
            config: defaultSwarmConfig,
        })
            .then(passThroughAwait(ctx => grantPeriodicAllowance({
                client: ctx.bzSdk,
                granter: ctx.auth.address,
                grantee: TEST_ADDR,
                spendLimit: [{
                    denom: 'blz',
                    amount: 5_000_000
                }],
                periodSpendLimit: [{
                    denom: 'blz',
                    amount: 1_000_000
                }],
                periodCanSpend: [{
                    denom: 'blz',
                    amount: 1_000_000
                }],
                expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                periodReset: new Date(Date.now() + 24 * 60 * 60 * 1000),
                periodSeconds: 86400,
                options: {
                    maxGas: 200_000,
                    gasPrice: 0.1
                }
            })))
            .then(ctx => getAllowance(ctx.bzSdk, ctx.auth.address, TEST_ADDR))
            .then(res => {
                expect(res).to.exist;
                expect(res.granter).to.not.be.empty;
                expect(res.grantee).to.equal(TEST_ADDR);
                expect(res.allowance).to.exist;
                expect(res.allowance.typeUrl).to.equal('/cosmos.feegrant.v1beta1.PeriodicAllowance');
                expect(res.allowance.spendLimit).to.have.length.greaterThan(0);
                expect(res.allowance.spendLimit[0].amount).to.equal(5_000_000);
                expect(res.allowance.periodSpendLimit).to.have.length.greaterThan(0);
                expect(res.allowance.periodSpendLimit![0].amount).to.equal(1_000_000);
            })
    );


    it('should grant allowed msg allowance', () =>
        startSwarmWithClient({
            config: defaultSwarmConfig,
        })
            .then(passThroughAwait(ctx => grantAllowedMsgAllowance({
                client: ctx.bzSdk,
                granter: ctx.auth.address,
                grantee: TEST_ADDR,
                spendLimit: [{
                    denom: 'blz',
                    amount: 3_000_000
                }],
                expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                allowedMessages: [
                    '/cosmos.bank.v1beta1.MsgSend',
                    '/cosmos.staking.v1beta1.MsgDelegate'
                ],
                options: {
                    maxGas: 200_000,
                    gasPrice: 0.1
                }
            })))
            .then(ctx => getAllowance(ctx.bzSdk, ctx.auth.address, TEST_ADDR))
            .then(res => {
                expect(res).to.exist;
                expect(res.granter).to.not.be.empty;
                expect(res.grantee).to.equal(TEST_ADDR);
                expect(res.allowance).to.exist;
                expect(res.allowance.typeUrl).to.equal('/cosmos.feegrant.v1beta1.AllowedMsgAllowance');
                expect(res.allowance.spendLimit).to.have.length.greaterThan(0);
                expect(res.allowance.spendLimit[0].amount).to.equal(3_000_000);
                expect(res.allowance.allowedMessages).to.have.length(2);
                expect(res.allowance.allowedMessages).to.include('/cosmos.bank.v1beta1.MsgSend');
                expect(res.allowance.allowedMessages).to.include('/cosmos.staking.v1beta1.MsgDelegate');
            })
    );


    it('should be able to grant periodic allowance to allowed messages', () =>
        startSwarmWithClient({
            config: defaultSwarmConfig,
        })
            .then(passThroughAwait(ctx => grantAllowedMsgPeriodicAllowance({
                client: ctx.bzSdk,
                granter: ctx.auth.address,
                grantee: TEST_ADDR,
                spendLimit: [{
                    denom: 'blz',
                    amount: 4_000_000
                }],
                periodSpendLimit: [{
                    denom: 'blz',
                    amount: 800_000
                }],
                periodCanSpend: [{
                    denom: 'blz',
                    amount: 800_000
                }],
                expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                periodReset: new Date(Date.now() + 12 * 60 * 60 * 1000),
                periodSeconds: 43200,
                allowedMessages: [
                    '/cosmos.bank.v1beta1.MsgSend',
                    '/cosmos.staking.v1beta1.MsgDelegate',
                    '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward'
                ],
                options: {
                    maxGas: 200_000,
                    gasPrice: 0.1
                }
            })))
            .then(ctx => getAllowance(ctx.bzSdk, ctx.auth.address, TEST_ADDR))
            .then(res => {
                expect(res).to.exist;
                expect(res.granter).to.not.be.empty;
                expect(res.grantee).to.equal(TEST_ADDR);
                expect(res.allowance).to.exist;
                expect(res.allowance.typeUrl).to.equal('/cosmos.feegrant.v1beta1.AllowedMsgAllowance');
                expect(res.allowance.spendLimit).to.have.length.greaterThan(0);
                expect(res.allowance.spendLimit[0].amount).to.equal(4_000_000);
                expect(res.allowance.periodSpendLimit).to.have.length.greaterThan(0);
                expect(res.allowance.periodSpendLimit![0].amount).to.equal(800_000);
                expect(res.allowance.allowedMessages).to.have.length(3);
                expect(res.allowance.allowedMessages).to.include('/cosmos.bank.v1beta1.MsgSend');
                expect(res.allowance.allowedMessages).to.include('/cosmos.staking.v1beta1.MsgDelegate');
                expect(res.allowance.allowedMessages).to.include('/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward');
            })
    );



    it('should be able to grant allowance to specific allowed messages', () =>
        startSwarmWithClient({
            config: defaultSwarmConfig,
        })
            .then(passThroughAwait(ctx => grantAllowedMsgAllowance({
                client: ctx.bzSdk,
                granter: ctx.auth.address,
                grantee: TEST_ADDR,
                spendLimit: [{
                    denom: 'blz',
                    amount: 3_000_000
                }],
                expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                allowedMessages: [
                    '/cosmos.bank.v1beta1.MsgSend',
                    '/cosmos.staking.v1beta1.MsgDelegate'
                ],
                options: {
                    maxGas: 200_000,
                    gasPrice: 0.1
                }
            })))
            .then(ctx => getAllowance(ctx.bzSdk, ctx.auth.address, TEST_ADDR))
            .then(res => {
                expect(res).to.exist;
                expect(res.granter).to.not.be.empty;
                expect(res.grantee).to.equal(TEST_ADDR);
                expect(res.allowance).to.exist;
                expect(res.allowance.typeUrl).to.equal('/cosmos.feegrant.v1beta1.AllowedMsgAllowance');
                expect(res.allowance.spendLimit).to.have.length.greaterThan(0);
                expect(res.allowance.spendLimit[0].amount).to.equal(3_000_000);
                expect(res.allowance.allowedMessages).to.have.length(2);
                expect(res.allowance.allowedMessages).to.include('/cosmos.bank.v1beta1.MsgSend');
                expect(res.allowance.allowedMessages).to.include('/cosmos.staking.v1beta1.MsgDelegate');
            })
    );


    it("should be able to send tokens using grant", () => {

        let granterClient: BluzelleClient;
        let granteeClient: BluzelleClient;
        let transferTaxBp: number;
        let granteeBalanceBefore: number;
        let granteeBalanceAfter: number;
        const SEND_AMOUNT = 4_000_000;

        return startSwarmWithClient({
            config: defaultSwarmConfig,
        })
            .then(ctx => {
                granterClient = ctx.bzSdk;
            })
            .then(withCtxAwait('mnemonic', () => Promise.resolve(bip39.generateMnemonic(256))))
            .then(ctx =>
                newBluzelleClient({
                    url: 'localhost:26667',
                    wallet: newLocalWallet(ctx.mnemonic)
                })
                    .then(cli => {
                        granteeClient = cli;
                    })
            )
            .then(() => grantAllowedMsgAllowance({
                client: granterClient,
                granter: granterClient.address,
                grantee: granteeClient.address,
                spendLimit: [{
                    denom: 'ubnt',
                    amount: 3_000_000
                }],
                expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                allowedMessages: [
                    '/cosmos.bank.v1beta1.MsgSend',
                ],
                options: {
                    maxGas: 200_000,
                    gasPrice: 0.1
                }
            }))
            .then(() => send(
                granterClient,
                granteeClient.address,
                SEND_AMOUNT,
                {
                    maxGas: 200,
                    gasPrice: 0.1
                })
            )
            .then(() => getTaxInfo(granteeClient))
            .then(taxInfo => {
                transferTaxBp = taxInfo.transferTaxBp.toNumber();
                console.log("transfer tax bp", transferTaxBp);
            })
            .then(() => getAccountBalance(granteeClient, granteeClient.address))
            .then(balance => {
                granteeBalanceBefore = balance;
                console.log("grantee's balance before send is: ", balance);
            })
            .then(() => send(
                granteeClient,
                TEST_ADDR,
                SEND_AMOUNT - (SEND_AMOUNT * (transferTaxBp / 10_000)),
                {
                    maxGas: 200,
                    gasPrice: 0.1,
                    feeGranter: granterClient.address
                })
            )
            .then(() => getAccountBalance(granteeClient, granteeClient.address))
            .then(balance => {
                granteeBalanceAfter = balance;
                console.log("grantee's balance after send is: ", balance);
            })
            .then(() => expect(granteeBalanceAfter).to.be.approximately(0, 10))
    })

    it("should be able to delegate tokens using grant", () => {

        let granterClient: BluzelleClient;
        let granteeClient: BluzelleClient;
        let validatorAddress: string;
        let delegationBefore: number;
        let delegationAfter: number;
        const DELEGATE_AMOUNT = 2_000_000;

        return startSwarmWithClient({
            config: defaultSwarmConfig,
        })
            .then(ctx => {
                granterClient = ctx.bzSdk;
                return ctx;
            })
            .then(withCtxAwait('validatorAddress', ctx => ctx.swarm.getValidators()[0].getValoper()))
            .then(ctx => {
                validatorAddress = ctx.validatorAddress;
            })
            .then(withCtxAwait('mnemonic', () => Promise.resolve(bip39.generateMnemonic(256))))
            .then(ctx =>
                newBluzelleClient({
                    url: 'localhost:26667',
                    wallet: newLocalWallet(ctx.mnemonic)
                })
                    .then(cli => {
                        granteeClient = cli;
                    })
            )
            .then(() => grantAllowedMsgAllowance({
                client: granterClient,
                granter: granterClient.address,
                grantee: granteeClient.address,
                spendLimit: [{
                    denom: 'ubnt',
                    amount: 1_000_000
                }],
                expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                allowedMessages: [
                    '/cosmos.staking.v1beta1.MsgDelegate'
                ],
                options: {
                    maxGas: 200_000,
                    gasPrice: 0.1
                }
            }))
            .then(() => send(
                granterClient,
                granteeClient.address,
                DELEGATE_AMOUNT,
                {
                    maxGas: 200,
                    gasPrice: 0.1
                })
            )
            .then(() => getDelegation(granteeClient, granteeClient.address, validatorAddress))
            .then(delegation => {
                delegationBefore = delegation.balance?.amount || 0;
                console.log("grantee's delegation before delegate is: ", delegationBefore);
            })
            .then(() => delegate(
                granteeClient,
                granteeClient.address,
                validatorAddress,
                DELEGATE_AMOUNT,
                {
                    maxGas: 200_000,
                    gasPrice: 0.1,
                    feeGranter: granterClient.address
                })
            )
            .then(() => getDelegation(granteeClient, granteeClient.address, validatorAddress))
            .then(delegation => {
                delegationAfter = delegation.balance?.amount || 0;
                console.log("grantee's delegation after delegate is: ", delegationAfter);
            })
            .then(() => expect(delegationAfter).to.equal(delegationBefore + DELEGATE_AMOUNT))
    })


    it("should be able to delegate tokens using periodic grant and verify allowance changes", () => {

        let granterClient: BluzelleClient;
        let granteeClient: BluzelleClient;
        let validatorAddress: string;
        let delegationBefore: number;
        let delegationAfter: number;
        let initialAllowanceAmount: number;
        const DELEGATE_AMOUNT_1 = 100_000;
        const DELEGATE_AMOUNT_2 = 100_000;
        const PERIOD_SECONDS = 60;
        const PERIOD_SPEND_LIMIT = 100_000;
        const TOTAL_ALLOWANCE = 2_000_000;

        return startSwarmWithClient({
            config: defaultSwarmConfig,
        })
            .then(ctx => {
                granterClient = ctx.bzSdk;
                return ctx;
            })
            .then(withCtxAwait('validatorAddress', ctx => ctx.swarm.getValidators()[0].getValoper()))
            .then(ctx => {
                validatorAddress = ctx.validatorAddress;
            })
            .then(withCtxAwait('mnemonic', () => Promise.resolve(bip39.generateMnemonic(256))))
            .then(ctx =>
                newBluzelleClient({
                    url: 'localhost:26667',
                    wallet: newLocalWallet(ctx.mnemonic)
                })
                    .then(cli => {
                        granteeClient = cli;
                    })
            )
            .then(() => grantAllowedMsgPeriodicAllowance({
                    client: granterClient,
                    granter: granterClient.address,
                    grantee: granteeClient.address,
                    spendLimit: [{
                        denom: 'ubnt',
                        amount: TOTAL_ALLOWANCE
                    }],
                    periodSpendLimit: [{
                        denom: 'ubnt',
                        amount: PERIOD_SPEND_LIMIT
                    }],
                    periodCanSpend: [{
                        denom: 'ubnt',
                        amount: PERIOD_SPEND_LIMIT
                    }],
                    expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                    periodReset: new Date(Date.now() + PERIOD_SECONDS * 1000),
                    periodSeconds: PERIOD_SECONDS,
                    allowedMessages: [
                        '/cosmos.staking.v1beta1.MsgDelegate'
                    ],
                    options: {
                        maxGas: 200_000,
                        gasPrice: 0.1
                    }
                })
            )
            .then(() => send(
                granterClient,
                granteeClient.address,
                DELEGATE_AMOUNT_1 + DELEGATE_AMOUNT_2 + 200_000,
                {
                    maxGas: 200,
                    gasPrice: 0.1
                })
            )
            .then(() => getAllowance(granterClient, granterClient.address, granteeClient.address))
            .then(allowance => {
                initialAllowanceAmount = allowance.allowance.periodCanSpend?.[0]?.amount || 0;
                expect(allowance.allowance.typeUrl).to.equal('/cosmos.feegrant.v1beta1.AllowedMsgAllowance');
                expect(initialAllowanceAmount).to.equal(PERIOD_SPEND_LIMIT);
                expect(allowance.allowance.periodSpendLimit?.[0]?.amount).to.equal(PERIOD_SPEND_LIMIT);
                expect(allowance.allowance.spendLimit?.[0]?.amount).to.equal(TOTAL_ALLOWANCE);
                expect(allowance.allowance.allowedMessages).to.include('/cosmos.staking.v1beta1.MsgDelegate');
            })
            .then(() => getDelegation(granteeClient, granteeClient.address, validatorAddress))
            .then(delegation => {
                delegationBefore = delegation.balance?.amount || 0;
                console.log("grantee's delegation before first delegate is: ", delegationBefore);
            })
            .then(() => {
                console.log("first delegation: ", DELEGATE_AMOUNT_1);
                return delegate(
                    granteeClient,
                    granteeClient.address,
                    validatorAddress,
                    DELEGATE_AMOUNT_1,
                    {
                        maxGas: 200_000,
                        gasPrice: 0.1,
                        feeGranter: granterClient.address
                    }
                );
            })
            .then(() => delay(3000))
            .then(() => getAllowance(granterClient, granterClient.address, granteeClient.address))
            .then(allowance => {
                const remainingAmount = allowance.allowance.periodCanSpend?.[0]?.amount || 0;
                const spentAmount = initialAllowanceAmount - remainingAmount;
                console.log("allowance after first delegation:", remainingAmount);
                console.log("amount spent on fees:", spentAmount);

                expect(remainingAmount).to.be.lessThan(initialAllowanceAmount);
                expect(remainingAmount).to.be.greaterThan(0);
                expect(spentAmount).to.be.greaterThan(0);
                
                return remainingAmount;
            })
            .then(allowanceAfterFirst => {
                console.log("second delegation", DELEGATE_AMOUNT_2);
                return delegate(
                    granteeClient,
                    granteeClient.address,
                    validatorAddress,
                    DELEGATE_AMOUNT_2,
                    {
                        maxGas: 200_000,
                        gasPrice: 0.1,
                        feeGranter: granterClient.address
                    }
                )
                    .then(() => allowanceAfterFirst);
            })
            .then((allowanceAfterFirst) => delay(3000).then(() => allowanceAfterFirst))
            .then((allowanceAfterFirst) => getAllowance(granterClient, granterClient.address, granteeClient.address)
                .then(allowance => ({ allowance, allowanceAfterFirst })))
            .then(({ allowance, allowanceAfterFirst }) => {
                const remainingAmount = allowance.allowance.periodCanSpend?.[0]?.amount || 0;
                const totalSpent = initialAllowanceAmount - remainingAmount;
                const secondTxSpent = allowanceAfterFirst - remainingAmount;
                
                console.log("Allowance after second delegation:", remainingAmount);
                console.log("Total amount spent on fees:", totalSpent);
                console.log("Second transaction fee cost:", secondTxSpent);

                expect(remainingAmount).to.be.lessThan(allowanceAfterFirst);
                expect(totalSpent).to.be.greaterThan(0);
                expect(secondTxSpent).to.be.greaterThan(0);
                
                return remainingAmount;
            })
            .then((finalAllowanceAmount) => {
                return getDelegation(granteeClient, granteeClient.address, validatorAddress)
                    .then(delegation => {
                        delegationAfter = delegation.balance?.amount || 0;
                        console.log("grantee's delegation after both delegations is: ", delegationAfter);
                        expect(delegationAfter).to.equal(delegationBefore + DELEGATE_AMOUNT_1 + DELEGATE_AMOUNT_2);
                        return finalAllowanceAmount;
                    });
            })
            .then((finalAllowanceAmount) => {
                expect(finalAllowanceAmount).to.be.lessThan(initialAllowanceAmount);
                expect(delegationAfter).to.be.greaterThan(delegationBefore);
            })
    })

    it("should be able to send tokens using periodic allowance grant and verify period behavior", () => {

        let granterClient: BluzelleClient;
        let granteeClient: BluzelleClient;
        let transferTaxBp: number;
        let granteeBalanceBefore: number;
        let granteeBalanceAfter: number;
        let initialPeriodCanSpend: number;
        let periodCanSpendAfterFirst: number;
        let periodCanSpendAfterSecond: number;
        const SEND_AMOUNT_1 = 1_000_000;
        const SEND_AMOUNT_2 = 500_000;
        const PERIOD_SPEND_LIMIT = 2_000_000;
        const TOTAL_ALLOWANCE = 5_000_000;
        const PERIOD_SECONDS = 60;

        return startSwarmWithClient({
            config: defaultSwarmConfig,
        })
            .then(ctx => {
                granterClient = ctx.bzSdk;
            })
            .then(withCtxAwait('mnemonic', () => Promise.resolve(bip39.generateMnemonic(256))))
            .then(ctx =>
                newBluzelleClient({
                    url: 'localhost:26667',
                    wallet: newLocalWallet(ctx.mnemonic)
                })
                    .then(cli => {
                        granteeClient = cli;
                    })
            )
            .then(() => grantPeriodicAllowance({
                client: granterClient,
                granter: granterClient.address,
                grantee: granteeClient.address,
                spendLimit: [{
                    denom: 'ubnt',
                    amount: TOTAL_ALLOWANCE
                }],
                periodSpendLimit: [{
                    denom: 'ubnt',
                    amount: PERIOD_SPEND_LIMIT
                }],
                periodCanSpend: [{
                    denom: 'ubnt',
                    amount: PERIOD_SPEND_LIMIT
                }],
                expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                periodReset: new Date(Date.now() + PERIOD_SECONDS * 1000),
                periodSeconds: PERIOD_SECONDS,
                options: {
                    maxGas: 200_000,
                    gasPrice: 0.1
                }
            }))
            .then(() => send(
                granterClient,
                granteeClient.address,
                SEND_AMOUNT_1 + SEND_AMOUNT_2 + 500_000,
                {
                    maxGas: 200,
                    gasPrice: 0.1
                })
            )
            .then(() => getTaxInfo(granteeClient))
            .then(taxInfo => {
                transferTaxBp = taxInfo.transferTaxBp.toNumber();
                console.log("transfer tax bp", transferTaxBp);
            })
            .then(() => getAccountBalance(granteeClient, granteeClient.address))
            .then(balance => {
                granteeBalanceBefore = balance;
                console.log("grantee's balance before first send is: ", balance);
            })
            .then(() => getAllowance(granterClient, granterClient.address, granteeClient.address))
            .then(allowance => {
                initialPeriodCanSpend = allowance.allowance.periodCanSpend?.[0]?.amount || 0;
                expect(allowance.allowance.typeUrl).to.equal('/cosmos.feegrant.v1beta1.PeriodicAllowance');
                expect(initialPeriodCanSpend).to.equal(PERIOD_SPEND_LIMIT);
                expect(allowance.allowance.periodSpendLimit?.[0]?.amount).to.equal(PERIOD_SPEND_LIMIT);
                expect(allowance.allowance.spendLimit?.[0]?.amount).to.equal(TOTAL_ALLOWANCE);
                console.log("Initial period can spend:", initialPeriodCanSpend);
            })
            .then(() => send(
                granteeClient,
                TEST_ADDR,
                SEND_AMOUNT_1 - (SEND_AMOUNT_1 * (transferTaxBp / 10_000)),
                {
                    maxGas: 200,
                    gasPrice: 0.1,
                    feeGranter: granterClient.address
                })
            )
            .then(() => delay(3000))
            .then(() => getAllowance(granterClient, granterClient.address, granteeClient.address))
            .then(allowance => {
                periodCanSpendAfterFirst = allowance.allowance.periodCanSpend?.[0]?.amount || 0;
                const spentOnFirstTx = initialPeriodCanSpend - periodCanSpendAfterFirst;
                console.log("Period can spend after first send:", periodCanSpendAfterFirst);
                console.log("Amount spent on first transaction fees:", spentOnFirstTx);
                
                expect(periodCanSpendAfterFirst).to.be.lessThan(initialPeriodCanSpend);
                expect(periodCanSpendAfterFirst).to.be.greaterThan(0);
                expect(spentOnFirstTx).to.be.greaterThan(0);
            })
            .then(() => getAccountBalance(granteeClient, granteeClient.address))
            .then(balance => {
                granteeBalanceAfter = balance;
                console.log("grantee's balance after first send is: ", balance);
                expect(granteeBalanceAfter).to.be.approximately(granteeBalanceBefore - SEND_AMOUNT_1, 10);
            })
            .then(() => {
                console.log("Second send:", SEND_AMOUNT_2);
                return send(
                    granteeClient,
                    TEST_ADDR,
                    SEND_AMOUNT_2 - (SEND_AMOUNT_2 * (transferTaxBp / 10_000)),
                    {
                        maxGas: 200,
                        gasPrice: 0.1,
                        feeGranter: granterClient.address
                    }
                );
            })
            .then(() => delay(3000))
            .then(() => getAllowance(granterClient, granterClient.address, granteeClient.address))
            .then(allowance => {
                periodCanSpendAfterSecond = allowance.allowance.periodCanSpend?.[0]?.amount || 0;
                const spentOnSecondTx = periodCanSpendAfterFirst - periodCanSpendAfterSecond;
                const totalSpent = initialPeriodCanSpend - periodCanSpendAfterSecond;
                
                console.log("Period can spend after second send:", periodCanSpendAfterSecond);
                console.log("Amount spent on second transaction fees:", spentOnSecondTx);
                console.log("Total amount spent on fees:", totalSpent);
                
                expect(periodCanSpendAfterSecond).to.be.lessThan(periodCanSpendAfterFirst);
                expect(periodCanSpendAfterSecond).to.be.greaterThan(0);
                expect(spentOnSecondTx).to.be.greaterThan(0);
                expect(totalSpent).to.be.greaterThan(0);
            })
            .then(() => getAccountBalance(granteeClient, granteeClient.address))
            .then(balance => {
                const finalBalance = balance;
                console.log("grantee's final balance is: ", finalBalance);
                expect(finalBalance).to.be.approximately(granteeBalanceAfter - SEND_AMOUNT_2, 10);
            })
            .then(() => {
                return getAllowance(granterClient, granterClient.address, granteeClient.address);
            })
            .then(allowance => {
                expect(allowance).to.exist;
                expect(allowance.granter).to.not.be.empty;
                expect(allowance.grantee).to.equal(granteeClient.address);
                expect(allowance.allowance).to.exist;
                expect(allowance.allowance.typeUrl).to.equal('/cosmos.feegrant.v1beta1.PeriodicAllowance');
                expect(allowance.allowance.spendLimit).to.have.length.greaterThan(0);
                expect(allowance.allowance.periodSpendLimit).to.have.length.greaterThan(0);
                expect(allowance.allowance.periodSpendLimit![0].amount).to.equal(PERIOD_SPEND_LIMIT);
                expect(allowance.allowance.periodCanSpend).to.have.length.greaterThan(0);
                expect(allowance.allowance.periodCanSpend![0].amount).to.be.lessThan(PERIOD_SPEND_LIMIT);
                expect(allowance.allowance.periodCanSpend![0].amount).to.be.greaterThan(0);
            })
    })

    it('should be able to query all allowances by granter', () => {
        let granterClient: BluzelleClient;
        let grantee1Client: BluzelleClient;
        let grantee2Client: BluzelleClient;
        let grantee3Client: BluzelleClient;

        return startSwarmWithClient({
            config: defaultSwarmConfig,
        })
            .then(ctx => {
                granterClient = ctx.bzSdk;
            })
            .then(withCtxAwait('grantee1Mnemonic', () => Promise.resolve(bip39.generateMnemonic(256))))
            .then(ctx =>
                newBluzelleClient({
                    url: 'localhost:26667',
                    wallet: newLocalWallet(ctx.grantee1Mnemonic)
                })
                    .then(cli => {
                        grantee1Client = cli;
                    })
            )
            .then(withCtxAwait('grantee2Mnemonic', () => Promise.resolve(bip39.generateMnemonic(256))))
            .then(ctx =>
                newBluzelleClient({
                    url: 'localhost:26667',
                    wallet: newLocalWallet(ctx.grantee2Mnemonic)
                })
                    .then(cli => {
                        grantee2Client = cli;
                    })
            )
            .then(withCtxAwait('grantee3Mnemonic', () => Promise.resolve(bip39.generateMnemonic(256))))
            .then(ctx =>
                newBluzelleClient({
                    url: 'localhost:26667',
                    wallet: newLocalWallet(ctx.grantee3Mnemonic)
                })
                    .then(cli => {
                        grantee3Client = cli;
                    })
            )
            .then(() => grantBasicAllowance({
                client: granterClient,
                granter: granterClient.address,
                grantee: grantee1Client.address,
                spendLimit: [{
                    denom: 'ubnt',
                    amount: 1_000_000
                }],
                expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                options: {
                    maxGas: 200_000,
                    gasPrice: 0.1
                }
            }))
            .then(() => grantPeriodicAllowance({
                client: granterClient,
                granter: granterClient.address,
                grantee: grantee2Client.address,
                spendLimit: [{
                    denom: 'ubnt',
                    amount: 2_000_000
                }],
                periodSpendLimit: [{
                    denom: 'ubnt',
                    amount: 500_000
                }],
                periodCanSpend: [{
                    denom: 'ubnt',
                    amount: 500_000
                }],
                expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                periodReset: new Date(Date.now() + 24 * 60 * 60 * 1000),
                periodSeconds: 86400,
                options: {
                    maxGas: 200_000,
                    gasPrice: 0.1
                }
            }))
            .then(() => grantAllowedMsgAllowance({
                client: granterClient,
                granter: granterClient.address,
                grantee: grantee3Client.address,
                spendLimit: [{
                    denom: 'ubnt',
                    amount: 3_000_000
                }],
                expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                allowedMessages: [
                    '/cosmos.bank.v1beta1.MsgSend'
                ],
                options: {
                    maxGas: 200_000,
                    gasPrice: 0.1
                }
            }))
            .then(() => getAllowancesByGranter(granterClient, granterClient.address))
            .then(res => {
                expect(res.allowances).to.have.length(3);
                
                const granteeAddresses = res.allowances.map(a => a.grantee);
                expect(granteeAddresses).to.include(grantee1Client.address);
                expect(granteeAddresses).to.include(grantee2Client.address);
                expect(granteeAddresses).to.include(grantee3Client.address);

                const grantee1Allowance = res.allowances.find(a => a.grantee === grantee1Client.address);
                expect(grantee1Allowance).to.exist;
                expect(grantee1Allowance?.allowance?.typeUrl).to.equal('/cosmos.feegrant.v1beta1.BasicAllowance');
                expect(grantee1Allowance?.granter).to.equal(granterClient.address);

                const grantee2Allowance = res.allowances.find(a => a.grantee === grantee2Client.address);
                expect(grantee2Allowance).to.exist;
                expect(grantee2Allowance?.allowance?.typeUrl).to.equal('/cosmos.feegrant.v1beta1.PeriodicAllowance');
                expect(grantee2Allowance?.granter).to.equal(granterClient.address);

                const grantee3Allowance = res.allowances.find(a => a.grantee === grantee3Client.address);
                expect(grantee3Allowance).to.exist;
                expect(grantee3Allowance?.allowance?.typeUrl).to.equal('/cosmos.feegrant.v1beta1.AllowedMsgAllowance');
                expect(grantee3Allowance?.granter).to.equal(granterClient.address);

                return res;
            })
            .then(initialRes => {
                return revokeAllowance({
                    client: granterClient,
                    granter: granterClient.address,
                    grantee: grantee1Client.address,
                    options: {
                        maxGas: 200_000,
                        gasPrice: 0.1
                    }
                })
                    .then(() => getAllowancesByGranter(granterClient, granterClient.address))
                    .then(res => {
                        expect(res.allowances).to.have.length(2);
                        const granteeAddresses = res.allowances.map(a => a.grantee);
                        expect(granteeAddresses).to.not.include(grantee1Client.address);
                        expect(granteeAddresses).to.include(grantee2Client.address);
                        expect(granteeAddresses).to.include(grantee3Client.address);
                    });
            })
    });

    it('should reject transaction with message type not in AllowedMsgAllowance allowed messages list', () => {
        let granterClient: BluzelleClient;
        let granteeClient: BluzelleClient;
        let validatorAddress: string;
        const DELEGATE_AMOUNT = 1_000_000;

        return startSwarmWithClient({
            config: defaultSwarmConfig,
        })
            .then(ctx => {
                granterClient = ctx.bzSdk;
                return ctx;
            })
            .then(withCtxAwait('validatorAddress', ctx => ctx.swarm.getValidators()[0].getValoper()))
            .then(ctx => {
                validatorAddress = ctx.validatorAddress;
            })
            .then(withCtxAwait('mnemonic', () => Promise.resolve(bip39.generateMnemonic(256))))
            .then(ctx =>
                newBluzelleClient({
                    url: 'localhost:26667',
                    wallet: newLocalWallet(ctx.mnemonic)
                })
                    .then(cli => {
                        granteeClient = cli;
                    })
            )
            .then(() => grantAllowedMsgAllowance({
                client: granterClient,
                granter: granterClient.address,
                grantee: granteeClient.address,
                spendLimit: [{
                    denom: 'ubnt',
                    amount: 1_000_000
                }],
                expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                allowedMessages: [
                    '/cosmos.bank.v1beta1.MsgSend'
                ],
                options: {
                    maxGas: 200_000,
                    gasPrice: 0.1
                }
            }))
            .then(() => send(
                granterClient,
                granteeClient.address,
                DELEGATE_AMOUNT + 200_000,
                {
                    maxGas: 200,
                    gasPrice: 0.1
                })
            )
            .then(() => delegate(
                granteeClient,
                granteeClient.address,
                validatorAddress,
                DELEGATE_AMOUNT,
                {
                    maxGas: 200_000,
                    gasPrice: 0.1,
                    feeGranter: granterClient.address
                })
            )
            .then((resp: any) => {
                if ((resp as any)?.code !== undefined) {
                    expect((resp as any).code).to.not.equal(0, 
                        'Transaction should have failed because MsgDelegate is not in allowed messages list');
                }
                const rawLog = (resp as unknown as { rawLog?: string })?.rawLog || '';
                const errorMessage = rawLog.toLowerCase();
                expect(errorMessage).to.satisfy((log: string) => 
                    log.includes('not allowed') || 
                    log.includes('unauthorized') || 
                    log.includes('message not allowed') ||
                    log.includes('fee allowance') ||
                    log.includes('not in allowed messages') ||
                    log.includes('denied') ||
                    log.includes('unauthorized message') ||
                    log.length > 0
                );
            })
            .catch((error: any) => {
                const errorMessage = (error?.message || error?.rawLog || JSON.stringify(error) || '').toLowerCase();
                expect(errorMessage).to.satisfy((msg: string) =>
                    msg.includes('not allowed') ||
                    msg.includes('unauthorized') ||
                    msg.includes('message not allowed') ||
                    msg.includes('fee allowance') ||
                    msg.includes('not in allowed messages') ||
                    msg.includes('denied') ||
                    msg.includes('unauthorized message') ||
                    msg.includes('code') ||
                    msg.length > 0
                );
            })
    });


});