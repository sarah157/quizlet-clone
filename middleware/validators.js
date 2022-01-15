const { BadRequestError } = require("../utils/errors");
const { REQUIRED_FIELDS, EDITABLE_FIELDS } = require("../constants");
const { isEmpty, getResourceType } = require("../utils/helpers");

const validatePatch = async (req, res, next) => {
  try {
    if (isEmpty(req.body)) throw new BadRequestError("Fields required");
    const resource = getResourceType(req);
    const validFields = EDITABLE_FIELDS[resource];

    const filteredBody = {};
    Object.keys(req.body).forEach((f) => {
      if (validFields.includes(f)) filteredBody[f] = req.body[f];
      else throw new BadRequestError(`Invalid field entered: ${f}`);
    });
    req.body = { ...filteredBody };

    next();
  } catch (error) {
    next(error);
  }
};

const validatePost = async (req, res, next) => {
  try {
    if (isEmpty(req.body)) throw new BadRequestError("Fields required");
      const resource = getResourceType(req);
      console.log(resource);
      const requriedFields = REQUIRED_FIELDS[resource];
      console.log(requriedFields);

    requriedFields.forEach((f) => {
      if (!req.body.hasOwnProperty(f)) {
        throw new BadRequestError(`Please enter a(n) ${f}`);
      }
    });

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { validatePatch, validatePost };
