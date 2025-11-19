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
    <section className="pt-10 pb-20 bg-white">
      <div className="container-content">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
          }}
          className="relative rounded-[3rem] overflow-hidden bg-indigo-600 text-white px-8 py-20 text-center"
        >
          {/* Background Mesh */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-coral-500 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-heading leading-tight">
              Ready to simplify your <br />
              <span className="text-indigo-200">social life?</span>
            </h2>

            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              Join thousands of groups coordinating their schedules effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {deviceInfo.canOpenAppStore ? (
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 justify-center rounded-full px-8 py-4 text-lg font-bold bg-white text-indigo-600 shadow-xl hover:bg-indigo-50 hover:scale-105 transition-all duration-300"
                >
                  <Smartphone className="w-5 h-5" />
                  Download Now
                </a>
              ) : (
                <div className="inline-flex flex-col items-center justify-center rounded-full px-8 py-4 text-lg font-bold bg-indigo-800/50 text-indigo-300 cursor-not-allowed">
                  <span>iOS Only</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

