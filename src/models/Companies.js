const mongoose = require("mongoose")

const Companies = mongoose.Schema({
    name: String,
    image: String,
    updatedAt: Date,
    status: { type: mongoose.Schema.ObjectId, ref: "Status"},
    recordsQuantity: { type: mongoose.Schema.ObjectId, ref: "Records"}
})

module.exports = mongoose.model("Companies", Companies)