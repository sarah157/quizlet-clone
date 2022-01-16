const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const trim = (reqUrl) => reqUrl.replace(/\//g, "")

const getResourceType = (req) => {
  let resource = trim(req.baseUrl)
  if (resource === "decks") {
    resource = req.user.isAdmin ? "decksAdmin" : "decks";
  }
  if (resource === "auth") {
    // resource = "login" or "register"
    resource = trim(req.path)
  }
  return resource;
};

module.exports = { isEmpty, trim, getResourceType };
