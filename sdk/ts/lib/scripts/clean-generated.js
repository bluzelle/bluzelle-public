"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const findRemove = require('find-remove');
findRemove(path.join(__dirname, '../src/generated'), {
    extensions: ['.ts']
});
//# sourceMappingURL=clean-generated.js.map