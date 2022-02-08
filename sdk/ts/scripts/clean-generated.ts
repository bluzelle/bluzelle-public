import * as path from "path";
const findRemove = require('find-remove');

findRemove(path.join(__dirname, '../src/generated'), {
    extensions: ['.js']
});




