const express = require('express');
const router = express.Router();
const decks = require('../controllers/decks');
const { authenticate, optionalAuth, authorizeDeckAccess} = require('../middleware/auth');
const { validatePatch, validatePost} = require('../middleware/validators');

router.route('/')
    .get(optionalAuth, decks.getDecksByUser)
    .post(authenticate, validatePost, decks.createDeck)

router.route('/:deckId/')
    .get(optionalAuth, authorizeDeckAccess, decks.showDeck)
    .patch(authenticate, authorizeDeckAccess, validatePatch, decks.updateDeck)
    .delete(authenticate, decks.deleteDeck);

router.route('/:deckId/cardOrder')
    .put(authenticate, decks.reorderCards)

module.exports = router;



