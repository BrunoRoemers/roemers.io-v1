const merge = require('webpack-merge')
const baseConfig = require('./webpack.common.js')

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].js', // no hash -> avoid unnecessary hugo rebuilds
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    contentBase: './public',
    watchContentBase: true,
    quiet: false,
  },
  module: {
    rules: [
      {
        // css @ dev
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // run postcss-loader before applying @import
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  }
})
