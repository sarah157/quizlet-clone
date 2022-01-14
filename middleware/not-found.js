const { NotFoundError } = require("../utils/errors");

const notFound = (req, res) => {
    throw new NotFoundError("Route does not exist")
}

module.exports = notFound