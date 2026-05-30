import { Blog } from "../models/Blog.js";
import { purgeCache } from "../services/cloudflare.js";

export const getBlogs = async (req, res) => {
  try {
    const query = req.query.admin === "true" ? {} : { isPublished: true };
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.json({ ok: true, blogs });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Database error. Is MongoDB running?" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    await purgeCache();
    res.status(201).json({ ok: true, blog });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ ok: false, error: "Blog post not found" });
    await purgeCache();
    res.json({ ok: true, blog });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ ok: false, error: "A blog with this title/slug already exists." });
    }
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    await purgeCache();
    res.json({ ok: true, message: "Blog deleted" });
  } catch (error) {
    res.status(400).json({ ok: false, error: "Failed to delete blog" });
  }
};

export const incrementBlogView = async (req, res) => {
  try {
    const { slug } = req.params;
    await Blog.findOneAndUpdate({ slug }, { $inc: { views: 1 } });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Failed to track view" });
  }
};
