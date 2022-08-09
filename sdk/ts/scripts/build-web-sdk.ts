import {doBuildCuriumStore} from "./build-curium-store";
import {rm} from "fs/promises";
import {exec, cd} from "@scottburch/exec";
import * as path from 'path'

doBuildCuriumStore()
    .then(() => cd(path.join(__dirname, '..')))
    .then(() => rm(path.join(__dirname, '../browser.js'), {recursive: true, force: true}))
    .then(() => rm(path.join(__dirname, '../browser.js.map'), {recursive: true, force: true}))
    .then(() => exec`yarn webpack -c ./browser.webpack.config.js`.toPromise())