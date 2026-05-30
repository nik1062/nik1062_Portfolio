import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: "Technical" },
    readTime: { type: String, default: "5 min" },
    copy: { type: String, required: true }, // Short description
    content: { type: String, required: true }, // Full Markdown content
    author: { type: String, default: "Nikunj Kumar" },
    isPublished: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    metaTitle: { type: String },
    metaDescription: { type: String }
  },
  { timestamps: true }
);

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
