import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Schedulr',
  description: 'Learn how Schedulr protects your privacy with strict data controls, Row Level Security, and transparent third-party service usage.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <section className="pt-20 pb-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-content">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Privacy Policy
              </h1>
              <p className="text-gray-800">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-content max-w-3xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-6">
                At Schedulr, we take your privacy seriously. This Privacy Policy explains how we collect, use, protect, and handle your information when you use our group scheduling application. We are committed to maintaining strict data controls and ensuring your privacy is protected.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">2. Data Collection</h2>
              <p className="text-gray-700 mb-4">We collect the following types of information:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li><strong>Account Information:</strong> Email address, username, and authentication credentials</li>
                <li><strong>Group Data:</strong> Group names, descriptions, and membership information</li>
                <li><strong>Usage Data:</strong> How you interact with the app, features used, and performance metrics</li>
                <li><strong>Device Information:</strong> Device type, iOS version, and app version</li>
                <li><strong>Subscription Data:</strong> Subscription status and purchase history (handled by RevenueCat)</li>
              </ul>
              <p className="text-gray-700 mb-6">
                <strong>Important:</strong> We do NOT collect or store your calendar data. Calendar access is read-only and all calendar data remains on your device.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">2.1. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                <strong>We do not use cookies or tracking technologies.</strong> Schedulr is a privacy-first application that does not set, store, or use cookies for any purpose, including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>User tracking or analytics</li>
                <li>Session management (we use secure token-based authentication)</li>
                <li>Advertising or marketing purposes</li>
                <li>Third-party tracking services</li>
              </ul>
              <p className="text-gray-700 mb-6">
                Our web presence (marketing website) is a static informational site that does not set cookies. If you access our website through a mobile app WebView, no cookies will be set or collected.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">3. How Data is Used</h2>
              <p className="text-gray-700 mb-4">We use your data to:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Provide and improve our scheduling services</li>
                <li>Sync your groups and availability across devices</li>
                <li>Process AI queries through Scheduly</li>
                <li>Manage your subscription and provide customer support</li>
                <li>Send you important updates and notifications (with your consent)</li>
                <li>Ensure service security and prevent fraud</li>
              </ul>
              <p className="text-gray-700 mb-6">
                We do not sell your data to third parties. We do not use your data for advertising purposes.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">4. Third-Party Services</h2>
              <p className="text-gray-700 mb-6">
                Schedulr uses the following third-party services. Each service has strict data controls and privacy measures:
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Supabase</h3>
              <p className="text-gray-700 mb-4">
                <strong>Purpose:</strong> Database and backend service for storing user accounts, groups, and scheduling data.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Data Controls:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Row Level Security (RLS) policies are enforced at the database level—users can only access their own data</li>
                <li>All data is encrypted at rest and in transit</li>
                <li>Strict access controls and authentication required for all data access</li>
                <li>EU/US hosting options available for data residency requirements</li>
                <li>Regular security audits and compliance checks</li>
              </ul>
              <p className="text-gray-700 mb-6">
                <strong>Privacy:</strong> Supabase processes data on our behalf under a data processing agreement. Your data is never used by Supabase for their own purposes.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Apple Calendar</h3>
              <p className="text-gray-700 mb-4">
                <strong>Purpose:</strong> Read-only calendar access for checking availability and finding optimal meeting times.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Data Controls:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Read-only access only—we cannot modify or create calendar events on your device</li>
                <li>Calendar events are stored securely on Supabase with Row Level Security (RLS) policies</li>
                <li>All calendar data is encrypted at rest and in transit</li>
                <li>Only you can access your own calendar data through strict access controls</li>
                <li>Permissions are clearly explained and user-controlled</li>
                <li>You can revoke calendar access at any time in iOS Settings</li>
              </ul>
              <p className="text-gray-700 mb-6">
                <strong>Privacy:</strong> Your calendar privacy is paramount. Calendar events are stored securely with encryption and strict access controls. We only check availability when you actively use scheduling features.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">OpenAI</h3>
              <p className="text-gray-700 mb-4">
                <strong>Purpose:</strong> Powers the Scheduly AI assistant for natural language scheduling queries.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Data Controls:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Only query text is sent for processing—no user IDs, personal information, or calendar data</li>
                <li>No user identification is stored with queries</li>
                <li>Queries are automatically deleted after processing according to OpenAI's retention policies</li>
                <li>Query retention policies are clearly stated—typically 30 days for abuse prevention only</li>
                <li>Your privacy is maintained—queries are anonymous and cannot be traced back to you</li>
              </ul>
              <p className="text-gray-700 mb-6">
                <strong>Privacy:</strong> OpenAI processes queries under their privacy policy and data processing agreement. We do not send any personally identifiable information with AI queries.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">RevenueCat</h3>
              <p className="text-gray-700 mb-4">
                <strong>Purpose:</strong> Subscription management and payment processing.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Data Controls:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Only subscription-related data is shared (subscription status, purchase history)</li>
                <li>Data is anonymized where possible</li>
                <li>Payment processing is handled securely through Apple's App Store</li>
              </ul>
              <p className="text-gray-700 mb-6">
                <strong>Privacy:</strong> RevenueCat processes subscription data under their privacy policy. No personal financial information is shared.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">5. Security Measures</h2>
              <p className="text-gray-700 mb-4">We implement multiple layers of security to protect your data:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li><strong>Row Level Security (RLS):</strong> Database-level policies ensure users can only access their own data</li>
                <li><strong>End-to-End Encryption:</strong> Sensitive data is encrypted in transit using TLS/SSL protocols</li>
                <li><strong>Strict Access Controls:</strong> Authentication and authorization required for all data access</li>
                <li><strong>Regular Security Audits:</strong> We conduct regular security reviews and compliance checks</li>
                <li><strong>Data Minimization:</strong> We only collect and store the minimum data necessary for functionality</li>
                <li><strong>Secure Authentication:</strong> Industry-standard authentication and session management</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">6. User Data Controls</h2>
              <p className="text-gray-700 mb-4">
                You have complete control over your data. We respect the following rights:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Right to Access:</strong> You can access all your data through the app or by contacting us</li>
                <li><strong>Right to Deletion:</strong> You can request deletion of your account and all associated data</li>
                <li><strong>Right to Data Portability:</strong> You can export your data in a machine-readable format</li>
                <li><strong>Right to Opt-Out:</strong> You can opt out of non-essential data sharing</li>
                <li><strong>Data Ownership:</strong> You own your data completely—we are just the custodian</li>
              </ul>
              <p className="text-gray-700 mb-6">
                To exercise these rights, contact us at <a href="mailto:support@schedulr.co.uk" className="text-[#FA4A8C] hover:text-[#945AE0]">support@schedulr.co.uk</a>. We will respond within 30 days.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">7. GDPR Compliance</h2>
              <p className="text-gray-700 mb-6">
                Schedulr is fully compliant with the General Data Protection Regulation (GDPR). This means:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>We process your data lawfully, fairly, and transparently</li>
                <li>We only collect data for specified, explicit, and legitimate purposes</li>
                <li>We limit data collection to what is necessary</li>
                <li>We keep your data accurate and up to date</li>
                <li>We store data only as long as necessary</li>
                <li>We ensure appropriate security of your data</li>
                <li>You have the right to access, rectify, erase, restrict, and port your data</li>
              </ul>
              <p className="text-gray-700 mb-6">
                If you are located in the European Economic Area (EEA), you have additional rights under GDPR. Please contact us to exercise these rights.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">8. Data Retention Policies</h2>
              <p className="text-gray-700 mb-4">
                We retain your data only as long as necessary:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li><strong>Account Data:</strong> Retained until you delete your account</li>
                <li><strong>Group Data:</strong> Retained until you leave the group or it's deleted</li>
                <li><strong>Usage Data:</strong> Retained for 12 months for analytics and improvement</li>
                <li><strong>Subscription Data:</strong> Retained as required by law (typically 7 years for tax purposes)</li>
                <li><strong>AI Queries:</strong> Processed and immediately deleted (OpenAI may retain for 30 days for abuse prevention)</li>
              </ul>
              <p className="text-gray-700 mb-6">
                Upon account deletion, all data is permanently removed within 30 days, except where retention is required by law.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 mb-6">
                Schedulr is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">10. Changes to Privacy Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this Privacy Policy from time to time. Material changes will be communicated to users via email or in-app notification. The "Last updated" date at the top indicates when changes were made.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 mb-6">
                If you have questions, concerns, or requests regarding this Privacy Policy or your data, please contact us:
              </p>
              <p className="text-gray-700 mb-6">
                <strong>Email:</strong> <a href="mailto:support@schedulr.co.uk" className="text-[#FA4A8C] hover:text-[#945AE0]">support@schedulr.co.uk</a>
              </p>
              <p className="text-gray-700 mb-6">
                For data protection inquiries, please include "Privacy Request" in your subject line.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

