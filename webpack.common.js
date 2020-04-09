const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: [
      path.join(__dirname, 'src/js/main.js'),
      path.join(__dirname, 'src/css/main.css'),
    ],
  },
  output: {
    path: path.join(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
          publicPath: '/',
        },
      },
      {
        test: /\.svg$/i,
        loader: 'svg-url-loader',
      },
    ],
  },
  plugins: [
    new AssetsPlugin({
      filename: "webpack.json",
      path: path.join(__dirname, 'data'),
      prettyPrint: true,
      entrypoints: true,
    }),
    new CleanWebpackPlugin(),
  ],
}
