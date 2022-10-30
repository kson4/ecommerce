require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  // res.send("Susan Store");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
