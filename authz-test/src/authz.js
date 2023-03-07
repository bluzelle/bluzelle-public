"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blzClient = void 0;
const index_1 = require("./index");
const index_2 = require("./index");
const wallet = (0, index_2.newLocalWallet)("pigeon candy flock traffic load viable chaos buyer crystal car guide black candy morning sell letter when airport notice favorite theory dial olive general", { coinType: 483 });
const blzClient = (0, index_1.newBluzelleClient)({
    wallet,
    url: "http://localhost:26657"
});
exports.blzClient = blzClient;
