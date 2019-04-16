const merge = require('webpack-merge');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    // new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 0,
      minRatio: 0.8,
    }),
  ],
  // devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].min.js',
  },
  optimization: {
    minimize: true,
    nodeEnv: 'production',
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
});
