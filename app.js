require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const transfersRouter = require("./routes/api/v1/transfers");
const usersRouter = require("./routes/api/v1/users");
const pagesRouter = require("./routes/pages");

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

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use("/api/v1/transfers", transfersRouter);
app.use("/api/v1/users", usersRouter);
app.use("/pages", pagesRouter);

//pages
app.get("/index", pagesRouter);
app.get("/signup", pagesRouter);
app.get("/signin", pagesRouter);
app.get("/transfer", pagesRouter);
app.get("/login", pagesRouter);
app.get("/feed", pagesRouter);

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
  res.status(500).json({
    message: err.message,
    error: err,
  });
});

app.listen(process.env.LOCAL_PORT, function () {
  console.log(`Server is running on port ${process.env.LOCAL_PORT}`);
});

module.exports = app;
