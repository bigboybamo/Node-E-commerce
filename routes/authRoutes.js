const express = require('express')

const router = express.Router()
const { addUser } = require('../module/user/service/userService')

router.get('/register', (req, res) => {
  res.render('register', { message: null })
})

// handles user registration
router.post('/register', async (req, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const user = await addUser(req.body)
    return res.render('register', { message: 'Hi, registration was successful' })
  } catch (error) {
    console.log(error)
    return res.status(400).render('register', { message: 'Something went wrong with your submission' })
  }
})

module.exports = router
