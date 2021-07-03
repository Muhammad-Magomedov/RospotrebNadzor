const mongoose = require("mongoose");

const recordSchema = mongoose.Schema({
  text: String,
  status: { type: mongoose.Schema.ObjectId, ref: "Status" },
  companyId: { type: mongoose.Schema.ObjectId, ref: "Companies" },
});

const record = mongoose.model("Records", recordSchema);

module.exports = record;
