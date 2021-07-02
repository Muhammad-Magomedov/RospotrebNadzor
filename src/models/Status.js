const mongoose = require("mongoose")

const Status = mongoose.Schema({
    green: String,
    red: String,
    blue: String
})

module.exports = mongoose.model("Status", Status)