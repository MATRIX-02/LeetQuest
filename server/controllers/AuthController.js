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
      return res.status(400).json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password", success: false });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: "Incorrect email or password", success: false });
    }
    const token = createSecretToken(user._id, rememberMe ? "30d" : "1d");
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 30 days or 1 day
    });

    res.status(200).json({ 
      message: "User logged in successfully", 
      success: true,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  }  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", success: false });
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

// In the Login function
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password", success: false });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: "Incorrect email or password", success: false });
    }
    const token = createSecretToken(user._id, rememberMe ? "30d" : "1d");
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      secure: false, // Use secure cookies in production
      sameSite: 'lax', // Prevent CSRF attacks
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 30 days or 1 day
      domain: ".leetquest.onrender.com"
    });

    res.status(200).json({ 
      message: "User logged in successfully", 
      success: true,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Modify verifyUser function
module.exports.verifyUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: false, message: "No token provided" });
    }
    
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }
    
    res.json({ status: true, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ status: false, message: "Invalid token" });
    }
    res.status(500).json({ status: false, message: "Server error" });
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
