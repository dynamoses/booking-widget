'use strict';

const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: 'ttc-qab-widget.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new FileManagerPlugin({
      onEnd: {
        copy: [
          { source: path.resolve(__dirname, "./dist/ttc-qab-widget.js"), destination: path.resolve(__dirname,"../../QABW.Web/wwwroot/js/ttc-qab-widget.js") }
        ]
      }
    })
  ]
});
