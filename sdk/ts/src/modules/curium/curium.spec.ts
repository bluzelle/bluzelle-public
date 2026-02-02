import {startSwarmWithClient} from "@bluzelle/testing"
import {defaultSwarmConfig} from "@bluzelle/testing/src/defaultConfigs";
import {passThroughAwait} from "promise-passthrough";
import {expect} from "chai";
import {Swarm} from "daemon-manager";
import {getAdminAddress} from "./query";
import {withCtxAwait} from "with-context";
import {isE2E} from '@bluzelle/testing/src/e2eUtils';

describe('curium module', function () {
    this.timeout(2_000_000);

    beforeEach(() =>
        Swarm.stopDaemons({...defaultSwarmConfig})
    );

    after(() =>
        Swarm.stopDaemons({...defaultSwarmConfig})
    );

    describe('getAdminAddress', () => {
        it("should get the admin address", function() {
            return startSwarmWithClient({
                isE2E: isE2E()
            })
                .then(withCtxAwait("adminAddress", ctx => 
                    getAdminAddress(ctx.bzSdk)))
                .then(ctx => {
                    expect(ctx.adminAddress.adminAddress).to.be.a('string');
                    expect(ctx.adminAddress.adminAddress).to.not.be.empty;
                    // Admin address should be a valid bech32 address starting with 'bluzelle'
                    expect(ctx.adminAddress.adminAddress).to.match(/^bluzelle1[a-z0-9]{38}$/);
                })
        });
    });
});
