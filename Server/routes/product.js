const express = require("express");
const router = express.Router();

const { newProduct, updateProduct, getProduct, product, deleteProduct } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/new/product", isAuthenticatedUser, newProduct);
router.put("/update/product/:id",isAuthenticatedUser, updateProduct)
router.delete("/delete/product/:id",isAuthenticatedUser, deleteProduct)
router.get("/products",isAuthenticatedUser, getProduct)
router.get("/product/:id", product)

module.exports = router;
