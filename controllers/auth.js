const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let coins = 100;
  let created = Date.now();
  const user = new User({
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    coins: coins,
    created: created,
  });
  await user.setPassword(password);
  await user
    .save()
    .then((result) => {
      let token = jwt.sign(
        {
          uid: result._id,
          username: result.username,
        },
        process.env.PASSWORD_SECRET
      );
      res.json({
        status: "succes",
        data: {
          token: token,
        },
      });
    })
    .catch((error) => {
      res.json({
        status: "error",
        message: error.message,
      });
    });
};

const login = async (req, res, next) => {
  const user = await User.authenticate()(req.body.username, req.body.password)
    .then((result) => {
      if (!result.user) {
        return res.json({
          status: "failed",
          message: "Login failed",
        });
      }
      let token = jwt.sign(
        {
          uid: result.user._id,
          username: result.user.username,
        },
        process.env.PASSWORD_SECRET
      );
      return res.json({
        status: "succes",
        data: {
          token: token,
        },
      });
    })
    .catch((error) => {
      res.json({
        status: "error",
        message: error.message,
      });
    });
};

const loggedIn = (req, res) => {
  res.json({
    status: "succes",
    message: "LOGGED IN",
  });
};

module.exports.signup = signup;
module.exports.login = login;
module.exports.loggedIn = loggedIn;
