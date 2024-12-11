import { withCtxAwait } from '@scottburch/with-context';
import { expect } from 'chai';
import { defaultSwarmConfig } from '@bluzelle/testing';
import {
  getAccount,
  getAccountInfo,
  getAccounts,
  getModuleAccountByName,
  getModuleAccounts,
  getParams
} from "./query";
import { startSwarmWithClient, stopSwarm } from '@bluzelle/testing/src/swarmUtils';
import { BaseAccount, ModuleAccount } from '../../curium/lib/generated/cosmos/auth/v1beta1/auth';


describe('auth module', function () {
  this.timeout(1600_000);

  beforeEach(stopSwarm);

  it('getAccounts should return all accounts info', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then(client => getAccounts(client.bzSdk)
    )
    .then(result => expect(result.accounts[0]).to.have.property('typeURL'))
  );


  it('getAccount should return account info with provided address', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then(withCtxAwait('accountsInfo', (ctx) => getAccounts(ctx.bzSdk)))
      .then((ctx) => getAccount(ctx.bzSdk, 
        ctx.accountsInfo.accounts[0].typeURL == '/cosmos.auth.v1beta1.ModuleAccount' ? (ctx.accountsInfo.accounts[0].account as ModuleAccount).baseAccount?.address as string : (ctx.accountsInfo.accounts[0].account as BaseAccount).address
      ))
    .then(result => expect(result).to.have.property('typeURL'))
  );

  it('getAccountInfo should return all accounts info', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then(withCtxAwait('accountsInfo', (ctx) => getAccounts(ctx.bzSdk)))
      .then((ctx) => getAccountInfo(ctx.bzSdk, 
        ctx.accountsInfo.accounts[0].typeURL == '/cosmos.auth.v1beta1.ModuleAccount' ? (ctx.accountsInfo.accounts[0].account as ModuleAccount).baseAccount?.address as string : (ctx.accountsInfo.accounts[0].account as BaseAccount).address
      ))
    .then(result => expect(result).to.have.property('info'))
  );

  it('getAccountInfo should return 10 module accounts info', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then((ctx) => getModuleAccounts(ctx.bzSdk))
      .then(result => expect(result.length).to.equal(10))
  );

  it('getAccountInfo should return account info by its name', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then((ctx) => getModuleAccountByName(ctx.bzSdk, "gov"
      ))
    .then(result => expect(result?.name).to.equal("gov"))
  );

  it('getParams should return all params info', () =>
    startSwarmWithClient(defaultSwarmConfig)
      .then((ctx) => getParams(ctx.bzSdk))
    .then(result => expect(result).to.have.property("params"))
  );

});

