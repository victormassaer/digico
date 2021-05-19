const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  coins: Number,
  created: Date,
});
User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
