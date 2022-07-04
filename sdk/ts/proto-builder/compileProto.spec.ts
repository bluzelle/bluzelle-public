import {ensureDirExists, generateAllProto, generateProto, getProtoPathOption} from "./compileProto";
import {readdir} from "fs/promises";
import {existsSync, rmdirSync} from "fs";
import {expect} from "chai";
import * as path from "path";
import {getCosmosProtoDependencies} from "./getProto";
import {createDir, getProtoFile} from "./buildProtoDir";
import {Some} from "monet";

const rootDir = () => path.join(__dirname, '../../..');
const curiumProtoDir = () => path.join(rootDir(), 'curium/proto-temp');

const getToDir = () => 'proto-temp-ts';

const getProtoDir = () => 'proto';

describe('compileProto', function () {

    this.timeout(30_000_000);

    beforeEach(() =>
        {
            //rmdirSync('proto-temp-ts', {recursive: true});
            ensureDirExists('proto-temp-ts')
        }

    );

    it('should get correct relative path for proto-temp path', () =>
        Some(getProtoPathOption('proto-temp/curium/genesis.proto-temp'))
            .map(path => expect(path).to.equal('proto-temp'))
    )

    it('should compile a proto-temp file to ts/proto-temp-ts', () =>
        generateProto(`proto/curium/genesis.proto`, getToDir())
            .then(() => expect(existsSync(getToDir())).to.be.true)
            .then(() => expect(existsSync('proto-temp-ts/curium/genesis.ts')).to.be.true)
    );

    it('should compile a proto-temp file with imports to ts/proto-temp-ts', () =>
        generateProto('proto-temp/curium/query.proto-temp', getToDir())
            .then(() => expect(existsSync(getToDir())).to.be.true)
            .then(() => expect(existsSync('proto-temp-ts/curium/query.ts')).to.be.true)
    );

    it('should compile proto-temp files of cosmos directory', () =>
        generateAllProto('proto-temp/cosmos')
            .then(() => readdir('proto-temp/cosmos'))
            .then(files =>
                files.map(file => expect(existsSync(`proto-ts/cosmos/${file.replace('proto-temp', 'ts')}`)).to.be.true)
            )
    );

    it('should compile all proto-temp files of a directory', () =>
        Promise.all(getCosmosProtoDependencies().map(link => getProtoFile(link)))
            .then(() => generateAllProto(getProtoDir()))
            .then(() => readdir('proto-temp/curium'))
            .then(curFiles =>
                curFiles.map(file => expect(existsSync(`proto-ts/curium/${file.replace('proto-temp', 'ts')}`)).to.be.true)
            )
    );

    it('should compile', () =>
        generateAllProto(getProtoDir())
    )


});