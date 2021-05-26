const User = require("../../../models/User");
const { get } = require("../../../routes/api/v1/users");

function getLeaderboard(req, res) {
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
}

module.exports.getLeaderboard = getLeaderboard;
