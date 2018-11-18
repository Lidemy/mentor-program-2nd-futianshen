const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

app.set('view engine', 'ejs')

app.use(express.static('views'))
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000
  }
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  entended: true
}))
const renderController = require('./controller/render.js')
const userController = require('./controller/user')
const postController = require('./controller/post')
const commentController = require('./controller/comment')

/* render */
app.get('/', renderController.index)
app.get('/record', renderController.record)

/* user */
app.post('/register', userController.register)
app.post('/login', userController.login)
app.get('/logout', userController.logout)

/* post */
app.post('/postCreate', postController.create)
app.post('/postUpdate', postController.update)
app.post('/postDelete', postController.delete)

/* comment */
app.post('/commentCreate', commentController.create)
app.post('/commentUpdate', commentController.update)
app.post('/commentDelete', commentController.delete)
