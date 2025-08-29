const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    categories: { type: [String], default: [] },
    languages: { type: [String], default: [] }
  }
}, { timestamps: true });

// ✅ Check if model already exists before creating
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
