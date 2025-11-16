import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const contentFilePath = join(process.cwd(), 'data', 'content.json');

export interface ContentData {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    image?: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  stats?: {
    title: string;
    subtitle: string;
    items: Array<{
      number: string;
      label: string;
      icon: string;
    }>;
  };
  pricing?: {
    title: string;
    subtitle: string;
    note: string;
    categories: Array<{
      name: string;
      items: Array<{
        service: string;
        price: string;
        warranty: string;
      }>;
    }>;
  };
  locations: {
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      description: string;
      address?: string;
      phone?: string;
      hours?: string;
      mapUrl?: string;
      latitude?: number;
      longitude?: number;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    whatsapp: string;
    message: string;
  };
  about: {
    title: string;
    description: string;
    image?: string;
  };
  whyChooseUs?: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  process?: {
    title: string;
    subtitle: string;
    steps: Array<{
      step: number;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  testimonials?: {
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      location: string;
      rating: number;
      comment: string;
      image: string;
    }>;
  };
  gallery?: {
    title: string;
    subtitle: string;
    images: Array<{
      url: string;
      caption: string;
    }>;
  };
  faq?: {
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export function getContent(): ContentData {
  try {
    if (!existsSync(contentFilePath)) {
      // Return default content if file doesn't exist
      return getDefaultContent();
    }

    const fileContent = readFileSync(contentFilePath, 'utf-8');
    return JSON.parse(fileContent) as ContentData;
  } catch (error) {
    console.error('Error reading content:', error);
    return getDefaultContent();
  }
}

function getDefaultContent(): ContentData {
  return {
    hero: {
      title: "Service Handphone Terpercaya di Bali",
      subtitle: "Perbaikan cepat, berkualitas, dan harga terjangkau untuk semua merek handphone",
      cta: "Hubungi Kami Sekarang"
    },
    services: {
      title: "Layanan Kami",
      subtitle: "Kami menyediakan berbagai layanan perbaikan handphone profesional",
      items: []
    },
    locations: {
      title: "Lokasi Layanan Kami",
      subtitle: "Kami melayani di berbagai daerah di Bali",
      items: []
    },
    contact: {
      title: "Hubungi Kami",
      subtitle: "Kami siap membantu perbaikan handphone Anda",
      whatsapp: "0851-6277-3332",
      message: "Halo, saya ingin konsultasi tentang service handphone"
    },
    about: {
      title: "Tentang Kami",
      description: "Kami adalah tim profesional yang berpengalaman dalam perbaikan berbagai merek handphone."
    }
  };
}

