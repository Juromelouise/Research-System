const express = require("express");
const router = express.Router();

const { newProduct, updateProduct, getProduct, product } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/new/product", isAuthenticatedUser, newProduct);
router.put("/update/product/:id", updateProduct)
router.get("/products", getProduct)
router.get("/product/:id", product)

module.exports = router;
