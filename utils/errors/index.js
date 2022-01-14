const CustomError = require('./custom-error')
const AuthError = require('./unauthenticated')
const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')
const ForbiddenError = require('./forbidden')

module.exports = {
  CustomError,
  AuthError,
  NotFoundError,
  BadRequestError,
  ForbiddenError
}