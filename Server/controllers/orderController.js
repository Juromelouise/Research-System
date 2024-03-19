const Order = require("../models/order");
const Product = require("../models/product");

exports.newOrder = async (req, res, next) => {
  let seller = [];
  seller = req.body;
  req.body.user = req.user._id;
  console.log(req.body);
  const orders = await Order.create(req.body);
  res.status(200).json({
    success: true,
    orders,
  });
};

exports.myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
};

exports.getSingleOrder = async (req, res, next) => {
  const orders = await Order.findById(req.params.id);

  if (!orders) {
    return res.status(404).json({ message: `No Order found with this ID` });
  }
  res.status(200).json({
    success: true,
    orders,
  });
};

exports.allOrders = async (req, res, next) => {

  
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    orders,
  });
};
