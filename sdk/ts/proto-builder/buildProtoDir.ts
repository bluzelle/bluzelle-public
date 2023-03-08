import {mkdir, writeFile, cp} from "fs/promises";
import fetch from 'node-fetch'
import {getCosmosProtoDependencies, getGoogleDependencies, getThirdPartyDependencies} from "./getProto";
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
    link.replace(/.*?\/v0.45.11\/(.*)/, "$1");

export const getGooglePathFromLink = (link: string): string =>
    'third_party/proto/' + link.replace(/.*?\/src\/(.*)/, "$1");

export const getProtoFile = (link: string, getPathFn: (_: string) => string) =>
    fetch(link)
        .then(resp => writeProtoFile(getPathFn(link), resp.body, getDirFromPath));


export const getDirFromPath = (path: string) =>
    path.replace(/(.*\/).*\.proto/, '$1');

export const writeProtoFile = (path: string, response: NodeJS.ReadableStream, getDirFn: (_: string) => string): Promise<void> =>
    createDir(getDirFn(path))
        .then(() => writeFile('proto' + '/' + path, response));

const getCuriumProto = () =>
    Promise.all(getAllFiles(getCuriumProtoDir())
        .map(file =>
            cp(file, 'proto' + '/' + file.replace(/.*?\/curium\/(proto\/.*)/, '$1'))))

export const downloadAllProto = () =>
    Promise.all(getCosmosProtoDependencies().map(link => getProtoFile(link, getPathFromLink)))
        .then(() => Promise.all(getThirdPartyDependencies().map(link => getProtoFile(link, getPathFromLink))))
        .then(() => Promise.all(getGoogleDependencies().map(link => getProtoFile(link, getGooglePathFromLink))))
        .then(() => getCuriumProto());





