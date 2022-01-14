const express = require('express');
const router = express.Router();
const decks = require('../controllers/decks')
const {authenticate, optionalAuth} = require('../middleware/auth')

router.route('/')
    .get(optionalAuth, decks.getDecksByUser)
    .post(authenticate, decks.createDeck)

router.route('/:deckId/')
    .get(optionalAuth, decks.showDeck)
    .patch(authenticate, decks.updateDeck)
    .delete(authenticate, decks.deleteDeck);

router.route('/:deckId/cardOrder')
    .put(authenticate, decks.reorderCards)

module.exports = router;


