const Forum = require("../models/forums");

exports.newPost = async (req, res) => {
  const { post, title } = req.body;
  await Forum.create({ post, title, user: req.user._id });
  const forum = await Forum.find();
  res.status(200).json({
    forum,
  });
};

exports.AllPost = async (req, res) => {
  const forum = await Forum.find();
  res.status(200).json({
    forum,
  });
};

exports.getSinglepost = async (req, res) => {
  let id = req.params.id;
  const forum = await Forum.findById({ _id: id });
  res.status(200).json({
    forum,
  });
};

exports.deletePost = async (req, res) => {
  try {
    await Forum.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
