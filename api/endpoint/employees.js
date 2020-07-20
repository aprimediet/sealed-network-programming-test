/**
 * Employee Endpoints
 * Author: Muhamad Aditya Prima <aprimediet@gmail.com>
 */
const _ = require('lodash')
const router = require('express').Router()
const { APIError } = require('../lib/exceptions')
const employeeRepository = require('../repositories/EmployeeRepository')

const list = async (req, res, next) => {
  try {
    const {
      terms = null,
      limit = 10,
      offset = 0,
      sort = null
    } = req.query
    
    const { count, rows } = await employeeRepository.filterAndCount({ terms, limit, offset, sort })

    // Calculate page and total page
    const page = Math.floor(offset / limit)
    const totalPage = Math.ceil(count / limit)

    res.json({
      count,
      page,
      totalPage,
      limit,
      offset,
      data: rows,
    })
  } catch (error) {
    next(error)
  }
}

const retrieve = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) {
      throw new APIError(
        404,
        'RouteParamRequired',
        'ID is required',
      )
    }

    const data = await employeeRepository.findOne(id)

    if (!data) {
      throw new APIError(
        404,
        'DataNotFound',
        'Data not found',
      )
    }

    res.json(data)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    let data

    if (_.isArray(req.body)) {
      // Simple array validation
      const logins = req.body.slice().map((item) => item.login)
      const { count, rows } = await employeeRepository.bulkWhere(logins)

      // console.log(count, rows)

      if (count > 0) {
        throw new APIError(
          400,
          'DataExists',
          'Some of your data are exists in database',
          rows
        )
      }

      data = await employeeRepository.bulkCreate(req.body)
    } else if (_.isObject(req.body)) {
      // Simple data validation
      const { login, name } = req.body

      if (!login || !name) {
        throw new APIError(
          422,
          'InputValidationError',
          'login and name are required!'
        )
      }

      data = await employeeRepository.create({ login, name })
    } else {
      throw new APIError(
        422,
        'InputValidationError',
        'Your data is not valid, please check again'
      )
    }

    res.status(201).json({
      data
    })
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      error = new APIError(
        '400',
        'InputError',
        'Login is exists in database'
      )
    }
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) {
      throw new APIError(
        404,
        'RouteParamRequired',
        'ID is required',
      )
    }

    const { login, name } = req.body

    if (!login || !name) {
      throw new APIError(
        422,
        'InputValidationError',
        'login and name are required!'
      )
    }

    const data = await employeeRepository.update(id, { login, name })

    if (!data) {
      throw new APIError(
        404,
        'DataNotFound',
        'Data not found',
      )
    }

    res.json({
      data
    })
  } catch (error) {
    next(error)
  }
}

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) {
      throw new APIError(
        404,
        'RouteParamRequired',
        'ID is required',
      )
    }

    await employeeRepository.destroy(id)

    res.status(204).json(null)
  } catch (error) {
    next(error)
  }
}



module.exports = (app) => {
  router.get('/', list)
  router.post('/', create)
  router.get('/:id', retrieve)
  router.put('/:id', update)
  router.delete('/:id', destroy)

  app.use('/api/employees', router)
}