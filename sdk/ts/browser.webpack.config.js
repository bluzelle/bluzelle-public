const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib-web'),
         library: "bluzelle",
         libraryTarget: "umd",
    },
    target: 'web',
//     externalsPresets: {node: true},
//     externals: [nodeExternals({
//         allowlist: [
// //            '@bluzelle/wallet/src/wallet',
// //            "deferred/src/Deferred",
//         ]
//     })],
    mode: 'development',
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
            path: false,
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
            buffer: require.resolve('buffer/'),
            // fs: false,
            // os: false
        }
    },
    devtool: 'source-map',
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],

    experiments: {asyncWebAssembly: true}
};