'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import type { JSX } from 'react';
import { useRef } from 'react';

export function ParallaxSpaceCruiser(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['-20%', '120%']);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div ref={ref} className="relative h-32 w-full overflow-hidden">
      <motion.div style={{ x, y }} className="absolute top-0 left-0 w-40">
        <Image
          src="/images/parallax.webp"
          alt=""
          width={200}
          height={120}
          className="h-auto w-full"
        />
      </motion.div>
    </div>
  );
}
