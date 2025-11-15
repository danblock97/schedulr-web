'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Smartphone } from 'lucide-react';
import { useDeviceDetection } from '@/lib/useDeviceDetection';

const APP_STORE_URL = 'https://apps.apple.com/gb/app/schedulr/id6754965988';

export function AnimatedCTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const deviceInfo = useDeviceDetection();

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#FA4A8C] rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#945AE0] rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="container-content text-center relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FA4A8C]/10 to-[#945AE0]/10 border border-[#FA4A8C]/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#FA4A8C]" />
            <span className="text-sm font-medium text-gray-700">
              {deviceInfo.isIOS ? 'Available Now' : 'Available on iOS'}
            </span>
          </motion.div>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900"
          >
            Ready to simplify your{' '}
            <span className="gradient-brand-text">scheduling</span>?
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            {deviceInfo.canOpenAppStore
              ? 'Download Schedulr now and experience the easiest way to coordinate group schedules.'
              : 'Schedulr is available for iPhone and iPad. Open this page on your iOS device to download and start coordinating schedules effortlessly.'}
          </motion.p>

          {deviceInfo.canOpenAppStore ? (
            <motion.a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 justify-center rounded-full px-8 py-4 text-lg font-semibold min-h-[52px] gradient-brand text-white shadow-lg shadow-[#FA4A8C]/30 hover:shadow-xl hover:shadow-[#FA4A8C]/40 transition-all duration-300"
            >
              <Smartphone className="w-5 h-5" />
              Download on the App Store
            </motion.a>
          ) : (
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex flex-col items-center justify-center rounded-full px-8 py-4 text-lg font-semibold min-h-[52px] gradient-brand text-white shadow-lg shadow-[#FA4A8C]/30 opacity-90"
              title="Schedulr is available for iPhone and iPad. Open this page on your iOS device to download."
            >
              <span>iOS Only</span>
              <span className="text-sm font-normal opacity-90">Open on iPhone/iPad</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

