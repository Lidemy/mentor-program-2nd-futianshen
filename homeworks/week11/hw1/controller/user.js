const User = require('../model/user')
module.exports = {
  login: (req, res) => {
    User.find({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then(data => {
      if (data) {
        req.session.username = req.body.username
        req.session.nickname = data.nickname
        req.session.user_id = data.id
        res.redirect('/')
      } else {
        res.redirect('/')
      }
    }).catch(err => {
      res.redirect('/')
      console.log(err)
    })
  },
  register: (req, res) => {
    User.create({
      nickname: req.body.nickname,
      username: req.body.username,
      password: req.body.password
    }).then(() => {
      res.redirect('/')
    }).catch((err) => {
      console.log(err)
    })
  },
  logout: (req, res) => {
    req.session.destroy()
    res.redirect('/')
  }
}
