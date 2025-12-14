import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import {
  Users,
  Calendar,
  Sparkles,
  LayoutGrid,
  Palette,
  Bell
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features - Schedulr',
  description: 'Discover all the features that make Schedulr the best group scheduling app. Group management, calendar sync, AI assistant, and more.',
};

const featureDetails = [
  {
    icon: Users,
    title: 'Group Management',
    description: 'Create and manage scheduling circles with ease',
    benefits: [
      'Create unlimited groups (based on your plan)',
      'Invite members with invite codes - simple email sign-up required',
      'Set custom group names and descriptions',
      'Manage member permissions',
      'Leave groups anytime',
    ],
    useCases: [
      'Coordinate with your friend group for weekly meetups',
      'Plan team meetings with your colleagues',
      'Organize family events and gatherings',
      'Schedule study sessions with classmates',
    ],
  },
  {
    icon: Calendar,
    title: 'Calendar Sync',
    description: 'Automatic availability from your device calendar',
    benefits: [
      'Real-time calendar synchronization',
      'Read-only access - your data stays on your device',
      'Works with all calendars on your device',
      'Automatic updates when your schedule changes',
      'Privacy-first: no calendar data stored on servers',
    ],
    useCases: [
      'See everyone\'s availability at a glance',
      'Find gaps in busy schedules automatically',
      'Keep your calendar in sync across devices',
      'Coordinate across time zones',
    ],
  },
  {
    icon: Sparkles,
    title: 'AI Assistant (Scheduly)',
    description: 'Natural language scheduling queries powered by OpenAI',
    benefits: [
      'Ask questions in plain English',
      'Find optimal meeting times automatically',
      'Handle complex scheduling scenarios',
      'Respect timezone differences',
      'Suggest alternatives when primary time isn\'t available',
    ],
    useCases: [
      '"When can me, Sarah, and Tom meet for 2 hours next week?"',
      '"Find a 30-minute slot for our team standup this week"',
      '"What\'s the best time for our monthly book club?"',
    ],
  },
  {
    icon: LayoutGrid,
    title: 'Multiple Views',
    description: 'Year, Month, or List view - your choice',
    benefits: [
      'Year view: see the big picture',
      'Month view: detailed monthly calendar',
      'List view: simple chronological list',
      'Switch views instantly',
      'All views show group availability',
    ],
    useCases: [
      'Plan long-term events with year view',
      'Schedule weekly meetings with month view',
      'Quickly scan upcoming events with list view',
    ],
  },
  {
    icon: Palette,
    title: 'Themes',
    description: 'Custom themes and playful animations',
    benefits: [
      'Multiple preset color themes',
      'Create custom themes with your favorite colors',
      'Beautiful, playful animations',
      'Dark mode support',
      'Make scheduling delightful, not stressful',
    ],
    useCases: [
      'Match your app theme to your personality',
      'Use different themes for different groups',
      'Enjoy a visually pleasing scheduling experience',
    ],
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Stay updated on group activities',
    benefits: [
      'Push notifications for group updates',
      'Reminders for upcoming meetings',
      'Notifications when someone joins your group',
      'Customizable notification preferences',
      'Never miss an important scheduling update',
    ],
    useCases: [
      'Get notified when someone finds free time',
      'Reminders for meetings you\'ve scheduled',
      'Know when friends join your scheduling circle',
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <section className="pt-40 pb-12 bg-white">
          <div className="container-content">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">
                Powerful Features
              </h1>
              <p className="text-xl text-gray-800 max-w-2xl mx-auto">
                Everything you need to coordinate schedules with your groups, beautifully designed and easy to use.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-content">
            <div className="space-y-24">
              {featureDetails.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      } gap-12 items-center`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="p-4 rounded-2xl gradient-brand">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">{feature.title}</h2>
                      </div>
                      <p className="text-xl text-gray-800 mb-8">
                        {feature.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="font-semibold text-lg mb-4 text-gray-900">Benefits</h3>
                          <ul className="space-y-2">
                            {feature.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <span className="text-[#33C756] mt-1">✓</span>
                                <span className="text-gray-700">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-4 text-gray-900">Use Cases</h3>
                          <ul className="space-y-2">
                            {feature.useCases.map((useCase, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <span className="text-[#945AE0] mt-1">•</span>
                                <span className="text-gray-700">{useCase}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

