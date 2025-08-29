const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const preferencesController = require("../controllers/preferencesController");


// GET /preferences - get logged-in user's preferences
// router.get("/", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("preferences");
//     res.json(user.preferences);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// GET preferences


router.get("/", auth, preferencesController.getPreferences);
router.put("/", auth, preferencesController.updatePreferences);



// PUT /preferences - update preferences
// router.put("/", auth, async (req, res) => {
//   try {
//     const { categories, languages } = req.body;
//     const user = await User.findById(req.user._id);

//     // Validate inputs
//     if (categories) {
//       if (!Array.isArray(categories) || categories.some(c => typeof c !== "string")) {
//         return res.status(400).json({ msg: "Categories must be an array of strings" });
//       }
//       user.preferences.categories = categories;
//     }

//     if (languages) {
//       if (!Array.isArray(languages) || languages.some(l => typeof l !== "string")) {
//         return res.status(400).json({ msg: "Languages must be an array of strings" });
//       }
//       user.preferences.languages = languages;
//     }

//     await user.save();
//     res.json({ msg: "Preferences updated", preferences: user.preferences });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });


module.exports = router;
