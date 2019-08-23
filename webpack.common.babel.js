import path from 'path';
import webpack from 'webpack';
import WatchExternalFilesPlugin from 'webpack-watch-files-plugin';
import NjkAllFiles from './njk-files';

module.exports = {
    entry: './src/base/ts/core.ts',
        mode: 'production',
        output: {
        filename: 'js/bundle.js',
            path: path.resolve(__dirname, 'dist'),
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
                test: /\.(njk|nunjucks)$/,
                loader: 'njk-source-loader'
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
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
    ],
    resolve: { extensions: ['.js', '.ts', '.njk'] },
};
