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
  const items = await Order.find({ "orderItems.seller": req.user._id });
  let orders = [];
  items.forEach((order) => {
    order.orderItems.forEach((item) => {
      if (item.seller && item.seller.equals(req.user._id)) {
        const newItem = { ...item.toObject(), user: order.user };
        orders.push(newItem);
      }
    });
  });

  console.log(orders);

  res.status(200).json({
    success: true,
    orders,
  });
};

exports.updateStatus = async (req, res) => {
  try {
    const orderItemId = req.params.orderItemId;
    // const { orderStatus } = req.body;

    const orders = await Order.findOneAndUpdate(
      { "orderItems._id": orderItemId },
      { $set: { "orderItems.$.orderStatus": "Confirmed" } },
      { new: true }
    );

    if (!orders) {
      return res
        .status(404)
        .json({ success: false, error: "Order or order item not found" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.CancelOrder = async (req, res) => {
  try {
    const orderItemId = req.params.orderItemId;
    // const { orderStatus } = req.body;

    const orders = await Order.findOneAndUpdate(
      { "orderItems._id": orderItemId },
      { $set: { "orderItems.$.orderStatus": "Canceled" } },
      { new: true }
    );

    if (!orders) {
      return res
        .status(404)
        .json({ success: false, error: "Order or order item not found" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.ShippedOrder = async (req, res) => {
  try {
    const orderItemId = req.params.orderItemId;
    // const { orderStatus } = req.body;

    const orders = await Order.findOneAndUpdate(
      { "orderItems._id": orderItemId },
      { $set: { "orderItems.$.orderStatus": "Shipped/Ready To Pick up" } },
      { new: true }
    );

    if (!orders) {
      return res
        .status(404)
        .json({ success: false, error: "Order or order item not found" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.getSupplier = async (req, res) => {
  console.log(req.params.id)
  try {
    const supplier = await Order.find({
      user: req.params.id,
      "orderItems.orderStatus": "Confirmed",
    });
    res.status(200).json({ supplier });
  } catch (error) {
    console.log(error);
  }
};
