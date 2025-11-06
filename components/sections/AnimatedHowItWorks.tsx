'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, CalendarSync, Sparkles } from 'lucide-react';

const howItWorksSteps = [
  {
    icon: Users,
    title: 'Create or join a group',
    description: 'Set up a scheduling circle with your friends, family, or team members. Share an invite code to invite others.',
    color: 'from-[#FA4A8C] to-[#FF6BA8]',
  },
  {
    icon: CalendarSync,
    title: 'Sync your calendar',
    description: 'Connect your device calendar for automatic availability. Your calendar data stays on your device—we never store it.',
    color: 'from-[#945AE0] to-[#B87CFF]',
  },
  {
    icon: Sparkles,
    title: 'Ask Scheduly to find free time',
    description: 'Use natural language to find the perfect meeting time. "When can me, Sarah, and Tom meet for 2 hours next week?"',
    color: 'from-[#45A1FA] to-[#6BB5FF]',
  },
];

export function AnimatedHowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              background: i === 0 
                ? 'linear-gradient(135deg, #FA4A8C, #945AE0)'
                : i === 1
                ? 'linear-gradient(135deg, #945AE0, #45A1FA)'
                : 'linear-gradient(135deg, #45A1FA, #2ECDA8)',
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div className="container-content relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
              How It <span className="gradient-brand-text">Works</span>
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorksSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="text-center relative"
                >
                  {/* Step number badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{
                      delay: index * 0.2 + 0.3,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    className="mb-6"
                  >
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#FA4A8C] to-[#945AE0] text-white text-lg font-bold shadow-lg">
                      {index + 1}
                    </span>
                  </motion.div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      {/* Glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full blur-xl opacity-30`} />
                      <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${step.color} shadow-2xl`}>
                        <Icon className="w-8 h-8 text-white relative z-10" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

