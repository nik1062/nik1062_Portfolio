import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "../../constants";

export function MobileHeader({ menuOpen, setMenuOpen }) {
  return (
    <header className="mobile-header">
      <Link to="/" className="mobile-brand">
        NK
      </Link>
      <button type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      {menuOpen && (
        <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mobile-menu">
          {navItems.map(([label, path]) => (
            <NavLink key={path} to={path} onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
        </motion.nav>
      )}
    </header>
  );
}
