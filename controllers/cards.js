const { StatusCodes } = require("http-status-codes");

const catchAsync = require("../utils/catchAsync");
const { NotFoundError, BadRequestError } = require("../utils/errors");

const Card = require("../models/Card");
const Deck = require("../models/Deck");

module.exports.getCards = catchAsync(async (req, res) => {
  console.log(req.params.deckId);
  const cards = await Card.find({ deckId: req.params.deckId }).sort({ createdAt: -1 });
  res.status(StatusCodes.OK).send(cards);
});

module.exports.createCard = catchAsync(async (req, res) => {
  const { index, ...data } = req.body;
  console.log(req.params);
  const card = await new Card({...data, deckId: req.params.deckId}).save()

  const deck = await Deck.findById(req.params.deckId);
  const maxIndex = deck.cards.length - 1;
  
  if (!deck.cards.length || index === undefined || index >= maxIndex) {
    deck.cards.push(card._id);
  } else deck.cards.splice(index, 0, card._id);
  deck.save();

  res.status(StatusCodes.CREATED).json(card);
});

module.exports.updateCard = catchAsync(async (req, res) => {

  const updatedCard = await Card.findByIdAndUpdate(req.params.cardId,
    { $set: req.body },
    { new: true, runValidators: true });

  res.status(StatusCodes.OK).json({ ...updatedCard });
});

module.exports.showCard = catchAsync(async (req, res) => {
  const card = await Card.findById(req.params.cardId);
  if (!card) throw new NotFoundError("Card not found");
  
  res.status(StatusCodes.OK).json(card);
});

module.exports.deleteCard = catchAsync(async (req, res) => {
  const deletedCard = await Card.findByIdAndDelete(req.params.cardId);
  if (!deletedCard) throw new NotFoundError("Card not found");

  await Deck.findByIdAndUpdate(deletedCard.deckId,
    { $pull: { cards: deletedCard._id } }, 
    { runValidators: true });

  res.status(StatusCodes.OK).json();
});

module.exports.isStarred = catchAsync(async (req, res) => {
  const card = await Card.findById(req.params.cardId);
  res.status(StatusCodes.OK).json({ starred: card.starred });
});

module.exports.starCard = catchAsync(async (req, res) => {
  const card = await Card.findById(req.params.cardId);
  if (!card) {
    throw new NotFoundError(`No card with id ${req.params.cardId} found`);
  }
  if (card.starred) {
    res.status(StatusCodes.NOT_MODIFIED).json();
  } else {
    card.starred = true;
    card.save();
    res.status(StatusCodes.OK).json();
  }
});

module.exports.unstarCard = catchAsync(async (req, res) => {
  const card = await Card.findById(req.params.cardId);
  if (!card) {
    throw new NotFoundError(`No card with id ${req.params.cardId} found`);
  }
  if (!card.starred) {
    res.status(StatusCodes.NOT_MODIFIED).json();
  } else {
    card.starred = false;
    card.save();
    res.status(StatusCodes.OK).json();
  }
});
