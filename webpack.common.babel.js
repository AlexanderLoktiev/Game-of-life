import path from 'path';
import webpack from 'webpack';
import WatchExternalFilesPlugin from 'webpack-watch-files-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import NjkAllFiles from './njk-files';

module.exports = {
    entry: {
        general: [
            './src/base/ts/core.ts',
            './src/base/scss/main.scss'
        ]
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    mode: 'production',
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: [path.resolve(__dirname, 'node_modules')]
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader'],
            }]
    },
    plugins: [
        new NjkAllFiles().init(),
        new WatchExternalFilesPlugin({
            files: [
                './src/**/*.ts',
                './src/**/*.njk'
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "css/style.css",

        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {extensions: ['.js', '.ts', '.njk']},
};
