const express = require("express");
const router = express.Router();
const folders = require("../controllers/folders");
const {
  getLoggedInUser,
  authenticate,
  authorizeFolderAccess,
} = require("../middleware/auth");

router
  .route("/")
  .get(getLoggedInUser, folders.getFoldersByUser)
  .post(authenticate, folders.createFolder);

router
  .route("/:folderId/")
  .get(getLoggedInUser, folders.showFolder)
  .patch(authenticate, authorizeFolderAccess, folders.updateFolder)
  .delete(authenticate, authorizeFolderAccess, folders.deleteFolder);

router
  .route("/:folderId/decks")
  .post(authenticate, authorizeFolderAccess, folders.addDeck);

router
  .route("/:folderId/decks/:deckId")
  .delete(authenticate, authorizeFolderAccess, folders.removeDeck);

module.exports = router;
