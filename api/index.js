/**
 * Main API File
 * Author: Muhamad Aditya Prima <aprimediet@gmail.com>
 */

const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const { notFound, errorHandler } = require('./lib/exceptions')
const db = require('./lib/db')

const api = express()

// Setup required middlewares
api.use(helmet({
  hidePoweredBy: {
    setTo: 'PHP 4.0', // For security reasons, we set exposed server as PHP 4.0
  },
}))
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }))

db.sequelize.sync({ force: false , alter : true }).then(() => {
  console.log('Synchronizing Database')
})

// Development
if (process.env.NODE_ENV === 'development') { // eslint-disable-line
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const historyApiFallback = require('connect-history-api-fallback')
  const config = require('../webpack/webpack.dev')
  const compiler = webpack(config)
  api.use(historyApiFallback())
  // Tell express to use webpack-dev-middleware
  // and use webpack.dev.js configuration as it's base
  api.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }))
}

api.get('/api', (req, res) => {
  res.json({
    message: 'Programming Test Root API',
  })
})

// Load endpoints
require('./endpoint/employees')(api)

// Set default exception handler
api.use(notFound)
api.use(errorHandler)

module.exports = api
