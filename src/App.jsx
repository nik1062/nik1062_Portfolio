import React, { useState, useEffect, Suspense, lazy } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import SEO from "./components/SEO";
import Navbar from "./components/Navbar";
import StatusStrip from "./components/StatusStrip";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";

// Multi-Page Views
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { SkillsPage } from "./pages/SkillsPage";
import { AboutPage } from "./pages/AboutPage";
import { CredentialsPage } from "./pages/CredentialsPage";
import { ResumePage } from "./pages/ResumePage";
import { BlogPage } from "./pages/BlogPage";
import { ContactPage } from "./pages/ContactPage";

// Lazy-load admin & secondary components for code-splitting & Lighthouse speed
const LoginPage = lazy(() => import("./components/LoginPage"));
const AdminPanel = lazy(() => import("./components/AdminPanel"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

// Utility to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

export default function App() {
  const [activeTrack, setActiveTrack] = useState("fullstack"); // "fullstack" or "devops"
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "terminal";
  });
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("portfolio-theme", currentTheme);
  }, [currentTheme]);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="obsidian-canvas">
        <SEO />
        <StatusStrip />
        <Navbar
          onOpenCommand={() => setCommandOpen(true)}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
        />

        <main id="main-content">
          <Suspense
            fallback={
              <div
                style={{
                  padding: "100px 20px",
                  textAlign: "center",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 13
                }}
              >
                [ESTABLISHING SYSTEM CONNECTION...]
              </div>
            }
          >
            <Routes>
              {/* Distinct Multi-Page Route Architecture */}
              <Route
                path="/"
                element={<HomePage activeTrack={activeTrack} setActiveTrack={setActiveTrack} />}
              />
              <Route
                path="/projects"
                element={<ProjectsPage activeTrack={activeTrack} />}
              />
              <Route
                path="/projects/:slug"
                element={<ProjectDetailPage />}
              />
              <Route
                path="/skills"
                element={<SkillsPage />}
              />
              <Route
                path="/about"
                element={<AboutPage />}
              />
              <Route
                path="/credentials"
                element={<CredentialsPage />}
              />
              <Route
                path="/resume"
                element={<ResumePage />}
              />
              <Route
                path="/blog"
                element={<BlogPage />}
              />
              <Route
                path="/contact"
                element={<ContactPage />}
              />

              {/* Protected Administration Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />

              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />

        {/* Global Command Palette (Cmd/Ctrl + K) */}
        <CommandPalette
          isOpen={commandOpen}
          onClose={() => setCommandOpen(false)}
          onThemeChange={setCurrentTheme}
        />
      </div>
    </HashRouter>
  );
}
