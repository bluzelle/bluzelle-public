const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib'),
        library: "bluzelle",
        libraryTarget: "umd",
    },
    target: 'node',
    externalsPresets: {node: true},
    externals: 'tiny-secp256k1',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            fs: false,
            os: false
        }
    },
    devtool: 'source-map',
};