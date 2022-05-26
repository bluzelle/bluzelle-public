import {$, cd} from 'zx';
import * as path from "path";

const rootDir = () => path.join(__dirname, '../../..');
const curiumDir = () => path.join(rootDir(), 'curium');


generateSdkCurium()
    .then(buildCuriumStore)
    .then(removeCuriumStore)

function generateSdkCurium() {
    cd(curiumDir());
    return $`sh -c 'ignite generate vuex'`;
}

function buildCuriumStore() {
    cd(rootDir() + '/sdk/ts/src/curium');
    return $`yarn tsc`
}

function removeCuriumStore() {
    return $`rm -rf ${rootDir() + '/sdk/ts/src/curium/store'}`;
}

