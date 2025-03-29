const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }, // Ensure one review per user
    ui: Number,
    anonymity: Number,
    scalability: Number,
    security: Number,
    result: Number,
    comments: String,
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
