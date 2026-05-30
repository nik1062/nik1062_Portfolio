import React from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../../constants";

export function DesktopNav() {
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
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12, paddingRight: 20 }}>
        <div className="status-dot" style={{ position: "relative", width: 8, height: 8, borderRadius: "50%", background: "#4caf50", boxShadow: "0 0 10px #4caf50" }}>
          <div style={{ position: "absolute", inset: -2, borderRadius: "50%", border: "2px solid #4caf50", animation: "pulse 2s infinite" }} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--soft)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Available for hire</span>
      </div>
    </nav>
  );
}
