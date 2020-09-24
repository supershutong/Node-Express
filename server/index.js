const express = require('express')
const mongoose = require('mongoose')
const templateRouter = require('./routes/template')
const api = require('./middleware/api')
const bodyParser = require('body-parser')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/template', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

// 解析 post 请求的 body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(api)

app.use('/xhr/v1', templateRouter)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use('/', (req, res, next) => {
  res.send('hello express')
})

app.listen(8080, () => {
  console.log('server is running on http://localhost:8080')
})

module.exports = app
