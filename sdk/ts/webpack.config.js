const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib'),
        // library: "sdk",
         libraryTarget: "umd",
    },
    target: 'web',
    externalsPresets: {node: true},
    externals: [nodeExternals({
        allowlist: [
//            '@bluzelle/wallet/src/wallet',
//            "deferred/src/Deferred",
        ]
    })],
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