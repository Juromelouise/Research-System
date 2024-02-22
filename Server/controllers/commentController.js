const Comment = require("../models/comment");
const Forum = require("../models/forums");

exports.createComment = async (req, res) => {
  const id = req.params.id;
  req.body.user = req.user._id;
  const com = await Comment.create(req.body);
  await Forum.findByIdAndUpdate(
    id,
    { $push: { comments: com._id } },
    { new: true }
  );

  res.status(200).json({
    success: true,
  });
};

exports.replyComment = async (req, res) => {
  const id = req.params.id;
  req.body.user = req.user._id;
  const com = await Comment.create(req.body);
  const comment = await Comment.findByIdAndUpdate(
    id,
    { $push: { comments: com._id } },
    { new: true }
  );
  res.status(200).json({
    success: true,
    comment,
  });
};

// exports.allComment = async (req, res) => {
//   const id = req.params.id
//   const comments = await Comment.findById(id);
//   res.status(200).json({ comments });
// };
