const express = require('express')
require('./utils/db.config')

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

module.exports = app
