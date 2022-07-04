import {mkdir, writeFile, cp} from "fs/promises";
import fetch from 'node-fetch'
import {getCosmosProtoDependencies, getThirdPartyDependencies} from "./getProto";
import {readdirSync, statSync} from "fs";
import * as path from 'path'


const rootDir = () => path.join(__dirname, '../../..');
const getCuriumProtoDir = () => path.join(rootDir(), 'curium/proto');

export const getAllFiles = (dir: string, filePaths: string[] = []): string[] => {
    const files = readdirSync(dir)
    files.forEach(file =>
        statSync(dir + "/" + file).isDirectory()?
            filePaths = getAllFiles(dir + "/" + file, filePaths)
            :
            filePaths.push(dir + "/" + file)
    )
    return filePaths
};

export const createDir = (dir: string, parent: string = 'proto') =>
    mkdir(parent + '/' + dir, {recursive: true});

export const getPathFromLink = (link: string): string =>
    link.replace(/.*?\/v0.44.3\/(.*)/, "$1");

export const getProtoFile = (link: string) =>
    fetch(link)
        .then(resp => writeProtoFile(getPathFromLink(link), resp.body));

export const getDirFromPath = (path: string) =>
    path.replace(/(.*\/).*\.proto/, '$1');

export const writeProtoFile = (path: string, response: NodeJS.ReadableStream): Promise<void> =>
    createDir(getDirFromPath(path))
        .then(() => writeFile('proto' + '/' + path, response));

const getCuriumProto = () =>
    Promise.all(getAllFiles(getCuriumProtoDir())
        .map(file =>
            cp(file, 'proto' + '/' + file.replace(/.*?\/curium\/(proto\/.*)/, '$1'))))

export const downloadAllProto = () =>
    Promise.all(getCosmosProtoDependencies().map(getProtoFile))
        .then(() => Promise.all(getThirdPartyDependencies().map(getProtoFile)))
        .then(() => getCuriumProto());





