const express = require("express");
const router = express.Router();

const { newPost, AllPost, getSinglepost } = require("../controllers/forumController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/new/post", isAuthenticatedUser, newPost);
router.get("/all/post", AllPost)
router.get("/single/post/:id", getSinglepost);

module.exports = router;
