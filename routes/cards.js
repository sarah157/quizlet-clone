const express = require("express");
const router = express.Router();
const cards = require("../controllers/cards");
const { authenticate, getLoggedInUser, authorizeCardAccess } = require("../middleware/auth");
  
router
  .route("/")
  .get(getLoggedInUser, authorizeCardAccess, cards.getCards)
  .post(authenticate, authorizeCardAccess, cards.createCard);

router
  .route("/:cardId/")
  .get(getLoggedInUser, authorizeCardAccess, cards.showCard)
  .patch(authenticate, authorizeCardAccess, cards.updateCard)
  .delete(authenticate, authorizeCardAccess, cards.deleteCard);

router
  .route("/:cardId/star")
  .get(authenticate, cards.isStarred)
  .put(authenticate, cards.starCard)
  .delete(authenticate, cards.unstarCard);

module.exports = router;
