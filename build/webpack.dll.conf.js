const path = require('path')
const webpack = require('webpack')

const package = require('../package.json')
const AssetsPlugin = require('assets-webpack-plugin')

console.log(['vue/dist/vue.esm.js'].concat(Object.keys(package.dependencies).filter(item => item != 'vue')))
module.exports = {
  entry: {
    vender: ['vue/dist/vue.esm.js'].concat(Object.keys(package.dependencies).filter(item => item != 'vue'))
    // vender: ['vue/dist/vue.esm.js','vue-router']
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].[hash:6].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name].json'),
      name: '[name]_library',
      context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new AssetsPlugin({
      filename: 'venderConfig.json',
      path: path.join(__dirname, '.')
     })
  ]
}