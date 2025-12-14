import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Changelog - Schedulr',
  description: 'Stay up to date with the latest updates, features, and improvements to Schedulr.',
};

interface Version {
  version: string;
  displayDate: string;
  changes: string[];
}

// Release dates - hardcoded dates
const versions: Version[] = [
  {
    version: '1.6.1',
    displayDate: 'Dec 12, 2025',
    changes: [
      'Updated support link in app to be a form which creates a ticket directly to the devs in app.',
      'Fixed some backend RLS issues',
    ],
  },
  {
    version: '1.6.0',
    displayDate: 'Dec 10, 2025',
    changes: [
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
    changes: [
      'Fixed Sign in with Apple requiring a long press to work',
    ],
  },
  {
    version: '1.5.0',
    displayDate: 'Dec 5, 2025',
    changes: [
      'Added AI Chat persistence',
      'Added quick prompts for AI',
      'Added a quick time proposal to quickly set up meetings either using our calendar engine or use of Scheduly AI',
      'Improved natural language recognition with Scheduly AI',
    ],
  },
  {
    version: '1.4.1',
    displayDate: 'Dec 4, 2025',
    changes: [
      'Group owners can now remove group members',
      'Fixed dark mode theme to be more readable',
      'Fixed app theme not applying in all cases. (123 instances fixed across the app)',
    ],
  },
  {
    version: '1.4.0',
    displayDate: 'Dec 3, 2025',
    changes: [
      'Subtle UI improvements',
      'Added more meaningful notifications which can be personalised in profile settings in profile > app settings',
    ],
  },
  {
    version: '1.3.3',
    displayDate: 'Dec 2, 2025',
    changes: [
      'UI overhaul for login screen, onboarding, profile view and dashboard',
      'Pro value improvements, same price gets you unlimited groups, unlimited members and 300 requests per month',
    ],
  },
  {
    version: '1.3.2',
    displayDate: 'Nov 29, 2025',
    changes: [
      'Fixed a bug where personal events were showing up in widgets. Widgets now only show upcoming group events.',
    ],
  },
  {
    version: '1.3.1',
    displayDate: 'Nov 29, 2025',
    changes: [
      'Added speech to text for Scheduly, our AI assistant available for pro users',
      'Added quick access widgets for Scheduly',
      'Fixed UI around all day events on the up next widgets',
    ],
  },
  {
    version: '1.3.0',
    displayDate: 'Nov 25, 2025',
    changes: [
      'Added widget support with small, medium, and large sizes',
      'Widgets display upcoming events in the next 7 days',
      'Widgets auto-rotate every 10 minutes to show different events',
      'Added lock screen widget option for quick access to your schedule',
    ],
  },
  {
    version: '1.2.2',
    displayDate: 'Nov 23, 2025',
    changes: [
      'Fixed a bug where editing an event would cause it to duplicate',
      'Added event notes to the event details so you no longer need to edit the event to see notes.',
    ],
  },
  {
    version: '1.2.1',
    displayDate: 'Nov 21, 2025',
    changes: [
      'Added a small notification bell in app to view any missed invited',
      'Added a route to event details when clicking a notification from anywhere',
      'Fixed a bug where the creator of an event was also receiving notifications',
      'Fixed a bug where the badge count was not disappearing',
      'Fixed a bug where the badge count was not incrementing',
    ],
  },
  {
    version: '1.2',
    displayDate: 'Nov 20, 2025',
    changes: [
      'Fixed a bug where push notifications were not coming through if the user allowed notifications',
      'Fixed some theme bugs where the user app theme was not applying 100% where it needed to be',
      'Updated some of the UI to be more readable',
    ],
  },
  {
    version: '1.1.2',
    displayDate: 'Nov 18, 2025',
    changes: [
      'Added easier support access in your profile',
      'Improved password reset functionality',
      'Improved Login/Signup Screen so you know when an email has been sent',
    ],
  },
  {
    version: 'v1.1.1',
    displayDate: 'Nov 17, 2025',
    changes: [
      'Fixed a bug where you couldn\'t scroll on timeline calendar views where you had more than 3 events.',
      'Fixed a bug where group events would duplicate across app and apple calendar per user. This is now much cleaner.',
      'Personal events now show as \'Busy\' for other members so they know you are busy but don\'t know why.',
    ],
  },
  {
    version: 'v1.1.0',
    displayDate: 'Nov 16, 2025',
    changes: [
      'Fixed a bug where creating events were not syncing to Apple Calendar, this now syncs to all users who are invited.',
      'Cross group events have been added, marked as \'busy\' allowing you and scheduly to know what days are free even if you have events in other groups while keeping them events a secret',
      'Minor UI improvements to the calendar display text, its now smaller so doesn\'t wrap on smaller devices',
      'Detailed and Stacked calendar views have been switched so they show in their correct views.',
    ],
  },
  {
    version: 'v1.0',
    displayDate: 'Nov 15, 2025',
    changes: [],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <section className="pt-40 pb-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-content">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back</span>
              </Link>

              {/* Header */}
              <div className="mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  Version History
                </h1>
                <p className="text-xl text-gray-600">
                  Stay up to date with the latest updates, features, and improvements.
                </p>
              </div>

              {/* Version List */}
              <div className="space-y-8">
                {versions.map((version, index) => (
                  <div key={version.version} className="relative">
                    {/* Version Header */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">
                          Version {version.version}
                        </h2>
                        <span className="text-sm text-gray-500 font-medium">
                          {version.displayDate}
                        </span>
                      </div>
                    </div>

                    {/* Changes List */}
                    {version.changes.length > 0 ? (
                      <ul className="space-y-2 mb-6">
                        {version.changes.map((change, changeIndex) => (
                          <li
                            key={changeIndex}
                            className="text-gray-700 leading-relaxed flex items-start"
                          >
                            <span className="text-gray-400 mr-3 mt-1.5">•</span>
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic mb-6">
                        Initial release
                      </p>
                    )}

                    {/* Divider */}
                    {index < versions.length - 1 && (
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

