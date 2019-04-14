const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const outputDirectory = 'dist';
//
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
//
module.exports = (env, argv) => ({
  entry: {
    app: ['@babel/polyfill', './src/client/index.js'],
    // vendor: ['xlsx', 'file-saver'],
  },
  // devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src/client'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new webpack.HotModuleReplacementPlugin(),
    // dev
    // new BundleAnalyzerPlugin(),
    // proc
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
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
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  // externals: [{ './cptable': 'var cptable' }, { './jszip': 'jszip' }],
  // node: { fs: 'empty' },
});
