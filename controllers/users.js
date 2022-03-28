const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const { ForbiddenError } = require("../utils/errors");

module.exports.getUser = catchAsync(async (req, res) => {
  if (!req.user.isAdmin) throw new ForbiddenError()
  const user = await User.findById(req.params.userId);
  const { password, ...other } = user._doc;
  res.status(StatusCodes.OK).json({ ...other });
});

module.exports.updateUser = catchAsync(async (req, res) => {
  if (!req.user.isAdmin) throw new ForbiddenError()

  const user = await User.findByIdAndUpdate(req.params.userId,
    { $set: req.body },
    { runValidators: true, new : true});

  const { password, ...other } = user._doc;
  res.status(StatusCodes.OK).json({ ...other });
});

module.exports.deleteUser = catchAsync(async (req, res) => {
  if (!req.user.isAdmin) throw new ForbiddenError()

  await User.findByIdAndDelete(req.params.userId);
});
