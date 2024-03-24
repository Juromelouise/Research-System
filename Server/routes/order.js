const express = require("express");
const router = express.Router();

const {
  newOrder,
  myOrders,
  getSingleOrder,
  allOrders,
  updateStatus,
  CancelOrder,
  ShippedOrder,
  DeliveredOrder,
  CheckOrder,
  getSupplier,
} = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.post("/neworder", isAuthenticatedUser, newOrder);
router.get("/orders/me", isAuthenticatedUser, myOrders);
router.get("/order/:id", isAuthenticatedUser, getSingleOrder);
router.get("/my/orders", isAuthenticatedUser, allOrders);
router.get("/check/:id", isAuthenticatedUser, CheckOrder);
router.get("/supplier/:id", isAuthenticatedUser, getSupplier);
router.put("/update/order/:orderItemId", isAuthenticatedUser, updateStatus);
router.put("/cancel/order/:orderItemId", isAuthenticatedUser, CancelOrder);
router.put("/shipped/order/:orderItemId", isAuthenticatedUser, ShippedOrder);
router.put("/delivered/order/:orderItemId", isAuthenticatedUser, DeliveredOrder);

module.exports = router;
