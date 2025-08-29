const axios = require("axios");
const User = require("../models/User");

exports.getNews = async (req, res) => {
  try {
    // Get logged-in user
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    const { categories, languages } = user.preferences;

    // Prepare API query
    const apiKey = process.env.NEWS_API_KEY; // Add your NewsAPI key in .env
    const categoryQuery = categories.length ? categories.join(",") : "general";
    const languageQuery = languages.length ? languages.join(",") : "en";

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines`,
      {
        params: {
          category: categoryQuery,
          language: languageQuery,
          apiKey: apiKey,
          pageSize: 10
        }
      }
    );

    const articles = response.data.articles;
    res.json({ articles });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Failed to fetch news", error: err.message });
  }
};
