const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/base/ts/core.ts',
    mode: 'production',
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: './src/pages', to: 'pages' },
        ]),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
};
