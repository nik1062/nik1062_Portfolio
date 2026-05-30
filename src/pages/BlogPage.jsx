import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import { PageShell } from "../components/ui/PageShell";
import { PageHero } from "../components/ui/PageHero";
import { apiService } from "../services/api";

export function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await apiService.getBlogs();
        if (data.blogs && data.blogs.length > 0) {
          setPosts(data.blogs);
          
          // Check if we came from command palette with a specific post
          if (location.state?.postId) {
            const target = data.blogs.find(b => b._id === location.state.postId);
            if (target) setExpandedPost(target);
          }
        }
      } catch (error) {
        console.error("Failed to load blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [location.state]);

  if (expandedPost) {
    return (
      <PageShell>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "100px 20px" }}>
          <button 
            onClick={() => setExpandedPost(null)}
            style={{ 
              background: "transparent", 
              border: 0, 
              color: "var(--gold)", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: 8,
              marginBottom: 40,
              fontFamily: "monospace",
              fontWeight: 800
            }}
          >
            ← BACK TO FEED
          </button>
          
          <header style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <span style={{ color: "var(--gold)", fontSize: 12, fontWeight: 800, textTransform: "uppercase", background: "rgba(245, 166, 35, 0.1)", padding: "4px 10px", borderRadius: 6 }}>
                {expandedPost.category}
              </span>
              <span style={{ color: "var(--soft)", fontSize: 13 }}>{expandedPost.readTime} read</span>
            </div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.1, marginBottom: 24 }}>{expandedPost.title}</h1>
            <p style={{ fontSize: 20, color: "var(--muted)", lineHeight: 1.6 }}>{expandedPost.copy}</p>
          </header>

          <div className="mdx-content" style={{ borderTop: "1px solid var(--line)", paddingTop: 40 }}>
            <ReactMarkdown>{expandedPost.content}</ReactMarkdown>
          </div>
          
          <footer style={{ marginTop: 80, padding: "40px 0", borderTop: "1px solid var(--line)", textAlign: "center" }}>
            <p style={{ color: "var(--soft)", fontSize: 14 }}>Published on {new Date(expandedPost.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </footer>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHero 
        eyebrow="Technical Blog" 
        title="Engineering Notes" 
        copy="A collection of technical deep-dives, build logs, and architectural explorations from my daily engineering work." 
      />
      
      <section className="section">
        {loading ? (
          <div style={{ padding: "100px 0", textAlign: "center" }}>
            <div className="avatar" style={{ margin: "0 auto 20px", width: 60, height: 60, fontSize: 20 }}>NK</div>
            <p style={{ color: "var(--muted)", fontFamily: "monospace" }}>Decrypting technical logs...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="about-card" style={{ padding: 40, textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <p style={{ color: "var(--muted)" }}>No technical notes found. Use the admin panel to publish your first log.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 32 }}>
            {posts.map((post) => (
              <article key={post._id} className="about-card" style={{ display: "flex", flexDirection: "column", height: "100%", padding: 0, overflow: "hidden", transition: "180ms ease" }}>
                <div style={{ padding: 28, flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                    <span style={{ color: "var(--gold)", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {post.category}
                    </span>
                    <span style={{ color: "var(--soft)", fontSize: 11, fontFamily: "monospace" }}>
                      {post.readTime} read
                    </span>
                  </div>
                  
                  <h3 style={{ fontSize: 22, lineHeight: 1.3, marginBottom: 12, color: "var(--text)" }}>
                    {post.title}
                  </h3>
                  
                  <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
                    {post.copy}
                  </p>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                    <span style={{ fontSize: 12, color: "var(--soft)" }}>
                      {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <button 
                      onClick={() => setExpandedPost(post)}
                      style={{ 
                        background: "var(--gold)", 
                        color: "#14110b", 
                        border: 0, 
                        padding: "8px 16px", 
                        borderRadius: 8, 
                        fontSize: 13, 
                        fontWeight: 700, 
                        cursor: "pointer",
                        transition: "180ms ease"
                      }}
                      className="read-more-btn"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
