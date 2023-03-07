"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const authz_1 = require("../src/authz");
const index_1 = require("../src/index");
describe("Bluzelle Tests", () => __awaiter(void 0, void 0, void 0, function* () {
    const client = (yield authz_1.blzClient);
    (0, index_1.grant)(client, "bluzelle13hvkqhy7u2x0kxjatlusruw9wd4k9esx5zymcv", "bluzelle1x6w5eaajummca4a78hawe3cx4xa8nauwxt8hld", {
        "authorization": {
            "type": "/cosmos.authz.v1beta1.GenericAuthorization",
            "value": {
                "msg": "/cosmos.bank.v1beta1.MsgSend"
            }
        }
    }, {
        gasPrice: 0.002,
        maxGas: 500000,
        mode: 'sync'
    }).then(str => console.log(str))
        .catch(e => console.log(e));
    //       send(client, "bluzelle1x6w5eaajummca4a78hawe3cx4xa8nauwxt8hld", 10 , {
    //                 gasPrice: 0.002,
    //                 maxGas: 200000,
    //                 mode: 'async'
    //             }).then(str => console.log(str))
    //                 .catch(e => console.log(e))
    console.log(yield (0, index_1.getAccountBalance)(client, 'bluzelle13hvkqhy7u2x0kxjatlusruw9wd4k9esx5zymcv'));
}));
