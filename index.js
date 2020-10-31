const express = require('express')
const bodyParser = require('body-parser')
const User = require('./models/User')

require('./utils/db.config')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/register', (req, res) => {
  res.render('register', { message: null })
})

app.post('/register', async (req, res) => {
  const user = new User(req.body)
  await user.save()
  console.log(user)
  return res.render('register', { message: `Hi, ${user.name}, registration was successful` })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

module.exports = app
