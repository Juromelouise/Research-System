const Order = require("../models/order");
const Product = require("../models/product");

exports.getHighDemandProducts = async (req, res) => {
  try {
    const pipeline = [
      {
        $unwind: "$orderItems",
      },
      {
        $group: {
          _id: "$orderItems.product",
          totalOrders: { $sum: "$orderItems.quantity" }, // Summing up the quantities of orders
        },
      },
      {
        $lookup: {
          from: "products", // Assuming your products collection name is "products"
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $sort: { totalOrders: -1 },
      },
      {
        $limit: 10, // Adjust the limit as needed
      },
    ];

    const highDemandProducts = await Order.aggregate(pipeline);

    res.status(200).json({ success: true, highDemandProducts });
  } catch (error) {
    console.error("Error retrieving high demand products:", error);
    res
      .status(500)
      .json({ success: false, error: "Error retrieving high demand products" });
  }
};

exports.calculateTotalSalesPerUser = async (req, res) => {
  try {
    const pipeline = [
      {
        $unwind: "$orderItems",
      },
      {
        $group: {
          _id: "$user",
          totalSales: { $sum: "$orderItems.price" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          user: "$user.name",
          totalSales: 1,
        },
      },
    ];

    const totalSalesPerUser = await Order.aggregate(pipeline);
    console.log(totalSalesPerUser);
    res.status(200).json({ totalSalesPerUser: totalSalesPerUser });
  } catch (error) {
    console.error("Error calculating total sales per user:", error);
    throw error;
  }
};

exports.calculateAverageOrderValuePerUser = async (req, res) => {
  try {
    const pipeline = [
      {
        $unwind: "$orderItems",
      },
      {
        $group: {
          _id: "$user",
          totalSales: { $sum: "$orderItems.price" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $addFields: {
          averageOrderValue: { $divide: ["$totalSales", "$totalOrders"] },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          user: "$user.name",
          averageOrderValue: 1,
        },
      },
    ];

    const averageOrderValuePerUser = await Order.aggregate(pipeline);
    console.log(averageOrderValuePerUser);
    res
      .status(200)
      .json({ averageOrderValuePerUser: averageOrderValuePerUser });
  } catch (error) {
    console.error("Error calculating average order value per user:", error);
    throw error;
  }
};
