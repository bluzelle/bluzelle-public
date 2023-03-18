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
exports.queryGrant = void 0;
const authzMappings_1 = require("./authzMappings");
const queryGrant = (client, params) => __awaiter(void 0, void 0, void 0, function* () {
    let queryResult;
    try {
        queryResult = yield client.queryClient.authz.Grants({
            granter: params.granter,
            grantee: params.grantee,
            msgTypeUrl: authzMappings_1.msgMapping[params.msg]
        });
        return queryResult;
    }
    catch (e) {
        return e.message;
    }
});
exports.queryGrant = queryGrant;
