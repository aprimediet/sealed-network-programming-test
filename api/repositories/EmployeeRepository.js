/**
 * Employee Repository File
 * Author: Muhamad Aditya Prima <aprimediet@gmail.com>
 */
const _ = require('lodash')
const { Op } = require('sequelize')
const { Employee } = require('../lib/db')

module.exports = {
  bulkWhere(terms = []) {
    return Employee.findAndCountAll({
      where: {
        name: {
          [Op.in]: terms
        },
      },
    })
  },
  create(data) {
    return Employee.create(data)
  },
  bulkCreate(data = []) {
    return Employee.bulkCreate(data)
  },
  filterAndCount({ terms = null, limit = 10, offset = 0, sort = null }) {
    const query = {
      limit,
      offset,
    }

    // Applying terms
    if (terms) {
      query.where = {
        [Op.or]: [
          {
            login: {
              [Op.like]: `%${terms}%`
            }
          },
          {
            name: {
              [Op.like]: `%${terms}%`
            }
          },
        ],
      }
    }

    // We implemented multiple sort params, so we should split 
    // sort params by , delimiter
    if (sort) {
      query.order = sort
        .split(',')
        .map((item) => {
          if (_.startsWith(item, '-') || _.startsWith(item, '+')) {
            let direction
            const _item = item.split(/[+-\-]/)

            if (_item.length == 2) {
              if (_item[0] === '-') {
                direction = 'DESC'
              } else {
                direction = 'ASC'
              }

              return [_item[1], direction]
            }
          }
        })
    }

    console.log(query)

    return Employee.findAndCountAll(query)
  },
  findOne(id) {
    return Employee.findOne({
      where: {
        id,
      }
    })
  },
  update(id, data) {
    return Employee.update(data, { where: { id }})
  },
  destroy(id) {
    return Employee.destroy({
      where: {
        id,
      },
    })
  },
}