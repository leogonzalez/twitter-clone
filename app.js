const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const mongoose = require("mongoose");
const { mongoURI } = require("./config/keys");

mongoose.connect(mongoURI);
var db = mongoose.connection;
db.once('open', () => {
  console.log('MongoDB connected');
})
const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", usersRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
