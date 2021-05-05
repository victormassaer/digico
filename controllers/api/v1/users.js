const User = require("../../../models/User");
const { get } = require("../../../routes/api/v1/users");

const createUser = (req, res) => {
  let user = new User();
  user.name = req.body.name;
  user.coins = req.body.coins;
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
