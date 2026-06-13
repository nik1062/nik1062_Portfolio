import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import apiRouter from "./routes/api.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { Project } from "./models/Project.js";
import { Blog } from "./models/Blog.js";

const app = express();
const port = process.env.PORT || 5050;

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
app.use("/api", apiLimiter);

// Database Connection Logic
async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI missing. Contact messages will be logged only.");
    return false;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.log("MongoDB connection failed.");
    console.log(error.message);
    return false;
  }
}

connectDatabase().then(connected => {
  app.set("databaseConnected", connected);
});

// Sitemap
app.get("/sitemap.xml", async (req, res) => {
  const baseUrl = "https://nikunjkumar.com"; 
  const staticPages = ["", "/about", "/projects", "/skills", "/resume", "/credentials", "/contact", "/now", "/blog"];
  
  try {
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

// Routes
app.use("/api", (req, res, next) => {
  if (!req.app.get("databaseConnected")) {
    return res.status(500).json({
      ok: false,
      error: "Database connection failed. Please ensure MongoDB is running and MONGODB_URI is correct in your local .env file."
    });
  }
  next();
}, apiRouter);

app.listen(port, () => {
  console.log(`Portfolio API running on http://127.0.0.1:${port}`);
});
