const express = require("express");
const router = express.Router();
const cards = require("../controllers/cards");
const { authenticate, optionalAuth, authorizeCardAccess } = require("../middleware/auth");
const { validatePatch, validatePost } = require("../middleware/validators");

router
  .route("/")
  .get(optionalAuth, authorizeCardAccess, cards.getCards)
  .post(authenticate, authorizeCardAccess, validatePost, cards.createCard);
router
  .route("/:cardId/")
  .get(optionalAuth, authorizeCardAccess, cards.showCard)
  .patch(authenticate, authorizeCardAccess, validatePatch, cards.updateCard)
  .delete(authenticate, authorizeCardAccess, cards.deleteCard);
router
  .route("/:cardId/star")
  .get(authenticate, cards.isStarred)
  .put(authenticate, cards.starCard)
  .delete(authenticate, cards.unstarCard);
  
module.exports = router;
