const express = require("express");
const router = express.Router();

const { newProduct, updateProduct } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/new/product", isAuthenticatedUser, newProduct);
router.put("/update/product/:id", updateProduct)

module.exports = router;
