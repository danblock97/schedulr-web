import { Card } from '@/components/ui/Card';
import { 
  Users, 
  Calendar, 
  Sparkles, 
  LayoutGrid, 
  Palette, 
  Bell 
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Group Scheduling',
    description: 'Create groups and sync calendars with your friends',
  },
  {
    icon: Calendar,
    title: 'Calendar Sync',
    description: 'Connect your device calendar for automatic availability',
  },
  {
    icon: Sparkles,
    title: 'AI Assistant',
    description: 'Ask Scheduly to find the perfect meeting time in natural language',
  },
  {
    icon: LayoutGrid,
    title: 'Multiple Views',
    description: 'Year, Month, or List view - choose what works for you',
  },
  {
    icon: Palette,
    title: 'Beautiful Design',
    description: 'Custom themes and playful animations make scheduling delightful',
  },
  {
    icon: Bell,
    title: 'Smart Invites',
    description: 'Share invite codes with your group - simple sign-up with email',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container-content">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Scheduling should be simple, not stressful.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full gradient-brand">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

