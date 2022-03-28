const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("../utils/errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong.",
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join("; ");
    customError.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `${Object.keys(err.keyValue)} already taken.`;
    customError.statusCode = StatusCodes.CONFLICT;
  }

  if (err.name === "CastError") {
    customError.msg = "Invalid ObjectId";
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
