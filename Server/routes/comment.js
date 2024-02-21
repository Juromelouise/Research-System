const express = require("express");
const router = express.Router();

const { createComment } = require("../controllers/commentController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/new/comment/:id",isAuthenticatedUser, createComment);

module.exports = router;
