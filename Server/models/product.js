const mongoose = require("mongoose");
const Populate = require("mongoose-autopopulate");

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    autopopulate: true,
  },
  name: {
    type: String,
    required: [true, "Enter the type of Onion"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
    trim: true,
    default: 0.0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
productSchema.plugin(Populate);

module.exports = mongoose.model("Product", productSchema);
