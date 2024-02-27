const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {registerUser, loginUser, logout, getUserProfile, getAllUsers, updateRoleSeller, updateRoleFarmer, allFarmers, allSellers, deleteUser, updateProfile} = require('../controllers/userController');
const { isAuthenticatedUser } = require("../middlewares/auth");


router.post("/register",upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.get("/logout", logout)
router.get("/profile",isAuthenticatedUser, getUserProfile)
router.get("/all/users",isAuthenticatedUser, getAllUsers)
router.get("/get/farmer", allFarmers)
router.get("/get/seller", allSellers)
router.put("/update/role/seller/:id", updateRoleSeller)
router.put("/update/role/farmer/:id", updateRoleFarmer)
router.delete("/delete/user/:id", isAuthenticatedUser, deleteUser)
router.put("/user/update",isAuthenticatedUser, updateProfile)

module.exports = router;