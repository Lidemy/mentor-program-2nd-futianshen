const Post = require('../model/post')
module.exports = {
  create: (req, res) => {
    const userId = req.session.user_id
    const content = req.body.post_content
    if (userId) {
      Post.create({
        user_id: userId,
        content: content
      }).then(() => {
        res.redirect('/record')
      }).catch((err) => {
        console.log(err)
      })
    } else {
      res.redirect('/')
    }
  },
  update: (req, res) => {
    const userId = req.session.user_id
    const postId = req.body.post_id
    const content = req.body.post_update
    if (userId) {
      Post.update({
        content: content
      },
      {
        where: {
          user_id: userId,
          id: postId
        }
      }).then(() => {
        res.json({
          'result': 'success'
        })
        console.log('post update')
      }).catch((err) => {
        console.log(err)
      })
    } else {
      res.redirect('/')
    }
  },
  delete: (req, res) => {
    const userId = req.session.user_id
    const postId = req.body.post_id
    if (userId) {
      Post.update({
        is_deleted: 1
      },
      {
        where: {
          user_id: userId,
          id: postId
        }
      }).then(() => {
        console.log('post is deleted')
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
