import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { PageShell } from "../components/ui/PageShell";
import { ProjectStage } from "../components/sections/ProjectSection";
import { AssistantSection } from "../components/sections/AssistantSection";
import { profile, projects as staticProjects } from "../data/portfolio";
import { apiService } from "../services/api";

export function HomePage() {
  const [projects, setProjects] = useState(staticProjects);
  const [activeProject, setActiveProject] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await apiService.getProjects();
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const featured = projects.filter((project) => ["Featured", "Full Stack", "AI/ML"].includes(project.category) || project.status === "Featured").slice(0, 4);
  const visibleProjects = featured.map((project, index) => ({ ...project, active: index === activeProject }));
  const moveProject = (step) => setActiveProject((current) => (current + step + (visibleProjects.length || 1)) % (visibleProjects.length || 1));

  return (
    <PageShell>
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

      <AssistantSection />
    </PageShell>
  );
}
