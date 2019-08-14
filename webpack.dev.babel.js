const merge = require('webpack-merge');
const common = require('./webpack.common.babel.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist/pages/index.njk'),
        compress: true,
        port: 9000
    }
});
