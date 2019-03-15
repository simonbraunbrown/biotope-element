const getPagePlugins = require('./webpack.page.definition');
const entry = require('webpack-glob-entry');
const path = require('path');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const entryPoints = entry(filePath => filePath.split('/').slice(2).join('/').split('.')[0], './src/**/index.js', './src/**/index.ts');
module.exports = {
  entry: entryPoints,
  context: path.resolve(__dirname),
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    ...getPagePlugins('./src/**/index.html'),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'webcomponents-loader',
          entry: 'https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-loader.js'
        }
      ]
    })
  ]
}
