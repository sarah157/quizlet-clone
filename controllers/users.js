const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const { ForbiddenError } = require("../utils/errors");

module.exports.getUser = catchAsync(async (req, res) => {
  if (!req.user.isAdmin) throw new ForbiddenError()
  const user = await User.findById(req.params.userId);

  res.status(StatusCodes.OK).json({ user });
});

module.exports.updateUser = catchAsync(async (req, res) => {
  if (!req.user.isAdmin) throw new ForbiddenError()

  await User.findByIdAndUpdate(req.params.userId,
    { $set: req.body },
    { runValidators: true });
});

module.exports.deleteUser = catchAsync(async (req, res) => {
  if (!req.user.isAdmin) throw new ForbiddenError()

  await User.findByIdAndDelete(req.params.userId);
});
