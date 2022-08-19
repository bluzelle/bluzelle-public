import {getAllFiles} from "./buildProtoDir";
import {exec} from "@scottburch/exec";

require('events').EventEmitter.defaultMaxListeners = 100;


export const generateProto = (protoFilePath: string, toDir: string) =>
    exec`protoc --plugin=${__dirname}/../node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=${toDir} ${protoFilePath} --proto_path proto/proto --proto_path proto/third_party/proto --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=messages"`.toPromise();


export const generateAllProto = (fromDir: string, protoTSDir = 'proto-temp-ts') =>
    Promise.all(
        getAllFiles(fromDir).map(
            file => generateProto(file, protoTSDir)
        ));



