const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const { newProduct, updateProduct, getProduct, product, deleteProduct } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/new/product", isAuthenticatedUser,upload.array('images', 10), newProduct);
router.put("/update/product/:id",isAuthenticatedUser, updateProduct)
router.delete("/delete/product/:id",isAuthenticatedUser, deleteProduct)
router.get("/products",isAuthenticatedUser, getProduct)
router.get("/product/:id", product)

module.exports = router;
