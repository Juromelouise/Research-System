const express = require("express");
const router = express.Router();

const {
  newPost,
  AllPost,
  getSinglepost,
  updatePost,
  UserDeletePost,
  AdminGetPost,
  AdminDeletePost,
  AdminSinglePost
} = require("../controllers/forumController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/new/post", isAuthenticatedUser, newPost);
router.get("/all/post", AllPost);
router.get("/single/post/:id", getSinglepost);
router.delete("/delete/post/:id", UserDeletePost);
router.delete("/admin/delete/post/:id", AdminDeletePost);
router.put("/update/post/:id", isAuthenticatedUser, updatePost);
router.get(
  "/admin/all/post",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  AdminGetPost
);

router.get(
  "/admin/single/post/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  AdminSinglePost
);
module.exports = router;
