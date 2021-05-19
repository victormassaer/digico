const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

// const userSchema = new Schema({
//   firstName: String,
//   lastName: String,
//   username: String,
//   email: String,
//   password: String,
//   coins: Number,
//   created: Date,
// });

// const User = mongoose.model("User", userSchema);

const User = new Schema({});
User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
