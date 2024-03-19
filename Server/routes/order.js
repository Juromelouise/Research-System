const express = require("express");
const router = express.Router();

const { newOrder, myOrders, getSingleOrder } = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.post("/neworder", isAuthenticatedUser, newOrder);
router.get('/orders/me', isAuthenticatedUser, myOrders);
router.get('/order/:id', isAuthenticatedUser, getSingleOrder);

module.exports = router;
