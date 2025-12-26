'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OrbitalBackground } from '@/components/ui/OrbitalBackground';
import { AnimatedGradient } from '@/components/ui/AnimatedGradient';
import { ArrowRight, Sparkles, Smartphone } from 'lucide-react';
import { useDeviceDetection } from '@/lib/useDeviceDetection';

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

const APP_STORE_URL = 'https://apps.apple.com/gb/app/schedulr/id6754965988';

export function AnimatedHero() {
  const deviceInfo = useDeviceDetection();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-40">
      <div className="container-content relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wide uppercase">
                {deviceInfo.isIOS ? 'Available Now' : 'Available on iOS'}
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 leading-[0.9] tracking-tight font-heading text-gray-900">
              Time <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-coral-500">
                Together.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-lg leading-relaxed font-medium">
              Coordinate schedules with friends, family, or your team.
              No more back-and-forth. Just simple, AI-powered planning.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {deviceInfo.canOpenAppStore ? (
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 justify-center rounded-full px-8 py-4 text-lg font-bold bg-indigo-600 text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
                >
                  <Smartphone className="w-5 h-5" />
                  Download App
                </a>
              ) : (
                <div
                  className="inline-flex flex-col items-center justify-center rounded-full px-8 py-4 text-lg font-bold bg-gray-100 text-gray-400 cursor-not-allowed"
                  title="iOS Only"
                >
                  <span>iOS Only</span>
                </div>
              )}
              <Link
                href="#features"
                className="inline-flex items-center gap-2 justify-center rounded-full px-8 py-4 text-lg font-bold text-gray-900 hover:bg-gray-50 border border-gray-200 transition-all duration-300"
              >
                How it works
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 flex gap-12 border-t border-gray-100 pt-8">
              <div>
                <div className="text-3xl font-bold text-indigo-600 font-heading">100%</div>
                <div className="text-sm text-gray-500 font-medium mt-1">Free for Groups</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-coral-500 font-heading">AI</div>
                <div className="text-sm text-gray-500 font-medium mt-1">Smart Scheduling</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] lg:h-[800px] w-full hidden lg:block"
          >
            {/* Abstract Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-indigo-100 via-purple-50 to-coral-50 rounded-full blur-3xl opacity-60 animate-pulse" />

            {/* Main iPhone */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[640px] z-20"
            >
              <div className="relative w-full h-full bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-gray-800">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20" />
                <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  <Image
                    src="/images/app-screenshots/iphone-dashboard.png"
                    alt="Schedulr Dashboard"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 320px, 400px"
                  />
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, 30, 0], x: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-20 right-10 z-30 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 max-w-[200px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Sparkles size={16} />
                </div>
                <div className="text-sm font-bold text-gray-900">Scheduly AI</div>
              </div>
              <div className="text-xs text-gray-500">"I found 3 times that work for everyone!"</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
