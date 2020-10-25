const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('it works even some more')
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

module.exports = app
