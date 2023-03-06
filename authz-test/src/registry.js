"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistry = void 0;
const proto_signing_1 = require("@cosmjs/proto-signing");
const monet_1 = require("monet");
const tx_1 = require("./tx");
const lodash_1 = require("lodash");
exports.getRegistry = (0, lodash_1.memoize)(() => (0, monet_1.Some)(new proto_signing_1.Registry())
    .map(tx_1.registerMessages)
    .join());
