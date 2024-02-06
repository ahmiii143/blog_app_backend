import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import blogRoutes from "./routes/blog.routes.js";
import commentRoutes from "./routes/comment.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blog";

// Connect to MongoDB
try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("DB Connected");
} catch (error) {
  console.log("DB is not connected", error.message);
}

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
