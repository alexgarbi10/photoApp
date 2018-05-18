/* Webpack 4 Configuration: Development */

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: __dirname + '/.tmp/public',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(['tmp/public']),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
});
