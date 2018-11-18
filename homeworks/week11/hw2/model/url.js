/* 完成之後要把整個流程搞懂做對比 */
const Sequelize = require('sequelize')
const sequelize = require('./db') // sequelize 可以取名更語意化 引入 db.js 的 sequelize 物件


const Url = sequelize.define('url', { // define 新的 obj
  url: {
    type: Sequelize.STRING
  },
  short_url: {
    type: Sequelize.STRING // 資料形態
  }
}, {
  timestamps: false // 關掉 createdAT updateAT
}, {
  tableName: 'url' 
})

Url.sync() /* 同步的意思 ？*/

module.exports = Url /* 將物件 exports */
