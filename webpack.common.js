'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/views/index.ejs',
      filename: 'index.html'
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
        'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
              loaders: {
              }
              // other vue-loader options go here
          }
      },
      {
        test: /\.ejs$/,
        loader: 'compile-ejs-loader',
        options: {
          'htmlmin': true,
          'htmlminOptions': {
            removeComments: true
          },
        },
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            emitFile: true
          }
        }
      }
    ]
  }
};
