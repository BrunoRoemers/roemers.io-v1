const glob = require('glob')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJsPlugin = require('terser-webpack-plugin')

const baseConfig = require('./webpack.common.js')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name]-[hash].min.js',
  },
  optimization: {
    minimizer: [
      new TerserJsPlugin({}),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        // css @ production
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash].min.css',
      chunkFilename: 'css/[id]-[hash].min.css',
    }),
    new PurgecssPlugin({
      // scan layouts folder for used css
      paths: glob.sync(`layouts/**/*`,  { nodir: true }),
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
})
