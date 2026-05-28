import React from "react";
import { motion } from "framer-motion";
import { pageMotion } from "../../constants";

export function PageShell({ children }) {
  return (
    <motion.div {...pageMotion} className="page-shell">
      {children}
    </motion.div>
  );
}
