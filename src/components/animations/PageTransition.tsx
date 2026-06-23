'use client';

import { motion } from 'framer-motion';
import type { JSX, ReactNode } from 'react';

export interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Lives in app/template.tsx, which Next.js remounts on every navigation,
 * so a plain enter animation is enough to produce a transition between
 * routes without needing AnimatePresence to persist across navigations.
 */
export function PageTransition({ children }: PageTransitionProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
