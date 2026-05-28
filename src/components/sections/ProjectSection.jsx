import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, ExternalLink } from "lucide-react";

export function ProjectCard({ project, active = false, onClick }) {
  return (
    <motion.article 
      layout 
      className={`project-card visual-${project.visual} ${active ? "active" : ""}`} 
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="project-visual" />
      <div className="project-meta">
        <span>{project.year}</span>
        <span>{project.status}</span>
      </div>
      <div className="project-number">{project.status === "Private Repo" ? "PR" : project.category.slice(0, 2).toUpperCase()}</div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="project-links">
        <Link to={`/projects/${project.slug}`}>Case Study</Link>
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noopener" onClick={(event) => event.stopPropagation()}>
            <Github size={14} />
            Code
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener" onClick={(event) => event.stopPropagation()}>
            <ExternalLink size={14} />
            Live
          </a>
        )}
      </div>
    </motion.article>
  );
}

export function ProjectStage({ projects, onSelect }) {
  return (
    <div className="project-stage">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} active={project.active} onClick={() => onSelect(index)} />
      ))}
    </div>
  );
}
