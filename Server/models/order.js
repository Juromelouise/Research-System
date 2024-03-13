const mongoose = require("mongoose");
const Populate = require("mongoose-autopopulate");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    autopopulate: true,
  },
  city: {
    type: String,
  },
  baranggay: { type: String },
  street: { type: String },
  mod: { type: String },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
      autopopulate: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
OrderSchema.plugin(Populate);

module.exports = mongoose.model("Order", OrderSchema);
