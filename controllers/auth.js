const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let coins = req.body.coins;
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
        "MyVerySecretWord"
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
        "MyVerySecretWord"
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

module.exports.signup = signup;
module.exports.login = login;
