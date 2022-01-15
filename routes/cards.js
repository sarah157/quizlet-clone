const express = require("express");
const router = express.Router();
const cards = require("../controllers/cards");
const { authenticate, optionalAuth } = require("../middleware/auth");
const { validatePatch, validatePost } = require("../middleware/validators");

router
  .route("/")
  .get(optionalAuth, cards.getCards)
  .post(authenticate, validatePost, cards.createCard);
router
  .route("/:cardId/")
  .get(optionalAuth, authenticate, cards.showCard)
  .patch(authenticate, validatePatch, cards.updateCard)
  .delete(authenticate, cards.deleteCard);
  
router
  .route("/:cardId/star")
  .get(authenticate, cards.isStarred)
  .put(authenticate, cards.starCard)
  .delete(authenticate, cards.unstarCard);
  
module.exports = router;
