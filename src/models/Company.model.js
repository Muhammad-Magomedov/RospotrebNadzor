const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  name: { required: true, type: String },
  image: { require: true, type: String },
},{timestamps: true});

const company = mongoose.model("Companies", companySchema);

module.exports = company;
