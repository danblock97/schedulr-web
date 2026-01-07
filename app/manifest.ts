import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Schedulr - Group Scheduling Made Simple',
    short_name: 'Schedulr',
    description: 'Coordinate schedules with friends and teams. AI-powered availability finding. Beautiful design.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAFA',
    theme_color: '#4F46E5',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32 48x48',
        type: 'image/x-icon',
      },
      {
        src: '/images/schedulr-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

