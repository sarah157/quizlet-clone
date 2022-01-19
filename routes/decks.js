const express = require('express');
const router = express.Router();
const decks = require('../controllers/decks');
const cards = require('../controllers/cards');
const { authenticate, optionalAuth, authorizeDeckAccess} = require('../middleware/auth');
const { validatePatch, validatePost} = require('../middleware/validators');

router.route('/')
    .get(optionalAuth, decks.getDecksByUser)
    .post(authenticate, authorizeDeckAccess, validatePost('decks'), decks.createDeck)

router.route('/reorder-cards')
    .put(authenticate, authorizeDeckAccess, decks.reorderCards)
  
router.route('/:deckId/')
    .get(optionalAuth, authorizeDeckAccess, decks.showDeck)
    .patch(authenticate, authorizeDeckAccess, validatePatch('decks'), decks.updateDeck)
    .delete(authenticate, decks.deleteDeck);

module.exports = router;



