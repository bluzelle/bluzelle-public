import {doBuildCuriumStore} from "./build-curium-store";
import {rm} from "fs/promises";
import * as path from "path";
import {exec, cd} from "@scottburch/exec";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

doBuildCuriumStore()
    .then(() => cd(path.join(__dirname, '..')))
    .then(() => rm(path.join(__dirname, '../lib'), {recursive: true, force: true}))
    .then(() => exec`yarn webpack`.toPromise())
    .then(() => exec`yarn dts-bundle-generator -o lib/index.d.ts --project ./tsconfig.json src/index.ts --no-check`.toPromise())
