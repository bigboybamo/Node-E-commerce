const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
require('./utils/authStategies/localStrategy')
const authRoutes = require('./routes/authRoutes')

require('./utils/db.config')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'e101d356ea852d134cfc1dcc723544ec7cbe4a65', // encrypt session data
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(passport.initialize())// initialize passport
app.use(passport.session())// add session support for passport

app.set('view engine', 'ejs')

app.use('/', authRoutes)

app.get('/', (req, res) => {
  req.session.views = (req.session.views || 0) + 1
  console.log(`user: ${req.user}`)
  res.render('index')
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

module.exports = app
