const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {registerUser, loginUser, logout, getUserProfile, getAllUsers, updateRoleSeller, updateRoleFarmer, allFarmers, allSellers, deleteUser, updateProfile, registerSupplerSeller} = require('../controllers/userController');
const { isAuthenticatedUser } = require("../middlewares/auth");


router.post("/register",upload.single("avatar"), registerUser);
router.post("/register/supplier/seller",upload.fields([
    {name: "avatar", maxCount: 1},
    {name: "attachment", maxCount: 10}
]), registerSupplerSeller);
router.post("/login", loginUser);
router.get("/logout", logout)
router.get("/profile",isAuthenticatedUser, getUserProfile)
router.get("/all/users",isAuthenticatedUser, getAllUsers)
router.get("/get/farmer", allFarmers)
router.get("/get/seller", allSellers)
router.put("/update/role/seller/:id", updateRoleSeller)
router.put("/update/role/farmer/:id", updateRoleFarmer)
router.delete("/delete/user/:id", isAuthenticatedUser, deleteUser)
router.put("/user/update",isAuthenticatedUser, upload.single("avatar"), updateProfile)

module.exports = router;