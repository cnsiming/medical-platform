const path = require('path')
const webpack = require('webpack')
const package = require('../package.json')
const AssetsPlugin = require('assets-webpack-plugin')
module.exports = {
  entry: {
    vender: Object.keys(package.dependencies)
    // vender: ['vue','vue-router']
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].[hash:6].dll.js',
    library: '[name]_[hash:6]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name].json'),
      name: '[name]_[hash:6]_library',
      context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new AssetsPlugin({
      filename: 'venderBundle.json',
      path: path.join(__dirname,'.')
    })
  ]
}