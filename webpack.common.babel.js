import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import WatchExternalFilesPlugin from 'webpack-watch-files-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

let pages;

fs.readdirSync(path.resolve(__dirname, 'src/pages'), (err, items) => {
  return pages = items;
});

const generateHtmlPlugins = () => {
    // Read files in template directory
    const templateFiles = fs.readdirSync(path.resolve(__dirname, path.resolve(__dirname, 'src/pages')));
    return templateFiles.map(item => {
        // Split names and extension
        const parts = item.split('.');
        const name = parts[0];
        const ext = parts[1];

        // Create new HTMLWebpackPlugin with options
        return new HtmlWebpackPlugin({
            template: `./src/pages/${name}.${ext}`,
            filename: `./pages/${name}.html`
        })
    })
}

// Call our function on our views directory.
const htmlPlugins = generateHtmlPlugins();

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
                test: /\.twig$/,
                use: [
                    'raw-loader',
                    'twig-html-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader'],
            }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style.css",
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new CleanWebpackPlugin()
    ].concat(htmlPlugins),
    resolve: {extensions: ['.js', '.ts', '.njk']}
};

