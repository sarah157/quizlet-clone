
const { StatusCodes } = require('http-status-codes')
const catchAsync = require('../utils/catchAsync')
const User = require('../models/User')




module.exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userId)

  res.status(StatusCodes.OK).json({user})
})
// email, username
module.exports.updateUser = catchAsync(async (req, res) => {
  
  await User.findById(req.params.userId)
})

module.exports.deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.userId)
})

const validate = (properties, reqBody) => {
  
}