const express = require('express');
const router = express.Router();
const decks = require('../controllers/decks');
const { authenticate, getLoggedInUser, authorizeDeckAccess} = require('../middleware/auth');

router.route('/')
    .get(getLoggedInUser, decks.getDecksByUser)
    .post(authenticate, decks.createDeck)

router.route('/reorder-card')
    .put(authenticate, authorizeDeckAccess, decks.reorderCard)
  
router.route('/:deckId/')
    .get(getLoggedInUser, authorizeDeckAccess, decks.showDeck)
    .patch(authenticate, authorizeDeckAccess, decks.updateDeck)
    .delete(authenticate, decks.deleteDeck);

module.exports = router;



