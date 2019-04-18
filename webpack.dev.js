const merge = require('webpack-merge');
const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    // chunkFilename: '[name].bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    open: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8081/',
        secure: false,
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
});
