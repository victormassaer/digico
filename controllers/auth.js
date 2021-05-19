const User = require("../models/User");

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
      res.json({
        status: "succes",
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
