/* 完成之後要把整個流程搞懂做對比 */
const Sequelize = require('sequelize')
const sequelize = require('./db') // sequelize 可以取名更語意化 引入 db.js 的 sequelize 物件

const Comment = sequelize.define('comments', { // define 新的 obj 這邊定義的 posts 是什麼意思 ？
  /* 這個 model 要放資料庫所有欄位的資料嗎 ？還是只要放自己會用到的欄位就好 ？ */
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  created_at: {
    type: Sequelize.DATE
  },
  user_id: { // 怎麼 join ？關聯式資料庫
    type: Sequelize.INTEGER
  },
  post_id: { // 怎麼 join ？關聯式資料庫
    type: Sequelize.INTEGER
  },
  content: {
    type: Sequelize.STRING // 資料形態
  },
  is_deleted: { // 這個有需要輸入嗎 ？ 還是交給資料庫就可以了 ？
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false // 關掉 createdAT updateAT
})

Comment.sync()

module.exports = Comment /* 將物件 exports */
