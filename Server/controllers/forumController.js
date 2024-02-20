const Forum = require('../models/forums')
const Comment = require('../models/comment')

exports.newPost = async (req, res) => {
    const { post } = req.body;
    const forum = await Forum.create({post, user: req.user._id})
    res.status(200).json({
        forum
    })
}

