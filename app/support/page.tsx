import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support - Schedulr',
  description: 'Get help with Schedulr. Contact our support team for assistance.',
};

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <section className="pt-20 pb-20 bg-white">
          <div className="container-content max-w-2xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-brand mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">
                We're here to help!
              </h1>
              <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-8">
                Have a question? Drop us a line and we'll get back to you within 24 hours.
              </p>
              <a
                href="mailto:support@schedulr.co.uk"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold min-h-[52px] gradient-brand text-white hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Email support@schedulr.co.uk
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

