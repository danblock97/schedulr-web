import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, X } from 'lucide-react';

const freeFeatures = [
  { included: true, text: '1 Group' },
  { included: true, text: '5 Members per group' },
  { included: true, text: 'Calendar Sync' },
  { included: true, text: 'Basic support' },
  { included: false, text: 'AI Assistant' },
];

const proFeatures = [
  { included: true, text: 'Unlimited Groups' },
  { included: true, text: 'Unlimited Members per group' },
  { included: true, text: 'Calendar Sync' },
  { included: true, text: 'AI Assistant (300 requests/month)' },
  { included: true, text: 'Priority support' },
];

export function Pricing() {
  return (
    <section className="pt-40 pb-20 bg-gray-50">
      <div className="container-content">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-heading">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that works for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="bento-card p-8 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 font-heading">Free Forever</h3>
              <p className="text-gray-500 mb-4">Perfect for trying out Schedulr</p>
            </div>

            <div className="flex-1 space-y-4 mb-8">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {feature.included ? (
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <X className="w-3 h-3 text-gray-400" />
                    </div>
                  )}
                  <span className={feature.included ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
              Available to everyone
            </div>
          </div>

          {/* Pro Tier */}
          <div className="bento-card p-8 flex flex-col relative border-2 border-indigo-500 shadow-xl shadow-indigo-100">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                Most Popular
              </span>
            </div>

            <div className="mb-6 mt-4">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 font-heading">
                Pro <span className="text-indigo-500">✨</span>
              </h3>
              <p className="text-gray-500 mb-4">Perfect for larger friend groups</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-gray-900">£3.99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <div className="text-sm text-gray-500 mb-2">or £34.99/year</div>
              <p className="text-sm text-green-600 font-bold bg-green-50 inline-block px-2 py-1 rounded-lg">
                💰 Save £13 with yearly plan
              </p>
            </div>

            <div className="flex-1 space-y-4 mb-8">
              {proFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-indigo-600" />
                  </div>
                  <span className="text-gray-900 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100 text-center">
              <p className="text-sm font-medium text-indigo-600">
                Upgrade anytime in the app
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Subscriptions managed via App Store
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

