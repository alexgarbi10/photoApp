/* Webpack 4 Configuration: Common properties */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const outputPath = path.resolve(__dirname, '../.tmp/public');

module.exports = {
  entry: {
    entry: [
      'babel-polyfill',
      './assets/src/index.js'
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Photo App',
      template: './assets/src/index.html'
    })
  ],
  output: {
    path: outputPath,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js','.jsx']
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
};
