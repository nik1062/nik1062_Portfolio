import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";
import { HashRouter, Route, Routes } from "react-router-dom";

// Common Components
import { DesktopNav } from "./components/common/DesktopNav";
import { MobileHeader } from "./components/common/MobileHeader";
import { ProfileRail } from "./components/common/ProfileRail";
import { BottomNav } from "./components/common/BottomNav";
import { CommandPalette } from "./components/common/CommandPalette";

// Pages
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { SkillsPage } from "./pages/SkillsPage";
import { CredentialsPage } from "./pages/CredentialsPage";
import { ResumePage } from "./pages/ResumePage";
import { BlogPage } from "./pages/BlogPage";
import { NowPage } from "./pages/NowPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminPage } from "./pages/AdminPage";

function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HashRouter>
      <div className="ambient-grid" />
      <DesktopNav />
      <MobileHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <ProfileRail />
      <main>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/credentials" element={<CredentialsPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/now" element={<NowPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
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

export default App;
