const express = require("express");
const router = express.Router();
const cards = require("../controllers/cards");
const { authenticate, optionalAuth } = require("../middleware/auth");

router
  .route("/")
  .get(optionalAuth, cards.getCards)
  .post(authenticate, cards.createCard);
router
  .route("/:cardId/")
  .get(optionalAuth, authenticate, cards.showCard)
  .patch(authenticate, cards.updateCard)
  .delete(authenticate, cards.deleteCard);
  
router
  .route("/:cardId/star")
  .get(authenticate, cards.isStarred)
  .put(authenticate, cards.starCard)
  .delete(authenticate, cards.unstarCard);
  
// router
//   .route("/:cardId/reviews")
//   .get(auth, cards.getReviews)
//   .post( cards.addReview)

module.exports = router;
