require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require(".");
const User = require("../models/User");
const Card = require("../models/Card");
const Deck = require("../models/Deck");
const Folder = require("../models/Folder");

const seedDB = async () => {
  await User.deleteMany({});
  await Card.deleteMany({});
  await Deck.deleteMany({});
  await Folder.deleteMany({});

  const user = new User({
    username: "sarah",
    email: "sarah123@gmail.com",
    password: "heythere",
  }).save();

  const card = new Card({ content: "card content", starred: false }).save();

  const deck = new Deck({
    title: "some deck",
    desc: "some deck description",
    cards: [card._id],
    owner: user._id,
  }).save();

  const folder = new Folder({
    title: "some folder",
    owner: user._id,
    decks: [deck._id],
  }).save();
};

connectDB(process.env.MONGO_URI)
  .then(() => console.log("db connected!"))
  .catch((err) => console.log(err));

seedDB()
  .catch((err) => console.log(err));
