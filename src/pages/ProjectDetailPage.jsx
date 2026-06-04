import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PageShell } from "../components/ui/PageShell";
import { CaseBlock } from "../components/ui/CaseBlock";
import { projects } from "../data/portfolio";
import { SEO } from "../components/common/SEO";
import { Github, ExternalLink, Sparkles, ToggleLeft, ToggleRight, Code, Info } from "lucide-react";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug) || projects[0];
  const [viewMode, setViewMode] = useState("user");

  return (
    <PageShell>
      <SEO 
        title={project.metaTitle || project.title} 
        description={project.metaDescription || project.summary} 
        slug={`/projects/${project.slug}`} 
      />
      
      {/* View Mode Toggle */}
      <div style={{ position: "fixed", bottom: 100, right: 30, zIndex: 100 }}>
        <button 
          onClick={() => setViewMode(viewMode === "user" ? "engineer" : "user")}
          className="about-card"
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 12, 
            padding: "12px 20px", 
            borderRadius: 100,
            border: "1px solid var(--gold)",
            background: "rgba(17, 17, 17, 0.9)",
            cursor: "pointer",
            boxShadow: "var(--shadow)"
          }}
        >
          {viewMode === "user" ? <Info size={18} /> : <Code size={18} />}
          <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {viewMode === "user" ? "Engineer View" : "User View"}
          </span>
          {viewMode === "user" ? <ToggleLeft size={20} color="var(--soft)" /> : <ToggleRight size={20} color="var(--gold)" />}
        </button>
      </div>

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

      {viewMode === "user" ? (
        <>
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
        </>
      ) : (
        <section className="section">
          <div className="about-card" style={{ padding: 40 }}>
            <h2 style={{ color: "var(--gold)", marginBottom: 24 }}>Technical Implementation (Engineer View)</h2>
            <div style={{ display: "grid", gap: 32 }}>
              <div>
                <h4 style={{ color: "var(--text)", marginBottom: 12 }}>System Architecture</h4>
                <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                  The project follows a modular <strong>MERN</strong> architecture. 
                  Data is managed via <strong>Mongoose</strong> schemas with strict validation. 
                  The frontend utilizes <strong>React Hooks</strong> for state management and <strong>Framer Motion</strong> for declarative animations.
                </p>
              </div>
              <div>
                <h4 style={{ color: "var(--text)", marginBottom: 12 }}>Tech Stack & Trade-offs</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  {project.tags.map(tag => <span key={tag} style={{ fontSize: 11, background: "var(--panel-2)", padding: "4px 10px", borderRadius: 4, border: "1px solid var(--line)" }}>{tag}</span>)}
                </div>
                <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                  Chose <strong>MongoDB</strong> for its flexible document structure, which allowed rapid iteration during the initial design phase. 
                  For the API, <strong>Node.js</strong> with Express provides a high-performance, asynchronous environment ideal for handling concurrent user requests.
                </p>
              </div>
              <div style={{ background: "#000", padding: 20, borderRadius: 12, border: "1px solid var(--line)", overflowX: "auto" }}>
                <code style={{ color: "var(--gold-2)", fontSize: 13, fontFamily: "monospace" }}>
                  {`// High-level Architectural Snippet
export const ProjectSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  views: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false }
});`}
                </code>
              </div>
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
