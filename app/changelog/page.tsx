import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ChangelogList } from '@/components/changelog/ChangelogList';

export const metadata: Metadata = {
  title: 'Changelog - Schedulr',
  description: 'Stay up to date with the latest updates, features, and improvements to Schedulr.',
};

const versions = [
  {
    version: '1.6.3',
    displayDate: 'Dec 20, 2025',
    title: 'AI Suggestions and Liquid Glass Support',
    summary: 'Our latest update brings AI-powered event suggestions and Liquid Glass support, alongside a suite of UI improvements and critical bug fixes.',
    improvements: [
      'Introduced AI-powered event suggestions to streamline your scheduling',
      'Added support for Liquid Glass displays',
      'Enhanced general UI elements for a smoother experience',
      'Improved Scheduly warning text visibility',
      'Refined widget UI for better clarity',
      'Added an option to prevent unwanted screen rotation',
    ],
    fixes: [
      'Resolved an issue where the Scheduly chatbox contained extra whitespace',
      'Fixed the navbar positioning being too low on certain devices',
      'Corrected a bug where daily reminder notifications were not being received',
    ],
  },
  {
    version: '1.6.2',
    displayDate: 'Dec 15, 2025',
    title: 'New Support and Feedback Options',
    summary: 'We\'ve added several new ways to interact with us and identify support options more easily.',
    improvements: [
      'Added a button to easily request a feature to the app',
      'Improved the UI of the navbar for better user experience.',
    ],
    fixes: [
      'Changed the UI of the support button to be better identifiable for bug reporting',
    ],
  },
  {
    version: '1.6.1',
    displayDate: 'Dec 12, 2025',
    title: 'In-App Support Tickets',
    summary: 'You can now create support tickets directly within the app, and we\'ve tightened up some backend security.',
    improvements: [
      'Updated support link in app to be a form which creates a ticket directly to the devs in app.',
    ],
    fixes: [
      'Fixed some backend RLS issues',
    ],
  },
  {
    version: '1.6.0',
    displayDate: 'Dec 10, 2025',
    title: 'Experience Enhancements and Notifications',
    summary: 'A major polish to the user interface across various screens and the introduction of opt-out timed notifications.',
    improvements: [
      'Added quick follow up buttons in Scheduly conversations',
      'Improved UI of loading screen',
      'Improved UI of the navbar',
      'Improved UI of Scheduly',
      'Improved UI of Calendar',
      'Added timed notifications you can opt out of in profile settings.',
    ],
  },
  {
    version: '1.5.1',
    displayDate: 'Dec 5, 2025',
    title: 'Sign in Improvements',
    summary: 'Addressing specific issues with authentication flows for a smoother login experience.',
    fixes: [
      'Fixed Sign in with Apple requiring a long press to work',
    ],
  },
  {
    version: '1.5.0',
    displayDate: 'Dec 5, 2025',
    title: 'AI Intelligence and Persistence',
    summary: 'Making Scheduly smarter and more helpful with chat persistence and quick time proposals.',
    improvements: [
      'Added AI Chat persistence',
      'Added quick prompts for AI',
      'Added a quick time proposal to quickly set up meetings either using our calendar engine or use of Scheduly AI',
      'Improved natural language recognition with Scheduly AI',
    ],
  },
  {
    version: '1.4.1',
    displayDate: 'Dec 4, 2025',
    title: 'Group Management and Dark Mode Polish',
    summary: 'Enhanced group controls for owners and a significant cleanup of theme consistency across the app.',
    improvements: [
      'Group owners can now remove group members',
    ],
    fixes: [
      'Fixed dark mode theme to be more readable',
      'Fixed app theme not applying in all cases. (123 instances fixed across the app)',
    ],
  },
  {
    version: '1.4.0',
    displayDate: 'Dec 3, 2025',
    title: 'Personalized Notifications',
    summary: 'Adding more depth to notifications and how you can personalize them in your profile settings.',
    improvements: [
      'Subtle UI improvements',
      'Added more meaningful notifications which can be personalised in profile settings in profile > app settings',
    ],
  },
  {
    version: '1.3.3',
    displayDate: 'Dec 2, 2025',
    title: 'Dashboard and Onboarding Overhaul',
    summary: 'A fresh look for your first experience and daily workspace, along with improved Pro value.',
    improvements: [
      'UI overhaul for login screen, onboarding, profile view and dashboard',
      'Pro value improvements, same price gets you unlimited groups, unlimited members and 300 requests per month',
    ],
  },
  {
    version: '1.3.2',
    displayDate: 'Nov 29, 2025',
    title: 'Widget Privacy Fix',
    summary: 'Ensuring your personal schedule stays personal even when using public-facing widgets.',
    fixes: [
      'Fixed a bug where personal events were showing up in widgets. Widgets now only show upcoming group events.',
    ],
  },
  {
    version: '1.3.1',
    displayDate: 'Nov 29, 2025',
    title: 'AI Voice and Quick Access',
    summary: 'Bringing voice interactivity to Scheduly and making it more accessible through home screen widgets.',
    improvements: [
      'Added speech to text for Scheduly, our AI assistant available for pro users',
      'Added quick access widgets for Scheduly',
    ],
    fixes: [
      'Fixed UI around all day events on the up next widgets',
    ],
  },
  {
    version: '1.3.0',
    displayDate: 'Nov 25, 2025',
    title: 'Widgets Everywhere',
    summary: 'Full support for home screen and lock screen widgets in various sizes to keep you updated at a glance.',
    improvements: [
      'Added widget support with small, medium, and large sizes',
      'Widgets display upcoming events in the next 7 days',
      'Widgets auto-rotate every 10 minutes to show different events',
      'Added lock screen widget option for quick access to your schedule',
    ],
  },
  {
    version: '1.2.2',
    displayDate: 'Nov 23, 2025',
    title: 'Event Management Fixes',
    summary: 'Smoothing out the event creation process and making important details more visible.',
    improvements: [
      'Added event notes to the event details so you no longer need to edit the event to see notes.',
    ],
    fixes: [
      'Fixed a bug where editing an event would cause it to duplicate',
    ],
  },
  {
    version: '1.2.1',
    displayDate: 'Nov 21, 2025',
    title: 'Notifications and In-App Alerts',
    summary: 'A new in-app notification center and several fixes for invite and badge consistency.',
    improvements: [
      'Added a small notification bell in app to view any missed invited',
      'Added a route to event details when clicking a notification from anywhere',
    ],
    fixes: [
      'Fixed a bug where the creator of an event was also receiving notifications',
      'Fixed a bug where the badge count was not disappearing',
      'Fixed a bug where the badge count was not incrementing',
    ],
  },
  {
    version: '1.2',
    displayDate: 'Nov 20, 2025',
    title: 'Stability and Theme Polish',
    summary: 'Addressing push notification reliability and ensuring theme consistency.',
    improvements: [
      'Updated some of the UI to be more readable',
    ],
    fixes: [
      'Fixed a bug where push notifications were not coming through if the user allowed notifications',
      'Fixed some theme bugs where the user app theme was not applying 100% where it needed to be',
    ],
  },
  {
    version: '1.1.2',
    displayDate: 'Nov 18, 2025',
    title: 'User Experience Tweaks',
    summary: 'Easier access to support and more clarity during the login and password reset flows.',
    improvements: [
      'Added easier support access in your profile',
      'Improved password reset functionality',
      'Improved Login/Signup Screen so you know when an email has been sent',
    ],
  },
  {
    version: '1.1.1',
    displayDate: 'Nov 17, 2025',
    title: 'Privacy and Calendar Sync',
    summary: 'Improving the sync between group and personal calendars while maintaining member privacy.',
    improvements: [
      'Personal events now show as \'Busy\' for other members so they know you are busy but don\'t know why.',
    ],
    fixes: [
      'Fixed a bug where you couldn\'t scroll on timeline calendar views where you had more than 3 events.',
      'Fixed a bug where group events would duplicate across app and apple calendar per user. This is now much cleaner.',
    ],
  },
  {
    version: '1.1.0',
    displayDate: 'Nov 16, 2025',
    title: 'Apple Calendar Integration',
    summary: 'Better integration with external calendars and cross-group availability management.',
    improvements: [
      'Cross group events have been added, marked as \'busy\' allowing you and scheduly to know what days are free even if you have events in other groups while keeping them events a secret',
      'Minor UI improvements to the calendar display text, its now smaller so doesn\'t wrap on smaller devices',
      'Detailed and Stacked calendar views have been switched so they show in their correct views.',
    ],
    fixes: [
      'Fixed a bug where creating events were not syncing to Apple Calendar, this now syncs to all users who are invited.',
    ],
  },
  {
    version: '1.0',
    displayDate: 'Nov 15, 2025',
    title: 'The Great Beginning',
    summary: 'Initial release of Schedulr. Welcome to the future of planning!',
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Navbar />
      <main className="flex-grow">
        <section className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Area */}
            <div className="max-w-3xl mb-20">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to home</span>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                Changelog
              </h1>
              <p className="text-lg text-gray-500 max-w-2xl">
                Stay up to date with the latest updates, features, and improvements to Schedulr.
              </p>
            </div>

            {/* Version History List (Client Component) */}
            <ChangelogList versions={versions} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

