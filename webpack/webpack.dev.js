const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(process.cwd(), 'public'), // eslint-disable-line
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
            // options: {
            //   javascriptEnabled: true,
            // },
          },
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
})
