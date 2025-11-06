import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AnimatedHero } from '@/components/sections/AnimatedHero';
import { AnimatedFeatures } from '@/components/sections/AnimatedFeatures';
import { AnimatedHowItWorks } from '@/components/sections/AnimatedHowItWorks';
import { AnimatedCTA } from '@/components/sections/AnimatedCTA';
import { FAQ } from '@/components/sections/FAQ';

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
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main>
        <AnimatedHero />
        <AnimatedFeatures />
        <AnimatedHowItWorks />
        
        {/* Testimonials Placeholder */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#945AE0] rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="container-content text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Loved by teams everywhere
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Testimonials coming soon. Join thousands of users who have simplified their group scheduling!
            </p>
          </div>
        </section>
        
        {/* FAQ Section */}
        <FAQ items={homeFAQ} />
        
        {/* Final CTA */}
        <AnimatedCTA />
      </main>
      <Footer />
    </div>
  );
}
