import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Download, Github, Star, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import { PageShell } from "../components/ui/PageShell";
import { ProjectStage } from "../components/sections/ProjectSection";
import { AssistantSection } from "../components/sections/AssistantSection";
import { profile, projects as staticProjects } from "../data/portfolio";
import { apiService } from "../services/api";
import { githubService } from "../services/github";
import { SEO } from "../components/common/SEO";

export function HomePage() {
  const [projects, setProjects] = useState(staticProjects);
  const [recentRepos, setRecentRepos] = useState([]);
  const [activeProject, setActiveProject] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [pData, gData] = await Promise.all([
          apiService.getProjects(),
          githubService.getRecentRepos()
        ]);
        if (pData.projects && pData.projects.length > 0) setProjects(pData.projects);
        setRecentRepos(gData.slice(0, 3));
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const featured = projects.filter((project) => ["Featured", "Full Stack", "AI/ML"].includes(project.category) || project.status === "Featured").slice(0, 4);
  const visibleProjects = featured.map((project, index) => ({ ...project, active: index === activeProject }));
  const moveProject = (step) => setActiveProject((current) => (current + step + (visibleProjects.length || 1)) % (visibleProjects.length || 1));

  return (
    <PageShell>
      <SEO title="Full-Stack Developer & AI Specialist" slug="/" />
      <section className="hero section">
        <p className="eyebrow">Hello, I am</p>
        <h1>{profile.name}</h1>
        <h2>{profile.headline}</h2>
        <p className="hero-copy">{profile.summary}</p>
        <div className="hero-actions">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link className="primary-button" to="/projects">
              View Work
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link className="secondary-button" to="/resume">
              <Download size={17} />
              Resume Hub
            </Link>
          </motion.div>
        </div>
        <div className="hero-metrics">
          {profile.metrics.map(([number, label]) => (
            <motion.div key={label} whileHover={{ y: -5 }}>
              <strong>{number}</strong>
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured Work</p>
            <h2 className="section-title">A focused set of projects with real product signals.</h2>
          </div>
          <div className="project-controls">
            <motion.button type="button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => moveProject(-1)} aria-label="Previous project">
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button type="button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => moveProject(1)} aria-label="Next project">
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
        <ProjectStage projects={visibleProjects} onSelect={setActiveProject} />
        <div className="hero-actions centered">
          <Link className="secondary-button" to="/projects">
            Full project gallery
          </Link>
          <Link className="secondary-button" to="/now">
            Currently building
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">GitHub Pulse</p>
            <h2 className="section-title">Latest Open Source Activity</h2>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {recentRepos.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Fetching activity from GitHub...</p>
          ) : (
            recentRepos.map(repo => (
              <motion.a key={repo.id} href={repo.html_url} target="_blank" rel="noopener" className="about-card" style={{ textDecoration: "none", display: "flex", flexDirection: "column" }} whileHover={{ y: -5 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <Github size={18} style={{ color: "var(--gold)" }} />
                  <div style={{ display: "flex", gap: 12, color: "var(--soft)", fontSize: 12 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={12} /> {repo.stargazers_count}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><GitBranch size={12} /> {repo.forks_count}</span>
                  </div>
                </div>
                <h4 style={{ color: "var(--text)", marginBottom: 8 }}>{repo.name}</h4>
                <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.5, marginBottom: 16, flex: 1 }}>{repo.description || "No description provided."}</p>
                <div style={{ color: "var(--soft)", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>{repo.language || "Shell"}</div>
              </motion.a>
            ))
          )}
        </div>
      </section>

      <AssistantSection />
    </PageShell>
  );
}
