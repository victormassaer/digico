const User = require("../../../models/User");
const { get } = require("../../../routes/api/v1/users");

const getLeaderboard = (req, res) => {
  User.find({})
    .sort({ coins: "descending" })
    .exec((err, doc) => {
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
          data: { users: doc },
        });
      }
    });
};

const getUserById = (req, res) => {
  let id = req.params.id;
  User.findById(id).exec((err, doc) => {
    if (err) {
      res.json({
        status: "error",
        message: "Could not find user",
      });
    }
    if (!err) {
      res.json({
        status: "succes",
        message: "found user",
        data: { user: doc },
      });
    }
  });
};

module.exports.getLeaderboard = getLeaderboard;
module.exports.getUserById = getUserById;
