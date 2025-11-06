'use client';

import { motion } from 'framer-motion';

export function AnimatedGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: 'radial-gradient(circle, rgba(250, 74, 140, 0.1) 0%, rgba(148, 90, 224, 0.1) 50%, transparent 70%)',
          filter: 'blur(30px)',
          willChange: 'transform',
        }}
      />
      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: 'radial-gradient(circle, rgba(69, 161, 250, 0.06) 0%, rgba(46, 205, 168, 0.06) 50%, transparent 70%)',
          filter: 'blur(30px)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}

