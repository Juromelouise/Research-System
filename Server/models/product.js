const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Enter the type of Onion"],
  },
  // image: {
  //   public_id : {
  //     type: String,
  //     required: true
  //   },
  //   url: {
  //     type: String,
  //     required: true
  //   }
  // },
  price: {
    type: Number,
    required: true,
    trim: true,
    default: 0.0
  }
});

module.exports = mongoose.model("Product", productSchema)
