const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    min: [2, 'Your name should be longer than 2 characters'],
    max: [64, 'Your name cant be longer than 64 characters']
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, 'Email is required'],
    max: [128, 'Your email should not be longer than 128 characters'],
    index: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// check userSchema password
userSchema.pre('save', async function (next) {
  // check if the password has not been modified
  if (!this.isModified('password')) {
    // call our next middleware function
    next()
  } else {
    // if it has been modified encrypt password using bcrypt like below
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

const User = mongoose.model('users', userSchema)

module.exports = User
