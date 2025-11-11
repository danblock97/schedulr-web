'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import Image from 'next/image';

const screenshots = [
  {
    src: '/images/app-screenshots/iphone-dashboard.png',
    alt: 'Schedulr Dashboard',
    title: 'Dashboard',
    description: 'Your groups and schedules at a glance',
  },
  {
    src: '/images/app-screenshots/iphone-calendar-view.png',
    alt: 'Calendar View',
    title: 'Calendar View',
    description: 'See availability across your group',
  },
  {
    src: '/images/app-screenshots/iphone-scheduly-ai.png',
    alt: 'Scheduly AI Assistant',
    title: 'Scheduly AI',
    description: 'Ask in natural language to find meeting times',
  },
  {
    src: '/images/app-screenshots/iphone-scheduly-ai-2.png',
    alt: 'Scheduly AI Conversation',
    title: 'AI Conversations',
    description: 'Intelligent scheduling made simple',
  },
  {
    src: '/images/app-screenshots/iphone-invite.png',
    alt: 'Group Invites',
    title: 'Easy Invites',
    description: 'Share invite codes with your group',
  },
  {
    src: '/images/app-screenshots/iphone-profile-view.png',
    alt: 'Profile View',
    title: 'Profile & Settings',
    description: 'Manage your account and preferences',
  },
];

export function AppShowcase() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [inView]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-10"
            style={{
              width: `${400 + i * 100}px`,
              height: `${400 + i * 100}px`,
              background: i % 2 === 0
                ? 'linear-gradient(135deg, #FA4A8C, #945AE0)'
                : 'linear-gradient(135deg, #945AE0, #45A1FA)',
              left: `${i * 25}%`,
              top: `${i * 20}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div className="container-content relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FA4A8C] to-[#945AE0] mb-6 shadow-lg"
          >
            <Smartphone className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            See Schedulr in <span className="gradient-brand-text">Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the beautiful, intuitive interface that makes group scheduling delightful
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="relative h-[600px] md:h-[700px] rounded-3xl overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.3 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* iPhone Frame */}
                  <motion.div
                    initial={{ scale: 0.9, rotateY: -15 }}
                    animate={inView ? { scale: 1, rotateY: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="relative w-[280px] md:w-[350px] h-[600px] md:h-[700px]"
                  >
                    {/* Phone Shadow/Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FA4A8C]/20 to-[#945AE0]/20 rounded-[3rem] blur-2xl -z-10 scale-110" />
                    
                    {/* Phone Frame */}
                    <div className="relative w-full h-full bg-black rounded-[3rem] p-2 shadow-2xl">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
                      
                      {/* Screen */}
                      <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                        <Image
                          src={screenshots[currentIndex].src}
                          alt={screenshots[currentIndex].alt}
                          fill
                          className="object-cover"
                          priority={currentIndex < 2}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors group"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-[#FA4A8C] transition-colors" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors group"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-[#945AE0] transition-colors" />
            </button>
          </div>

          {/* Screenshot Info */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mt-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {screenshots[currentIndex].title}
            </h3>
            <p className="text-gray-600">{screenshots[currentIndex].description}</p>
          </motion.div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center gap-4 flex-wrap max-w-4xl mx-auto">
          {screenshots.map((screenshot, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className="relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-[#FA4A8C] shadow-lg shadow-[#FA4A8C]/30'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  fill
                  className="object-cover"
                />
                {index === currentIndex && (
                  <motion.div
                    layoutId="activeThumb"
                    className="absolute inset-0 bg-[#FA4A8C]/20"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {screenshots.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className="relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#FA4A8C]' : 'bg-gray-300'
                }`}
              />
              {index === currentIndex && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 bg-[#FA4A8C] rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

