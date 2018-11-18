const Sequelize = require('sequelize')
const settings = require('./settings')
/* 有什麽辦法可以自動生成 database ？ */
const sequelize = new Sequelize('url', 'tian', settings.password, {
  host: '172.105.222.37',
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
