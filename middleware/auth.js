const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {
  AuthError,
  ForbiddenError,
  BadRequestError,
  NotFoundError,
} = require("../utils/errors");
const Deck = require("../models/Deck");
const Card = require("../models/Card");
const Folder = require("../models/Folder");
const { ACCESS_TYPE, ACTION_TYPE } = require("../constants");

// Authentication (verify token)
const authenticate = async (req, res, next) => {
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

// Optional authentication for public GET routes. Skip any authentication errors
// Allow access to private resources if current user is owner of resource
const optionalAuth = function (req, res, next) {
  authenticate(req, res, function () {
    next();
  });
};

// Authorization
// Users routes
const authorizeUserAccess = function (req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.userId)) {
      throw new BadRequestError("Please enter a valid ObjectId");
    }
    if (req.user.userId !== req.params.userId) {
      throw new ForbiddenError();
    }
    req.user.isAdmin = true;
    next();
  } catch (error) {
    next(error);
  }
};

// Folders routes
const authorizeFolderAccess = async (req, res, next) => {
  try {
    const folder = await Folder.findById(req.params.folderId);
    if (!folder) throw new NotFoundError("Folder not found");
    if (folder.owner.toString() !== req.user.userId) {
      throw new ForbiddenError();
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Decks routes
const authorizeDeckAccess = async (req, res, next) => {
  try {
    console.log(req.baseUrl)
    const actionType =
      req.method === "GET" ? ACTION_TYPE.READ : ACTION_TYPE.EDIT;
    const deckId = req.params.deckId || req.deckId
    const deck = await Deck.findById(deckId);
    if (!deck) throw new NotFoundError("Deck not found");

    if (deck.owner.toString() !== req.user?.userId) {
      if (deck[actionType] === ACCESS_TYPE.PRIVATE) {
        throw new ForbiddenError();
      }
      if (deck[actionType] === ACCESS_TYPE.PASSWORD_PROTECTED) {
        if (!req.body.password) throw new BadRequestError("Password required");
        const isMatch = await deck.comparePassword(req.body.password);
        if (!isMatch) throw new AuthError("Incorrect Password");
      }
      if (req.user) req.user.isAdmin = false;
    } else req.user.isAdmin = true;
    next();
  } catch (error) {
    next(error);
  }
};

// Cards routes (authorizaton dependant on decks)
const authorizeCardAccess = async (req, res, next) => {
  try {
    let deckId;
    if (req.params.cardId) {
      // must find Card to get deckId (cardId in req params)
      const card = await Card.findById(req.params.cardId);
      if (!card) throw new NotFoundError("Card not found");
      deckId = card.deckId;
    } else {
      // deckId in body for GET /cards and POST /cards requests
      deckId = req.body?.deckId
      if (!deckId) throw new BadRequestError("deckId required in body");
    }
    req.deckId = deckId;
    await authorizeDeckAccess(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
  optionalAuth,
  authorizeUserAccess,
  authorizeFolderAccess,
  authorizeCardAccess,
  authorizeDeckAccess,
};
