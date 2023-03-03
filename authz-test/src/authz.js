"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const bluzelle_1 = require("bluzelle");
const api = (0, bluzelle_1.bluzelle)({
    mnemonic: 'rather expand outer owner happy merit fox endless illegal square faint logic error blur ginger smile myself brush orange alert smile push school divert',
    endpoint: 'http://localhost:1317',
    uuid: Date.now().toString(),
    chain_id: 'curium'
});
exports.api = api;
