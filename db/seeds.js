require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('.')
const User = require("../models/User");
const Card = require("../models/Card")
const Deck = require("../models/Deck");
const Folder = require('../models/Folder')



const seedDB = async () => {
    // await User.deleteMany({})
    // await Deck.deleteMany({});
    // await Card.deleteMany({})
    
    // const user = new User({ username: "sarah", email: "sarah123@gmail.com", password: "heythere" }).save()
    const folder = new Folder({title: "some folder", owner: mongoose.Types.ObjectId("61dde20542d764665d5447e2"), decks: ["61dde20542d764665d5447e4", "61dde20542d764665d5447e3"]}).save()

    // await Deck.insertMany(cards)
    const deck = await Deck.find({})
    }
 
  
connectDB(process.env.MONGO_URI)
    .then(() => console.log('db connected!'))
    .catch(err => console.log(err))
  
seedDB()
    .then(() => {
    mongoose.connection.close();
    console.log("Database closed")
    })
    .catch(err => console.log(err))

