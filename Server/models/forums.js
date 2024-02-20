const mongoose = require('mongoose')

const forumSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    post: {
        type: String,
        required: true
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }
})

module.exports = mongoose.model('Forum', forumSchema)