const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const { AuthError, ForbiddenError, BadRequestError } = require("../utils/errors");

// verify token
const authenticate = async (req, res, next) => {
  // check header
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new AuthError("Authentication Failed: Token required");
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) throw new AuthError("Authentication failed: Invalid token");
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

const authorize = function (req, res, next) {
  if (!mongoose.isValidObjectId(req.params.userId)) {
    throw new BadRequestError("Please enter a valid ObjectId")
  }
  if (req.user.userId !== req.params.userId) {
    throw new ForbiddenError();
  }
  next();
};

// For public GET routes, allow access to private resources if current user is owner of resource
// Skip any auth errors
const optionalAuth = function (req, res, next) {
  authenticate(req, res, function () {
    next();
  });
};

module.exports = { authenticate, optionalAuth, authorize };
