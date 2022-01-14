const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custom-error");

class ForbiddenError extends CustomError {
  constructor(message) {
    super(message);
    this.message = message || "You are not allowed to do that";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
