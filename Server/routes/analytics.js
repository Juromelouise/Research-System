const express = require("express");
const router = express.Router();

const { getHighDemandProducts,calculateTotalSalesPerUser,calculateAverageOrderValuePerUser } = require("../controllers/analyticsController");

router.get("/high/demand/product", getHighDemandProducts);
router.get("/total/sale/user", calculateTotalSalesPerUser);
router.get("/average/order/user", calculateAverageOrderValuePerUser);

module.exports = router;
