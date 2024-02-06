import express from "express";
const router = express.Router();
import blogController from "../controllers/blog.controller.js";

// Routes for CRUD operations on blogs

// Create a new blog post
router.post("/", blogController.createBlog);

// Get all blog posts
router.get("/", blogController.getAllBlogs);

// Get a specific blog post by ID
router.get("/:id", blogController.getBlogById);

// Update a blog post by ID
router.put("/:id", blogController.updateBlogById);

// Delete a blog post by ID
router.delete("/:id", blogController.deleteBlogById);

module.exports = router;
