import {exec} from "@scottburch/exec";
import {readFile, writeFile} from "fs/promises";
import * as path from 'path'

const packageJSONFile = () => path.join(__dirname, '../package.json')
const changePackageJSONToLib = () =>
    readFile(packageJSONFile(), {encoding: 'utf-8'})
        .then(JSON.parse)
        .then(config => ({
            ...config,
            main: 'lib/index.js'
        }))
        .then(JSON.stringify)
        .then(newData => writeFile(packageJSONFile(), newData))


const publishNpm = () =>
    exec`npm publish`;

changePackageJSONToLib()
    .then(publishNpm)