const mongoose = require("mongoose")

const Records = mongoose.Schema({
    quantity: Number,
    text: String,
    companyId: { type: mongoose.Schema.ObjectId, ref: "Companies" }
})

module.exports = mongoose.model("Records", Records)