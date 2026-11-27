import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  ExternalLink, 
  Star, 
  GitFork, 
  Clock, 
  Tag, 
  Radio, 
  CheckCircle2, 
  Code2, 
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import rawData from "../data/github-projects.generated.json";

// Language color mapping for high-tech Obsidian & Gold theme
const LANGUAGE_COLORS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Dart: "#00B4AB",
  Shell: "#89e051"
};

function formatTimeAgo(isoString) {
  if (!isoString) return "Recently";
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 30) {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
    if (diffDays > 0) {
      return `${diffDays}d ago`;
    }
    if (diffHours > 0) {
      return `${diffHours}h ago`;
    }
    return "Just now";
  } catch {
    return "Recently";
  }
}

export default function GitHubProjectsSection({ 
  curatedProjects = [], 
  limit = null,
  activeCategory = null,
  onSelectCategory = null
}) {
  const [loading, setLoading] = useState(false);
  const [localCategory, setLocalCategory] = useState("All");

  const currentCategory = activeCategory !== null && activeCategory !== undefined ? activeCategory : localCategory;
  const setCategory = onSelectCategory || setLocalCategory;

  const categories = ["All", "Full Stack", "AI/ML", "Data Analytics", "DevOps", "Mobile", "Frontend", "Automation"];

  // Runtime deduplication against curated catalog
  const discoveredProjects = useMemo(() => {
    const rawList = Array.isArray(rawData?.projects) ? rawData.projects : [];
    if (!curatedProjects.length) return rawList;

    const curatedUrls = new Set(
      curatedProjects
        .map(p => (p.repo || "").toLowerCase().replace(/[-_.]/g, "").replace(/^https?:\/\/(www\.)?github\.com\//, ""))
        .filter(Boolean)
    );

    const curatedNames = new Set(
      curatedProjects
        .map(p => {
          const parts = (p.repo || "").split("/").filter(Boolean);
          return (parts[parts.length - 1] || p.slug || "").toLowerCase().replace(/[-_.]/g, "");
        })
        .filter(Boolean)
    );

    const filtered = rawList.filter(repo => {
      const urlId = (repo.htmlUrl || "").toLowerCase().replace(/[-_.]/g, "").replace(/^https?:\/\/(www\.)?github\.com\//, "");
      const nameId = (repo.name || "").toLowerCase().replace(/[-_.]/g, "");

      if (curatedUrls.has(urlId)) return false;
      if (curatedNames.has(nameId)) return false;
      return true;
    });

    return filtered;
  }, [curatedProjects]);

  // Filter based on active category
  const displayedProjects = useMemo(() => {
    let list = discoveredProjects;
    if (currentCategory && currentCategory !== "All" && currentCategory !== "Featured") {
      list = list.filter(p => p.category === currentCategory);
    }
    return limit ? list.slice(0, limit) : list;
  }, [discoveredProjects, currentCategory, limit]);

  const lastSynced = rawData?.lastSynced ? formatTimeAgo(rawData.lastSynced) : "Automated";
  const username = rawData?.username || "nik1062";

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="section github-sync-section" id="github-sync">
      <div className="section-heading github-section-heading">
        <div>
          <div className="github-telemetry-pill">
            <span className="telemetry-beacon" />
            <span className="telemetry-label">LIVE GITHUB AUTOMATION</span>
            <span className="telemetry-divider">•</span>
            <span className="telemetry-time">Synced {lastSynced}</span>
          </div>
          <h2 className="section-title">Latest from GitHub</h2>
          <p className="section-subtitle">
            Open-source projects automatically ingested and verified from GitHub tagged with <code>#portfolio</code>.
          </p>
        </div>
        <div className="github-header-actions">
          <a
            href={`https://github.com/${username}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-button github-view-all-btn"
          >
            <Github size={16} />
            <span>@{username}</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Category Filter Pills for GitHub projects */}
      {!limit && (
        <div className="filter-row github-category-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={currentCategory === cat ? "active" : ""}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="github-grid">
          {[1, 2, 3].map((n) => (
            <div key={n} className="github-skeleton-card">
              <div className="skeleton-line shimmer title" />
              <div className="skeleton-line shimmer copy" />
              <div className="skeleton-line shimmer copy short" />
              <div className="skeleton-tags shimmer" />
            </div>
          ))}
        </div>
      ) : displayedProjects.length > 0 ? (
        <div className="github-grid">
          {displayedProjects.map((project) => {
            const langColor = LANGUAGE_COLORS[project.language] || "#f5a623";
            return (
              <motion.article
                key={project.id || project.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="github-project-card"
                onMouseMove={handleCardMouseMove}
              >
                <div className="github-card-specular" />
                <div className="github-card-topbar">
                  <div className="github-badge-group">
                    <span className="github-lang-badge">
                      <span className="github-lang-dot" style={{ backgroundColor: langColor }} />
                      {project.language}
                    </span>
                    <span className="github-category-badge">
                      {project.category || "Full Stack"}
                    </span>
                  </div>
                  <div className="github-stats">
                    {project.stars > 0 && (
                      <span className="stat-item" title={`${project.stars} stars`}>
                        <Star size={13} />
                        {project.stars}
                      </span>
                    )}
                    {project.forks > 0 && (
                      <span className="stat-item" title={`${project.forks} forks`}>
                        <GitFork size={13} />
                        {project.forks}
                      </span>
                    )}
                    <span className="stat-item stat-time" title={`Last pushed: ${project.pushedAt}`}>
                      <Clock size={12} />
                      {formatTimeAgo(project.pushedAt)}
                    </span>
                  </div>
                </div>

                <h3 className="github-card-title">
                  <a href={project.htmlUrl} target="_blank" rel="noopener noreferrer">
                    {project.displayName || project.name}
                  </a>
                </h3>

                <p className="github-card-desc">{project.description}</p>

                {project.topics && project.topics.length > 0 && (
                  <div className="github-topics-row">
                    {project.topics.map((t) => (
                      <span
                        key={t}
                        className={`github-topic-pill ${t.toLowerCase() === "portfolio" ? "featured-topic" : ""}`}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="github-card-footer">
                  <a
                    href={project.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="secondary-button card-action-btn"
                  >
                    <Github size={14} />
                    <span>Source Code</span>
                  </a>

                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="primary-button card-action-btn"
                    >
                      <ExternalLink size={14} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      ) : (
        <div className="github-empty-state">
          <div className="empty-state-glow" />
          <div className="empty-state-icon-box">
            <Github size={28} />
          </div>
          <h3 className="empty-state-title">Automated Discovery Pipeline Active</h3>
          <p className="empty-state-text">
            Public repositories on GitHub under <strong>@{username}</strong> tagged with the topic{" "}
            <span className="topic-highlight">#portfolio</span> are automatically synchronized every 6 hours via GitHub Actions.
          </p>

          <div className="sync-recipe-box">
            <div className="recipe-step">
              <span className="step-num">1</span>
              <span>Publish repository on GitHub</span>
            </div>
            <div className="recipe-arrow">→</div>
            <div className="recipe-step">
              <span className="step-num">2</span>
              <span>Add topic: <code>portfolio</code></span>
            </div>
            <div className="recipe-arrow">→</div>
            <div className="recipe-step">
              <span className="step-num">3</span>
              <span>Auto-discovered without manual edits</span>
            </div>
          </div>

          <div className="empty-state-actions">
            <a
              href={`https://github.com/${username}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button"
            >
              <Github size={16} />
              <span>Explore GitHub Repositories</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
