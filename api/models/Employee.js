/**
 * Employee Model File
 * Author: Muhamad Aditya Prima <aprimediet@gmail.com>
 */

const { Sequelize, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Employee = sequelize.define('Employee', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    login: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'employees'
  })

  return Employee
}