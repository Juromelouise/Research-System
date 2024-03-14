const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  newProduct,
  updateProduct,
  getProduct,
  product,
  deleteProduct,
  UserProduct,
  SingleUserProduct,
  adminNewProduct,
  newProductUser,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post(
  "/new/user/product",
  isAuthenticatedUser,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "attachment", maxCount: 5 },
  ]),
  newProductUser
);

router.post(
  "/new/product",
  isAuthenticatedUser,
  upload.array("images", 5),
  newProductUser
);
router.put(
  "/update/product/:id",
  isAuthenticatedUser,
  upload.array("images", 10),
  updateProduct
);
router.delete("/delete/product/:id", isAuthenticatedUser, deleteProduct);
router.get("/products", getProduct);
router.get("/product/:id", product);
router.get("/single/product", isAuthenticatedUser, UserProduct);
router.get("/single/user/product/:id", SingleUserProduct);
router.post(
  "/admin/create/product",
  isAuthenticatedUser,
  upload.array("images", 10),
  adminNewProduct
);

module.exports = router;
