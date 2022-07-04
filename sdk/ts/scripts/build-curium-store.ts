import * as path from "path";
import {downloadAllProto} from "../proto-builder/buildProtoDir";
import {generateAllProto} from "../proto-builder/compileProto";
import {mkdir} from "fs/promises";
import {cd, exec} from "@scottburch/exec";

const rootDir = () => path.join(__dirname, '../../..');

process.argv[1] === __filename && setTimeout(() => doBuildCuriumStore())

export const doBuildCuriumStore = () =>
    mkdir(rootDir() + '/sdk/ts/src/curium/store', {recursive: true})
        .then(generateSdkCurium)
        .then(buildCuriumStore)
        .then(removeCuriumStoreDir)

const generateSdkCurium = () =>
    downloadAllProto()
        .then(() => generateAllProto('proto', rootDir() + '/sdk/ts/src/curium/store'));

const buildCuriumStore = () =>
    Promise.resolve(cd(rootDir() + '/sdk/ts/src/curium'))
        .then(() => exec`yarn`.toPromise())
        .then(() => exec`yarn tsc`.toPromise());

function removeCuriumStoreDir() {
    return exec`rm -rf ${rootDir() + '/sdk/ts/src/curium/store'}`.toPromise();
}

