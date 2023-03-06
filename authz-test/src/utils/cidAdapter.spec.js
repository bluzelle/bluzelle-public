"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cidAdapter_1 = require("./cidAdapter");
const chai_1 = require("chai");
const cid_1 = require("multiformats/cid");
const cidV1 = 'bafybeigcmqqtwhrjgehcpwdd6nb2r7pooojoqk5j4umom4tysu4jb2xg4e';
const cidV0 = 'QmbRUMjHR5a4k91aMSkeGEjii5v5v8cY8nQyWzAf68aDGL';
describe('cid adapter', function () {
    it('should ensure cid v0 is v0', () => Promise.resolve(cidV0)
        .then(cid => cid_1.CID.parse(cid))
        .then(cidAdapter_1.ensureCidV0)
        .then(cid => (0, chai_1.expect)(cid).to.deep.equal(cidV0)));
    it('should ensure cid v1 becomes v0', () => Promise.resolve(cidV1)
        .then(cid => cid_1.CID.parse(cid))
        .then(cidAdapter_1.ensureCidV0)
        .then(cid => (0, chai_1.expect)(cid).to.deep.equal(cidV0)));
    it('should convert a v1 cid to v0', () => Promise.resolve(cidV1)
        .then(cidAdapter_1.adaptCid)
        .then(cid => (0, chai_1.expect)(cid).to.deep.equal(cidV0)));
    it('should not change a v0 cid', () => Promise.resolve(cidV0)
        .then(cidAdapter_1.adaptCid)
        .then(cid => (0, chai_1.expect)(cid).to.deep.equal(cidV0)));
    it('should not change an input that does not have cid format', () => Promise.resolve('QmNon-cid')
        .then(cidAdapter_1.adaptCid)
        .then(cid => (0, chai_1.expect)(cid).to.deep.equal('QmNon-cid')));
});
