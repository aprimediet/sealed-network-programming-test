/**
 * Main Database File
 * Author: Muhamad Aditya Prima <aprimediet@gmail.com>
 */
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH
})

const db = {}

db.sequelize = sequelize

// Initialize models
db.Employee = require('../models/Employee')(sequelize)

module.exports = db