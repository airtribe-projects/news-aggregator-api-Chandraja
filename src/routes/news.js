// src/routes/news.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const axios = require("axios");

// GET /news - fetch news based on user preferences
router.get("/", auth, async (req, res) => {
  try {
    // Handle old test: preferences array
    const userPreferences = req.user.preferences || ["general"];
    let allArticles = [];

    for (const category of userPreferences) {
      const response = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          category: category,
          apiKey: process.env.NEWS_API_KEY,
          language: "en", // fallback
        },
      });
      allArticles = allArticles.concat(response.data.articles);
    }

    // Return in the format expected by the test
    res.status(200).json({ news: allArticles });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Failed to fetch news", error: err.message });
  }
});



module.exports = router;
