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
  { included: true, text: '5 Groups' },
  { included: true, text: '10 Members per group' },
  { included: true, text: 'Calendar Sync' },
  { included: true, text: 'AI Assistant (100 requests/month)' },
  { included: true, text: 'Priority support' },
];

export function Pricing() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-content">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-800">
            Choose the plan that works for you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <Card className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Free Forever</h3>
              <p className="text-gray-800 mb-4">Perfect for trying out Schedulr</p>
            </div>
            
            <div className="flex-1 space-y-3 mb-8">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-[#33C756] flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                  )}
                  <span className={feature.included ? 'text-gray-900' : 'text-gray-400'}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
            
            <Button variant="secondary" size="lg" className="w-full" disabled>
              Current Plan
            </Button>
          </Card>
          
          {/* Pro Tier */}
          <Card className="flex flex-col relative border-2 border-[#FA4A8C]">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-[#FA4A8C] to-[#945AE0] text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            
            <div className="mb-6 mt-4">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">
                Pro <span className="text-[#FA4A8C]">✨</span>
              </h3>
              <p className="text-gray-800 mb-4">Perfect for larger friend groups</p>
              <div className="mb-2">
                <span className="text-3xl font-bold">£3.99</span>
                <span className="text-gray-800">/month</span>
              </div>
              <p className="text-sm text-gray-800 mb-2">or</p>
              <div className="mb-2">
                <span className="text-3xl font-bold">£34.99</span>
                <span className="text-gray-800">/year</span>
              </div>
              <p className="text-sm text-[#33C756] font-semibold">
                💰 Save £13 with yearly plan
              </p>
            </div>
            
            <div className="flex-1 space-y-3 mb-8">
              {proFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-[#33C756] flex-shrink-0" />
                  <span className="text-gray-900">{feature.text}</span>
                </div>
              ))}
            </div>
            
            <Button variant="primary" size="lg" className="w-full" disabled>
              Subscribe to Pro
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Subscriptions managed in-app via App Store
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

