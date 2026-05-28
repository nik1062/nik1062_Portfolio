import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    year: { type: String, default: () => new Date().getFullYear().toString() },
    status: { type: String, default: "Case Study" },
    category: { type: String, required: true },
    repo: { type: String },
    live: { type: String },
    summary: { type: String, required: true },
    problem: { type: String },
    outcome: { type: String },
    tags: [{ type: String }],
    highlights: [{ type: String }],
    visual: { type: String, default: "data" },
    private: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
