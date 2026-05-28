import React from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../../constants";

export function BottomNav() {
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
