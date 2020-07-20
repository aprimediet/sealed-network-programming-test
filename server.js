/**
 * Main Server File
 * Author: Muhamad Aditya Prima <aprimediet@gmail.com>
 */

// Load env
const http = require('http')
const info = require('./package.json')
const api = require('./api')

require('dotenv').config()

const { HOST, PORT } = process.env

const appName = info.name || 'Express API'
const host = HOST || '0.0.0.0'
const port = PORT || 3000

const server = http.createServer(api)

server.listen(port, host, () => {
  // eslint-disable-next-line
  console.log(`${appName} is running on ${host}:${port}`)
})