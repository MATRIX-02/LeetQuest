// controllers/AuthController.js
const User = require("../models/UserModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id, "30d");
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect email or password" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect email or password" });
    }
    const token = createSecretToken(user._id, rememberMe ? "30d" : "1d");
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 30 days or 1 day
    });

    res.status(201).json({ message: "User logged in successfully", success: true });
    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports.Logout = (req, res, next) => {
  try {
    res.cookie("token", "", { maxAge: 1 });
    res.json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.error(error);
  }
};

module.exports.verifyUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.json({ status: false, message: "User not authenticated" });
    }
    res.json({ status: true, user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: "Server error" });
  }
};

module.exports.getUserInfo = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.json({ status: false, message: "User not authenticated" });
    }
    res.json({ status: true, user: { username: user.username, email: user.email, id: user.id, role: user.role } });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: "Server error" });
  }
};
