const mongoose = require("mongoose")

const Records = mongoose.Schema({
    quantity: Number
})

module.exports = mongoose.model("Records", Records)