const express = require('express')

const router = express.Router()
const { addUser } = require('../module/user/service/userService')
const { registerSchema } = require('../module/user/validations/authValidation')
const { mongooseErrorFormatter, joiFormatter } = require('../utils/validationFormatter')
const guestMiddleware = require('../middlewares/guestMiddleware')
const passport = require('passport')
const authMiddleware = require('../middlewares/authMiddleware')
const flashMiddleware = require('../middlewares/flasherMiddleware')

router.get('/register', guestMiddleware, flashMiddleware, (req, res) => {
  res.render('register')
})

// handles user registration
router.post('/register', guestMiddleware, async (req, res) => {
  try {
    const validationResult = registerSchema.validate(req.body, {
      abortEarly: false
    })
    if (validationResult.error) {
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'validation error'
        },
        errors: joiFormatter(validationResult.error),
        formData: req.body
      }
      res.redirect('/register')
    }
    // eslint-disable-next-line no-unused-vars
    const user = await addUser(req.body)
    req.session.flashData = {
      message: {
        type: 'success',
        body: 'Registration Successful'
      },
      formData: req.body
    }
    return res.redirect('register')
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

router.get('/login', guestMiddleware, (req, res) => {
  res.render('login')
})

router.post('/login', guestMiddleware, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(`Err : ${err}`)
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'Login failed'
        }
      }
      return res.redirect('login')
    }

    if (!user) {
      req.session.flashData = {
        message: {
          type: 'error',
          body: info.error
        }
      }
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      if (err) {
        req.session.flashData = {
          message: {
            type: 'error',
            body: 'Login failed'
          }
        }
      }
      return res.redirect('/homepage')
    })
  })(req, res, next)
})

// log out a user

router.get('/logout', authMiddleware, (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
