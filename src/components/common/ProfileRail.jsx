import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { profile } from "../../data/portfolio.js";

export function ProfileRail() {
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
