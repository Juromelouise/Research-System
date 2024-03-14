const Order = require("../models/order");
const Product = require("../models/product");

exports.newOrder = async (req, res, next) => {
  req.body.user = req.user_id;
  const orders = await Order.create(req.body);
  res.status(200).json({
    success: true,
    orders,
  });
};
