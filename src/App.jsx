import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Bot,
  BookOpen,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  Download,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Home,
  Mail,
  Menu,
  Search,
  Send,
  Sparkles,
  Terminal,
  User,
  X,
  Zap
} from "lucide-react";
import { HashRouter, Link, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  credentials,
  profile,
  projectCategories,
  projects as localProjects,
  skillGroups,
  skills,
  timeline
} from "./data/portfolio.js";
import SEO from "./components/SEO";
import LoginPage from "./components/LoginPage";
import AdminPanel from "./components/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";

const navItems = [
  ["Home", "/", Home],
  ["About", "/about", User],
  ["Projects", "/projects", Code2],
  ["Skills", "/skills", Zap],
  ["Credentials", "/credentials", Award],
  ["Resume", "/resume", FileText],
  ["Blog", "/blog", BookOpen],
  ["Now", "/now", Sparkles],
  ["Contact", "/contact", Mail]
];

const resumeHub = [
  {
    title: "Full Stack Resume",
    role: "React, Node, Firebase, AI/data projects",
    href: "/assets/resume/Nikunj-Kumar-FullStack-Resume.pdf"
  },
  {
    title: "Data Analytics Resume",
    role: "Python, SQL, Excel, dashboards, EDA",
    href: "/assets/resume/Nikunj-Kumar-Data-Analytics-Resume.pdf"
  },
  {
    title: "DevOps Resume",
    role: "Linux, Docker, GitHub Actions, AWS EC2",
    href: "/assets/resume/Nikunj-Kumar-DevOps-Resume.pdf"
  },
  {
    title: "Mobile Resume",
    role: "Flutter, Firebase, productivity apps",
    href: "/assets/resume/Nikunj-Kumar-Mobile-Resume.pdf"
  }
];

const blogPosts = [
  {
    title: "How SpendLens became a product-style AI audit tool",
    category: "AI Product",
    read: "5 min",
    copy: "A build note on turning AI tool pricing, prompts, and metrics into a useful product workflow."
  },
  {
    title: "Designing RESTROPro as a SaaS POS system",
    category: "Full Stack",
    read: "6 min",
    copy: "What makes a restaurant POS more than a CRUD app: roles, billing, menu control, and database thinking."
  },
  {
    title: "My NEURA '25 AI Hackathon experience",
    category: "Hackathon",
    read: "4 min",
    copy: "How I scoped, built, and presented an AI automation idea that won first prize."
  },
  {
    title: "Building an n8n email assistant with Gemini",
    category: "Automation",
    read: "4 min",
    copy: "A practical workflow for transforming prompts into professional email drafts and Gmail actions."
  },
  {
    title: "Power BI and finance dashboards as portfolio proof",
    category: "Data",
    read: "5 min",
    copy: "Why dashboards should tell a story, not just show charts."
  },
  {
    title: "Dockerizing a MERN-style project for deployment",
    category: "DevOps",
    read: "5 min",
    copy: "Notes on environment variables, build steps, image size, and deployment confidence."
  }
];

const pageMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.28 }
};

function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState(localProjects);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5050/api/projects");
        const data = await res.json();
        if (data.ok && data.projects.length > 0) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.log("Backend offline, using local project data.");
      }
    };
    fetchProjects();
  }, []);

  return (
    <HashRouter>
      <div className="ambient-grid" />
      <DesktopNav />
      <MobileHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <ProfileRail />
      <main>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage projects={projects} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage projects={projects} />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage projects={projects} />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/credentials" element={<CredentialsPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/now" element={<NowPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
      <CommandPalette open={commandOpen} setOpen={setCommandOpen} />
      <button className="terminal-toggle" type="button" onClick={() => setCommandOpen(true)} aria-label="Open command palette">
        <Terminal size={24} />
      </button>
      <BottomNav />
    </HashRouter>
  );
}

function DesktopNav() {
  return (
    <nav className="top-nav" aria-label="Primary navigation">
      <NavLink className="nav-mark" to="/" aria-label="Nikunj Kumar home">
        NK
      </NavLink>
      {navItems.slice(1, 6).map(([label, path]) => (
        <NavLink key={path} to={path}>
          {label}
        </NavLink>
      ))}
      <NavLink to="/blog">Blog</NavLink>
    </nav>
  );
}

