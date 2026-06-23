'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { JSX } from 'react';

export function HeroSection(): JSX.Element {
  return (
    <section className="relative flex h-[80vh] min-h-120 w-full items-center justify-center overflow-hidden">
      <Image
        src="/images/background.jpg"
        alt=""
        fill
        priority
        fetchPriority="high"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-background" />

      <div className="relative flex flex-col items-center gap-6">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Image
            src="/images/rick-and-morty.svg"
            alt="Rick and Morty"
            width={320}
            height={96}
            priority
          />
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [0, -15, 0] }}
          transition={{
            scale: { duration: 0.6, delay: 0.4 },
            opacity: { duration: 0.6, delay: 0.4 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 },
          }}
        >
          <Image
            src="/images/hero-section-foreground.png"
            alt="Rick e Morty"
            width={420}
            height={420}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
