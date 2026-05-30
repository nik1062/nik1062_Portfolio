import { Project } from "../models/Project.js";
import { purgeCache } from "../services/cloudflare.js";

export const getProjects = async (req, res) => {
  try {
    const query = req.query.admin === "true" ? {} : { isPublished: true };
    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.json({ ok: true, projects });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Failed to fetch projects" });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    await purgeCache();
    res.status(201).json({ ok: true, project });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    await purgeCache();
    res.json({ ok: true, message: "Project deleted" });
  } catch (error) {
    res.status(400).json({ ok: false, error: "Failed to delete project" });
  }
};

export const incrementProjectView = async (req, res) => {
  try {
    const { slug } = req.params;
    await Project.findOneAndUpdate({ slug }, { $inc: { views: 1 } });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Failed to track view" });
  }
};
