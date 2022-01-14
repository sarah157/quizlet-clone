const express = require('express');
const router = express.Router();
const folders = require('../controllers/folders')
const { optionalAuth, authenticate } = require('../middleware/auth')

router.route('/')
    .get(optionalAuth, folders.getFoldersByUser)
    .post(authenticate, folders.createFolder)

router.route('/:folderId/')
    .get(optionalAuth, folders.showFolder)
    .patch(authenticate, folders.updateFolder)
    .delete(authenticate, folders.deleteFolder);

router.route('/:folderId/decks')
    .get(optionalAuth, folders.getFolderDecks)
    .post(authenticate, folders.addDeck)

router.route('/:folderId/decks/:deckId')
    .delete(authenticate, folders.removeDeck)

    
module.exports = router;

