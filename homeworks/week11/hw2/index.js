const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

app.set('view engine', 'ejs')

app.use(express.static('views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  entended: true
}))

const urlController = require('./controller/url')
app.get('/', urlController.index)
app.get('/u/:id', urlController.get)
app.post('/shortUrl', urlController.shortUrl)
