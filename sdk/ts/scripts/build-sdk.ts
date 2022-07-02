import {$, cd} from 'zx';
import {doBuildCuriumStore} from "./build-curium-store";
import {rm} from "fs/promises";
import * as path from "path";


doBuildCuriumStore()
    .then(() => cd(path.join(__dirname, '..')))
    .then(() => rm(path.join(__dirname, '../lib'), {recursive: true, force: true}))
    .then(() => $`yarn webpack`)
    .then(() => $`yarn dts-bundle-generator -o lib/index.d.ts --project ./tsconfig.json src/index.ts --no-check`)
