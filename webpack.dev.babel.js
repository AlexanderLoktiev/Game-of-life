const merge = require('webpack-merge');
const common = require('./webpack.common.babel.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'build/pages'),
        hot: false,
        writeToDisk: true,
        watchContentBase: true,
        open: true,
        watchOptions: {
            poll: true,
            colors: true,
            aggregateTimeout: 300,
            ignored: ['build', 'node_modules']
        },
        port: 8080,
        onListening: function (server) {
            const port = server.listeningApp.address().port;
            console.log('Listening on port:', port);
        }
    }
});
