import express from "express";
import { getAnswer } from "../controllers/assistantController.js";
import { submitContact, getMessages } from "../controllers/contactController.js";
import { loginAdmin, verifyToken } from "../controllers/authController.js";
import { getProjects, createProject, deleteProject } from "../controllers/projectController.js";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "../controllers/blogController.js";

const router = express.Router();

router.get("/health", (req, res) => {
  const databaseConnected = req.app.get("databaseConnected");
  res.json({ ok: true, database: databaseConnected ? "connected" : "offline" });
});

// Public Routes
router.post("/contact", submitContact);
router.post("/assistant", getAnswer);

// Projects (Public read, Protected write)
router.get("/projects", getProjects);
router.post("/projects", verifyToken, createProject);
router.delete("/projects/:id", verifyToken, deleteProject);

// Blogs (Public read, Protected write)
router.get("/blogs", getBlogs);
router.post("/blogs", verifyToken, createBlog);
router.put("/blogs/:id", verifyToken, updateBlog);
router.delete("/blogs/:id", verifyToken, deleteBlog);

// Admin Auth
router.post("/auth/login", loginAdmin);

// Protected Admin Routes
router.get("/messages", verifyToken, getMessages);

export default router;
