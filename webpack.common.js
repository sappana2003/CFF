const path = require('path');
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var pjson = require('./package.json');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const FORMBUILDER_URL = "./scripts";
const SRC_URL = FORMBUILDER_URL + "/src";
const DEST_URL = FORMBUILDER_URL + "/dist";

module.exports = {
  entry: {
    app: ["whatwg-fetch", "babel-polyfill", SRC_URL + '/index']
  },
  devServer: {
    port: 8000,
    contentBase:__dirname + '/dist',
    publicPath: '/',
    historyApiFallback: true
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor.bundle",
          chunks: "initial"
        }
      }
    }
  },
  output: {
    path: path.resolve(DEST_URL),
    publicPath: '/',
    filename: "[name].[chunkhash].js"
  },
  plugins: [
    // new HardSourceWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "[name].[contenthash].css"
    // }),
    new webpack.DefinePlugin({
      VERSION: `"${pjson.version}"`
    }),
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ['json', 'html']
    })
  ],
  module: {
    rules: [
      {
        test: [/\.tsx?$/],
        exclude: [/node_modules/, /\.test.tsx?$/],
        use:
          [
            {
              'loader': 'babel-loader',
              options: {
                "cacheDirectory": true,
                "presets": [
                  ["env", {
                    "targets": {
                      "browsers": [
                        "IE 8"
                      ]
                    }
                  }]
                ]
              }
            },
            {
              'loader': 'ts-loader'
            }
          ]
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'] //['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(svg|png|jpg|woff|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: ""
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules', 'scripts'],
    extensions: ['.ts', '.tsx', '.js']
  },
  node: {
    fs: "empty"
  },
  mode: 'development'
};