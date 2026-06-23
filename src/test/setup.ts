import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import { createElement, forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import { afterEach, expect, vi } from 'vitest';

expect.extend(toHaveNoViolations);

afterEach(() => {
  cleanup();
});

/**
 * PLAN-TEST.md requires a global Framer Motion mock so animated
 * components render instantly (no transition delay) during tests.
 * Only `motion.div` is mocked because it's the only tag this codebase uses.
 */
vi.mock('framer-motion', () => {
  type MotionDivProps = ComponentPropsWithoutRef<'div'> & {
    initial?: unknown;
    animate?: unknown;
    exit?: unknown;
    whileHover?: unknown;
    whileTap?: unknown;
    whileInView?: unknown;
    viewport?: unknown;
    transition?: unknown;
  };

  const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(function MotionDiv(
    { initial, animate, exit, whileHover, whileTap, whileInView, viewport, transition, ...rest },
    ref,
  ): ReactElement {
    void initial;
    void animate;
    void exit;
    void whileHover;
    void whileTap;
    void whileInView;
    void viewport;
    void transition;
    return createElement('div', { ...rest, ref });
  });

  return {
    motion: { div: MotionDiv },
    AnimatePresence: ({ children }: { children?: ReactNode }): ReactNode => children,
    useScroll: (): { scrollYProgress: { get: () => number } } => ({
      scrollYProgress: { get: () => 0 },
    }),
    useTransform: (): number => 0,
  };
});
