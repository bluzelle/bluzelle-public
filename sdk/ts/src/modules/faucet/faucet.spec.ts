import {defaultSwarmConfig, startSwarmWithClient} from '@bluzelle/testing';
import {expect} from 'chai';
import {faucetToken} from './tx';
import {Swarm} from 'daemon-manager/src';
import {getAccountBalance} from '../bank';
import {withCtxAwait} from '@scottburch/with-context';
import {isE2E} from "@bluzelle/testing/src/e2eUtils";

describe('faucet module', function () {

    this.timeout(1_800_000);

    beforeEach(() =>
        Swarm.stopDaemons(({...defaultSwarmConfig}))
    );

    after(() =>
        Swarm.stopDaemons(({...defaultSwarmConfig}))
    );

    it('should be able to faucet tokens to a new account', function() {
        isE2E() && this.skip();
        startSwarmWithClient({
            config: {...defaultSwarmConfig},
            clientOptions: {url: 'http://localhost:26667'}
        })
            .then(info => ({client: info.bzSdk}))
            .then(withCtxAwait('faucetResult', ctx => faucetToken(ctx.client)))
            .then(ctx => getAccountBalance(ctx.client, ctx.faucetResult.address))
            .then(balance => expect(balance).to.equal(200_000_000))
    });


    it('should be able to faucet tokens to a new given', function() {
        isE2E() && this.skip();
        startSwarmWithClient()
            .then(info => ({client: info.bzSdk}))
            .then(withCtxAwait('faucetResult', ctx => faucetToken(ctx.client, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj')))
            .then(ctx => getAccountBalance(ctx.client, ctx.faucetResult.address))
            .then(balance => expect(balance).to.equal(200_000_000))
    });

    it('should be able to faucet ELT tokens to a new given', function() {
        isE2E() && this.skip();
        return startSwarmWithClient()
            .then(info => ({client: info.bzSdk}))
            .then(withCtxAwait('faucetResult', ctx => faucetToken(ctx.client, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj')))
            .then(ctx => getAccountBalance(ctx.client, ctx.faucetResult.address, 'uelt'))
            .then(balance => expect(balance).to.equal(200_000_000))
    });

    it('should be able to faucet G4 tokens to a new given', function() {
        isE2E() && this.skip();
        return startSwarmWithClient()
            .then(info => ({client: info.bzSdk}))
            .then(withCtxAwait('faucetResult', ctx => faucetToken(ctx.client, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj')))
            .then(ctx => getAccountBalance(ctx.client, ctx.faucetResult.address, 'ug4'))
            .then(balance => expect(balance).to.equal(200_000_000))
    });
});
