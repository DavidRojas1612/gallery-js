const path = require('path')
const srcDir = path.resolve(__dirname, 'src')
const publicDir = path.resolve(__dirname, 'public')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  context: srcDir,
  devtool: 'inline-source-map',
  entry: {
    index: './index.js'
  },
  output: {
    path: publicDir,
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          'file-loader?name=[path][name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', 'postcss-loader?sourceMap'],
          publicPath: './'
        })
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets/',
        to: 'assets/'
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'index.html'),
      title: 'Application'
    })
  ]
}
