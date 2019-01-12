const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

const outputDirectory = "dist";

module.exports = {
  entry: { app: ["./src/client/index.js"] },
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
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
    open: true,
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://localhost:8081/",
        secure: false
      }
    }
  }
};
