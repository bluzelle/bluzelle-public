import { SendAuthorization } from "../src/curium/lib/generated/cosmos/bank/v1beta1/authz";
import chai from "chai";
import { getAccountBalance, newBluzelleClient } from '../src/index';
import { newLocalWallet } from '../src/index';
import {
    GenericAuthorizationParams,
    genericAuthorizationTx,
    SendAuthorizationParams,
    sendAuthorizationTx,
    StakeAuthorizationParams,
    stakeAuthorizationTx,
    revokeAuthorizationTx,
    RevokeAuthorizationParams,
    ExecuteAuthorizationParams,
    executeAuthorizationTx,
    queryGrant
} from "../src/authz";
import { expect } from "chai";
import { BluzelleClient } from "../src/sdk";
import { AuthorizationType } from "../src/curium/lib/generated/cosmos/staking/v1beta1/authz";
import { GenericAuthorization } from "../src/curium/lib/generated/cosmos/authz/v1beta1/authz";
import { StakeAuthorization } from "../src/curium/lib/generated/cosmos/staking/v1beta1/authz";
import { MsgSend } from "../src/curium/lib/generated/cosmos/bank/v1beta1/tx";
import { MsgMapping, MsgType } from "../src/msg";

const wallet = newLocalWallet(
    "today mom room rice defy sleep awful link title layer upon silly aware crop jar cherry deputy excite recipe just quit pool race height",
    { coinType: 483 }
);

const granteeWallet = newLocalWallet(
    "bus page there wrist almost verb reject color worth analyst drink gas during pizza kick park float remain bid gossip marriage message wrist work",
    { coinType: 483 }
)

const testGranter = "bluzelle1vc2serppykh7a94ymxntltcs763frzjlzl0p2s";
const testGrantee = "bluzelle1vzgp70pmhjyly0q2h9w3wmnf7v2jgms8mtnyau"
const expiration = new Date("1/1/2024");
describe("Authorization Module Test", function () {
    this.timeout(1_800_000)

    it('generic authorization should be successfully created', async () => {
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.SUBMIT_PROPOSAL,
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
        await genericAuthorizationTx(client, params)
        const res = await queryGrant(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.SUBMIT_PROPOSAL
        })
        if (res) {
            expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization")
            expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal(MsgMapping[MsgType.SUBMIT_PROPOSAL])
        }
    });


    it('send authorization should be successfully created', async () => {
        const params: SendAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            spendLimit: [{
                denom: "ubnt",
                amount: "1000000"
            }],
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
        await sendAuthorizationTx(client, params)
        const res = await queryGrant(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.SEND
        })
        if (res) {
            expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.bank.v1beta1.SendAuthorization")
            expect(SendAuthorization.decode(res.grants[0].authorization?.value as any).spendLimit[0].amount).to.equal('1000000')

        }
    });

    it(' stake authorization should be successfully created', async () => {
        const params: StakeAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            authorizationType: AuthorizationType.AUTHORIZATION_TYPE_DELEGATE,
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
        await stakeAuthorizationTx(client, params)
        const res = await queryGrant(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.DELEGATE
        })
        if (res) {
            expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization")
            expect(StakeAuthorization.decode(res.grants[0].authorization?.value as any).authorizationType).to.equal(AuthorizationType.AUTHORIZATION_TYPE_DELEGATE)
        }
    });

    it(' create nft authorization should be successfully created', async () => {
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.CREATE_NFT,
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        });
        await genericAuthorizationTx(client, params)
        const res = await queryGrant(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.CREATE_NFT
        })
        if (res) expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal(MsgMapping[MsgType.CREATE_NFT])
    });

    it(' print edition authorization should be successfully created', async () => {
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.PRINT_EDITION,
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
        await genericAuthorizationTx(client, params)
        const res = await queryGrant(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.PRINT_EDITION
        });
        if (res) expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal(MsgMapping[MsgType.PRINT_EDITION])
    });

    it(' transfer nft authorization should be successfully created', async () => {
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.TRANSFER_NFT,
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
        await genericAuthorizationTx(client, params)
        const res = await queryGrant(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.TRANSFER_NFT,
        })
        if (res) expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal(MsgMapping[MsgType.TRANSFER_NFT])
    });

    it(' create collection authorization should be successfully created', async () => {
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.CREATE_COLLECTION,
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
        await genericAuthorizationTx(client, params)
        const res = await queryGrant(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.CREATE_COLLECTION
        })
        if (res) expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal(MsgMapping[MsgType.CREATE_COLLECTION])
    });

    it('grant should be successfully revoked', async () => {
        const params: RevokeAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.SUBMIT_PROPOSAL,
        }
        const gParams: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.SUBMIT_PROPOSAL,
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
        await genericAuthorizationTx(client, gParams);
        const res = await queryGrant(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.SUBMIT_PROPOSAL
        })
        if (res) {
            expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization")
            expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal(MsgMapping[MsgType.SUBMIT_PROPOSAL])
        }
        await revokeAuthorizationTx(client, params);
        const res1 = await queryGrant(client, {
            granter: testGranter,
            grantee: testGrantee,
            msg: MsgType.SUBMIT_PROPOSAL
        })
        expect(res1).to.match(/NotFound/)
    });

    it('grant should be successfully executed', async () => {
        const params: ExecuteAuthorizationParams = {
            grantee: testGrantee,
            msgs: [{
                typeUrl: MsgMapping[MsgType.SEND],
                value: MsgSend.encode({
                    fromAddress: testGrantee,
                    toAddress: testGranter,
                    amount: [{
                        denom: "ubnt",
                        amount: "100"
                    }]
                }).finish()
            }],
        }
        const sParams: SendAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            spendLimit: [{
                denom: "ubnt",
                amount: "100"
            }],
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
        await sendAuthorizationTx(client, sParams);
        const eClient = await newBluzelleClient({
            wallet: granteeWallet,
            url: "http://localhost:26657"
        })
        const originalBalance = await getAccountBalance(client, testGrantee);
        await executeAuthorizationTx(eClient, params);
        const afterBalance = await getAccountBalance(client, testGrantee);
        expect(originalBalance - afterBalance).to.equal(100)
    });

}
)

