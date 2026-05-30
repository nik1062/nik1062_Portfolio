import React, { useState, useEffect } from "react";
import { PageShell } from "../components/ui/PageShell";
import { PageHero } from "../components/ui/PageHero";
import { ProjectCard } from "../components/sections/ProjectSection";
import { projects as staticProjects, projectCategories } from "../data/portfolio";
import { apiService } from "../services/api";
import { SEO } from "../components/common/SEO";

export function ProjectsPage() {
  const [projects, setProjects] = useState(staticProjects);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await apiService.getProjects();
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error("Failed to load projects from API:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const filtered = filter === "All" ? projects : projects.filter((project) => project.category === filter || project.status === filter);

  return (
    <PageShell>
      <SEO title="Projects Portfolio" description="A showcase of full-stack and AI-driven engineering projects." slug="/projects" />
      <PageHero eyebrow="Projects" title="Filterable project gallery." copy="A curated view of your best public projects, plus a clean placeholder for private work that can be shown as case studies without exposing source code." />
      <section className="section">
        <div className="filter-row">
          {projectCategories.map((category) => (
            <button key={category} type="button" className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>
              {category}
            </button>
          ))}
        </div>
        {loading ? (
          <p style={{ color: "var(--muted)", textAlign: "center", padding: "40px 0" }}>Loading project gallery...</p>
        ) : (
          <div className="project-grid-full">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
