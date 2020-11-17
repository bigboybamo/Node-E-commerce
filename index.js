const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoDbConnect = require('./utils/db.config')
const passport = require('passport')
require('./utils/authStategies/localStrategy')
const authMiddleware = require('./middlewares/authMiddleware')
const authRoutes = require('./routes/authRoutes')

require('./utils/db.config')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'e101d356ea852d134cfc1dcc723544ec7cbe4a65', // encrypt session data
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new MongoStore({ mongooseConnection: mongoDbConnect })
}))

app.use(passport.initialize())// initialize passport
app.use(passport.session())// add session support for passport

// added app.locals object to be used in the views
app.locals.message = { }
app.locals.formData = {}
app.locals.errors = {}

app.set('view engine', 'ejs')

app.use('/', authRoutes)

app.get('/', (req, res) => {
  if (!req.user) {
    res.render('index', { message: { login_info: false } })
  } else {
    res.render('index', { message: { login_info: true } })
  }
})

app.get('/homepage', authMiddleware, (req, res) => {
  res.send(` welcome ${req.user.name}`)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

module.exports = app
