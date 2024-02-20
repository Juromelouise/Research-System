const express = require("express");
const router = express.Router();

const { newPost } = require('../controllers/forumController')
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post('/new/post',isAuthenticatedUser, newPost)

module.exports = router;