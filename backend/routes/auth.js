const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Signup
router.post("/signup", authController.signup);

// Login
router.post("/login", authController.login);

// Get user details (protected)
router.get("/user", authMiddleware, authController.getUser);

// Forgot password
router.post("/forgot-password", authController.forgotPassword);

// Reset password
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;
