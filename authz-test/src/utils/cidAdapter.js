"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptCid = exports.ensureCidV0 = void 0;
const monet_1 = require("monet");
const cid_1 = require("multiformats/cid");
const lodash_1 = require("lodash");
const ensureCidV0 = (cid) => cid.toV0().toString();
exports.ensureCidV0 = ensureCidV0;
const adaptCid = (value) => monet_1.Either
    .fromTry(() => (0, exports.ensureCidV0)(cid_1.CID.parse(value)))
    .catchMap(() => (0, monet_1.Left)(value))
    .cata(lodash_1.identity, lodash_1.identity);
exports.adaptCid = adaptCid;
