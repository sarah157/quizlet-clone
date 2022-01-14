
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, AuthError } = require('../utils/errors')
const catchAsync = require('../utils/catchAsync')

const User = require('../models/User')

const getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userId)

  res.status(StatusCodes.OK).json({user})
})

const updateUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userId)

})

const deleteUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userId)

})

module.exports = {
  getUser,
  updateUser,
  deleteUser
}