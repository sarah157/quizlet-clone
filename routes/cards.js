const express = require("express");
const router = express.Router({mergeParams: true});
const cards = require("../controllers/cards");
const { authenticate, optionalAuth, authorizeDeckAccess } = require("../middleware/auth");
const { validatePatch, validatePost } = require("../middleware/validators");
  
router
  .route("/")
  .get(optionalAuth, authorizeDeckAccess, cards.getCards)
  .post(authenticate, authorizeDeckAccess, validatePost('cards'), cards.createCard);

router
  .route("/:cardId/")
  .get(optionalAuth, authorizeDeckAccess, cards.showCard)
  .patch(authenticate, authorizeDeckAccess, validatePatch('cards'), cards.updateCard)
  .delete(authenticate, authorizeDeckAccess, cards.deleteCard);

router
  .route("/:cardId/star")
  .get(authenticate, cards.isStarred)
  .put(authenticate, cards.starCard)
  .delete(authenticate, cards.unstarCard);

module.exports = router;
