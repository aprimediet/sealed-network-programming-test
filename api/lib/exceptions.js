/**
 * Exception Handlers
 * Author: Muhamad Aditya Prima <aprimediet@gmail.com>
 */

class APIError extends Error {
  constructor(
    statusCode = 500,
    code = 'ServerError',
    message = 'Server Error',
    data = null) {
    super()
    this.statusCode = statusCode
    this.code = code
    this.message = message
    this.data = data
  }
}

const notFound = (req, res) => {
  res.status(404).send({
    code: 'RouteNotFound',
    message: 'Route not found',
    data: null,
  })
}

const errorHandler = (err, req, res, next) => {
  console.error(err)
  
  if (res.headerSent) {
    return next(err)
  }

  if (err.statusCode) {
    res.status(err.statusCode).send({
      code: err.code,
      message: err.message,
      data: err.data,
    })
  } else {
    res.status(500).send({
      code: 'ServerError',
      message: err.message || 'Server Error',
      data: [],
    })
  }
}

module.exports = {
  APIError,
  notFound,
  errorHandler,
}
