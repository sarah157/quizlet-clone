require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./')
const User = require("../models/User");
const Card = require("../models/Card")
const Deck = require("../models/Deck");
const Folder = require('../models/Folder')


connectDB(process.env.MONGO_URI)

const seedDB = async () => {
    // await User.deleteMany({})
    // await Deck.deleteMany({});
    // await Card.deleteMany({})
    
    // const user = new User({ username: "sarah", email: "sarah123@gmail.com", password: "heythere" }).save()
    const folder = new Folder({title: "some folder", owner: mongoose.Types.ObjectId("61dde20542d764665d5447e2"), decks: ["61dde20542d764665d5447e4", "61dde20542d764665d5447e3"]}).save()

    
    // const cards = [
    //     { owner: user._id, title: "one", private: false },
    //     { owner: user._id, title: "two" , private: true},
    //     { owner: user._id, title: "one three" },
    //     { owner: user._id, title: "f one our" },
    //     { owner: user._id, title: "fioneve" },
    // ]

    // await Deck.insertMany(cards)
    const deck = await Deck.find({})
    console.log(deck);

    }
    

seedDB()
    .then(() => {
    mongoose.connection.close();
    console.log("Database closed")
    })
    .catch(err => console.log(err))

