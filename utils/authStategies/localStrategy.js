const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../module/user/models/User')

passport.use(new LocalStrategy({
  usernameField: 'email'
},
async (email, password, done) => {
  try {
    const user = await User.findOne({ email })
    if (!user) done(null, false, { error: 'User not found' })
    if (await user.checkPassword(password)) return done(null, user)
    done(null, { error: 'incorrect password' })
  } catch (error) {
    done(error)
  }
})
)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findOne({ _id })
    done(null, user)
  } catch (error) {
    done(error)
  }
})
