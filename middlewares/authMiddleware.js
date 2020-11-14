const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) { // check if user is logged in
    return next()
  } else {
    res.redirect('/login')
  }
}

module.exports = authMiddleware
