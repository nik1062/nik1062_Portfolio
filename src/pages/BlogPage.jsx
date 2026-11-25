import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { BookOpen, Clock, Tag, ArrowRight, ArrowLeft, Terminal, Sparkles } from "lucide-react";
import ThreeCanvas from "../components/ThreeCanvas";
import Card3D from "../components/Card3D";
import { SEO } from "../components/common/SEO";
import { staticBlogs } from "../data/staticBlogs";
import { apiService } from "../services/api";

export function BlogPage() {
  const [posts, setPosts] = useState(staticBlogs);
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    async function fetchLiveBlogs() {
      try {
        const data = await apiService.getBlogs();
        if (data?.blogs && data.blogs.length > 0) {
          const merged = [...staticBlogs];
          data.blogs.forEach((dbBlog) => {
            const index = merged.findIndex((b) => b.title === dbBlog.title);
            if (index !== -1) {
              merged[index] = { ...merged[index], ...dbBlog };
            } else {
              merged.push(dbBlog);
            }
          });
          setPosts(merged);
        }
      } catch (err) {
        // Fallback cleanly to static blogs
        setPosts(staticBlogs);
      }
    }
    fetchLiveBlogs();
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))];

  const filtered = posts.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  // Expanded Markdown Post View
  if (expandedPost) {
    return (
      <div className="blog-reader-view" style={{ position: "relative", minHeight: "85vh" }}>
        <SEO title={`${expandedPost.title} — Engineering Log`} description={expandedPost.copy} slug="/blog" />
        <ThreeCanvas density="low" height="360px" interactive={false} />

        <div className="container" style={{ maxWidth: 860, paddingTop: 40, paddingBottom: 80, position: "relative", zIndex: 2 }}>
          {/* Back Action */}
          <button
            type="button"
            onClick={() => setExpandedPost(null)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              border: 0,
              color: "var(--accent)",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              marginBottom: 32,
              padding: 0
            }}
          >
            <ArrowLeft size={15} />
            <span>RETURN TO ENGINEERING LOGS</span>
          </button>

          {/* Article Header */}
          <header
            style={{
              padding: "36px 32px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-subtle)",
              borderTop: "1px solid var(--border-specular)",
              background: "var(--bg-card)",
              boxShadow: "var(--shadow-card)",
              marginBottom: 36
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
              <span className="case-tag-badge">{expandedPost.category}</span>
              <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={12} />
                {expandedPost.readTime}
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, margin: "0 0 16px", color: "var(--text-primary)", lineHeight: 1.2 }}>
              {expandedPost.title}
            </h1>
            <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
              {expandedPost.copy}
            </p>
          </header>

          {/* Markdown Content */}
          <article
            style={{
              padding: "36px 32px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-surface)",
              color: "var(--text-primary)",
              lineHeight: 1.75,
              fontSize: "15px"
            }}
          >
            <ReactMarkdown>{expandedPost.content}</ReactMarkdown>
          </article>
        </div>
      </div>
    );
  }

  // Blog Feed View
  return (
    <div className="blog-page-view" style={{ position: "relative", minHeight: "85vh" }}>
      <SEO 
        title="Engineering Logs & Architectural Notes" 
        description="Deep dives on real-time CRDT sync, Razorpay webhook idempotency, multi-tier state machines, and Dockerized cloud setups." 
        slug="/blog" 
      />

      {/* 3D Atmospheric Background */}
      <ThreeCanvas density="low" height="420px" interactive={true} />

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80, position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: "var(--radius-sm)", background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", marginBottom: 12 }}>
            <BookOpen size={14} style={{ color: "var(--accent)" }} />
            <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>SYSTEM LOGS // ENGINEERING DISPATCHES</span>
          </div>
          <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: 12 }}>
            Engineering Logs & Case Notes
          </h1>
          <p className="section-desc" style={{ maxWidth: 700 }}>
            Technical breakdowns covering distributed consensus, idempotency patterns, real-time multiplayer architectures, and full-stack systems engineering.
          </p>
        </div>

        {/* Categories */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24, marginBottom: 36 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`track-pill-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 16px",
                borderRadius: "var(--radius-sm)",
                fontSize: 13,
                fontFamily: "var(--font-mono)",
                cursor: "pointer",
                border: activeCategory === cat ? "1px solid var(--accent)" : "1px solid var(--border-subtle)",
                background: activeCategory === cat ? "var(--accent-glow)" : "var(--bg-surface)",
                color: activeCategory === cat ? "var(--accent)" : "var(--text-secondary)",
                fontWeight: activeCategory === cat ? 600 : 400,
                transition: "all 120ms ease"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {filtered.map((post) => (
            <Card3D key={post._id || post.title}>
              <div
                onClick={() => setExpandedPost(post)}
                style={{
                  padding: "28px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                  borderTop: "1px solid var(--border-specular)",
                  background: "var(--bg-card)",
                  boxShadow: "var(--shadow-card)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <span className="case-tag-badge">{post.category}</span>
                    <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={11} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px", lineHeight: 1.35 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.55, margin: "0 0 16px" }}>
                    {post.copy}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--accent)", borderTop: "1px solid var(--border-subtle)", paddingTop: 14 }}>
                  <span>Read Full Article</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </div>
  );
}
