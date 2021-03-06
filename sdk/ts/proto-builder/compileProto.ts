import {$} from 'zx';
import {mkdir} from "fs/promises";
import {getAllFiles} from "./buildProtoDir";
import {exec} from "@scottburch/exec";


export const ensureDirExists = (dir: string) =>
    mkdir(dir, {recursive: true});

export const generateProto = (protoFilePath: string, toDir: string) =>
    exec`yarn protoc --plugin=${__dirname}/../node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=${toDir} ${protoFilePath} --proto_path proto/proto --proto_path proto/third_party/proto --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true"`.toPromise();


export const getProtoPathOption = (filePath: string) =>
    filePath.replace(/^(.*?)\/.*/, '$1');



export const generateAllProto = (fromDir: string, protoTSDir = 'proto-temp-ts') =>
    Promise.all(
        getAllFiles(fromDir).map(
            file => generateProto(file, protoTSDir)
        ));



