const { Signup, Login, Logout, verifyUser, getUserInfo } = require("../controllers/AuthController");
const { userVerification } = require("../middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/userinfo", userVerification, getUserInfo);
router.get("/verify", verifyUser);

module.exports = router;
