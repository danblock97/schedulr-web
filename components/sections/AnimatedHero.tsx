'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OrbitalBackground } from '@/components/ui/OrbitalBackground';
import { AnimatedGradient } from '@/components/ui/AnimatedGradient';
import { ArrowRight, Sparkles } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

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

export function AnimatedHero() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    // Reduced from 30 to 12 for better performance
    const generatedParticles: Particle[] = [];
    for (let i = 0; i < 12; i++) {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const distance = 20 + Math.random() * 40;
      const angle = Math.random() * Math.PI * 2;
      
      generatedParticles.push({
        startX,
        startY,
        distance,
        angle,
        width: 4 + Math.random() * 4,
        height: 4 + Math.random() * 4,
        background: i % 3 === 0 
          ? 'rgba(250, 74, 140, 0.25)' 
          : i % 3 === 1
          ? 'rgba(148, 90, 224, 0.25)'
          : 'rgba(69, 161, 250, 0.2)',
        duration: 5 + Math.random() * 2,
        delay: Math.random() * 2,
      });
    }
    setParticles(generatedParticles);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      <AnimatedGradient />
      <OrbitalBackground />
      
      {/* Floating particles - optimized for performance */}
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
              opacity: [0.15, 0.5, 0.15],
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

      {/* Floating iPhone Mockups */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        {/* Left iPhone */}
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -15 }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            x: [0, -20, 0],
            y: [0, 30, 0],
            rotate: [-15, -12, -15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[200px] h-[400px]"
        >
          <div className="relative w-full h-full bg-black rounded-[2.5rem] p-2 shadow-2xl">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-20" />
            <div className="relative w-full h-full bg-white rounded-[2rem] overflow-hidden">
              <Image
                src="/images/app-screenshots/iphone-dashboard.png"
                alt="Schedulr Dashboard"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Right iPhone */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 15 }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            x: [0, 20, 0],
            y: [0, -30, 0],
            rotate: [15, 12, 15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[200px] h-[400px]"
        >
          <div className="relative w-full h-full bg-black rounded-[2.5rem] p-2 shadow-2xl">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-20" />
            <div className="relative w-full h-full bg-white rounded-[2rem] overflow-hidden">
              <Image
                src="/images/app-screenshots/iphone-calendar-view.png"
                alt="Calendar View"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Center iPhone (smaller, behind text) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.2, 0.3, 0.2],
            scale: [0.8, 0.85, 0.8],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.8,
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[360px] -z-10"
        >
          <div className="relative w-full h-full bg-black rounded-[2.5rem] p-2 shadow-2xl blur-sm">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-20" />
            <div className="relative w-full h-full bg-white rounded-[2rem] overflow-hidden">
              <Image
                src="/images/app-screenshots/iphone-scheduly-ai.png"
                alt="Scheduly AI"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container-content relative z-10 text-center py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FA4A8C]/10 to-[#945AE0]/10 border border-[#FA4A8C]/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#FA4A8C]" />
            <span className="text-sm font-medium text-gray-700">
              Coming Soon to the App Store
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-brand-text leading-tight"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Schedulr
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900"
          >
            Group Scheduling Made Simple
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-600 leading-relaxed"
          >
            Find the perfect time to meet with your friends, family, or team. 
            No more back-and-forth texts. Just smart, AI-powered scheduling.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold min-h-[52px] gradient-brand text-white shadow-lg shadow-[#FA4A8C]/30 opacity-75 cursor-not-allowed"
            >
              Coming Soon
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="#features"
                className="inline-flex items-center gap-2 justify-center rounded-full px-8 py-4 text-lg font-semibold min-h-[52px] text-[#FA4A8C] hover:text-[#945AE0] border-2 border-[#FA4A8C] hover:border-[#945AE0] transition-all duration-300"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats or additional info */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-wrap justify-center gap-8 text-center"
          >
            {[
              { label: 'Calendar Sync', value: 'Automatic' },
              { label: 'AI Powered', value: 'Scheduly' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="px-6"
              >
                <div className="text-2xl font-bold gradient-brand-text">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

