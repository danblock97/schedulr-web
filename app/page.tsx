import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AnimatedHero } from '@/components/sections/AnimatedHero';
import { AnimatedFeatures } from '@/components/sections/AnimatedFeatures';
import { AnimatedHowItWorks } from '@/components/sections/AnimatedHowItWorks';
import { AppShowcase } from '@/components/sections/AppShowcase';
import { AppStoreReviews } from '@/components/sections/AppStoreReviews';
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: homeFAQ.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <Navbar />
      <main>
        <AnimatedHero />
        <AnimatedFeatures />
        <AnimatedHowItWorks />
        <AppShowcase />
        <AppStoreReviews />
        <FAQ items={homeFAQ} />

        {/* Final CTA */}
        <AnimatedCTA />
      </main>
      <Footer />
    </div>
  );
}
