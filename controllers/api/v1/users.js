const User = require("../../../models/User");
const { get } = require("../../../routes/api/v1/users");

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
