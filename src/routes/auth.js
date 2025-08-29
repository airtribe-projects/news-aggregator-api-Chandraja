// src/routes/auth.js
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const authController = require("../controllers/authController");

// POST /api/auth/register
// router.post("/register", register);

// POST /api/auth/login
// router.post("/login", login);


router.post('/signup', authController.register);
router.post('/login', authController.login);

module.exports = router;
