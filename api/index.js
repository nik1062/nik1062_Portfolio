import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import apiRouter from "../server/routes/api.js";
import { apiLimiter } from "../server/middleware/rateLimiter.js";
import { Project } from "../server/models/Project.js";
import { Blog } from "../server/models/Blog.js";

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
app.use("/api", apiLimiter);

// Database Connection
let isConnected = false;
async function connectDatabase() {
  if (isConnected) return;
  if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI missing. Backend running in offline-fallback mode.");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

app.use("/api", async (req, res, next) => {
  await connectDatabase();
  app.set("databaseConnected", isConnected);
  next();
}, apiRouter);

// Sitemap
app.get("/sitemap.xml", async (req, res) => {
  const baseUrl = "https://nikunjkumar.com"; 
  const staticPages = ["", "/about", "/projects", "/skills", "/resume", "/credentials", "/contact", "/now", "/blog"];
  
  try {
    await connectDatabase();
    const [projects, blogs] = await Promise.all([
      Project.find({ isPublished: true }).select("slug"),
      Blog.find({ isPublished: true }).select("slug")
    ]);

    const projectUrls = projects.map(p => `/projects/${p.slug}`);
    const blogUrls = blogs.map(b => `/blog`);

    const allUrls = [...staticPages, ...projectUrls, ...blogUrls];
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(url => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === "" ? "1.0" : "0.8"}</priority>
  </url>`).join("")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    res.status(500).send("Error generating sitemap");
  }
});

export default app;
