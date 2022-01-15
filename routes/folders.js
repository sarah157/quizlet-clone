const express = require('express');
const router = express.Router();
const folders = require('../controllers/folders')
const { optionalAuth, authenticate, authorize } = require('../middleware/auth')
const { validatePatch, validatePost} = require('../middleware/validators');

router.route('/')
    .get(optionalAuth, folders.getFoldersByUser)
    .post(authenticate, validatePost, folders.createFolder)

router.route('/:folderId/')
    .get(optionalAuth, folders.showFolder)  
    .patch(authenticate, validatePatch, folders.updateFolder)
    .delete(authenticate, folders.deleteFolder);

router.route('/:folderId/decks')
    .get(optionalAuth, folders.getFolderDecks) 
    .post(authenticate, folders.addDeck)

router.route('/:folderId/decks/:deckId')
    .delete(authenticate, folders.removeDeck)

    
module.exports = router;

