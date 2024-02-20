const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Forum", forumSchema);
