const  { Schema,Types, model } = require("mongoose");

const cardSchema = new Schema(
  {
    content: { type: String, required: [true, "Card content cannot be blank"] },
    starredBy: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    deckId: {
      type: Schema.Types.ObjectId,
      ref: "Deck",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // reviewDates: [
    //   {
    //     date: Date,
    //     difficulty: { type: String, enum: ["easy", "medium", "hard"] },
    //   },
    // ],
  },
  { timestamps: true }
);

cardSchema.methods.isStarred = function (currentUser) {
  return this.starredBy.includes(Types.ObjectId(currentUser));
};

module.exports = model("Card", cardSchema);
