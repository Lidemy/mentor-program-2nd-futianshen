const Comment = require('../model/comment')

const mysql = require('mysql')
const conn = mysql.createConnection({
  host: '',
  user: 'tian',
  password: '',
  database: 'record'
})

conn.connect()

module.exports = {
  create: (req, res) => {
    const userId = req.session.user_id
    const postId = req.body.post_id
    const commentContent = req.body.comment_content
    if (userId) {
      Comment.create({
        user_id: userId,
        post_id: postId,
        content: commentContent
      }).then(() => {
        conn.query(`SELECT posts.user_id FROM posts WHERE id=${postId} LIMIT 1`, (error, results, fields) => {
          let postUserId = results[0].user_id
          conn.query('SELECT comments.id, comments.created_at, comments.user_id, users.nickname FROM comments LEFT JOIN users ON comments.user_id = users.id ORDER BY comments.id DESC LIMIT 1', (error, results, fields) => {
            let comment = results
            console.log(comment[0].id)
            console.log(comment[0].nickname)
            console.log(comment[0].created_at)
            console.log(postUserId === userId)
            res.json({
              'result': 'success',
              'highlight': postUserId === userId,
              'comment_id': comment[0].id,
              'comment_nickname': comment[0].nickname,
              'comment_time': comment[0].created_at
            }) 
          })
        })
      }).catch((err) => {
        console.log(err)
      })
    } else {
      res.redirect('/')
    }
  },
  update: (req, res) => {
    const userId = req.session.user_id
    const commentId = req.body.comment_id
    const content = req.body.comment_update
    console.log(userId)
    console.log(commentId)
    console.log(content)
    if (userId) {
      Comment.update({
        content: content
      },
      {
        where: {
          user_id: userId,
          id: commentId
        }
      }).then(() => {
        res.json({
          'result': 'success'
        })
        console.log('comment update')
      }).catch((err) => {
        console.log(err)
      })
    } else {
      res.redirect('/')
    }
  },
  delete: (req, res) => {
    const userId = req.session.user_id
    const commentId = req.body.comment_id
    console.log(userId)
    console.log(commentId)
    if (userId) {
      Comment.update({
        is_deleted: 1
      },
      {
        where: {
          user_id: userId,
          id: commentId
        }
      }).then(() => {
        console.log('comment is deleted')
        res.json({
          'result': 'success'
        })
      }).catch((err) => {
        console.log(err)
      })
    } else {
      res.redirect('/')
    }
  }
}
