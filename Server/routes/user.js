const express = require("express");
const router = express.Router();
// const upload = require("../utils/multer");

const {registerUser, loginUser, logout, getUserProfile} = require('../controllers/userController');
const { isAuthenticatedUser } = require("../middlewares/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout)
router.get("/profile",isAuthenticatedUser, getUserProfile)

module.exports = router;