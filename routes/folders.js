const express = require("express");
const router = express.Router();
const folders = require("../controllers/folders");
const { validatePatch, validatePost } = require("../middleware/validators");
const {
  optionalAuth,
  authenticate,
  authorizeFolderAccess,
} = require("../middleware/auth");


router
  .route("/")
  .get(optionalAuth, folders.getFoldersByUser)
  .post(authenticate, validatePost, folders.createFolder);

router
  .route("/:folderId/")
  .get(optionalAuth, folders.showFolder)
  .patch(
    authenticate,
    authorizeFolderAccess,
    validatePatch,
    folders.updateFolder
  )
  .delete(authenticate, authorizeFolderAccess, folders.deleteFolder);

router
  .route("/:folderId/decks")
  .post(authenticate, authorizeFolderAccess, folders.addDeck);

router
  .route("/:folderId/decks/:deckId")
  .delete(authenticate, authorizeFolderAccess, folders.removeDeck);

module.exports = router;
