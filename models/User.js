const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
  coins: Number,
  created: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
