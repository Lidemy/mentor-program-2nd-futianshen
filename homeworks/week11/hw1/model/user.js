/* 完成之後要把整個流程搞懂做對比 */
const Sequelize = require('sequelize')
const sequelize = require('./db') // sequelize 可以取名更語意化 引入 db.js 的 sequelize 物件

const User = sequelize.define('users', { // define 新的 obj
  nickname: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING // 資料形態
  },
  password: { // 不要存明碼! JavaScript 怎麼存 hash function ？
    type: Sequelize.STRING
  }
  /* is_deleted: { // 這個有需要輸入嗎 ？ 還是交給資料庫就可以了 ？
    type: Sequelize.INTEGER
  } */
}, {
  timestamps: false // 關掉 createdAT updateAT
})

User.sync() 

module.exports = User /* 將物件 exports */
