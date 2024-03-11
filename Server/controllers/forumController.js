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

exports.UserDeletePost = async (req, res) => {
  try {
    const deletedPost = await Forum.delete({ _id: req.params.id });
    if (deletedPost.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post successfully soft deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message || "Internal Server Error",
    });
  }
};

exports.AdminDeletePost = async (req, res) => {
  try {
    await Forum.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Post successfully deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message || "Internal Server Error",
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    await Forum.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindandModify: false,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
