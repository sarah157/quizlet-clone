const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, AuthError, CustomError } = require('../utils/errors')
const catchAsync = require('../utils/catchAsync')

const register = catchAsync(async (req, res) => {
  const { username, password, email } = req.body;

  const user = await new User({ username, password, email }).save();
  const token = user.createJWT()
  const {password:p, ...other} = user._doc
  res.status(StatusCodes.CREATED).json({...other, token })
})

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new BadRequestError("Please provide an email and password")
  }
  const user = await User.findOne({ username })
  if (!user) throw new AuthError('Invalid Credentials')

  // compare password
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) throw new AuthError('Invalid Credentials')

  // if pass matches, generate token
  const token = user.createJWT()
  res
    .status(StatusCodes.OK)
    .json(
        { id: user._id, username: user.username, email: user.email, token })
})

module.exports = {
  register,
  login,
}