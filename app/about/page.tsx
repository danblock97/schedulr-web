import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Schedulr',
  description: 'Learn about Schedulr\'s mission to make group scheduling simple, stress-free, and delightful.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <section className="pt-20 pb-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-content">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                About Schedulr
              </h1>
              <p className="text-xl text-gray-800 max-w-2xl mx-auto">
                We're on a mission to make group scheduling simple, stress-free, and delightful.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container-content max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                Schedulr exists because coordinating schedules shouldn't be complicated. We've all been there—dozens of text messages, countless "how about this time?" messages, and the frustration of trying to find a time that works for everyone.
              </p>
              <p className="text-gray-700 mb-4">
                Our mission is to eliminate that frustration. We believe scheduling should be simple, beautiful, and even fun. With Schedulr, you can coordinate with your friends, family, or team effortlessly, letting AI do the heavy lifting while you focus on what matters—spending time together.
              </p>
              <p className="text-gray-700">
                We're solving the problem of group coordination by combining real-time calendar sync, intelligent AI assistance, and a beautiful, playful design that makes scheduling a delight instead of a chore.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-content max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                The idea for Schedulr came from a simple frustration: trying to plan a casual meetup with friends. Text messages flying back and forth, timezone confusion, and the inevitable "I forgot to check my calendar" moments.
              </p>
              <p className="text-gray-700 mb-4">
                We realized that while there were calendar apps and meeting schedulers, none of them were designed specifically for groups of friends, families, or small teams who just wanted to coordinate without the corporate overhead.
              </p>
              <p className="text-gray-700 mb-4">
                So we built Schedulr with a focus on what matters: group coordination that feels natural, privacy-first design that keeps your data safe, and beautiful interfaces that make scheduling something you actually want to use.
              </p>
              <p className="text-gray-700">
                Today, Schedulr helps thousands of users coordinate their schedules with friends, plan team meetings, organize family events, and find the perfect time to connect—all while maintaining strict privacy controls and a delightful user experience.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container-content max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <p className="text-gray-800 text-lg">
              We're a small, passionate team dedicated to making group scheduling better. More about our team coming soon!
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

