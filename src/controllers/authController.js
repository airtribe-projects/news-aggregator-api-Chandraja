const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validator = require('validator'); // npm i validator

// exports.register = async (req, res) => {
  
//   try {
//     const { username, email, password } = req.body;

//     // Input validation
//     if (!username || !email || !password) {
//       return res.status(400).json({ msg: "All fields are required" });
//     }

//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ msg: "Invalid email format" });
//     }

//     if (password.length < 8) {
//       return res.status(400).json({ msg: "Password must be at least 8 characters" });
//     }

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ msg: "User already exists" });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ msg: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Input validation
//     if (!email || !password) {
//       return res.status(400).json({ msg: "Email and password are required" });
//     }

//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ msg: "Invalid email format" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.status(200).json({ message: "Login successful", token });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) return res.status(400).json({ msg: "Missing fields" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, preferences: [] });

    res.status(200).json({ id: user._id, email: user.email });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};