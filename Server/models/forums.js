const mongoose = require("mongoose");
const Populate = require("mongoose-autopopulate");

const forumSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    autopopulate: true,
  },
  title: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      autopopulate: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
forumSchema.plugin(Populate);

module.exports = mongoose.model("Forum", forumSchema);
