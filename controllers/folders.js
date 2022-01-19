const { StatusCodes } = require("http-status-codes");

const catchAsync = require("../utils/catchAsync");
const {
  NotFoundError,
  BadRequestError,
} = require("../utils/errors");

const Folder = require("../models/Folder");
const Deck = require("../models/Deck");
const User = require("../models/User");
const { ACCESS_TYPE } = require("../constants");

// Get Folders by userId or username. If both given, userId is used.
module.exports.getFoldersByUser = catchAsync(async (req, res) => {
  if (!req.query.userId && !req.query.username) {
    throw new BadRequestError("Invalid query parameters");
  }
  const user = req.query.userId
    ? await User.findById(req.query.userId)
    : await User.findOne({ username: req.query.username });

  if (!user) throw new NotFoundError("User not found");

 const folders = await Folder.aggregate([
    { $match: { owner: user._id } },
    { $project: { title: 1, description: 2, decksCount: { $size: "$decks" } } },
  ]);

  res.status(StatusCodes.OK).json({ folders });
});

module.exports.createFolder = catchAsync(async (req, res) => {
  const folder = await new Folder({
    ...req.body,
    owner: req.user.userId,
  }).save();

  res.status(StatusCodes.CREATED).json({ folder });
});

module.exports.showFolder = catchAsync(async (req, res) => {
  const folder = await Folder.findById(req.params.folderId);
  // Show only public decks if current user is not folder owner
  const match =
    !req.user || folder.owner != req.user.userId
      ? { _id: { $in: folder.decks }, visibleTo: ACCESS_TYPE.PUBLIC }
      : { _id: { $in: folder.decks } };

  const decks = await Deck.aggregate([
    { $match: match },
    {
      $project: {
        title: 1,
        description: 2,
        cardsCount: { $size: "$cards" },
      },
    },
  ]);

  res.status(StatusCodes.OK).json({ folder: decks });
});

module.exports.updateFolder = catchAsync(async (req, res) => {
  const folder = await Folder.findByIdAndUpdate(
    req.params.folderId,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ folder });
});

module.exports.deleteFolder = catchAsync(async (req, res, next) => {
  await Folder.findByIdAndDelete(req.params.folderId);
  res.status(StatusCodes.OK).json();
});

module.exports.addDeck = catchAsync(async (req, res) => {
  if (!req.body.deckId) {
    throw new BadRequestError("deckId required in request body");
  }
  const deck = await Deck.findById(req.body.deckId);
  if (!deck) throw new NotFoundError("Deck not found");

  const folder = await Folder.findById(req.params.folderId);
  if (folder.decks.includes(req.body.deckId)) {
    res.status(StatusCodes.NOT_MODIFIED).json();
    return;
  }
  folder.decks.push(req.body.deckId);
  folder.save();
  res.status(StatusCodes.OK).json();
});

module.exports.removeDeck = catchAsync(async (req, res) => {
  const folder = await Folder.findById(req.params.folderId);

  if (!folder.decks.includes(req.params.deckId)) {
    res.status(StatusCodes.NOT_MODIFIED).json();
    return;
  }
  folder.decks = folder.decks.filter(
    (deckId) => deckId?.toString() !== req.params.deckId
  );
  folder.save();
  res.status(StatusCodes.OK).json();
});
