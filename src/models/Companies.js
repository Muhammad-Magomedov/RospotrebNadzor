const mongoose = require("mongoose")

const Companies = mongoose.Schema({
    name: String,
    image: String
})

module.exports = mongoose.model("Companies", Companies)