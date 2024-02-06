import Blog from "../models/blog.model.js";

// Controller functions for CRUD operations

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlog = await Blog.create({ title, content });
    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all blog posts
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("comments");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific blog post by ID
const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId).populate("comments");
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a blog post by ID
const updateBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, content },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a blog post by ID
const deleteBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(deletedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
