var path    = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var ENV = process.env.NODE_ENV
var isProd = ENV === 'production' ? true : false;
console.log('Webpack NODE_ENV: ' + ENV);

module.exports = {
    entry: isProd ? ['babel-polyfill', './src/index.js']
    : [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'js/bundle.js',
        publicPath: '/'
    },
    module: {   // BABEL
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        },
        {   // CSS-loader and STYLE-loader used.
            test: /\.css$/,
            loader: isProd ? ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[path]___[name]___[local]___[hash:base64:5]')
                : 'style!css?modules&importLoaders=1&localIdentName=[path]___[name]___[local]___[hash:base64:5]'
        }]
    },
    plugins: isProd ?
    [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.NamedModulesPlugin(),
      new webpack.ProvidePlugin({'$': 'jquery', 'jQuery': 'jquery', '_': 'underscore'}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new ExtractTextPlugin('styles/bundle.css', {allChunks: true}),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {warnings: false, drop_console: true, drop_debugger: true},
        output: {ascii_only: true, comments: false}
      }),
      new webpack.NoErrorsPlugin()
    ]
    : [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map'
};
