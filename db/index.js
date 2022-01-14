const mongoose = require('mongoose');

const connectDB = async (url) => {
    const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: false,
            // useFindAndModify: false,
        };
    return mongoose.connect(url, options);
};

module.exports = connectDB;