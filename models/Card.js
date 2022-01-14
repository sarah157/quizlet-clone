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
    // reviewDates: [
    //   {
    //     date: Date,
    //     difficulty: { type: String, enum: ["easy", "medium", "hard"] },
    //   },
    // ],
  },
  { timestamps: true }
);


module.exports = model("Card", cardSchema);
