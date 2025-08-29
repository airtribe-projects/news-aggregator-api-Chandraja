const User = require("../models/User");

exports.getPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json({ preferences: user.preferences });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { preferences } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { preferences },
      { new: true }
    );
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json({ preferences: user.preferences });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
