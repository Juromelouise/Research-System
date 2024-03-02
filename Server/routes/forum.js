const express = require("express");
const router = express.Router();

const {
  newPost,
  AllPost,
  getSinglepost,
  deletePost,
} = require("../controllers/forumController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/new/post", isAuthenticatedUser, newPost);
router.get("/all/post", AllPost);
router.get("/single/post/:id", getSinglepost);
router.delete("/delete/post/:id", isAuthenticatedUser, deletePost);

module.exports = router;
