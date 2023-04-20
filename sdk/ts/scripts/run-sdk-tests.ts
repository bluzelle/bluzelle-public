import * as  path from "path";
import {passThroughAwait} from "promise-passthrough";
import {cd, exec} from '@scottburch/exec'


exec`lerna run build --scope @bluzelle/sdk --stream`
    .then(() => path.join(__dirname, '../'))
    .then(passThroughAwait(() => cd(path.join(__dirname, '../'))))
    .then(rootPath => exec`JUNIT_REPORT_PATH=${rootPath}/report.xml yarn mocha --exit --bail -r ts-node/register --colors --timeout 5400000 --reporter mocha-jenkins-reporter '{src,!(node_modules)/**/src}/**/*.spec.ts'`.toPromise())
