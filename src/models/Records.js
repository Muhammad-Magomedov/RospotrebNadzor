const mongoose = require("mongoose")

const Records = mongoose.Schema({
    quantity: Number,
    text: String
})

module.exports = mongoose.model("Records", Records)