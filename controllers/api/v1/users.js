const { response } = require("express");
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
        data: doc,
      });
    }
  });
};

const autocomplete = (req, res) => {
  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  try {
    let query = req.query.term;
    const regex = new RegExp(escapeRegex(query), "gi");
    let users = User.find({ username: regex }, (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          status: "succes",
          message: "found user",
          data: doc,
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports.getLeaderboard = getLeaderboard;
module.exports.getUserById = getUserById;
module.exports.autocomplete = autocomplete;
