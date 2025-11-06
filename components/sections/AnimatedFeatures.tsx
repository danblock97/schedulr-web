'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/Card';
import { 
  Users, 
  Calendar, 
  Sparkles, 
  LayoutGrid, 
  Palette, 
  Bell 
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Group Scheduling',
    description: 'Create groups and sync calendars with your friends',
    color: 'from-[#FA4A8C] to-[#FF6BA8]',
  },
  {
    icon: Calendar,
    title: 'Calendar Sync',
    description: 'Connect your device calendar for automatic availability',
    color: 'from-[#945AE0] to-[#B87CFF]',
  },
  {
    icon: Sparkles,
    title: 'AI Assistant',
    description: 'Ask Scheduly to find the perfect meeting time in natural language',
    color: 'from-[#45A1FA] to-[#6BB5FF]',
  },
  {
    icon: LayoutGrid,
    title: 'Multiple Views',
    description: 'Year, Month, or List view - choose what works for you',
    color: 'from-[#2ECDA8] to-[#4FE5C0]',
  },
  {
    icon: Palette,
    title: 'Beautiful Design',
    description: 'Custom themes and playful animations make scheduling delightful',
    color: 'from-[#FA4A8C] to-[#945AE0]',
  },
  {
    icon: Bell,
    title: 'Smart Invites',
    description: 'Share invite codes with your group - simple sign-up with email',
    color: 'from-[#945AE0] to-[#45A1FA]',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function AnimatedFeatures() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FA4A8C] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#945AE0] rounded-full blur-3xl" />
      </div>

      <div className="container-content relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900"
            >
              Scheduling should be{' '}
              <span className="gradient-brand-text">simple</span>, not stressful.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Everything you need to coordinate schedules with your group, all in one beautiful app.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="text-center h-full relative overflow-hidden group">
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <motion.div
                        className="flex justify-center mb-4"
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

