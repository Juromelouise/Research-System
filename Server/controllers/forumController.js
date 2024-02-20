const Forum = require("../models/forums");
const Comment = require("../models/comment");
const User = require("../models/user")

exports.newPost = async (req, res) => {
  const { post, title } = req.body;
  await Forum.create({ post, title, user: req.user._id });
  res.status(200).json({
    success: true,
  });
};

exports.AllPost = async (req, res) => {
  const forum = await Forum.find().populate({
    path: "user",
    model: User,
  });
  res.status(200).json({
    forum,
  });
};
