const mongoose = require("mongoose");
const { Schema } = mongoose;

const transferSchema = new Schema({
  senderId: String,
  receiverId: String,
  reason: String,
  message: String,
  amount: Number,
  created: Date,
});

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
