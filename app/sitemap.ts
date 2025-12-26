import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://schedulr.co.uk';

  const routes = [
    '',
    '/features',
    '/pricing',
    '/support',
    '/issues',
    '/changelog',
    '/about',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}

