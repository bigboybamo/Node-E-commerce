const express = require('express')

const router = express.Router()
const { addUser } = require('../module/user/service/userService')
const { registerSchema } = require('../module/user/validations/authValidation')
const { mongooseErrorFormatter, joiFormatter } = require('../utils/validationFormatter')
const passport = require('passport')

router.get('/register', (req, res) => {
  res.render('register', { message: { }, errors: {}, formData: {} })
})

// handles user registration
router.post('/register', async (req, res) => {
  try {
    const validationResult = registerSchema.validate(req.body, {
      abortEarly: false
    })
    if (validationResult.error) {
      // return res.send(joiFormatter(validationResult.error))
      return res.render('register', {
        message: {
          type: 'error',
          body: 'validation error'
        },
        errors: joiFormatter(validationResult.error),
        formData: req.body
      })
    }
    // eslint-disable-next-line no-unused-vars
    const user = await addUser(req.body)
    return res.render('register', {
      message: {
        type: 'success',
        body: 'Registration Successful'
      },
      errors: {},
      formData: req.body
    })
  } catch (error) {
    console.log(error)
    return res.status(400).render('register', {
      message: {
        type: 'error',
        body: 'validation error'
      },
      errors: mongooseErrorFormatter(error),
      formData: req.body
    })
  }
})

router.get('/login', (req, res) => {
  res.render('login', { message: { }, errors: {}, formData: {} })
})

router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/login-success',
    failureRedirect: '/login-failed'
  }), (req, res) => {
  res.render('login', {
    message: {
      type: 'success',
      body: 'Login successful'
    },
    errors: {},
    formData: {}
  })
})

module.exports = router
