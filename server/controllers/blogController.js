import { Blog } from "../models/Blog.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ ok: true, blogs });
  } catch (error) {
    console.error("Get blogs error:", error);
    res.status(500).json({ ok: false, error: "Database error. Is MongoDB running?" });
  }
};

export const createBlog = async (req, res) => {
  try {
    console.log("Creating blog with payload:", req.body);
    const blog = await Blog.create(req.body);
    res.status(201).json({ ok: true, blog });
  } catch (error) {
    console.error("Blog creation error:", error);
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ ok: false, error: "Blog post not found" });
    res.json({ ok: true, blog });
  } catch (error) {
    console.error("Blog update error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ ok: false, error: "A blog with this title/slug already exists." });
    }
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ ok: true, message: "Blog deleted" });
  } catch (error) {
    res.status(400).json({ ok: false, error: "Failed to delete blog" });
  }
};
