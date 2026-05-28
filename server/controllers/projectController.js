import { Project } from "../models/Project.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ ok: true, projects });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Failed to fetch projects" });
  }
};

export const createProject = async (req, res) => {
  try {
    console.log("Creating project with payload:", req.body);
    const project = await Project.create(req.body);
    res.status(201).json({ ok: true, project });
  } catch (error) {
    console.error("Project creation error:", error);
    res.status(400).json({ ok: false, error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ ok: true, message: "Project deleted" });
  } catch (error) {
    res.status(400).json({ ok: false, error: "Failed to delete project" });
  }
};
