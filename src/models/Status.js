const mongoose = require("mongoose")

const Status = mongoose.Schema({
    green: String,
    red: String,
    blue: String,
    companyId: { type: mongoose.Schema.ObjectId, ref: "Companies" }
})

module.exports = mongoose.model("Status", Status)