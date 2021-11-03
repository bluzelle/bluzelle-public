import {bluzelle, uploadNft} from "bluzelle";
import {sha256} from "js-sha256";
import {readFile} from 'fs/promises'

readFile(`${__dirname}/image.jpg`)

    // On the server - send a transaction to register the upload
    .then(data => ({
        bz: bluzelle({
            mnemonic: "mnemonic provided by bluzelle",
            endpoint: 'https://client.sentry.bluzellenet.bluzelle.com:1317',
            uuid: ''
        }),
        data,
        id: 'ANY-ID-1'
    }))
    .then(ctx => ({...ctx, hash: sha256(ctx.data)}))
    .then(ctx =>
        ctx.bz.createNft({
            id: ctx.id,
            hash: ctx.hash,
            vendor: 'VENDOR_CODE_PROVIDED_BY_BLUZELLE',  // replace with your id provided to you by Bluzelle
            userId: 'ANY-USER-ID',
            mime: 'image/jpeg',
            meta: 'meta',
            size: ctx.data.byteLength,
            gasInfo: {max_gas: 100_000_000, gas_price: 0.002}
        })
            .then(resp => ({...ctx, token: resp.token}))
    )

    // This part down here can be run in the end users browser to upload the file to Bluzelle
    .then(
        ctx => uploadNft(ctx.bz.url, ctx.data, ctx.token, 'VENDOR_CODE_PROVIDED_BY_BLUZELLE')
            .then(() => ctx)
    ).then(ctx => console.log('HASH:',ctx.hash))
    .catch(e => console.log('ERROR:', e))

/*************************************
 * To use this code
 *
 * 1) obtain a mnemonic from Bluzelle and insert into the mnemonic field above
 * 2) Set the fields that are upper case accordingly
 * 3) run this code
 * 4) open https://client.sentry.testnet.public.bluzelle.com:1317/nft/customer/any-id-3 in a browser to see the result
 * 5) to verify replication go to https://[x].client.sentry.bluzellenet.bluzelle.com:1317/nft/[customer]/any-id-1
 *    replacing x with 'a', 'b' or 'c'
 *
 *    Feel free to change any of the fields above, especially the content of the file (the 'data' field), the id or the 'vendor'.
 *    The max size of the data field is 100MB.
 */