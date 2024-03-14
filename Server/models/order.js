const mongoose = require("mongoose");
const Populate = require("mongoose-autopopulate");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    autopopulate: true,
  },
  shippingInfo: {
    city: {
      type: String,
    },
    baranggay: {
      type: String,
    },
    street: {
      type: String,
    },
    postal: {
      type: String,
    },
  },
  mod: { type: String },
  deliveredAt: {
    type: Date,
  },
  seller: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      autopopulate: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
OrderSchema.plugin(Populate);

module.exports = mongoose.model("Order", OrderSchema);
