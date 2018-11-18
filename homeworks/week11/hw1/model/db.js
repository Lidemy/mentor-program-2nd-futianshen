const Sequelize = require('sequelize')
const settings = require('./settings')

const sequelize = new Sequelize('record', 'tian', settings.password, {
  host: '',
  dialect: 'mysql'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully,')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = sequelize
