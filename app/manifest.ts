import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ServiceBali - Service Handphone Terpercaya di Bali',
    short_name: 'ServiceBali',
    description: 'Service handphone terpercaya di Bali. Melayani Klungkung, Amlapura, Denpasar, dan Gilimanuk.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}

