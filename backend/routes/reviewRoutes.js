const express = require("express");
const Review = require("../models/Review");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

// Submit a review (one-time per user)
router.post("/", protect, async (req, res) => {
    try {
        const existingReview = await Review.findOne({ user: req.user.id });

        if (existingReview) {
            return res.status(400).json({ error: "You have already submitted a review." });
        }

        const { ui, anonymity, scalability, comments } = req.body;
        const review = new Review({
            user: req.user.id,
            ui,
            anonymity,
            scalability,
            comments,
        });

        await review.save();
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch all reviews
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find().populate("user", "name email");
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
