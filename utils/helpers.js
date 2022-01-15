const isEmpty = (inputObject) => {
  return Object.keys(inputObject).length === 0;
};

const getResourceType = (req) => {
  let resource = req.baseUrl.replace(/\//g, "");
  if (resource === "decks") {
    resource = req.user.isAdmin ? "decksAdmin" : "decks";
  }
  if (resource === "auth") {
    // resource = "login" or "register"
    resource = req.path.replace(/\//g, "");
  }
  return resource;
};

module.exports = { isEmpty, getResourceType };
