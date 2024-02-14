import { defaultSwarmConfig, startSwarmWithClient } from '@bluzelle/testing';
import { expect } from 'chai';
import { createAddress, mint } from './tx';
import { Swarm } from 'daemon-manager/src';
import { BluzelleClient } from '../../core';
import { getAccountBalance } from '../bank';
import { withCtxAwait } from '@scottburch/with-context';

describe('faucet module', function () {

    this.timeout(1_800_000);

    beforeEach(() =>
        Swarm.stopDaemons(({...defaultSwarmConfig}))
    );

    it('should create an address', () => {
        return Promise.resolve(createAddress())
            .then(result => {
                expect(result.address).to.match(/^bluzelle/)
                expect(result.address).to.have.length(47)
                expect(result.mnemonic.split(' ')).to.have.length(24)
            })
    });

    it('should mint tokens to a given address', () => {
        return startSwarmWithClient({...defaultSwarmConfig, bluzelleFaucet: true})
            .then(({bzSdk}) => mint(bzSdk, 'bluzelle1qst08g0f6hyr7z6a7xpgye3nv4ngtnxzz457zd'))
            .then(response => {
                expect(response.mnemonic).to.be.empty
                expect(response.address).to.equal('bluzelle1qst08g0f6hyr7z6a7xpgye3nv4ngtnxzz457zd')
            })
    });

    it('should mint tokens with no given address', () => {
        return startSwarmWithClient({...defaultSwarmConfig, bluzelleFaucet: true})
            .then(({bzSdk}) => mint(bzSdk))
            .then(response => {
                expect(response.mnemonic.split(' ')).to.have.length(24)
                expect(response.address).to.match(/^bluzelle/)
                expect(response.address).to.have.length(47)
            })
    });

    it('should not be able to mint tokens when faucet is off', () => {
        let client: BluzelleClient;
        return startSwarmWithClient({...defaultSwarmConfig, bluzelleFaucet: false})
            .then(({bzSdk}) => client = bzSdk)
            .then(() => mint(client, 'bluzelle1qst08g0f6hyr7z6a7xpgye3nv4ngtnxzz457zd'))
            .then(() => expect(true).to.be.false)
            .catch(err => expect(err.stack).to.contain('invalid request'))
            .then(() => getAccountBalance(client, 'bluzelle1qst08g0f6hyr7z6a7xpgye3nv4ngtnxzz457zd'))
            .then(bal => expect(bal).to.equal(0))
    });

    it('should be able to mint tokens to a new account', () =>
        startSwarmWithClient({...defaultSwarmConfig, bluzelleFaucet: true}, {url: 'http://localhost:26667'})
            .then(info => ({client: info.bzSdk}))
            .then(withCtxAwait('mintResult', ctx => mint(ctx.client)))
            .then(ctx => getAccountBalance(ctx.client, ctx.mintResult.address))
            .then(balance => expect(balance).to.equal(200_000_000))
    );


    it('should be able to mint tokens to a new given', () =>
        startSwarmWithClient()
            .then(info => ({client: info.bzSdk}))
            .then(withCtxAwait('mintResult', ctx => mint(ctx.client, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj')))
            .then(ctx => getAccountBalance(ctx.client, ctx.mintResult.address))
            .then(balance => expect(balance).to.equal(200_000_000))
    );

    it('should be able to mint ELT tokens to a new given', () =>
        startSwarmWithClient()
            .then(info => ({client: info.bzSdk}))
            .then(withCtxAwait('mintResult', ctx => mint(ctx.client, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj')))
            .then(ctx => getAccountBalance(ctx.client, ctx.mintResult.address, 'uelt'))
            .then(balance => expect(balance).to.equal(200_000_000))
    );

    it('should be able to mint G4 tokens to a new given', () =>
        startSwarmWithClient()
            .then(info => ({client: info.bzSdk}))
            .then(withCtxAwait('mintResult', ctx => mint(ctx.client, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj')))
            .then(ctx => getAccountBalance(ctx.client, ctx.mintResult.address, 'ug4'))
            .then(balance => expect(balance).to.equal(200_000_000))
    );

    it('should not mint if bluzelleFaucet is not turned on', () =>
        startSwarmWithClient({...defaultSwarmConfig, bluzelleFaucet: false})
            .then(info => mint(info.bzSdk))
            .catch(err => expect(err.message.includes('invalid request')).to.be.true)
    );

});
