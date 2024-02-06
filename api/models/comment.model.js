import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
