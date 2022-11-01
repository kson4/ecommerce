require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser(process.env.JWT_SECRET));

const authRouter = require("./routes/authRoutes");

app.get("/", (req, res) => {
  console.log(req.cookies);
  // res.send("Susan Store");
});

// app.get("/", (req, res) => {
//   console.log(req.signedCookies);
//   // res.send("Susan Store");
// });

app.use("/auth", authRouter);

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
