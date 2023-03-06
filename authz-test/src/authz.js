"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blzClient = void 0;
const index_1 = require("./index");
const index_2 = require("./index");
const wallet = (0, index_2.newLocalWallet)("double clock match tag extra picture hen become pause moon dove remain crater damp clutch pretty cabbage wheel fantasy perfect already retreat live cherry", { coinType: 483 });
const blzClient = (0, index_1.newBluzelleClient)({
    wallet,
    url: "http://localhost:26657"
});
exports.blzClient = blzClient;
