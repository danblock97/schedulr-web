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
  Bell,
  Check
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const ChatSimulation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      // Reset
      setStep(0);

      // Step 0: User asks (Initial state)
      await new Promise(r => setTimeout(r, 1000));

      // Step 1: AI Thinking
      setStep(1);
      await new Promise(r => setTimeout(r, 1500));

      // Step 2: AI Response (Options)
      setStep(2);
      await new Promise(r => setTimeout(r, 2500));

      // Step 3: User selects/creates
      setStep(3);
      await new Promise(r => setTimeout(r, 1000));

      // Step 4: AI Thinking again
      setStep(4);
      await new Promise(r => setTimeout(r, 1500));

      // Step 5: AI Confirmation
      setStep(5);

      // Loop after delay
      await new Promise(r => setTimeout(r, 4000));
      setStep(0);
    };

    sequence();
    // Since we want this to loop, we can just call it. 
    // In a real useEffect we'd manage cleanup but for this simple animation loop it's okay to just let it run.
    // Better: use an interval or recursive timeout if we want strict control, but this is fine for a demo.
    const interval = setInterval(() => {
      // The sequence function handles the timing, but to make it robust we could just restart it.
      // Actually, the recursive nature inside sequence (via the loop logic at the end) is tricky with useEffect.
      // Let's just use a simple timeout chain in a separate function that we call once.
    }, 12000); // approximate total duration

    return () => clearInterval(interval);
  }, []);

  // Better loop implementation
  useEffect(() => {
    let mounted = true;

    const runSequence = async () => {
      while (mounted) {
        setStep(0); // User: "When are we free?"
        await new Promise(r => setTimeout(r, 1500));
        if (!mounted) break;

        setStep(1); // AI Typing...
        await new Promise(r => setTimeout(r, 1500));
        if (!mounted) break;

        setStep(2); // AI: "Found 3 slots..."
        await new Promise(r => setTimeout(r, 3000));
        if (!mounted) break;

        setStep(3); // User: "Let's do Friday!"
        await new Promise(r => setTimeout(r, 1000));
        if (!mounted) break;

        setStep(4); // AI Typing...
        await new Promise(r => setTimeout(r, 1500));
        if (!mounted) break;

        setStep(5); // AI: "Event created!"
        await new Promise(r => setTimeout(r, 4000));
      }
    };

    runSequence();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="relative z-10 mt-auto flex flex-col gap-3 min-h-[220px] justify-end">
      <AnimatePresence mode="popLayout">
        {/* Step 0: User Question */}
        {step >= 0 && (
          <motion.div
            key="user-question"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="self-end bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 text-sm max-w-[85%] shadow-lg"
          >
            When are we all free for dinner?
          </motion.div>
        )}

        {/* Step 1: Typing Indicator */}
        {step === 1 && (
          <motion.div
            key="typing-1"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="self-start bg-white text-gray-500 rounded-2xl rounded-tl-sm px-4 py-3 text-sm shadow-sm flex items-center gap-1"
          >
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </motion.div>
        )}

        {/* Step 2: AI Options */}
        {step >= 2 && (
          <motion.div
            key="ai-options"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="self-start bg-white text-gray-800 rounded-2xl rounded-tl-sm p-3 text-sm w-full shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center">
                <Sparkles size={10} className="text-indigo-600" />
              </div>
              <span className="text-xs font-bold text-indigo-600">Scheduly</span>
            </div>
            <p className="mb-2">I found 3 slots:</p>
            <div className="space-y-1">
              <div className="bg-gray-50 rounded px-2 py-1 text-xs border-l-2 border-green-500">Fri, 7:00 PM</div>
              <div className="bg-gray-50 rounded px-2 py-1 text-xs border-l-2 border-green-500">Sat, 1:00 PM</div>
            </div>
          </motion.div>
        )}

        {/* Step 3: User Selection */}
        {step >= 3 && (
          <motion.div
            key="user-selection"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="self-end bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 text-sm max-w-[85%] shadow-sm"
          >
            Let's do Friday!
          </motion.div>
        )}

        {/* Step 4: Typing Indicator */}
        {step === 4 && (
          <motion.div
            key="typing-4"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="self-start bg-white text-gray-500 rounded-2xl rounded-tl-sm px-4 py-3 text-sm shadow-sm flex items-center gap-1"
          >
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </motion.div>
        )}

        {/* Step 5: AI Confirmation */}
        {step === 5 && (
          <motion.div
            key="ai-confirmation"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="self-start bg-white text-gray-800 rounded-2xl rounded-tl-sm p-3 text-sm max-w-[90%] shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center">
                <Sparkles size={10} className="text-indigo-600" />
              </div>
              <span className="text-xs font-bold text-indigo-600">Scheduly</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <Check size={16} />
              <span>Event created for Friday at 7:00 PM!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const features = [
  {
    icon: Users,
    title: 'Group Scheduling',
    description: 'Create groups and sync calendars with your friends',
    color: 'from-indigo-500 to-indigo-400',
  },
  {
    icon: Calendar,
    title: 'Calendar Sync',
    description: 'Connect your device calendar for automatic availability',
    color: 'from-coral-500 to-coral-400', // Will need to define coral in tailwind or use hex
  },
  {
    icon: Sparkles,
    title: 'AI Assistant',
    description: 'Ask Scheduly to find the perfect meeting time in natural language',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: LayoutGrid,
    title: 'Multiple Views',
    description: 'Year, Month, or List view - choose what works for you',
    color: 'from-violet-500 to-indigo-500',
  },
  {
    icon: Palette,
    title: 'Beautiful Design',
    description: 'Custom themes and playful animations make scheduling delightful',
    color: 'from-indigo-500 to-cyan-500',
  },
  {
    icon: Bell,
    title: 'Smart Invites',
    description: 'Share invite codes with your group - simple sign-up with email',
    color: 'from-coral-500 to-orange-400',
  },
];

// ... (variants remain the same)

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
    <section id="features" className="py-32 bg-white relative overflow-hidden">
      <div className="container-content relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 font-heading">
              Everything you need to <br />
              <span className="text-indigo-600">coordinate chaos.</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Powerful features wrapped in a beautiful, intuitive interface.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Column 1: Group Scheduling + Combined Features */}
            <div className="flex flex-col gap-2">
              {/* Feature 1: Group Scheduling */}
              <motion.div variants={itemVariants} className="bg-gray-50 rounded-2xl p-6 relative overflow-hidden group flex flex-col">
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-indigo-600 mb-6 shadow-sm">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 font-heading">Group Scheduling</h3>
                    <p className="text-gray-500">Create groups for your friends, family, or team. Sync everyone's availability in seconds.</p>
                  </div>
                  <div className="mt-8 flex -space-x-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-gray-50 bg-gray-200" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`, backgroundSize: 'cover' }} />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Feature 2: Combined Sync & Themes */}
              <motion.div variants={itemVariants} className="bg-gray-50 rounded-2xl p-6 relative overflow-hidden group flex flex-col">
                <div className="flex flex-col h-full justify-between gap-6">
                  {/* Calendar Sync Part */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-coral-500 shadow-sm">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 font-heading">Calendar Sync</h3>
                    </div>
                    <p className="text-gray-500 text-sm">Works with Google, Apple, and Outlook calendars automatically.</p>
                  </div>

                  <div className="w-full h-px bg-gray-200" />

                  {/* Themes Part */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-cyan-600 shadow-sm">
                        <Palette className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 font-heading">Beautiful Themes</h3>
                    </div>
                    <p className="text-gray-500 text-sm">Customize your app icon and interface to match your vibe.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Column 2: AI Assistant (Tall) */}
            <motion.div variants={itemVariants} className="bg-gray-50 rounded-2xl p-6 relative overflow-hidden group flex flex-col h-full min-h-[500px]">
              <div className="relative z-10 mb-4 shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-indigo-600 mb-4 shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-1 font-heading text-gray-900">AI Assistant</h3>
                <p className="text-gray-500">Just ask Scheduly to find the perfect time.</p>
              </div>

              {/* Chat Interface Simulation */}
              <div className="grow flex flex-col justify-end">
                <ChatSimulation />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

