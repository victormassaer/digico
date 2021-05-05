const User = require("../../../models/User");
const { get } = require("../../../routes/api/v1/users");

const createUser = (req, res) => {
  let user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;
  user.coins = req.body.coins;
  user.created = Date.now();
  user.save((err, doc) => {
    if (err) {
      res.json({
        status: "error",
        message: "Couldnot save this user",
      });
    }
    if (!err) {
      res.json({
        status: "succes",
        message: "ADDING USER",
        data: { message: doc },
      });
    }
  });
};

function getLeaderboard(req, res) {
  User.find({}, (err, doc) => {
    if (err) {
      res.json({
        status: "error",
        message: "Could not find users",
      });
    }
    if (!err) {
      res.json({
        status: "succes",
        message: "GETTING LEADERBOARD",
        data: { user: doc.coins },
      });
    }
  });
}

module.exports.getLeaderboard = getLeaderboard;
module.exports.createUser = createUser;
