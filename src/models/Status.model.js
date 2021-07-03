const mongoose = require("mongoose");

const statusSchema = mongoose.Schema({
  color: String,
  text: String,
});

const status = mongoose.model("Status", statusSchema);

module.exports = status;
