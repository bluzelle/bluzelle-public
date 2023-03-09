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
    executeAuthorizationTx
} from "../src/authz";
import { expect } from "chai";
import { BluzelleClient } from "../src/sdk";
import { AuthorizationType } from "../src/curium/lib/generated/cosmos/staking/v1beta1/authz";
import { GenericAuthorization } from "../src/curium/lib/generated/cosmos/authz/v1beta1/authz";
import { StakeAuthorization } from "../src/curium/lib/generated/cosmos/staking/v1beta1/authz";
import { MsgSend } from "../src/curium/lib/generated/cosmos/bank/v1beta1/tx";
const wallet = newLocalWallet(
    "tired inquiry tape jar pizza mango system slogan door always sleep office space want stove scatter ski uphold toward pet material dinosaur prosper round",
    { coinType: 483 }
);
const testGranter = "bluzelle13eyh7hyjmlk4ya0nftl4yuuqcmu86agw34h27g";
const testGrantee = "bluzelle1mzrns4r83g6c7pk2400gnycvr0ct9zyugtzu5a"
const expiration = new Date("1/1/2024");
describe("Authorization Module Test", function () {
    this.timeout(1_800_000)
    let client: BluzelleClient;

    it('generic authorization should be successfully created', () => {
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: "/cosmos.gov.v1beta1.MsgSubmitProposal",
            expiration
        }
        return newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        }).then((client) =>
            genericAuthorizationTx(client, params)
                .then(() => client.queryClient.authz.Grants({
                    granter: testGranter,
                    grantee: testGrantee,
                    msgTypeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal"
                })
                )
                .then((res) => {
                    expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization")
                    expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal("/cosmos.gov.v1beta1.MsgSubmitProposal")
                })
        );
    });


    it('send authorization should be successfully created', () => {
        const params: SendAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            spendLimit: [{
                denom: "ubnt",
                amount: "1000000"
            }],
            expiration
        }
        return newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        }).then((client) =>
            sendAuthorizationTx(client, params)
                .then(() => client.queryClient.authz.Grants({
                    granter: testGranter,
                    grantee: testGrantee,
                    msgTypeUrl: "/cosmos.bank.v1beta1.MsgSend"
                })
                )
                .then((res) => {
                    expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.bank.v1beta1.SendAuthorization")
                    expect(SendAuthorization.decode(res.grants[0].authorization?.value as any).spendLimit[0].amount).to.equal('1000000')
                })
        )
    });

    it(' stake authorization should be successfully created', () => {
        const params: StakeAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            authorizationType: AuthorizationType.AUTHORIZATION_TYPE_DELEGATE,
            expiration
        }
        return newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        }).then((client) =>
            stakeAuthorizationTx(client, params)
                .then(() => client.queryClient.authz.Grants({
                    granter: testGranter,
                    grantee: testGrantee,
                    msgTypeUrl: "/cosmos.staking.v1beta1.MsgDelegate"
                })
                )
                .then((res) => {
                    expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.staking.v1beta1.StakeAuthorization")
                    expect(StakeAuthorization.decode(res.grants[0].authorization?.value as any).authorizationType).to.equal(AuthorizationType.AUTHORIZATION_TYPE_DELEGATE)
                })
        )
    });

    it(' creat nft authorization should be successfully created', () => {
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: "/bluzelle.curium.nft.MsgCreateNFT",
            expiration
        }
        return newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        }).then((client) =>
            genericAuthorizationTx(client, params)
                .then(() => client.queryClient.authz.Grants({
                    granter: testGranter,
                    grantee: testGrantee,
                    msgTypeUrl: "/bluzelle.curium.nft.MsgCreateNFT"
                })
                )
                .then((res) => {
                    expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal("/bluzelle.curium.nft.MsgCreateNFT")
                })
        );
    });

    it(' print edition authorization should be successfully created', () => {
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: "/bluzelle.curium.nft.MsgPrintEdition",
            expiration
        }
        return newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        }).then((client) =>
            genericAuthorizationTx(client, params)
                .then(() => client.queryClient.authz.Grants({
                    granter: testGranter,
                    grantee: testGrantee,
                    msgTypeUrl: "/bluzelle.curium.nft.MsgPrintEdition"
                })
                )
                .then((res) => {
                    expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal("/bluzelle.curium.nft.MsgPrintEdition")
                })
        );
    });

    it(' transfer nft authorization should be successfully created', () => {
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: "/bluzelle.curium.nft.MsgTransferNFT",
            expiration
        }
        return newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        }).then((client) =>
            genericAuthorizationTx(client, params)
                .then(() => client.queryClient.authz.Grants({
                    granter: testGranter,
                    grantee: testGrantee,
                    msgTypeUrl: "/bluzelle.curium.nft.MsgTransferNFT"
                })
                )
                .then((res) => {
                    expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal("/bluzelle.curium.nft.MsgTransferNFT")
                })
        );
    });

    it(' create collection authorization should be successfully created', () => {
        const params: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: "/bluzelle.curium.nft.MsgCreateCollection",
            expiration
        }
        return newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        }).then((client) =>
            genericAuthorizationTx(client, params)
                .then(() => client.queryClient.authz.Grants({
                    granter: testGranter,
                    grantee: testGrantee,
                    msgTypeUrl: "/bluzelle.curium.nft.MsgCreateCollection"
                })
                )
                .then((res) => {
                    expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal("/bluzelle.curium.nft.MsgCreateCollection")
                })
        );
    });

    it('grant should be successfully revoked', async () => {
        const params: RevokeAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msgTypeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
        }
        const gParams: GenericAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            msg: "/cosmos.gov.v1beta1.MsgSubmitProposal",
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
        await genericAuthorizationTx(client, gParams);
        const res: any = await client.queryClient.authz.Grants({
            granter: testGranter,
            grantee: testGrantee,
            msgTypeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal"
        })
        expect(res.grants[0].authorization?.typeUrl).to.equal("/cosmos.authz.v1beta1.GenericAuthorization")
        expect(GenericAuthorization.decode(res.grants[0].authorization?.value as any).msg).to.equal("/cosmos.gov.v1beta1.MsgSubmitProposal")
        await revokeAuthorizationTx(client, params);
        const res1 = async () => {
            try {
                await client.queryClient.authz.Grants({
                    granter: testGranter,
                    grantee: testGrantee,
                    msgTypeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal"
                })
            } catch (e) {
                expect(e).to.match(/NotFound/)
            }
        }
        await res1();
    });

    it('grant should be successfully executed', async () => {
        const params: ExecuteAuthorizationParams = {
            grantee: testGrantee,
            msgs: [{
                typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                value: MsgSend.encode({
                    fromAddress: testGrantee,
                    toAddress: testGranter,
                    amount: [{
                        denom: "ubnt",
                        amount: "10000000"
                    }]
                }).finish()
            }],
        }
        const sParams: SendAuthorizationParams = {
            granter: testGranter,
            grantee: testGrantee,
            spendLimit: [{
                denom: "ubnt",
                amount: "100000000"
            }],
            expiration
        }
        const client = await newBluzelleClient({
            wallet,
            url: "http://localhost:26657"
        })
        await sendAuthorizationTx(client, sParams);
        const eWallet = newLocalWallet(
            "legal obvious account topic village rigid motor spray wink shy arch midnight idle elite bag improve orphan sample brass scan amazing ostrich science poverty",
            { coinType: 483 }
        );
        const eClient = await newBluzelleClient({
            wallet: eWallet,
            url: "http://localhost:26657"
        })
        const originalBalance = await getAccountBalance(client, testGrantee);
        const resMsgExec = await executeAuthorizationTx(eClient, params);
        const afterBalance = await getAccountBalance(client, testGrantee);
        expect(originalBalance - afterBalance).to.equal(10000000)
    });

}
)

