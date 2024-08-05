const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  console.log(req.cookies)
  const token = req?.cookies?.token;

  if (!token) {
    console.log('No token found in cookies');
    return res.json({ status: false, message: 'No token found in cookies' });
  }
  
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.json({ status: false, message: 'Token verification failed' });
    } else {
      console.log('Token verified, data:', data);
      const user = await User.findById(data?.id);
      if (user) {
        req.user = user;
        return next();
      } else {
        console.log('User not found with ID:', data.id);
        return res.json({ status: false, message: 'User not found' });
      }
    }
  });
};