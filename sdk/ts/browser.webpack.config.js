const webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'browser.js',
        path: path.join(__dirname, 'lib-web'),
         library: "bluzelle",
         libraryTarget: "umd",
        publicPath: 'auto'
    },
    target: 'web',
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
            path: false,
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
            buffer: require.resolve('buffer/'),
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