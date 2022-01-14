const User = require('../models/User')

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, AuthError } = require('../utils/errors')
const catchAsync = require('../utils/catchAsync')

const register = catchAsync(async (req, res) => {
  const user = await new User({ ...req.body }).save();
  const token = user.createJWT()
  const {password, ...other} = user._doc
  res.status(StatusCodes.CREATED).json({user: {...other}, token })
})

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError("Please provide an email and password")
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new AuthError('Invalid Credentials')
  }
  // compare password
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new AuthError('Invalid Credentials')
  }
  // if pass matches, generate token
  const token = user.createJWT()
  res
    .status(StatusCodes.OK)
    .json(
      {
        user: { userId: user._id, name: user.name },
        token
      })
})

module.exports = {
  register,
  login,
}