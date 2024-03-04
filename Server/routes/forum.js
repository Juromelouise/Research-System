const express = require("express");
const router = express.Router();

const {
  newPost,
  AllPost,
  getSinglepost,
  deletePost,
  updatePost,
} = require("../controllers/forumController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/new/post", isAuthenticatedUser, newPost);
router.get("/all/post", AllPost);
router.get("/single/post/:id", getSinglepost);
router.delete("/delete/post/:id", isAuthenticatedUser, deletePost);
router.put("/update/post/:id", isAuthenticatedUser, updatePost);

module.exports = router;
