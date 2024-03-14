const express = require("express");
const router = express.Router();

const { newOrder } = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.post("/neworder", isAuthenticatedUser, newOrder);

module.exports = router;
