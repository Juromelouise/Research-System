const express = require("express");
const router = express.Router();

const { newPost, AllPost } = require("../controllers/forumController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/new/post", isAuthenticatedUser, newPost);
router.get("/all/post", AllPost);

module.exports = router;
