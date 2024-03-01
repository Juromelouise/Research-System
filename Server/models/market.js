const mongoose = require("mongoose");
const Populate = require("mongoose-autopopulate");

const marketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    autopopulate: true,
  },
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

marketSchema.plugin(Populate);
module.exports = mongoose.model("Market", marketSchema);
