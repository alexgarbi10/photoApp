const HtmlWebpackPlugin = require('html-webpack-plugin');
const VENDOR_LIBS = ['react', 'react-dom'];

module.exports = {
  devtool: 'source-map',
  entry: {
    entry: './assets/src/index.js'
  },
  output: {
    path: __dirname + '/.tmp/public',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  resolve: {
    extensions: ['.js','.jsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './assets/src/index.html'
    })
  ]
};
