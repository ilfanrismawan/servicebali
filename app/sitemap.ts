import { MetadataRoute } from 'next';
import { getContent } from '../lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://servicebali.com';
  const content = getContent();
  const now = new Date();

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Add location pages if needed in the future
  if (content.locations?.items) {
    content.locations.items.forEach((location) => {
      sitemapEntries.push({
        url: `${baseUrl}/lokasi/${location.name.toLowerCase().replace(/\s+/g, '-')}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  }

  return sitemapEntries;
}

