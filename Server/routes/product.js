const express = require("express");
const router = express.Router();

const { newProduct } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/new/product", isAuthenticatedUser, newProduct);

module.exports = router;
