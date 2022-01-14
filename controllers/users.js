const { StatusCodes } = require("http-status-codes");
const { validateReqBodyFields } = require("../utils/helpers");
const catchAsync = require("../utils/catchAsync");
const { ALLOWED_USER_FIELDS } = require("../constants");
const User = require("../models/User");

module.exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userId);

  res.status(StatusCodes.OK).json({ user });
});

module.exports.updateUser = catchAsync(async (req, res) => {
  const validBody = await validateReqBodyFields(
    ALLOWED_USER_FIELDS,
    req.body
  );
  
  await User.findByIdAndUpdate(req.params.userId,
    { $set: validBody },
    { runValidators: true });
});

module.exports.deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.userId);
});
