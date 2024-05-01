const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connecToDb } = require("./connectToDb/connectToDb.js");
const userRouter = require("./routes/auth.js");
const storyRouter = require("./routes/story.js");
const errorHandler = require("./middleware/errormiddleware.js");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({ methods: ["GET", "POST", "DELETE", "PUT"], credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connecToDb("mongodb+srv://pavanp:pavanp@cluster0.n6tibcv.mongodb.net/cuvette?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

dotenv.config();
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/story", storyRouter);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

module.exports = app;
