if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectDB = require("./db");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users")
const folderRoutes = require("./routes/folders");
const deckRoutes = require("./routes/decks");
const cardRoutes = require("./routes/cards");

// Initial Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));
app.use(mongoSanitize({ replaceWith: "_" }));

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/folders", folderRoutes);
app.use("/decks", deckRoutes);
app.use("/cards", cardRoutes);

// Error Handling Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    const port = process.env.PORT || 3005;

    await connectDB(process.env.MONGO_URI);
    console.log("db connected!");

    app.listen(port, () => {
      console.log(`Serving on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
