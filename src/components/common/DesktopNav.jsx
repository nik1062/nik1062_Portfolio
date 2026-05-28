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
    </nav>
  );
}
