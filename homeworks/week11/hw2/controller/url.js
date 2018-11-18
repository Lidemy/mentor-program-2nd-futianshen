const Url = require('../model/url')
const crypto = require('crypto')
module.exports = {
  index: (req, res) => {
    res.render('url', {
      shortUrl: null
    })
  },
  get: (req, res) => {
    const short = req.params.id
    Url.find({
      where: {
        short_url: short
      }
    }).then(data => {
      res.redirect(data.url)
    }).catch(err => {
      res.redirect('/')
    })
  },
  shortUrl: (req, res) => {
    const orginalUrl = req.body.orginalUrl
    const short = crypto.randomBytes(3).toString('hex')
    /* 檢查亂數是否重複 
    做法1 ：把 db url key 設為 unique
    做法2 ：自己手動檢查資料庫
    */
    console.log(short)
    Url.create({
      url: req.body.originalUrl,
      short_url: short
    }).then(() => {
      res.render('url', {
        shortUrl: `http://localhost:3000/u/${short}`
      })
    }).catch(err => {
      console.log(err)
    })
  }
}
