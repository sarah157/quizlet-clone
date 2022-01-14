const { BadRequestError } = require("../utils/errors");

const isEmpty = (inputObject) => {
  return Object.keys(inputObject).length === 0;
};

const filterRequestBody = async (allowedFields, body) => {
    if (isEmpty(body)) throw new BadRequestError("Fields required");

    const filteredBody = {};

    Object.keys(body).forEach(f => {
      if (allowedFields.includes(f)) filteredBody[f] = body[f]
      else throw new BadRequestError(`Invalid field entered: ${f}`);
    })
    return filteredBody;
}

module.exports = { isEmpty, filterRequestBody };