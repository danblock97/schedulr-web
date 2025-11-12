import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Schedulr',
  description: 'Read Schedulr\'s Terms of Service to understand your rights and responsibilities when using our group scheduling app.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <section className="pt-20 pb-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-content">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Terms of Service
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
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing and using Schedulr, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms, please do not use our service.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-6">
                Schedulr is a group scheduling application that helps users coordinate calendars and find optimal meeting times. The service includes calendar synchronization, group management, and AI-powered availability finding.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">You agree to:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Provide accurate information when creating an account or group</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the service only for lawful purposes</li>
                <li>Respect the privacy and rights of other users</li>
                <li>Not attempt to access other users' data without authorization</li>
                <li>Not use the service to spam, harass, or harm others</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">4. Payment Terms</h2>
              <p className="text-gray-700 mb-4">
                Subscriptions are managed through the Apple App Store. By purchasing a subscription:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>You agree to pay the subscription fee as displayed at the time of purchase</li>
                <li>Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period</li>
                <li>Cancellation must be done through your App Store account settings</li>
                <li>Refunds are subject to Apple's standard refund policy</li>
                <li>Price changes will be communicated in advance</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">5. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                Schedulr uses the following third-party services to provide functionality:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li><strong>Supabase:</strong> Database and backend services with Row Level Security (RLS) policies</li>
                <li><strong>Apple Calendar:</strong> Read-only calendar access for availability checking</li>
                <li><strong>OpenAI:</strong> AI-powered scheduling assistance (Scheduly)</li>
                <li><strong>RevenueCat:</strong> Subscription management and payment processing</li>
              </ul>
              <p className="text-gray-700 mb-6">
                By using Schedulr, you acknowledge and agree to the terms and privacy policies of these third-party services. We maintain strict data controls and security measures as detailed in our Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">6. Data Handling and User Data Ownership</h2>
              <p className="text-gray-700 mb-6">
                You retain full ownership of all data you create or upload to Schedulr. We use Row Level Security (RLS) policies and strict access controls to ensure that users can only access their own data. For detailed information about how we handle your data, please see our Privacy Policy.
              </p>
              <p className="text-gray-700 mb-6">
                For users in the European Economic Area (EEA) and United Kingdom, we comply with GDPR requirements as detailed in our Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-6">
                All content, features, and functionality of Schedulr are owned by us and are protected by international copyright, trademark, and other intellectual property laws. You may not copy, modify, or create derivative works of our service without permission.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 mb-6">
                Schedulr is provided "as is" without warranties of any kind, express or implied. We shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service. Our total liability shall not exceed the amount you paid for the service in the 12 months preceding the claim.
              </p>
              <p className="text-gray-700 mb-6">
                Nothing in this agreement excludes or limits our liability for:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Death or personal injury caused by our negligence</li>
                <li>Fraud or fraudulent misrepresentation</li>
                <li>Any other liability that cannot be excluded or limited by applicable law</li>
              </ul>
              <p className="text-gray-700 mb-6">
                If you are a consumer, nothing in these Terms affects your statutory rights as a consumer under applicable law, including but not limited to your rights under consumer protection legislation in your jurisdiction.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">9. Termination</h2>
              <p className="text-gray-700 mb-6">
                We reserve the right to terminate or suspend your account at any time for violations of these Terms. You may cancel your account or subscription at any time through the App Store. Upon cancellation, you will lose access to Pro features, but your data will be retained according to our data retention policies.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">10. Changes to Terms</h2>
              <p className="text-gray-700 mb-6">
                We reserve the right to modify these Terms at any time. Material changes will be communicated to users via email or through the app. Continued use of the service after changes constitutes acceptance of the new Terms. If you do not agree to the modified Terms, you must stop using the service and cancel your subscription.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">11. Governing Law and Jurisdiction</h2>
              <p className="text-gray-700 mb-6">
                These Terms are governed by the laws of England and Wales. For users in the European Union, these Terms shall be interpreted in accordance with applicable EU consumer protection laws. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales, except where mandatory consumer protection laws in your jurisdiction require otherwise.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 mb-6">
                If you have questions about these Terms, please contact us at:
              </p>
              <p className="text-gray-700 mb-6">
                <strong>Email:</strong> <a href="mailto:support@schedulr.co.uk" className="text-[#FA4A8C] hover:text-[#945AE0]">support@schedulr.co.uk</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

