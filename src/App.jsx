import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from "react-router-dom";
import SEO from "./components/SEO";
import Navbar from "./components/Navbar";
import StatusStrip from "./components/StatusStrip";
import Hero from "./components/Hero";
import TrackToggle from "./components/TrackToggle";
import CaseStudies from "./components/CaseStudies";
import SkillsMatrix from "./components/SkillsMatrix";
import SecondaryWork from "./components/SecondaryWork";
import CommandPalette from "./components/CommandPalette";
import Footer from "./components/Footer";

// Lazy-load admin & secondary components for code-splitting & Lighthouse speed
const LoginPage = lazy(() => import("./components/LoginPage"));
const AdminPanel = lazy(() => import("./components/AdminPanel"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

function PortfolioHome({ activeTrack, setActiveTrack, onOpenCommand, currentTheme, setCurrentTheme }) {
  return (
    <div className="obsidian-canvas">
      <SEO />
      <StatusStrip />
      <Navbar
        onOpenCommand={onOpenCommand}
        activeTrack={activeTrack}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />
      <main id="main-content">
        <Hero />
        <TrackToggle activeTrack={activeTrack} onTrackChange={setActiveTrack} />
        <CaseStudies activeTrack={activeTrack} />
        <SkillsMatrix activeTrack={activeTrack} />
        <SecondaryWork />
      </main>
      <Footer />
    </div>
  );
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
      <Suspense fallback={<div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>Loading...</div>}>
        <Routes>
          {/* Main Redesigned Experience */}
          <Route
            path="/"
            element={
              <PortfolioHome
                activeTrack={activeTrack}
                setActiveTrack={setActiveTrack}
                onOpenCommand={() => setCommandOpen(true)}
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
              />
            }
          />

          {/* Direct deep-link route aliases that route to the corresponding sections on Home */}
          <Route
            path="/projects"
            element={
              <PortfolioHome
                activeTrack={activeTrack}
                setActiveTrack={setActiveTrack}
                onOpenCommand={() => setCommandOpen(true)}
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
              />
            }
          />
          <Route
            path="/resume"
            element={
              <PortfolioHome
                activeTrack={activeTrack}
                setActiveTrack={setActiveTrack}
                onOpenCommand={() => setCommandOpen(true)}
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
              />
            }
          />
          <Route
            path="/skills"
            element={
              <PortfolioHome
                activeTrack={activeTrack}
                setActiveTrack={setActiveTrack}
                onOpenCommand={() => setCommandOpen(true)}
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
              />
            }
          />
          <Route
            path="/credentials"
            element={
              <PortfolioHome
                activeTrack={activeTrack}
                setActiveTrack={setActiveTrack}
                onOpenCommand={() => setCommandOpen(true)}
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <PortfolioHome
                activeTrack={activeTrack}
                setActiveTrack={setActiveTrack}
                onOpenCommand={() => setCommandOpen(true)}
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
              />
            }
          />

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

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      {/* Global Command Palette (Cmd/Ctrl + K) */}
      <CommandPalette
        open={commandOpen}
        setOpen={setCommandOpen}
        onSelectTrack={(track) => setActiveTrack(track)}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />
    </HashRouter>
  );
}
