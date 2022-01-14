const { StatusCodes } = require("http-status-codes");

const catchAsync = require("../utils/catchAsync");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const {ACTION_TYPE, ALLOWED_CARD_FIELDS} = require("../constants")

const Card = require("../models/Card");
const Deck = require("../models/Deck");
const { filterRequestBody } = require("../utils/helpers");

module.exports.getCards = catchAsync(async (req, res) => {
  const { deckId } = req.query
  if (!deckId) throw new BadRequestError("Query parameter deckId required")
  
  const deck = await Deck.findById(deckId)
  if (!deck) throw new NotFoundError("Deck not found")
  await deck.authorizeUser(ACTION_TYPE.READ, req.user?.userId, req.body?.password)
  
  const cards = await Card.find({ deckId }).sort({ createdAt: -1 });
  
  res.status(StatusCodes.OK).send({ cards });
});

module.exports.createCard = catchAsync(async (req, res) => {
  const { index, ...data } = req.body;

  const deck = await Deck.findById(data.deckId);
  if (!deck) throw new NotFoundError("Deck not found");

  const validBody = await filterRequestBody(ALLOWED_CARD_FIELDS, data)
  const card = await new Card(validBody).save()

  const maxIndex = deck.cards.length - 1;
  if (!deck.cards.length || index === undefined || index >= maxIndex) {
    deck.cards.push(card._id);
  } else deck.cards.splice(index, 0, card._id);
  deck.save();

  res.status(StatusCodes.CREATED).json({ card });
});

module.exports.updateCard = catchAsync(async (req, res) => {
  const card = await Card.findById(req.params.cardId);
  if (!card) throw new NotFoundError("Card not found");

  
  const deck = await Deck.findById(card.deckId)
  deck.authorizeUser(ACTION_TYPE.EDIT, req.user.userId, req.body?.password)
  
  const validBody = await filterRequestBody(ALLOWED_CARD_FIELDS, req.body)

  const updatedCard = await Card.findByIdAndUpdate(req.params.cardId,
    { $set: validBody },
    { new: true });

  res.status(StatusCodes.OK).json({ card: updatedCard });
});

module.exports.showCard = catchAsync(async (req, res) => {
  const card = await Card.findById(req.params.cardId);
  if (!card) throw new NotFoundError("Card not found");
  
  const deck = await Deck.findById(card.deckId)
  deck.authorizeUser(ACTION_TYPE.READ, req.user?.userId, req.body?.password)
  
  res.status(StatusCodes.OK).json({ card });
});

module.exports.deleteCard = catchAsync(async (req, res) => {
  const deletedCard = await Card.findByIdAndDelete(req.params.cardId);
  if (!deletedCard) throw new NotFoundError("Card not found");

  await Deck.findByIdAndUpdate(deletedCard.deckId, {
    $pull: { cards: deletedCard._id },
  });

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
