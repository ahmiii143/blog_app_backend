import express from "express";
const router = express.Router();

import commentController from "../controllers/comment.controller.js";

// Routes for CRUD operations on comments

// Add a new comment to a blog post
router.post("/:blogId/comments", commentController.addCommentToBlog);

// Delete a comment from a blog post
router.delete(
  "/:blogId/comments/:commentId",
  commentController.deleteCommentFromBlog
);

module.exports = router;
