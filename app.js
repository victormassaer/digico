require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
var indexRouter = require("./routes/index");
const transfersRouter = require("./routes/api/v1/transfers");
const usersRouter = require("./routes/api/v1/users");
const frontendRouter = require("./routes/frontend");

mongoose.connect(
  `mongodb+srv://admin:${process.env.DB_PASS}@digico.vjbbh.mongodb.net/digico?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected!");
});

var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use("/", indexRouter);
// app.use("/", indexRouter);
app.use("/api/v1/transfers", transfersRouter);
app.use("/api/v1/users", usersRouter);
app.use("/frontend", frontendRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/index.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/public/signup.html");
});

app.get("/signin", (req, res) => {
  res.sendFile(__dirname + "/public/signin.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/feed", (req, res) => {
  res.sendFile(__dirname + "/public/feed.html");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// // error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
});

app.listen(3001, function () {
  console.log("Server is running on port 3001");
});

module.exports = app;
