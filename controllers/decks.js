const { StatusCodes } = require("http-status-codes");

const catchAsync = require("../utils/catchAsync");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const { ACTION_TYPE } = require("../constants");

const Deck = require("../models/Deck");
const Card = require("../models/Card");
const User = require("../models/User");


// Get decks by username or userId. If both are given, userId is used
// Default: get current user's decks
module.exports.getDecksByUser = catchAsync(async (req, res) => {
  let decks;
  if (req.user && !Object.keys(req.query).length) {
    decks = await Deck.find({ owner: req.user.userId });
    res.status(StatusCodes.OK).json({ decks });
    return;
  }
  if (!req.query.userId && !req.query.username) {
    throw new BadRequestError("Please provide a userId or username");
  }

  const user = req.query?.userId
    ? await User.findById(req.query.userId)
    : await User.findOne({ username: req.query.username });

  if (!user) throw new NotFoundError("User not found");

  decks = await Deck.find({ owner: user._id, private: false });

  res.status(StatusCodes.OK).json({ decks });
});

module.exports.createDeck = catchAsync(async (req, res) => {
  const deck = await new Deck({
    ...req.body,
    owner: req.user.userId,
  }).save();

  res.status(StatusCodes.CREATED).json({ deck });
});

module.exports.showDeck = catchAsync(async (req, res) => {
  const deck = await Deck.findById(req.params.deckId);
  if (!deck) throw new NotFoundError("Deck not found");
  await deck.authorizeUser(ACTION_TYPE.READ, req.user?.userId, req.body?.password)
  res.status(StatusCodes.OK).json({ deck });
});

module.exports.updateDeck = catchAsync(async (req, res) => {
  if (!Object.keys(req.body).length) throw new BadRequestError("Request body required")
  const deck = await Deck.findById(req.params.deckId);
  if (!deck) throw new NotFoundError("Deck not found")

  const userRole = await deck.authorizeUser(ACTION_TYPE.EDIT, req.user.userId, req.body?.password)
  const { password, ...other } = deck.filterReqestBody(userRole, req.body)
  if (password) await deck.hashPassword(password) 
  
  const updatedDeck = await Deck.findByIdAndUpdate(
    deck._id,
    { $set: other },
    { new: true, runValidators: true },
  );

  res.status(StatusCodes.OK).json({ deck: updatedDeck });
});

module.exports.deleteDeck = catchAsync(async (req, res, next) => {
  await Deck.findByIdAndDelete(req.params.deckId);
  res.status(StatusCodes.OK).json();
});

module.exports.reorderCards = catchAsync(async (req, res, next) => {
  const { index, cardId } = req.body;
  if (!index || !cardId)
    throw new BadRequestError("cardId and index are required");

  const deck = await Deck.findById(req.params.deckId);
  if (!deck)
    throw new NotFoundError("Deck not found");

  const card = await Card.findById(cardId);
  if (!card)
    throw new NotFoundError("Card not found");

  const maxIndex = deck.cards.length - 1;

  // Remove card from deck then insert into correct position
  deck.cards = deck.cards.filter((c) => c._id.toString() !== cardId);
  if (!deck.cards.length || index >= maxIndex) deck.cards.push(card._id);
  else deck.cards.splice(index, 0, card._id);
  deck.save();

  res.status(StatusCodes.CREATED).json({ card });
});
