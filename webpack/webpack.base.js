const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(process.cwd(), 'web/index.js'), // eslint-disable-line
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ico|eot|svg|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpg|jpeg|png|bmp)$/,
        use: 'file-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
        },
      },

    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.less', '.css'],
  },
  node: { fs: 'empty' },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(process.cwd(), 'web/index.html'), // eslint-disable-line
      filename: 'index.html',
    }),
  ],
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(process.cwd(), 'public'), // eslint-disable-line
    publicPath: '/',
  },
}
