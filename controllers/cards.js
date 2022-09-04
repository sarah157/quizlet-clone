const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../utils/catchAsync");
const { NotFoundError } = require("../utils/errors");

const Card = require("../models/Card");
const Deck = require("../models/Deck");

module.exports.getCards = catchAsync(async (req, res) => {
  const cards = await Card.find({ deckId: req.deckId }).sort({
    createdAt: -1,
  });
  res.status(StatusCodes.OK).send(cards);
});

module.exports.createCard = catchAsync(async (req, res) => {
  const { index, ...data } = req.body;
  const card = await new Card({ ...data, deckId: req.body.deckId }).save();

  const deck = await Deck.findById(req.body.deckId);
  const maxIndex = deck.cards.length - 1;

  if (!deck.cards.length || index === undefined || index >= maxIndex) {
    deck.cards.push(card._id);
  } else deck.cards.splice(index, 0, card._id);
  deck.save();
  const { starredBy, ...other } = card._doc;
  res
    .status(StatusCodes.CREATED)
    .json({ ...other, starred: card.isStarred(req.user.userId) });
});

module.exports.updateCard = catchAsync(async (req, res) => {
  const card = await Card.findByIdAndUpdate(
    req.params.cardId,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  const { starredBy, ...other } = card._doc;

  res
    .status(StatusCodes.OK)
    .json({ ...other, starred: card.isStarred(req.user.userId) });
});

module.exports.showCard = catchAsync(async (req, res) => {
  const card = await Card.findById(req.params.cardId);
  if (!card) throw new NotFoundError("Card not found");
  const { starredBy, ...other } = card._doc;
  res
    .status(StatusCodes.OK)
    .json({ ...other, starred: card.isStarred(req.user.userId) });
});

module.exports.deleteCard = catchAsync(async (req, res) => {
  const deletedCard = await Card.findByIdAndDelete(req.params.cardId);
  if (!deletedCard) throw new NotFoundError("Card not found");

  await Deck.findByIdAndUpdate(
    deletedCard.deckId,
    { $pull: { cards: deletedCard._id } },
    { runValidators: true }
  );

  res.status(StatusCodes.OK).json();
});

module.exports.isStarred = catchAsync(async (req, res) => {
  const card = await Card.findById(req.params.cardId);
  res.status(StatusCodes.OK).json({ starred: card.isStarred(req.user.userId) });
});

module.exports.starCard = catchAsync(async (req, res) => {
  const card = await Card.findById(req.params.cardId);
  if (!card) {
    throw new NotFoundError(`No card with id ${req.params.cardId} found`);
  }
  if (card.isStarred(req.user.userId)) {
    res.status(StatusCodes.NOT_MODIFIED).json();
  } else {
    card.starredBy.push(req.user.userId);
    card.save();
    res.status(StatusCodes.OK).json();
  }
});

module.exports.unstarCard = catchAsync(async (req, res) => {
  const card = await Card.findById(req.params.cardId);
  if (!card) {
    throw new NotFoundError(`No card with id ${req.params.cardId} found`);
  }
  if (!card.isStarred(req.user.userId)) {
    res.status(StatusCodes.NOT_MODIFIED).json();
  } else {
    card.starredBy = card.starredBy.filter(
      (uid) => uid.toString() != req.user.userId
    );
    card.save();
    res.status(StatusCodes.OK).json();
  }
});
