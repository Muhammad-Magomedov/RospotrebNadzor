const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  name: { required: true, type: String },
  image: { require: true, type: String },
  updatedAt: Date,
  createdAt: Date,
});

const company = mongoose.model("Companies", companySchema);

module.exports = company;
