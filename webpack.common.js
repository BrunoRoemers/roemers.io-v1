const path = require('path')
const glob = require('glob')
const AssetsPlugin = require('assets-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const mainjs = path.join(__dirname, 'src/js/main.js')
const maincss = path.join(__dirname, 'src/css/main.css')

module.exports = {
  entry: () => {
    const images = glob.sync(
      path.join(__dirname, 'src/images/**/*'),
      { nodir: true }
    )

    return {
      main: [mainjs, maincss, ...images]
    }
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
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 2048, // 2kb
              fallback: 'file-loader',

              // options for fallback
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // data/webpack.json (entrypoints)
    new AssetsPlugin({
      filename: "webpack.json",
      path: path.join(__dirname, 'data'),
      prettyPrint: true,
      entrypoints: true,
    }),

    // data/webpack-images.json
    new ManifestPlugin({
      fileName: path.join(__dirname, 'data/webpack-images.json'),
      filter: ({path}) => /^images\/.*/.test(path),
      generate: (seed, files, entry) => files.reduce((manifest, { name, path }) => ({
        ...manifest,
        [name]: [...(manifest[name] || []), path],
      }), seed),
    }),

    // clean old output products
    new CleanWebpackPlugin(),
  ],
}
