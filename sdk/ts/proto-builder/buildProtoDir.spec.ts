import {
    createDir,
    getProtoFile,
    getDirFromPath,
    getPathFromLink,
    downloadAllProto
} from "./buildProtoDir";
import {Right, Some} from "monet";
import {expect} from "chai";
import {existsSync, rmdirSync} from "fs";
import {getCosmosProtoDependencies} from "./getProto";
import {rmdir} from "fs/promises";



describe('buildProtoDir', function () {

    beforeEach(() =>
        {
            //rmdirSync('proto-temp', {recursive: true});
            //createDir('')
        }

    );

    it('should extract the correct path from link', () =>
        Some(getPathFromLink('https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/annotations.proto'))
            .map(path => expect(path).to.deep.equal('google/api/annotations.proto-temp'))
            .join()
    );

    it('should remove intermediary proto-temp dir from name', () =>
        Some(getPathFromLink('https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/base/query/v1beta1/pagination.proto'))
            .map(path => expect(path).to.deep.equal('cosmos/base/query/v1beta1/pagination.proto-temp'))
            .join()
    );

    it('should create a proto-temp directory in sdk/ts', () =>
        createDir('')
            .then(() => expect(existsSync('proto-temp')).to.be.true)
    );

    it('should get appropriate directory from path', () =>
        Some(getPathFromLink('https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/base/query/v1beta1/pagination.proto'))
            .map(getDirFromPath)
            .map(dir => expect(dir).to.deep.equal('cosmos/base/query/v1beta1/'))
            .join()
    );

    it('should create dir from path', () =>
        Promise.resolve(getPathFromLink('https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/base/query/v1beta1/pagination.proto'))
            .then(getDirFromPath)
            .then(createDir)
            .then(() => expect(existsSync('proto-temp/cosmos/base/query/v1beta1')).to.be.true)
    );

    it('should download proto-temp file and write it to the proper directory', () =>
        getProtoFile('https://raw.githubusercontent.com/cosmos/cosmos-sdk/master/proto/cosmos/base/query/v1beta1/pagination.proto')
            .then(() => expect(existsSync('proto-temp/cosmos/base/query/v1beta1/pagination.proto-temp')).to.be.true)
    );

    it('should extract path without proto-temp prefix', () =>
        Some(getPathFromLink('https://raw.githubusercontent.com/gogo/protobuf/master/gogoproto/gogo.proto'))
            .map(path => expect(path).to.deep.equal('gogoproto/gogo.proto-temp'))
            .join()
    );

    it('should download multiple proto-temp files', () =>
        Promise.all(getCosmosProtoDependencies().map(link => getProtoFile(link)))
            .then(() =>
                Some(getCosmosProtoDependencies())
                    .map(links => links.map(link => getPathFromLink(link
                    )))
                    .map(paths => paths.map(path => expect(existsSync('proto-temp/' + path)).to.be.true))
                    .join()
            )
    );

    it('should correctly download cosmos_proto/cosmos.proto-temp with appropriate sub-directory', () =>
        getProtoFile( 'https://raw.githubusercontent.com/regen-network/cosmos-proto/master/cosmos.proto')
            .then(() => expect(existsSync('proto-temp/cosmos_proto/cosmos.proto-temp')))
    )

    it('should download all necessary cosmos protofiles', () =>
        getCosmosProtoDependencies().map(getProtoFile)
    )

    it('should download all necessary protofiles', () =>
        downloadAllProto()
    )


})