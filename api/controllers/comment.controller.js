import Comment from "../models/comment.model.js";

// Controller functions for CRUD operations

// Add a new comment to a blog post
const addCommentToBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { text } = req.body;
    const newComment = await Comment.create({ text });

    // Assuming comments are stored as references in the Blog model
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a comment from a blog post
const deleteCommentFromBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const commentId = req.params.commentId;

    // Remove the comment reference from the Blog model
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { comments: commentId } },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Delete the comment
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json(deletedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addCommentToBlog,
  deleteCommentFromBlog,
};
