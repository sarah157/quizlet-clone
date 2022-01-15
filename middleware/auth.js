const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const { AuthError, ForbiddenError, BadRequestError, NotFoundError } = require("../utils/errors");
const Deck = require("../models/Deck")
const Card = require("../models/Card")
const {ACCESS_TYPE, ACTION_TYPE} = require("../constants")

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
  try {

    if (!mongoose.isValidObjectId(req.params.userId)) {
      throw new BadRequestError("Please enter a valid ObjectId")
    }
    if (req.user.userId !== req.params.userId) {
      throw new ForbiddenError();
    }
    next();
  } catch (error) {
    next(error)
  }
};



const authorizeDeckAccess = async (req, res, next) => {
  try {
    const actionType = req.method === 'GET' ? ACTION_TYPE.READ : ACTION_TYPE.EDIT
    const deck = await Deck.findById(req.params.deckId)
    if (!deck) throw new NotFoundError("Deck not found")
    
    if (deck.owner.toString() !== req.user?.userId) {
      console.log(deck[actionType]);
      if (deck[actionType] === ACCESS_TYPE.PRIVATE) {
        throw new ForbiddenError();
      }
      if (deck[actionType] === ACCESS_TYPE.PASSWORD_PROTECTED) {
        if (!req.body.password) throw new BadRequestError("Password required");
        const isMatch = await deck.comparePassword(req.body.password);
        if (!isMatch) throw new AuthError("Incorrect Password");
    }
      if (req.user) req.user.isAdmin = false;
    }
    else req.user.isAdmin = true;
  next();
  } catch (error) {
    next(error)
}
};
const authorizeCardAccess = async (req, res, next) => {
  try {
    let deckId;
    if (req.baseUrl.replace(/\//g, "") === "cards") { //deckId in query or body
      deckId = req.query?.deckId || req.body?.deckId
      if (!deckId) throw new BadRequestError("deckId required")
    }
    else {
      const card = await Card.findById(req.params.cardId)
      if (!card) throw new NotFoundError("Card not found")
      deckId = card.deckId
    }
    req.params.deckId = deckId
    await authorizeDeckAccess(req, res, next);
  } catch (error) {
    next(error)
}
};

// For public GET routes, allow access to private resources if current user is owner of resource
// Skip any auth errors
const optionalAuth = function (req, res, next) {
  authenticate(req, res, function () {
    next();
  });
};

module.exports = { authenticate, optionalAuth, authorize, authorizeDeckAccess, authorizeCardAccess };
