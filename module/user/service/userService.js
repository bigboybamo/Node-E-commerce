const User = require('../models/User')

// addUser is a function which takes one parameter, the userInput object
// this object has all the variables for the user model
const addUser = async (userInput) => {
  const user = new User(userInput)
  await user.save()
  return user
}

module.exports = { addUser }
