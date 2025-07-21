import { defaultSwarmConfig, startSwarmWithClient } from '@bluzelle/testing';
import { expect } from 'chai';
import { createAddress, faucetToken } from './tx';
import { Swarm } from 'daemon-manager/src';
import { BluzelleClient } from '../../core';
import { getAccountBalance } from '../bank';
import { withCtxAwait } from '@scottburch/with-context';

describe('faucet module', function () {

    this.timeout(1_800_000);

    before(() => process.env.IS_E2E && this.skip());

    beforeEach(() =>
        Swarm.stopDaemons(({...defaultSwarmConfig}))
    );

    after(() =>
        Swarm.stopDaemons(({...defaultSwarmConfig}))
    );
    

    // it('should create an address', () => {
    //     return Promise.resolve(createAddress())
    //         .then(result => {
    //             expect(result.address).to.match(/^bluzelle/)
    //             expect(result.address).to.have.length(47)
    //             expect(result.mnemonic.split(' ')).to.have.length(24)
    //         })
    // });

    // it('should faucet tokens to a given address', () => {
    //     return startSwarmWithClient({
    //         config: defaultSwarmConfig,
    //     })
    //         .then(({bzSdk}) => faucetToken(bzSdk, 'bluzelle1qst08g0f6hyr7z6a7xpgye3nv4ngtnxzz457zd'))
    //         .then(response => {
    //             expect(response.mnemonic).to.be.empty
    //             expect(response.address).to.equal('bluzelle1qst08g0f6hyr7z6a7xpgye3nv4ngtnxzz457zd')
    //         })
    // });

    // it('should faucet tokens with no given address', () => {
    //     return startSwarmWithClient({
    //         config: defaultSwarmConfig,
    //     })
    //         .then(({bzSdk}) => faucetToken(bzSdk))
    //         .then(response => {
    //             expect(response.mnemonic.split(' ')).to.have.length(24)
    //             expect(response.address).to.match(/^bluzelle/)
    //             expect(response.address).to.have.length(47)
    //         })
    // });

    it('should be able to faucet tokens to a new account', () =>

        startSwarmWithClient({
            config: {...defaultSwarmConfig},
            clientOptions: {url: 'http://localhost:26667'}
        })
            .then(info => ({client: info.bzSdk}))
            .then(withCtxAwait('faucetResult', ctx => faucetToken(ctx.client)))
            .then(ctx => getAccountBalance(ctx.client, ctx.faucetResult.address))
            .then(balance => expect(balance).to.equal(200_000_000))
    );


    it('should be able to faucet tokens to a new given', () =>
        startSwarmWithClient()
            .then(info => ({client: info.bzSdk}))
            .then(withCtxAwait('faucetResult', ctx => faucetToken(ctx.client, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj')))
            .then(ctx => getAccountBalance(ctx.client, ctx.faucetResult.address))
            .then(balance => expect(balance).to.equal(200_000_000))
    );

    it('should be able to faucet ELT tokens to a new given', () =>
        startSwarmWithClient()
            .then(info => ({client: info.bzSdk}))
            .then(withCtxAwait('faucetResult', ctx => faucetToken(ctx.client, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj')))
            .then(ctx => getAccountBalance(ctx.client, ctx.faucetResult.address, 'uelt'))
            .then(balance => expect(balance).to.equal(200_000_000))
    );

    it('should be able to faucet G4 tokens to a new given', () =>
        startSwarmWithClient()
            .then(info => ({client: info.bzSdk}))
            .then(withCtxAwait('faucetResult', ctx => faucetToken(ctx.client, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj')))
            .then(ctx => getAccountBalance(ctx.client, ctx.faucetResult.address, 'ug4'))
            .then(balance => expect(balance).to.equal(200_000_000))
    );
});
