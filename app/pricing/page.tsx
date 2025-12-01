import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - Schedulr',
  description: 'Simple, transparent pricing for Schedulr. Free tier available. Pro plans unlock more groups, members, and AI features.',
};

const pricingFAQ = [
  {
    question: 'How does the subscription work?',
    answer: 'Subscriptions are managed through the App Store on iOS. You can choose between monthly (£4.99/month) or yearly (£44.99/year) billing. Subscriptions automatically renew unless cancelled.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes! You can cancel your subscription at any time through your App Store account settings. Your subscription will remain active until the end of the current billing period, and you\'ll have access to Pro features until then.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'All payments are processed through the App Store, so you can use any payment method linked to your Apple ID, including credit cards, debit cards, and Apple Pay.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Schedulr offers a free tier that you can use forever with no trial period required. The free tier includes 1 group with up to 5 members and calendar sync. Try it out and upgrade to Pro when you need more features!',
  },
  {
    question: 'What\'s the difference between Free and Pro?',
    answer: 'Free tier: 1 group, 5 members per group, calendar sync, basic support. Pro tier: unlimited groups, unlimited members per group, calendar sync, AI Assistant (300 requests/month), priority support. Both tiers include all core scheduling features.',
  },
  {
    question: 'Can I change my subscription tier?',
    answer: 'Yes! You can upgrade from Free to Pro at any time through the app. If you cancel Pro, you\'ll move back to Free tier after your current billing period ends. There\'s a grace period system in place to prevent data loss.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Refunds are handled by Apple through the App Store\'s standard refund policy. If you have questions about a refund, please contact Apple Support or reach out to us at support@schedulr.co.uk.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Pricing />
        <FAQ items={pricingFAQ} />
      </main>
      <Footer />
    </div>
  );
}

