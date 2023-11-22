import { withCtxAwait } from '@scottburch/with-context';
import { expect } from 'chai';
import { defaultSwarmConfig } from '@bluzelle/testing';
import {
  getAccountBalance,
  getAllBalances,
  getBankParams,
  getDenomMetadata,
  getSpendableBalances,
  getSupplyOf,
  getTotalSupply
} from './query';
import { startSwarmWithClient, stopSwarm } from '@bluzelle/testing/src/swarmUtils';
import { multiSend, send } from './tx';
import { passThroughAwait } from 'promise-passthrough';
import { Params } from '../../curium/lib/generated/cosmos/bank/v1beta1/bank';

const testAddresses = [
  'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj',
  'bluzelle1kaxu3n8tmtzsmg3zvlfwa7gs04tr07du554h40',
  'bluzelle1daqsqhtdldrpt68qauf5wvtyanen2fmfjww7dl',
  'bluzelle14gren5katxznytnhqjl6zt3u0asg2erqgngjzk',
  'bluzelle1kq7tqye24lr6muyvdgjwk3vv90ad90z2mrsgcm',
  'bluzelle1x9jw9wtle47uy0m8dytcz63jj5gkn08d3uuqtt',
  'bluzelle1jn3zxn6c827zught0aanmalr5ehzfg8txjd927',
  'bluzelle1c4r64lj9a8442d7luacpq2fwyag5nchld3cuxm',
  'bluzelle13td8dk0unl7u5g58qp4wy304zr8hjlnw9kn35l',
  'bluzelle1nwng2q2m42eu8wwpekf44ktnev45mqlk8kdgjd',
  'bluzelle18gm2ngpud3ys9v84vnwy05y6srawahdk507xs5',
  'bluzelle1aa65hq82qwg2uwfuas7gq04dgaxcaj2feqrnzf',
  'bluzelle1w64thav7r7t6xhx3nsvda9purd7ax5rn8aukj7',
  'bluzelle1pc6ncwdlx70uc4ryh0d8unzfeql0eme76q3ykz',
];

const testMultiSendUbntParams = testAddresses.map((addr) => ({
  outputAddress: addr,
  coins: [{
    amount: '100',
    denom: 'ubnt'
  }]
}));

const testMultiSendUg4Params = testAddresses.map((addr) => ({
  outputAddress: addr,
  coins: [{
    amount: '200',
    denom: 'ug4'
  }]
}));

const testMultiSendUeltParams = testAddresses.map((addr) => ({
  outputAddress: addr,
  coins: [{
    amount: '300',
    denom: 'uelt'
  }]
}));

const testMultiSendParams = [...testMultiSendUbntParams, ...testMultiSendUeltParams, ...testMultiSendUg4Params];

describe('bank module', function () {
  this.timeout(600_000);

  beforeEach(stopSwarm);

  it('getAccountBalance should return account balance for the elt and g4 denoms', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then(ctx => Promise.all([getAccountBalance(ctx.bzSdk, ctx.auth.address, 'uelt'), getAccountBalance(ctx.bzSdk, ctx.auth.address, 'ug4')]))
      .then(([ueltBal, ug4Bal]) => {
        expect(ueltBal).to.equal(500000000000000);
        expect(ug4Bal).to.equal(500000000000000);
      })
  );

  it('getAccountBalance should not charge gas', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then(withCtxAwait('balanceBefore', (ctx) => getAccountBalance(ctx.bzSdk, ctx.auth.address)))
      .then(withCtxAwait('balanceAfter', (ctx) => getAccountBalance(ctx.bzSdk, ctx.auth.address)))
      .then((ctx) => expect(ctx.balanceAfter).equal(ctx.balanceBefore))
  );

  it('getTotalsupply should return all 3 balances for ubnt, uelt, ug4', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then((ctx) => getTotalSupply(ctx.bzSdk))
      .then((result) => expect(result.supply.length).equal(3))
  );

  it('getAllBalances should return all 3 balances for ubnt, uelt, ug4', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then((ctx) => getAllBalances(ctx.bzSdk, ctx.auth.address))
      .then((result) => {
        expect(result.balances.length).to.be.equal(3);
        expect(result.balances[0].amount).to.be.greaterThan(0);
        expect(result.balances[1].amount).to.be.greaterThan(0);
        expect(result.balances[2].amount).to.be.greaterThan(0);
      })
  );

  it('getSpendableBalances should return all 3 balances for ubnt, uelt, ug4', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then((ctx) => getSpendableBalances(ctx.bzSdk, ctx.auth.address))
      .then((result) => {
        expect(result.balances.length).to.be.equal(3);
        expect(result.balances[0].amount).to.be.greaterThan(0);
        expect(result.balances[1].amount).to.be.greaterThan(0);
        expect(result.balances[2].amount).to.be.greaterThan(0);
      })
  );

  it('getSupplyOf should return the same balance with the balance from the getTotalSupply', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then(withCtxAwait('fromTotal', (ctx) => getTotalSupply(ctx.bzSdk)))
      .then(withCtxAwait('fromSupplyOf', (ctx) => getSupplyOf(ctx.bzSdk, 'ubnt')))
      .then((ctx) => expect(ctx.fromTotal.supply[0].amount).to.be.equal(ctx.fromSupplyOf))
  );

  it('getParams should return the params of the bank module', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then((ctx) => getBankParams(ctx.bzSdk))
      .then((result) => expect((result as Params).defaultSendEnabled).to.be.equal(true))
  );

  it.skip('getDenomMetadata should return the metadata of the bank module', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then((ctx) => getDenomMetadata(ctx.bzSdk, 'ubnt'))
      .then((result) => console.log(result))
  );

  it('balance should be changed after send transaction', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then(passThroughAwait((ctx) => send(ctx.bzSdk,
        'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj',
        200,
        {
          maxGas: 200_000,
          gasPrice: 0.1
        })))
      .then((ctx) => getAccountBalance(ctx.bzSdk, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj'))
      .then((result) => expect(result).to.be.equal(200))
  );

  it('balances should be changed after multiSend 2 different tokens to one address', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then(passThroughAwait(ctx => multiSend(ctx.bzSdk,
        [{
          outputAddress: 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj',
          coins: [{
            amount: '100',
            denom: 'ubnt'
          }]
        },
          {
            outputAddress: 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj',
            coins: [{
              amount: '200',
              denom: 'ug4'
            }]
          }
        ],
        {
          maxGas: 200_000,
          gasPrice: 0.1
        })
      ))
      .then((ctx) => getAllBalances(ctx.bzSdk, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj',))
      .then((result) => {
        expect(result.balances[0].amount).equal(100);
        expect(result.balances[1].amount).equal(200);
      })
  );

  it('The gas used for multiSend should be smaller than sending several times', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then(withCtxAwait('multiSendResult', (ctx) => multiSend(ctx.bzSdk,
        testMultiSendParams,
        {
          maxGas: 200_000,
          gasPrice: 0.1
        })))
      .then(withCtxAwait('singleSendResult', (ctx) => send(ctx.bzSdk, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj', 100, {
        maxGas: 200_000,
        gasPrice: 0.1
      })))
      .then((ctx) => {
        expect((ctx.multiSendResult as unknown as { gasUsed: number }).gasUsed)
          .to
          .be
          .lessThan((ctx.singleSendResult as unknown as { gasUsed: number }).gasUsed * 42);
      })
  );
});