function MobileHeader({ menuOpen, setMenuOpen }) {
  return (
    <header className="mobile-header">
      <Link to="/" className="mobile-brand">
        NK
      </Link>
      <button type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      {menuOpen && (
        <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mobile-menu">
          {navItems.map(([label, path]) => (
            <NavLink key={path} to={path} onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
        </motion.nav>
      )}
    </header>
  );
}

function ProfileRail() {
  return (
    <aside className="profile-rail" aria-label="Profile summary">
      <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} className="profile-card">
        <div className="avatar-wrap">
          <div className="avatar">NK</div>
          <span className="status-dot" />
        </div>
        <h2>{profile.name}</h2>
        <p>{profile.role}</p>
        <div className="rail-tags">
          <span>AI Automation</span>
          <span>MERN</span>
          <span>Python</span>
        </div>
        <a className="rail-button" href={profile.resume} target="_blank" rel="noopener">
          <Download size={16} />
          Resume
        </a>
      </motion.div>
    </aside>
  );
}

function HomePage({ projects }) {
  const [activeProject, setActiveProject] = useState(1);
  const featured = projects.filter((project) => ["Featured", "Full Stack", "Data Analytics", "AI/ML"].includes(project.category)).slice(0, 4);
  const visibleProjects = featured.map((project, index) => ({ ...project, active: index === activeProject }));
  const moveProject = (step) => setActiveProject((current) => (current + step + visibleProjects.length) % visibleProjects.length);

  return (
    <PageShell>
      <SEO title="Home" />
      <section className="hero section">
        <p className="eyebrow">Hello, I am</p>
        <h1>{profile.name}</h1>
        <h2>{profile.headline}</h2>
        <p className="hero-copy">{profile.summary}</p>
        <div className="hero-actions">
          <Link className="primary-button" to="/projects">
            View Work
          </Link>
          <Link className="secondary-button" to="/resume">
            <Download size={17} />
            Resume Hub
          </Link>
        </div>
        <div className="hero-metrics">
          {profile.metrics.map(([number, label]) => (
            <div key={label}>
              <strong>{number}</strong>
              <span>{label}</span>
            </div>
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
            <button type="button" onClick={() => moveProject(-1)} aria-label="Previous project">
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={() => moveProject(1)} aria-label="Next project">
              <ChevronRight size={18} />
            </button>
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

function AboutPage() {
  return (
    <PageShell>
      <SEO title="About" description="Learn about Nikunj's background, education, and development focus." />
      <PageHero eyebrow="About" title="A builder who connects frontend polish with AI-backed systems." copy="My strongest profile is full-stack development, supported by AI/data automation, DevOps basics, and mobile app development." />
      <section className="section split">
        <div className="about-card">
          <h3>Profile</h3>
          <p>
            I design practical applications: SaaS-style systems, dashboards, workflow automation, educational tools, and mobile productivity apps.
            I care about shipping usable products, not only code snippets.
          </p>
          <div className="info-grid">
            <span>{profile.location}</span>
            <span>B.Tech IT, 2023-2027</span>
            <span>CGPA 8.5 / 10</span>
            <span>English, Hindi</span>
          </div>
        </div>
        <Timeline />
      </section>
    </PageShell>
  );
}

function ProjectsPage({ projects }) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((project) => project.category === filter || project.status === filter);

  return (
    <PageShell>
      <SEO title="Projects" description="Explore Nikunj's portfolio of web, AI, and data projects." />
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

function ProjectDetailPage({ projects }) {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug) || projects[0];

  return (
    <PageShell>
      <SEO title={project.title} description={project.summary} />
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

function SkillsPage() {
  const grouped = skills.reduce((acc, skill) => {
    acc[skill.group] ||= [];
    acc[skill.group].push(skill);
    return acc;
  }, {});

  return (
    <PageShell>
      <SEO title="Skills" description="Nikunj's technical skillset across Frontend, Backend, AI, Data, and DevOps." />
      <PageHero eyebrow="Skills" title="Logo-based skills with project proof." copy="No percentage bars. Each skill is connected to a real project, workflow, or portfolio signal." />
      <section className="section">
        <div className="skills-grid">
          {skillGroups.map((skill) => (
            <article key={skill.title}>
              <span>{skill.index}</span>
              <h3>{skill.title}</h3>
              <p>{skill.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="logo-skill-groups">
          {Object.entries(grouped).map(([group, items]) => (
            <article key={group} className="logo-skill-group">
              <h3>{group}</h3>
              <div className="logo-skill-grid">
                {items.map((skill) => (
                  <div key={skill.name} className="skill-logo-card">
                    <img src={skill.logo} alt={`${skill.name} logo`} />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section proof-grid">
        <ProofCard skill="React" proof="Used in SpendLens, FinVault, RESTROPro, and Smart Library UI work." />
        <ProofCard skill="Python / FastAPI" proof="Used in Smart Library backend and data/ML workflows." />
        <ProofCard skill="MongoDB / MySQL" proof="Used for library and POS-style backend data modelling." />
        <ProofCard skill="n8n / AI Automation" proof="Used in the Email Assistant workflow with Gemini and Gmail." />
        <ProofCard skill="Flutter" proof="Used in FocusFlow Study Tracker for cross-platform mobile development." />
        <ProofCard skill="Docker / AWS" proof="Supported by DevOps resume work: EC2, NGINX, GitHub Actions, Docker basics." />
      </section>
    </PageShell>
  );
}

function CredentialsPage() {
  const categories = ["Hackathons", "AI / ML", "Data Analytics", "Google Analytics", "Python", "Cloud"];
  return (
    <PageShell>
      <SEO title="Credentials" description="Certifications, hackathon wins, and professional achievements." />
      <PageHero eyebrow="Credentials" title="Certificate gallery with proof." copy="A clean proof hub for achievements, certifications, and job simulations." />
      <section className="section">
        <div className="filter-row muted">
          {categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
        <div className="credential-grid">
          {credentials.map((credential) => (
            <a key={credential.title} href={credential.link} target="_blank" rel="noopener">
              {credential.image && <img src={credential.image} alt={`${credential.title} certificate preview`} />}
              <span>{credential.type}</span>
              <h3>{credential.title}</h3>
              <small>{credential.issuer} · {credential.date}</small>
              <p>{credential.copy}</p>
              <ExternalLink size={16} />
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function ResumePage() {
  return (
    <PageShell>
      <SEO title="Resume Hub" description="Download tailored resumes for Full-Stack, Data, DevOps, and Mobile roles." />
      <PageHero eyebrow="Resume Hub" title="Different resumes for different roles." copy="Recruiters can download the resume that matches the role instead of reading one generic file." />
      <section className="section resume-grid">
        {resumeHub.map((resume) => (
          <a key={resume.title} href={resume.href} target="_blank" rel="noopener" className="resume-card">
            <FileText size={26} />
            <h3>{resume.title}</h3>
            <p>{resume.role}</p>
            <span>
              <Download size={15} />
              Download PDF
            </span>
          </a>
        ))}
      </section>
    </PageShell>
  );
}

function BlogPage() {
  return (
    <PageShell>
      <SEO title="Blog" description="Technical build notes and articles by Nikunj Kumar." />
      <PageHero eyebrow="Blog / Build Notes" title="Short technical notes that show how I think." copy="These can become full MDX articles later. For now, they act as polished writing cards and content direction." />
      <section className="section blog-grid">
        {blogPosts.map((post) => (
          <article key={post.title}>
            <div>
              <span>{post.category}</span>
              <span>{post.read}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.copy}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}

function NowPage() {
  return (
    <PageShell>
      <SEO title="Now" description="What Nikunj is currently building and learning." />
      <PageHero eyebrow="Now" title="Currently building toward internship-ready depth." copy="A modern portfolio page that tells visitors what I am focused on right now." />
      <section className="section now-grid">
        <NowCard title="Currently Learning" items={["Advanced React patterns", "MERN deployment", "Docker + GitHub Actions", "AI workflow automation"]} />
        <NowCard title="Currently Building" items={["Multi-page portfolio", "AI portfolio assistant", "Project case studies", "Private project showcase"]} />
        <NowCard title="Target Roles" items={["Full-stack Developer Intern", "Frontend Developer Intern", "AI Automation Intern", "Junior DevOps Intern"]} />
        <NowCard title="Current Tech Focus" items={["React Router", "Express APIs", "MongoDB", "n8n agents", "Power BI storytelling"]} />
      </section>
    </PageShell>
  );
}

function ContactPage() {
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    setStatus("Sending...");

    try {
      const res = await fetch("http://127.0.0.1:5050/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("Message saved by backend.");
      form.reset();
    } catch {
      setStatus("Backend is not running yet. Start it with npm run server.");
    }
  }

  return (
    <PageShell>
      <SEO title="Contact" description="Get in touch with Nikunj for internships, collaborations, or projects." />
      <PageHero eyebrow="Contact" title="Open to internships, collaborations, and useful projects." copy="Use the form, email, GitHub, or LinkedIn. The form connects to the Express backend." />
      <section className="section contact-card">
        <div>
          <h3>Let’s build something useful.</h3>
          <p>I am most interested in full-stack development, AI automation, data analytics, and junior DevOps internship roles.</p>
          <div className="contact-links vertical">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone.replaceAll(" ", "")}`}>{profile.phone}</a>
            <a href={profile.github} target="_blank" rel="noopener">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label>
            Message
            <textarea name="message" placeholder="Tell me what you want to build" rows="5" required />
          </label>
          <button type="submit">
            <Send size={16} />
            Send Message
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </section>
    </PageShell>
  );
}

function AssistantSection() {
  const [question, setQuestion] = useState("What are Nikunj's best projects?");
  const [answer, setAnswer] = useState("Ask about projects, skills, resumes, certifications, or internship fit.");

  async function askAssistant(event) {
    event.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5050/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch {
      setAnswer(localAssistant(question));
    }
  }

  return (
    <section className="section assistant-section">
      <div>
        <p className="eyebrow">Signature Feature</p>
        <h2 className="section-title">Ask Nikunj’s portfolio anything.</h2>
      </div>
      <form onSubmit={askAssistant} className="assistant-card">
        <div className="assistant-input">
          <Bot size={22} />
          <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about projects, skills, resumes..." />
          <button type="submit">Ask</button>
        </div>
        <p>{answer}</p>
      </form>
    </section>
  );
}

function CommandPalette({ open, setOpen }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const commands = [
    ["projects", "/projects"],
    ["skills ai", "/skills"],
    ["resume", "/resume"],
    ["certificates", "/credentials"],
    ["contact", "/contact"],
    ["now", "/now"],
    ["blog", "/blog"],
    ["open spendlens", "/projects/spendlens-ai-spend-audit"],
    ["open pos", "/projects/restropro-saas-pos"],
    ["open automation", "/projects/n8n-email-assistant"]
  ];
  const visible = commands.filter(([label]) => label.includes(query.toLowerCase()));

  function run(path) {
    navigate(path);
    setOpen(false);
    setQuery("");
  }

  return (
    <div className={`terminal-panel command-panel ${open ? "open" : ""}`} aria-live="polite">
      <div className="terminal-head">
        <span>command palette</span>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close command palette">
          <X size={18} />
        </button>
      </div>
      <label className="command-input">
        <Search size={16} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="projects, resume, skills ai..." autoFocus />
      </label>
      <div className="command-list">
        {visible.map(([label, path]) => (
          <button key={label} type="button" onClick={() => run(path)}>
            <span>$ {label}</span>
            <small>{path}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectStage({ projects, onSelect }) {
  return (
    <div className="project-stage">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} active={project.active} onClick={() => onSelect(index)} />
      ))}
    </div>
  );
}

function ProjectCard({ project, active = false, onClick }) {
  return (
    <motion.article layout className={`project-card visual-${project.visual} ${active ? "active" : ""}`} onClick={onClick}>
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

function PageShell({ children }) {
  return (
    <motion.div {...pageMotion} className="page-shell">
      {children}
    </motion.div>
  );
}

function PageHero({ eyebrow, title, copy }) {
  return (
    <section className="page-hero section">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{copy}</p>
    </section>
  );
}

function Timeline() {
  return (
    <div className="timeline">
      {timeline.map((item) => (
        <article key={item.title}>
          <time>{item.time}</time>
          <div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function CaseBlock({ title, text }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function ProofCard({ skill, proof }) {
  return (
    <article>
      <h3>{skill}</h3>
      <p>{proof}</p>
    </article>
  );
}

function NowCard({ title, items }) {
  return (
    <article>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {navItems.slice(0, 4).map(([label, path, Icon]) => (
        <NavLink key={path} to={path}>
          <Icon size={17} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function localAssistant(question) {
  const q = question.toLowerCase();
  if (q.includes("best") || q.includes("project")) {
    return "Nikunj's strongest projects are SpendLens AI Spend Audit, RESTROPro SaaS POS, Smart Library Management, FinVault Finance Dashboard, FocusFlow, and the n8n Email Assistant.";
  }
  if (q.includes("resume")) return "Use the Resume Hub for Full Stack, Data Analytics, DevOps, and Mobile resumes.";
  if (q.includes("skill") || q.includes("full-stack")) return "Nikunj is strongest in React, Node/Express, Python, Firebase/MongoDB, dashboards, and automation workflows.";
  if (q.includes("certificate") || q.includes("certification")) return "Key proof includes NEURA '25 first prize, GenAI Data Analytics job simulation, Google Analytics Certification, and ML/Python learning certificates.";
  return "Nikunj is a full-stack developer with strong AI/data/automation support. Ask about projects, skills, resume, or certifications.";
}

export default App;
