import { getContent } from '../lib/content';
import HomeClient from './components/HomeClient';
import { Metadata } from 'next';

// Enable ISR - revalidate every hour
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const content = getContent();
  
  return {
    title: content.hero.title,
    description: content.hero.subtitle,
    keywords: [
      'service handphone bali',
      'perbaikan handphone bali',
      'service hp klungkung',
      'service hp amlapura',
      'service hp denpasar',
      'service hp gilimanuk',
    ],
    openGraph: {
      title: content.hero.title,
      description: content.hero.subtitle,
      images: content.hero.image ? [content.hero.image] : [],
    },
  };
}

export default async function Home() {
  // Fetch content at build time / request time with ISR
  const content = getContent();

  return <HomeClient content={content} />;
}
