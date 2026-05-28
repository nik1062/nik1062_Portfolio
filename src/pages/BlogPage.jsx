import React, { useState, useEffect, Suspense } from "react";
import { PageShell } from "../components/ui/PageShell";
import { PageHero } from "../components/ui/PageHero";

// Load all MDX files from the content/blog directory
const mdxModules = import.meta.glob("../content/blog/*.mdx");

export function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const loadedPosts = await Promise.all(
        Object.entries(mdxModules).map(async ([path, resolver]) => {
          const module = await resolver();
          return {
            slug: path.split("/").pop().replace(".mdx", ""),
            component: module.default,
            frontmatter: module.frontmatter || {
              title: "Untitled Post",
              category: "Uncategorized",
              read: "5 min",
              copy: "No description provided."
            }
          };
        })
      );
      setPosts(loadedPosts);
    }
    loadPosts();
  }, []);

  return (
    <PageShell>
      <PageHero eyebrow="Blog / Build Notes" title="Technical notes with MDX." copy="These articles are written in Markdown but rendered as React components, allowing for code blocks and interactive elements." />
      <section className="section blog-grid" style={{ gridTemplateColumns: "1fr" }}>
        {posts.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>Loading posts...</p>
        ) : (
          posts.map((post) => (
            <article key={post.slug} className="mdx-post-card">
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--gold)", fontFamily: "monospace", fontSize: 13, marginBottom: 12 }}>
                <span>{post.frontmatter.category}</span>
                <span>{post.frontmatter.read} read</span>
              </div>
              <h3 style={{ fontSize: 28, marginBottom: 12 }}>{post.frontmatter.title}</h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.6, marginBottom: 24 }}>{post.frontmatter.copy}</p>
              
              <div className="mdx-content" style={{ marginTop: 24, padding: "20px 0", borderTop: "1px solid var(--line)" }}>
                <Suspense fallback={<p>Loading content...</p>}>
                  <post.component />
                </Suspense>
              </div>
            </article>
          ))
        )}
      </section>
    </PageShell>
  );
}
