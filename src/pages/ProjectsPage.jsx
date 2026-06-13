import React, { useState, useEffect } from "react";
import { PageShell } from "../components/ui/PageShell";
import { PageHero } from "../components/ui/PageHero";
import { ProjectCard } from "../components/sections/ProjectSection";
import { projects as staticProjects, projectCategories } from "../data/portfolio";
import { apiService } from "../services/api";
import { SEO } from "../components/common/SEO";

export function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await apiService.getProjects();
        const dbProjects = data.projects || [];
        const merged = [...staticProjects];
        
        dbProjects.forEach(dbProj => {
          const index = merged.findIndex(p => p.slug === dbProj.slug);
          if (index !== -1) {
            merged[index] = dbProj;
          } else {
            merged.push(dbProj);
          }
        });
        
        setProjectsList(merged);
        setLoading(false);
        return;
      } catch (error) {
        console.error("Failed to load projects from API, using static fallback:", error);
      }
      setProjectsList(staticProjects);
      setLoading(false);
    }
    loadProjects();
  }, []);

  const filtered = filter === "All" 
    ? projectsList 
    : projectsList.filter((project) => project.category === filter || project.status === filter);

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
          <div style={{ padding: "100px 0", textAlign: "center" }}>
            <p style={{ color: "var(--muted)", fontFamily: "monospace" }}>Loading projects gallery...</p>
          </div>
        ) : (
          <div className="project-grid-full">
            {filtered.map((project) => (
              <ProjectCard key={project.slug || project._id} project={project} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
