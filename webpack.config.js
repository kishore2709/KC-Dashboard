const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

const outputDirectory = 'dist';

module.exports = {
  entry: { app: ['@babel/polyfill', './src/client/index.js'] },
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].js',
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
        test: /\.(png|svg|jpg|gif|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader?limit=10000&minetype=application/font-woff',
        },
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
    // new BundleAnalyzerPlugin(),
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
};
