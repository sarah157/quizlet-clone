const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
  {
    content: { type: String, required: [true, "Card content cannot be blank"] },
    starred: { type: Boolean, default: false },
    deckId: {
      type: Schema.Types.ObjectId,
      ref: "Deck",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rank: Number,
    archived: { type: Boolean, default: false },
    reviewDates: [
      {
        date: Date,
        difficulty: { type: String, enum: ["easy", "medium", "hard"] },
      },
    ],
  },
  { timestamps: true }
);

cardSchema.methods.nextReviewDate = function (remembered, reviewDates) {
  const lastInterval = Date.now() - reviewDates[reviewDates.length - 1];

  if (remembered) {
    return Date.now() + lastInterval / 2;
  } else return Date.now() + lastInterval * 2;
};

module.exports = model("Card", cardSchema);
