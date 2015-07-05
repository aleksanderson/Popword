var webpack = require('webpack');
var settings = require('./settings');

module.exports = {
    entry: {
        app: ['webpack/hot/dev-server', './app/entry.js']
    },

    output: {
        path: './app/built',
        filename: 'bundle.js',
        publicPath: settings.devServer + '/built/'
    },

    devServer: {
        contentBase: './app/built',
        publicPath: settings.devServer + '/built/'
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'}
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$"))
    ]
}