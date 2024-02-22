const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {registerUser, loginUser, logout, getUserProfile, getAllUsers, updateRoleSeller, updateRoleFarmer, allFarmers, allSellers} = require('../controllers/userController');
const { isAuthenticatedUser } = require("../middlewares/auth");


router.post("/register",upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.get("/logout", logout)
router.get("/profile",isAuthenticatedUser, getUserProfile)
router.get("/all/users", getAllUsers)
router.get("/get/farmer", allFarmers)
router.get("/get/seller", allSellers)
router.put("/update/role/seller/:id", updateRoleSeller)
router.put("/update/role/farmer/:id", updateRoleFarmer)

module.exports = router;