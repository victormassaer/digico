const mongoose = require("mongoose");
const { Schema } = mongoose;

const transferSchema = new Schema({
  name: String,
});

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
