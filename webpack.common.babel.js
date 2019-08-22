import path from 'path';
import webpack from 'webpack';
import WatchExternalFilesPlugin from 'webpack-watch-files-plugin';
import NunjucksWebpackPlugin from 'nunjucks-webpack-plugin';
import test from './nunjucksFiles';

console.log(1, test);

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
            },]
    },
    plugins: [
        new NunjucksWebpackPlugin({
            templates: [
                {
                    from: "src/pages/index.njk",
                    to: "pages/index.html"
                }
            ]
        }),
        new WatchExternalFilesPlugin({
            files: [
                './src/**/*.ts',
                './src/**/*.njk'
            ]
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
    ],
};
