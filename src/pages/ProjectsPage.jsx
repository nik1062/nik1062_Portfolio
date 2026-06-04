import React, { useState } from "react";
import { PageShell } from "../components/ui/PageShell";
import { PageHero } from "../components/ui/PageHero";
import { ProjectCard } from "../components/sections/ProjectSection";
import { projects, projectCategories } from "../data/portfolio";
import { SEO } from "../components/common/SEO";

export function ProjectsPage() {
  const [filter, setFilter] = useState("All");

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
        <div className="project-grid-full">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
