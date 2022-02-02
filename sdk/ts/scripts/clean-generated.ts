import findRemove from 'find-remove'
import path from "path";

findRemove(path.join(__dirname, '../src/generated'), {
    extensions: ['.js']
});




