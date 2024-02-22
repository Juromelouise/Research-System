const mongoose = require("mongoose");
const Populate = require("mongoose-autopopulate");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      autopopulate: true,
    },
  ],
});
commentSchema.plugin(Populate);

module.exports = mongoose.model("Comment", commentSchema);
