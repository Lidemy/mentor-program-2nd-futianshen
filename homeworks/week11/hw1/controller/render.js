/* const User = require('../model/user')
const Post = require('../model/post')
ORM JOIN 失敗
Post.hasMany(User, {
  foreignKey: 'id'
})
User.belongsTo(Post, {
  foreignKey: 'id'
}) */

/* mysql 應該用 module 引入 */
const mysql = require('mysql')
const conn = mysql.createConnection({
  host: '',
  user: 'tian',
  password: '',
  database: 'record'
})

conn.connect()

module.exports = {
  index: function (req, res) {
    const username = req.session.username
    console.log(username)
    res.render('index', {
      username
    })
  },
  record: function (req, res) {
    const username = req.session.username
    const nickname = req.session.nickname
    const inPage = req.query.page || 1
    let perPagePosts = 10
    let pages
    let start
    let end
    let posts
    let comments
    conn.query('SELECT posts.id, posts.user_id, posts.created_at, posts.content, users.nickname, users.username FROM posts LEFT JOIN users ON posts.user_id = users.id WHERE posts.is_deleted=0 ORDER BY created_at DESC', (error, results, fields) => {
      posts = results
      console.log(posts)
      pages = Math.ceil(posts.length/perPagePosts)
      start = (inPage - 1) * perPagePosts 
      if (posts.length > inPage * perPagePosts) end = inPage * perPagePosts
      else end = posts.length
      conn.query('SELECT comments.id, comments.created_at, users.nickname, users.username, comments.post_id, comments.user_id, comments.content FROM comments LEFT JOIN users ON comments.user_id = users.id WHERE comments.is_deleted=0 ORDER BY created_at DESC', (error, results, fields) => {
        comments = results
        res.render('forum', {
          inPage,
          start,
          end,
          pages,
          username,
          nickname,
          posts,
          comments
        })
      })
    })
  }
}
