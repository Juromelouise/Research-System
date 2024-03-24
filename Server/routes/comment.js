const express = require("express");
const router = express.Router();

const {
  createComment,
  replyComment,
  deleteComment,
  allComment,
  updateComment,
} = require("../controllers/commentController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/new/comment/:id", isAuthenticatedUser, createComment);
router.post("/comment/:id", isAuthenticatedUser, replyComment);
router.delete("/delete/comment/:id", isAuthenticatedUser, deleteComment);
router.put("/content/update/:id", isAuthenticatedUser, updateComment);
// router.get("/all/comment/:id", allComment);

module.exports = router;
