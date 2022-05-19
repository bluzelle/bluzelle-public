import {$} from 'zx'
import {rm} from "fs/promises";
import * as path from 'path'

rm(path.join(__dirname, '../lib'), {recursive: true})
    .then(() => $`webpack`)
    .then(() => $`yarn dts-bundle-generator -o lib/index.d.ts --project ./tsconfig.json src/index.ts --no-check`)
    .then(() => rm(path.join(__dirname, '../lib/common-lib'), {recursive: true}))
    .then(() => rm(path.join(__dirname, '../lib/curium-utils'), {recursive: true}))
    .then(() => rm(path.join(__dirname, '../lib/daemon-manager'), {recursive: true}))
    .then(() => rm(path.join(__dirname, '../lib/sdk'), {recursive: true}))