import {$, cd} from 'zx';
import * as path from "path";

const rootDir = () => path.join(__dirname, '../../..');
const curiumDir = () => path.join(rootDir(), 'curium');


process.argv[1] === __filename && setTimeout(() => doBuildCuriumStore())

export const doBuildCuriumStore = () =>
    generateSdkCurium()
        .then(buildCuriumStore)
        .then(removeCuriumStoreDir)

function generateSdkCurium() {
    cd(curiumDir());
    return $`ignite generate vuex`;
}

function buildCuriumStore() {
    cd(rootDir() + '/sdk/ts/src/curium');
    return $`yarn`
        .then(() => $`yarn tsc`);
}

function removeCuriumStoreDir() {
    return $`rm -rf ${rootDir() + '/sdk/ts/src/curium/store'}`;
}

