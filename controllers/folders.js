const { StatusCodes } = require("http-status-codes");

const catchAsync = require("../utils/catchAsync");
const {NotFoundError, ForbiddenError, BadRequestError } = require("../utils/errors");

const Folder = require("../models/Folder");
const Deck = require("../models/Deck");
const User = require("../models/User");
const { ALLOWED_FOLDER_FIELDS } = require("../constants");
const { validateReqBodyFields } = require("../utils/helpers");

// Get Folders by userId or username. If both given, userId is used.
// If none are given, gets current user's folders
module.exports.getFoldersByUser = catchAsync(async (req, res) => {
  let folders;

  // If no query given, fetch current user's folders
  if (req.user && !Object.keys(req.query).length) {
    folders = await Folder.find({ owner: req.user.userId });
    res.status(StatusCodes.OK).json({ folders });
    return;
  }

  if (!req.query.userId && !req.query.username) {
    throw new BadRequestError("Invalid query parameters");
  }

  const user = req.query.userId
    ? await User.findById(req.query.userId)
    : await User.findOne({ username: req.query.username });

  if (!user) throw new NotFoundError("User not found");
  
  folders = await Folder.find({ owner: user._id });

  res.status(StatusCodes.OK).json({ folders });
});

module.exports.createFolder = catchAsync(async (req, res) => {
  const validBody = await validateReqBodyFields(ALLOWED_FOLDER_FIELDS, req.body)
  const folder = await new Folder({
    ...validBody,
    owner: req.user.userId,
  }).save()
  
   res.status(StatusCodes.CREATED).json({ folder });
});

module.exports.showFolder = catchAsync(async (req, res) => {
  const folder = await Folder.findById(req.params.folderId).populate({path: "decks"});
  if (!folder) {
    throw new NotFoundError(`No folder with id ${req.params.folderId} found`);
  }
  if (!req.user || folder.owner != req.user.userId) {
    // Show only public decks
    folder.decks = folder.decks.filter((deck) => !deck.private);
  }
  res.status(StatusCodes.OK).json({ folder });
});

module.exports.updateFolder = catchAsync(async (req, res) => {
  const validBody = await validateReqBodyFields(ALLOWED_FOLDER_FIELDS, req.body)
  const folder = await Folder.findByIdAndUpdate(
    req.params.folderId,
    { $set: validBody },
    { new: true }
  );
  if (!folder) {
    throw new NotFoundError(`No folder with id ${req.params.folderId} found`);
  }
  if (folder.owner != req.user.userId) {
    throw new ForbiddenError();
  }
  res.status(StatusCodes.OK).json({ folder });
});

module.exports.deleteFolder = catchAsync(async (req, res, next) => {
  await Folder.findByIdAndDelete(req.params.folderId);
  res.status(StatusCodes.OK).json();
});

module.exports.getFolderDecks = catchAsync(async (req, res, next) => {
  let decks;
  const folder = await Folder.findById(req.params.folderId).populate({ path: "decks" })

  // If folder owner is not current user, only fetch public decks
  if (!req.user || req.user && folder.owner !== req.user.userId) {
    decks = folder.decks.filter(deck => !deck.private)
    console.log(decks);
  } else {
    decks = folder.decks
  }
  res.status(StatusCodes.OK).json({ decks });
});


module.exports.addDeck = catchAsync(async (req, res) => {
  if (!req.body.deckId) {
    throw new BadRequestError("deckId required in request body");
  }

  const folder = await Folder.findById(req.params.folderId);
  if (!folder) {
    throw new NotFoundError(`No folder with id ${req.params.folderId} found`);
  }
  if (folder.owner != req.user.userId) {
    throw new ForbiddenError();
  }

  const deck = await Deck.findById(req.body.deckId);
  if (!deck) {
    throw new NotFoundError(`No deck with id ${req.body.deckId} found`);
  }

  if (folder.decks.includes(req.body.deckId)) {
    res.status(StatusCodes.NOT_MODIFIED).json();
    return
  }

  folder.decks.push(req.body.deckId);
  folder.save();
  res.status(StatusCodes.OK).json();
});

module.exports.removeDeck = catchAsync(async (req, res) => {
  const folder = await Folder.findById(req.params.folderId);
  if (!folder) {
    throw new NotFoundError(`No folder with id ${req.params.folderId} found`);
  }
  if (folder.owner != req.user.userId) {
    throw new ForbiddenError();
  }

  if (!folder.decks.includes(req.params.deckId)) {
    res.status(StatusCodes.NOT_MODIFIED).json();
    return
  }


  folder.decks = folder.decks.filter(deckId => deckId?.toString() !== req.params.deckId);
  folder.save();
  res.status(StatusCodes.OK).json();
});
