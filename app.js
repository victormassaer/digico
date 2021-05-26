require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const cors = require("cors");
const passport = require("./passport/passport");
const transfersRouter = require("./routes/api/v1/transfers");
const usersRouter = require("./routes/api/v1/users");
const pagesRouter = require("./routes/pages");
const authRouter = require("./routes/auth");

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
app.use(
  "/api/v1/transfers",
  passport.authenticate("jwt", { session: false }),
  transfersRouter
);
app.use(
  "/api/v1/users",
  passport.authenticate("jwt", { session: false }),
  usersRouter
);

app.use(
  "/auth/loggedin",
  passport.authenticate("jwt", { session: false }),
  authRouter
);

app.use("/pages", pagesRouter);
app.use("/auth", authRouter);

//pages
app.get("/", pagesRouter);
app.get("/signup", pagesRouter);
app.get("/signin", pagesRouter);
app.get("/transfer", pagesRouter);
app.get("/login", pagesRouter);
app.get("/feed", pagesRouter);
app.get("/leaderboard", pagesRouter);
app.get("/history", pagesRouter);

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

app.listen(process.env.LOCAL_PORT, () => {
  console.log(`Server is running on port ${process.env.LOCAL_PORT}`);
});

module.exports = app;
