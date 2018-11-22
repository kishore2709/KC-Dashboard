const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const outputDirectory = "dist";

module.exports = {
  entry: {app:["./src/client/index.js"]},
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", "jsx"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    proxy: {
      "/api": {
        target: "http://localhost:8081/",
        secure: false
      }
    }
  }
};
