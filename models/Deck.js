const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const Card = require("./Card");
const {
  NotFoundError,
  BadRequestError,
  AuthError,
  ForbiddenError,
} = require("../utils/errors");
const { USER_ROLE, ACCESS_TYPE, EDITABLE_DECK_PROPS } = require("../constants");

const deckSchema = new Schema(
  {
    title: {
      type: String,
      maxlength: 60,
      required: [true, "Deck title required"],
    },
    description: String,
    editableBy: {
      type: Number,
      min: 0,
      max: 1,
      default: 0,
      required: [true, "Value required for editableBy (0 = private, 1 = password protected"],
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
  inputPass = inputPass.toString();
  if (inputPass.length <= 3)
    throw new BadRequestError("Password length must be 4 or more characters");
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(inputPass, salt);
  this.save();
};

deckSchema.methods.comparePassword = async function (inputPass) {
  return bcrypt.compare(inputPass, this.password);
};

deckSchema.methods.authorizeUser = async function (
  permissionType,
  currentUserId,
  password
) {
  if (this.owner.toString() !== currentUserId) {
    if (this[permissionType] === ACCESS_TYPE.PRIVATE) {
      throw new ForbiddenError();
    }
    if (this[permissionType] === ACCESS_TYPE.PASSWORD_PROTECTED) {
      if (!password) throw new BadRequestError("Password required");
      const isMatch = await this.comparePassword(password);
      if (!isMatch) throw new AuthError("Incorrect Password");
    }
    return USER_ROLE.MEMBER;
  }
  return USER_ROLE.ADMIN;
};

deckSchema.methods.filterReqestBody = function (userRole, body) {
  const { editableBy, visibleTo, password } = body;

  if (userRole !== USER_ROLE.ADMIN && (editableBy || visibleTo || password)) {
    throw new ForbiddenError();
  }

  const filteredBody = {};
  for (let p of EDITABLE_DECK_PROPS) if (body[p]) filteredBody[p] = body[p];

  if (
    !this.password &&
    (filteredBody.editableBy === ACCESS_TYPE.PASSWORD_PROTECTED ||
      filteredBody.visibleTo === ACCESS_TYPE.PASSWORD_PROTECTED)
  ) {
    throw new BadRequestError(
      "Deck has no password. Create a password for this deck"
    );
  }

  return filteredBody;
};

module.exports = model("Deck", deckSchema);
