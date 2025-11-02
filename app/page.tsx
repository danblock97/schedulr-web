import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { FAQ } from '@/components/sections/FAQ';
import { Button } from '@/components/ui/Button';
import { Users, CalendarSync, Sparkles } from 'lucide-react';
import Link from 'next/link';

const howItWorksSteps = [
  {
    icon: Users,
    title: 'Create or join a group',
    description: 'Set up a scheduling circle with your friends, family, or team members. Share an invite code to invite others.',
  },
  {
    icon: CalendarSync,
    title: 'Sync your calendar',
    description: 'Connect your device calendar for automatic availability. Your calendar data stays on your device—we never store it.',
  },
  {
    icon: Sparkles,
    title: 'Ask Scheduly to find free time',
    description: 'Use natural language to find the perfect meeting time. "When can me, Sarah, and Tom meet for 2 hours next week?"',
  },
];

const homeFAQ = [
  {
    question: 'How does Schedulr work?',
    answer: 'Schedulr lets you create groups and sync calendars with your friends. The AI assistant, Scheduly, helps you find the perfect time to meet by asking simple questions in natural language.',
  },
  {
    question: 'Is my calendar data safe?',
    answer: 'Absolutely! We use read-only calendar access to check your availability. Calendar events are stored securely on Supabase with Row Level Security (RLS) policies and encryption, ensuring only you can access your own data. Your privacy is our priority.',
  },
  {
    question: 'Do I need to pay to use Schedulr?',
    answer: 'No! Schedulr has a free tier that includes 1 group with up to 5 members and calendar sync. Pro plans are available for more groups, members, and AI features.',
  },
  {
    question: 'What makes Schedulr different?',
    answer: 'Schedulr focuses on group coordination rather than just personal calendars. With AI-powered availability finding and beautiful, playful design, scheduling becomes delightful instead of stressful.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Features />
        
        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-content">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                How It Works
              </h2>
              <p className="text-xl text-gray-800">
                Get started in three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {howItWorksSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FA4A8C] to-[#945AE0] rounded-full blur-xl opacity-30"></div>
                        <div className="relative p-6 rounded-full gradient-brand">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FA4A8C] text-white text-sm font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Testimonials Placeholder */}
        <section className="py-20 bg-white">
          <div className="container-content text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Loved by teams everywhere
            </h2>
            <p className="text-xl text-gray-800 max-w-2xl mx-auto">
              Testimonials coming soon. Join thousands of users who have simplified their group scheduling!
            </p>
          </div>
        </section>
        
        {/* FAQ Section */}
        <FAQ items={homeFAQ} />
        
        {/* Final CTA */}
        <section className="py-20 bg-gray-50">
          <div className="container-content text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Ready to simplify your scheduling?
            </h2>
            <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
              Download Schedulr today and experience the easiest way to coordinate group schedules.
            </p>
            <a
              href="https://apps.apple.com/app/schedulr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold min-h-[52px] gradient-brand text-white hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Download on the App Store
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
