'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Mail, Bug, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AnimatedGradient } from '@/components/ui/AnimatedGradient';
import { OrbitalBackground } from '@/components/ui/OrbitalBackground';

interface Particle {
  startX: number;
  startY: number;
  distance: number;
  angle: number;
  width: number;
  height: number;
  background: string;
  duration: number;
  delay: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
    },
  },
};

export default function SupportPage() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generatedParticles: Particle[] = [];
    for (let i = 0; i < 10; i++) {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const distance = 15 + Math.random() * 30;
      const angle = Math.random() * Math.PI * 2;

      generatedParticles.push({
        startX,
        startY,
        distance,
        angle,
        width: 3 + Math.random() * 4,
        height: 3 + Math.random() * 4,
        background: i % 3 === 0
          ? 'rgba(79, 70, 229, 0.2)' // Indigo
          : i % 3 === 1
            ? 'rgba(255, 107, 107, 0.2)' // Coral
            : 'rgba(6, 182, 212, 0.15)', // Cyan
        duration: 4 + Math.random() * 2,
        delay: Math.random() * 2,
      });
    }
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-white pt-20 pb-20">
          <AnimatedGradient />
          <OrbitalBackground />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${particle.startX}%`,
                  top: `${particle.startY}%`,
                  width: `${particle.width}px`,
                  height: `${particle.height}px`,
                  background: particle.background,
                  willChange: 'transform, opacity',
                  filter: 'blur(2px)',
                }}
                animate={{
                  x: [0, Math.cos(particle.angle) * particle.distance, 0],
                  y: [0, Math.sin(particle.angle) * particle.distance, 0],
                  opacity: [0.1, 0.4, 0.1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: [0.4, 0, 0.6, 1] as [number, number, number, number],
                }}
              />
            ))}
          </div>

          <div className="container-content max-w-3xl relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              {/* Icon */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-600 mb-6 shadow-lg shadow-indigo-200"
              >
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                >
                  <Mail className="w-10 h-10 text-white" />
                </motion.div>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 font-heading leading-tight"
              >
                We're here to help!
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
              >
                Have a question? Drop us a line and we'll get back to you within 24 hours.
              </motion.p>

              {/* Email Button */}
              <motion.div
                variants={itemVariants}
                className="mb-8"
              >
                <motion.a
                  href="mailto:support@schedulr.co.uk"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 justify-center rounded-full px-8 py-4 text-lg font-bold min-h-[52px] bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  Email support@schedulr.co.uk
                </motion.a>
              </motion.div>

              {/* Divider */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center gap-4 mb-8"
              >
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent w-32"></div>
                <span className="text-sm text-gray-400 font-medium">or</span>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent w-32"></div>
              </motion.div>

              {/* Form Links */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.a
                  href="https://danblock97.atlassian.net/jira/software/c/form/769e1b07-92ad-4c12-8f28-902791f5a74d?atlOrigin=eyJpIjoiNDZiNzMxOWM0NDE5NDc2Y2IzMDU4NmY1M2JiNzBjNjMiLCJwIjoiaiJ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 justify-center rounded-full px-8 py-4 text-lg font-bold min-h-[52px] bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Bug className="w-5 h-5 text-coral-500" />
                  Report a Bug
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </motion.a>
                <motion.a
                  href="https://danblock97.atlassian.net/jira/software/c/form/e56fc642-7e09-4a9a-99ae-2f622abd3808?atlOrigin=eyJpIjoiNjc2M2E3YmMxMGU4NDdiMzk3NjY2Mjc1ZTE2NjAzMDIiLCJwIjoiaiJ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 justify-center rounded-full px-8 py-4 text-lg font-bold min-h-[52px] bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  Request a Feature
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </motion.a>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                variants={itemVariants}
                className="mt-16 flex flex-wrap justify-center gap-8 text-center"
              >
                {[
                  { label: 'Response Time', value: '< 24 hours' },
                  { label: 'Support Type', value: 'Email & Forms' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="px-6"
                  >
                    <div className="text-2xl font-bold text-indigo-600 font-heading">{stat.value}</div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

