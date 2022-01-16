const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const Card = require("./Card");
const {
  NotFoundError,
  BadRequestError
} = require("../utils/errors");


const deckSchema = new Schema(
  {
    title: {
      type: String,
      maxlength: 60,
      required: [true, "Deck title required"],
    },
    description: {type: String, default: ""},
    editableBy: {
      type: Number,
      min: 0,
      max: 1,
      default: 0,
      required: [
        true,
        "Value required for editableBy (0 = private, 1 = password protected",
      ],
    },
    visibleTo: {
      type: Number,
      min: 0,
      max: 2,
      default: 2,
      required: [
        true,
        "Value required for visibleTo (0 = private, 1 = password protected, 2 = public",
      ],
    },
    password: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },

  { timestamps: true }
);

deckSchema.post("findOneAndDelete", async function (doc) {
  if (!doc) {
    throw new NotFoundError("Deck does not exist");
  }
  await Card.deleteMany({
    deckId: { $eq: doc._id },
  });
});

deckSchema.methods.hashPassword = async function (inputPass) {
  if (typeof inputPass !== "string") {
    throw new BadRequestError("Password must be a string");
  }
  if (inputPass.length <= 3)
    throw new BadRequestError("Password length must be 4 or more characters");
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(inputPass, salt);
  await this.save();
};

deckSchema.methods.comparePassword = async function (inputPass) {
  return bcrypt.compare(inputPass, this.password);
};


module.exports = model("Deck", deckSchema);
