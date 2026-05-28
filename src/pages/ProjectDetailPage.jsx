import React from "react";
import { useParams } from "react-router-dom";
import { Github, ExternalLink, Sparkles } from "lucide-react";
import { PageShell } from "../components/ui/PageShell";
import { CaseBlock } from "../components/ui/CaseBlock";
import { projects } from "../data/portfolio";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug) || projects[0];

  return (
    <PageShell>
      <section className={`case-hero visual-${project.visual}`}>
        <div className="project-visual" />
        <div className="case-content">
          <p className="eyebrow">{project.status}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="hero-actions">
            {project.repo && (
              <a className="primary-button" href={project.repo} target="_blank" rel="noopener">
                <Github size={16} />
                GitHub
              </a>
            )}
            {project.live && (
              <a className="secondary-button" href={project.live} target="_blank" rel="noopener">
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </section>
      <section className="section case-grid">
        <CaseBlock title="Problem" text={project.problem} />
        <CaseBlock title="Why I Built It" text="This project strengthens my portfolio by showing a realistic domain, a clear user problem, and implementation decisions beyond basic UI work." />
        <CaseBlock title="Architecture" text={`Frontend/product layer, data layer, and project documentation are organized around ${project.tags.join(", ")}.`} />
        <CaseBlock title="Challenges" text="The main challenge is turning a student project into a credible portfolio artifact: clear README, screenshots, meaningful user flow, and honest scope." />
        <CaseBlock title="Outcome" text={project.outcome} />
        <CaseBlock title="What I Learned" text="I learned to present work as a product: define the audience, state the problem, show the stack, and explain tradeoffs clearly." />
      </section>
      <section className="section">
        <h2 className="section-title">Feature highlights</h2>
        <div className="highlight-grid">
          {project.highlights.map((item) => (
            <article key={item}>
              <Sparkles size={18} />
              <span>{item}</span>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
