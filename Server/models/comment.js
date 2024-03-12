const mongoose = require("mongoose");
const Populate = require("mongoose-autopopulate");
const mongooseDelete = require("mongoose-delete");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    autopopulate: true,
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
commentSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("Comment", commentSchema);
